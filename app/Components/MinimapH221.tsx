import { FontAwesome6 } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, NativeTouchEvent, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Svg, { Circle, G, Line, Path, Polyline, Text as SvgText } from 'react-native-svg';
import routes_data from '../../assets/data/routes_data.json';
import { trackBus } from '../shared/busTrackUtils';
import { Route, Stop } from '../shared/types/routes';
import ButtonH221 from './Buttons/buttonH221';
import ButtonHovey from './Buttons/buttonHovey';
import ButtonTMC from './Buttons/buttonTMC';

const VIEW_W = Dimensions.get('window').width;
const VIEW_H = Dimensions.get('window').height;
const [routeTMC, routeH221, routeHovey] = routes_data.routes;


function getDistance(touches: NativeTouchEvent[]){
  const [touch1 , touch2] = touches;
  return Math.sqrt((touch1.locationX-touch2.locationX)**2+(touch1.locationY-touch2.locationY));
}

function getCenterLocationX(touches: NativeTouchEvent[]){
  const [touch1 , touch2] = touches;
  return (touch1.locationX+touch2.locationX)/2
}
function getCenterLocationY(touches: NativeTouchEvent[]){
  const [touch1 , touch2] = touches;
  return (touch1.locationY+touch2.locationY)/2
}


export default function MinimapH221() {

  const [highlightedRoute, setHighlightedRoute] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState<Stop | null>(null);

  const highlightRoutes = useCallback(() => {
    routeTMC.highlighted = highlightedRoute === 'TMC';
    routeH221.highlighted = highlightedRoute === 'H221';
    routeHovey.highlighted = highlightedRoute === 'Hovey';
  }, [highlightedRoute]);

  // ensure highlights sync when state changes
  useEffect(() => {
    highlightRoutes();
  }, [highlightRoutes]);

  // Pan을 위한 state/ref
  const [{vx,vy,vw,vh}, setVB] = useState({ vx: 0, vy: 200, vw: VIEW_W, vh: VIEW_H });
  const vbRef = useRef({ vx:0, vy:200, vw:VIEW_W, vh:VIEW_H });
  const startRef = useRef({ vx: 0, vy: 0, vw: VIEW_W, vh: VIEW_H});
  const tapStartRef = useRef({ t: 0 });
  
  let initialDistance = 0;
  let initialCenterPinchX = 0;
  let initialCenterPinchY = 0;
  let initialVx = 0;
  let initialVy = 0;


  //렌더가 시작했을 때, vx,vy가 각각 바꼈으면 ref 업데이트
  useEffect(() => { vbRef.current = {vx,vy,vw,vh}; }, [vx,vy,vw,vh]);
 
  
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_e, g) => {
        startRef.current = { ...vbRef.current };
        tapStartRef.current = { t:Date.now() };
        initialDistance = 0;
      },
      onPanResponderMove: (_e, g) => {
        if(g.numberActiveTouches == 1){
          initialDistance = 0;
          const currentScale = vbRef.current.vw/VIEW_W;
          const nextX = startRef.current.vx - g.dx*currentScale;
          const nextY = startRef.current.vy - g.dy*currentScale;
          setVB(v => ({...v, vx: nextX, vy: nextY}));
        } else if (g.numberActiveTouches == 2) {
          if (initialDistance !== 0) {
            const dist = getDistance((_e.nativeEvent as any).touches);
            const factor = dist / initialDistance;
            if (!isFinite(factor) || factor <= 0) return;

            // 새 viewBox 크기
            const nextVw = startRef.current.vw / factor;
            const nextVh = startRef.current.vh / factor;

            // 스케일
            const s0 = startRef.current.vw / VIEW_W;
            const s1 = nextVw / VIEW_W;

            // 핀치 시작 시 중심의 월드 좌표 고정
            const worldFx = initialVx + initialCenterPinchX * s0;
            const worldFy = initialVy + initialCenterPinchY * s0;

            const nextVx = worldFx - initialCenterPinchX * s1;
            const nextVy = worldFy - initialCenterPinchY * s1;

            setVB(v => ({...v, vw: nextVw, vh: nextVh, vx: nextVx, vy: nextVy}));
          } else {
            initialDistance      = getDistance((_e.nativeEvent as any).touches);
            initialCenterPinchX  = getCenterLocationX((_e.nativeEvent as any).touches);
            initialCenterPinchY  = getCenterLocationY((_e.nativeEvent as any).touches);
            initialVx = startRef.current.vx;
            initialVy = startRef.current.vy;
          }
        }
      },
      onPanResponderRelease: () => {
        if (Date.now() - tapStartRef.current.t < 300) {
          toggleSheet(null);
        
        }
      }
    })
  ).current;

  //stationDetail window
  const stationDetail_H = VIEW_H / 4;
  const stationDetail_offsetY = useRef(new Animated.Value(stationDetail_H)).current;
  const isStationDetailOpened = useRef(false);


  const toggleSheet = useCallback(
    (station: Stop | null) => {
      const openWindow = station !== null;
      setSelectedStation(station);
      isStationDetailOpened.current = openWindow;

      Animated.spring(stationDetail_offsetY, {
        toValue: openWindow ? 0 : stationDetail_H,
        useNativeDriver: true,
        damping: 100,
        stiffness: 180,
        mass: 0.8,
      }).start();
    },
    [stationDetail_offsetY, stationDetail_H]
  );
  
  // const [runningBuses, setRunnigBuses] = useState(trackBus());
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000); // 1초마다
    return () => clearInterval(id);
  }, []);

  const runningBuses = React.useMemo(() => {
    return trackBus(new Date()); // or trackBus(Date.now()) 처럼 필요 파라미터 전달
  }, [tick /*, highlightedRoute 등 필요할 때만 추가 */]);

  function getStationHours(s: Stop | null) {
    if (!s) return null;
    return (s.openingHours || null);
  }


  return (
    <>
      <View style={{width: VIEW_W, height:VIEW_H-90}}>
        <Animated.View style={styles.box} {...pan.panHandlers}>
          <Svg width={VIEW_W} height={VIEW_H} viewBox={`${vx} ${vy} ${vw} ${vh}`}>
                  <G id="route-TMC">
                    <Polyline
                      fill="none"
                      stroke= {routeH221.highlighted || routeHovey.highlighted ? "#0345fc80" : "#0345fc"}
                      strokeWidth={5.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.9}
                      points="
                        50,550 150,550 250,550 350,550
                        450,550 460,548 468,540 470,530
                        470,370 468,360 460,352 450,350
                        400,350 350,350 300,350 200,350
                        100,350 90,352 82,360 80,370
                        80,430 82,440 90,448 100,450
                        200,450 470,450
                      "
                    />
                  
                  </G>
                               
                  {/* <Text x={30} y={50} transform="rotate(-45, 30, 50)">hello</Text> */}
                  <G id="route-H221">
                    <Polyline
                      fill="none"
                      stroke= {(routeTMC.highlighted || routeHovey.highlighted) ? "#00962380" : "#009623"}
                      strokeWidth={5.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.9}
                      points="
                        50,560 930,560 940,558 948,550 950,540
                        950,480 948,470 940,462 930,460
                        870,460 860,462 852,470 850,480 850,560
                      "
                    />
                  </G>

                  <G id="route-HOVEY">
                    <Polyline
                      fill="none"
                      stroke= {routeTMC.highlighted || routeH221.highlighted ? "#ff2a0080" : "#ff2a00"}
                      strokeWidth={5.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.9}
                      points="
                        50,570 730,570 740,572 748,580 750,590
                        750,750 748,760 740,768 730,770 100,770
                        90,768 82,760 80,750
                        80,690 82,680 90,672 100,670
                        630,670 640,672 648,680 650,690 650,770
                      "
                    />
                  </G>

                  {/* Interchanges (두 번 그려 외곽선 효과: 검정 → 흰색) */}
                  <G id="interchanges">
                    {/* 50,550 - 50,570 */}
                    <Line x1={50} y1={550} x2={50} y2={570} stroke="black" strokeWidth={18} strokeLinecap="round" />
                    <Line x1={50} y1={550} x2={50} y2={570} stroke="white" strokeWidth={15} strokeLinecap="round" />
            
                    {/* 150,550 - 150,570 */}
                    <Line x1={150} y1={550} x2={150} y2={570} stroke="black" strokeWidth={18} strokeLinecap="round" />
                    <Line x1={150} y1={550} x2={150} y2={570} stroke="white" strokeWidth={15} strokeLinecap="round" />
            
                    {/* 250,550 - 250,570 */}
                    <Line x1={250} y1={550} x2={250} y2={570} stroke="black" strokeWidth={18} strokeLinecap="round" />
                    <Line x1={250} y1={550} x2={250} y2={570} stroke="white" strokeWidth={15} strokeLinecap="round" />
            
                    {/* 350,550 - 350,570 */}
                    <Line x1={350} y1={550} x2={350} y2={570} stroke="black" strokeWidth={18} strokeLinecap="round" />
                    <Line x1={350} y1={550} x2={350} y2={570} stroke="white" strokeWidth={15} strokeLinecap="round" />
            
                    {/* 520,560 - 520,570 */}
                    <Line x1={520} y1={560} x2={520} y2={570} stroke="black" strokeWidth={18} strokeLinecap="round" />
                    <Line x1={520} y1={560} x2={520} y2={570} stroke="white" strokeWidth={15} strokeLinecap="round" />
            
                    {/* 620,560 - 620,570 */}
                    <Line x1={620} y1={560} x2={620} y2={570} stroke="black" strokeWidth={18} strokeLinecap="round" />
                    <Line x1={620} y1={560} x2={620} y2={570} stroke="white" strokeWidth={15} strokeLinecap="round" />
            
                    {/* 720,560 - 720,570 */}
                    <Line x1={720} y1={560} x2={720} y2={570} stroke="black" strokeWidth={18} strokeLinecap="round" />
                    <Line x1={720} y1={560} x2={720} y2={570} stroke="white" strokeWidth={15} strokeLinecap="round" />
                  </G>
            
                  {/* Dots */}
                  
                          

                  {routeHovey.stops.map((station:Stop, index) => {
                    return(
                      <G key={`hovey-${index}`}>
                        <Circle cx={station.x}  cy={station.y}
                                r={(station.intersaction3 || station.intersaction2)? 3 : 1.5}
                                fill={
                                        station.intersaction3 ? (routeTMC.highlighted || routeH221.highlighted ? "#ff2a0050" : "#ff2a00")
                                          : station.intersaction2 && routeH221.highlighted ? "#ff2a0050"
                                            : station.intersaction2
                                              ? "#ff2a00"
                                              : "white"
                                      } />
                        <Circle cx={station.x}  cy={station.y}
                                r={20}
                                fill='black'
                                opacity={0}
                                onPress={() => {toggleSheet(station)}}/>
                      </G>

                    ) // return
                  })}
                  {routeH221.stops.map((station:Stop, index) => {
                    return(
                      <G key={`h221-${index}`}>
                        <Circle cx={station.x}  cy={station.y}
                                r={(station.intersaction3 || station.intersaction2)? 3 : 1.5}
                                fill={
                                        station.intersaction3 ? (routeTMC.highlighted || routeHovey.highlighted ? "#00962350" : "#009623")
                                          : station.intersaction2 && routeHovey.highlighted ? "#00962350"
                                            : station.intersaction2
                                              ? "#009623"
                                              : "white"
                                      } />
                        <Circle cx={station.x}  cy={station.y}
                                r={20}
                                fill='black'
                                opacity={0}
                                onPress={() => {toggleSheet(station)}}/>
                      </G>

                      ) // return
                  })}
                  
                  {routeTMC.stops.map((station, index) => {
                    return(
                      <G key={`tmc-${index}`}>
                        <Circle cx={station.x}  cy={station.y}
                                r={station.intersaction3? 3 : 1.5}
                                fill={station.intersaction3? (routeH221.highlighted || routeHovey.highlighted? "#0345fc50" : "#0345fc") : "white"}
                                />
                        <Circle cx={station.x}  cy={station.y}
                                r={20}
                                fill='black'
                                opacity={0}
                                onPress={() => {toggleSheet(station)}}/>
                      </G>
                    ) // return
                  })}




                  {routeTMC.stops.map((station, index) => {
                    if(station.revisit) return null;
                    if(station.intersaction3 && (routeH221.highlighted || routeHovey.highlighted)) return null;
                    return (
                      <SvgText
                      key={`tmc-text-${index}`}
                      x={station.x + 10} y={station.y}
                      fontSize={8}
                      fontWeight={routeTMC.highlighted? 600 : routeH221.highlighted || routeHovey.highlighted? 200 : 400}
                      transform={`rotate(-40, ${station.x}, ${station.y})`}>
                        {station.name}
                    </SvgText>
                    ) 
                  })}

                  {/* text */}
                  {routeH221.stops.map((station:Stop, index) => {
                    if(station.revisit) return null;
                    if(station.intersaction3 && !routeH221.highlighted) return null;
                    if(station.intersaction2 && routeHovey.highlighted) return null;
                    return (
                      <SvgText 
                      key={`h221-text-${index}`}
                      x={station.x + 10} y={station.y}
                      fontSize={8}
                      fontWeight={routeH221.highlighted? 600 : routeTMC.highlighted || routeHovey.highlighted? 200 : 400}
                      transform={`rotate(-40, ${routeH221.highlighted && station.intersaction3? station.x+5 : station.x}, ${routeH221.highlighted && station.intersaction3 ? station.y-5 : station.y})`}>
                        {station.name}
                    </SvgText>
                    ) 
                  })}

                  {routeHovey.stops.map((station:Stop, index) => {
                    if(station.revisit) return null;
                    if(station.intersaction3 && !routeHovey.highlighted) return null;
                    if(station.intersaction2 && !routeHovey.highlighted) return null;
                    return (
                      <SvgText
                      key={`hovey-text-${index}`}
                      x={station.x + 10} y={station.y}
                      fontSize={8}
                      fontWeight={routeHovey.highlighted? 600 : routeTMC.highlighted || routeH221.highlighted? 200 : 400}
                      transform={`rotate(-40, ${routeHovey.highlighted && (station.intersaction3 || station.intersaction2)? station.x+5 : station.x}, ${routeHovey.highlighted && (station.intersaction3 || station.intersaction2) ? station.y-5 : station.y})`}>
                        {station.name}
                    </SvgText>
                    ) 
                  })}
                    {runningBuses.map((item:[Route,number[]], index) => {
                    return(
                      <G key={`bus-${index}`} x={item[1][0]-10} y={item[1][1]-10} scale={20 / 576}>
                        <Path d="M192 64C139 64 96 107 96 160L96 448C96 477.8 116.4 502.9 144 510L144 544C144 561.7 158.3 576 176 576L192 576C209.7 576 224 561.7 224 544L224 512L416 512L416 544C416 561.7 430.3 576 448 576L464 576C481.7 576 496 561.7 496 544L496 510C523.6 502.9 544 477.8 544 448L544 160C544 107 501 64 448 64L192 64zM160 240C160 222.3 174.3 208 192 208L296 208L296 320L192 320C174.3 320 160 305.7 160 288L160 240zM344 320L344 208L448 208C465.7 208 480 222.3 480 240L480 288C480 305.7 465.7 320 448 320L344 320zM192 384C209.7 384 224 398.3 224 416C224 433.7 209.7 448 192 448C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384zM448 384C465.7 384 480 398.3 480 416C480 433.7 465.7 448 448 448C430.3 448 416 433.7 416 416C416 398.3 430.3 384 448 384zM248 136C248 122.7 258.7 112 272 112L368 112C381.3 112 392 122.7 392 136C392 149.3 381.3 160 368 160L272 160C258.7 160 248 149.3 248 136z"
                          fill={item[0] == routeTMC?"#0345fc":(item[0] == routeH221?"#009623": "#ff2a00")}
                        />
                        <Path d="M192 64C139 64 96 107 96 160L96 448C96 477.8 116.4 502.9 144 510L144 544C144 561.7 158.3 576 176 576L192 576C209.7 576 224 561.7 224 544L224 512L416 512L416 544C416 561.7 430.3 576 448 576L464 576C481.7 576 496 561.7 496 544L496 510C523.6 502.9 544 477.8 544 448L544 160C544 107 501 64 448 64L192 64zM160 240C160 222.3 174.3 208 192 208L296 208L296 320L192 320C174.3 320 160 305.7 160 288L160 240zM344 320L344 208L448 208C465.7 208 480 222.3 480 240L480 288C480 305.7 465.7 320 448 320L344 320zM192 384C209.7 384 224 398.3 224 416C224 433.7 209.7 448 192 448C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384zM448 384C465.7 384 480 398.3 480 416C480 433.7 465.7 448 448 448C430.3 448 416 433.7 416 416C416 398.3 430.3 384 448 384zM248 136C248 122.7 258.7 112 272 112L368 112C381.3 112 392 122.7 392 136C392 149.3 381.3 160 368 160L272 160C258.7 160 248 149.3 248 136z"
                          fill={item[0] == routeTMC?"#0345fc":(item[0] == routeH221?"#009623": "#ff2a00")}
                          stroke="#ffffffff"
                          strokeWidth={30}
                        />
                      </G>
                      
                    )
                  })}

            
          </Svg>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {transform: [{ translateY: Animated.add(stationDetail_offsetY, 380) }]}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVB(v => ({...v, vw: vw/1.25, vh: vh/1.25, vx: vx+0.1*vw, vy: vy+0.1*vh}));} } >
            <FontAwesome6 name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {transform: [{ translateY: Animated.add(stationDetail_offsetY, 425) }]}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVB(v => ({...v, vw: vw/0.8, vh: vh/0.8, vx: vx-0.125*vw, vy: vy-0.125*vh}));} } >
            <FontAwesome6 name="minus" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {transform: [{ translateY: Animated.add(stationDetail_offsetY, 470) }]}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVB(v => ({...v, vw: VIEW_W, vh: VIEW_H, vx: 0, vy: 200}));} } >
            <FontAwesome6 name="arrow-rotate-right" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </View>

        <Animated.View style={{position: 'absolute', left: 0, right: 0, bottom: 0, transform: [{ translateY: stationDetail_offsetY }]}}>
        <Shadow
        startColor={isStationDetailOpened.current ? "#00000030" :"#00000000"}
        endColor={"#00000000"}
        distance={35}
        offset={[0,-4]}
        >
          <View style={styles.stationDetail}>
            <View style={styles.stationDetailContent}>          
                  <Text style={styles.stationTitle}>{selectedStation ? selectedStation.name : ''}</Text>
                  <Text style={styles.stationBusList}>
                    {selectedStation && selectedStation.intersaction3 ? <><ButtonTMC/><ButtonH221/><ButtonHovey/></> : 
                    selectedStation && selectedStation.intersaction2 ? <><ButtonH221/><ButtonHovey/></> :
                    selectedStation && routeTMC.stops.some(s => s.index === selectedStation.index) ? <ButtonTMC/> :
                    selectedStation && routeH221.stops.some(s => s.index === selectedStation.index) ? <ButtonH221/> :
                    selectedStation && routeHovey.stops.some(s => s.index === selectedStation.index) ? <ButtonHovey/> : ''
                    }
                  </Text>
                  <Text style={styles.stationHours}>
                    {selectedStation && getStationHours(selectedStation) ? `Opening: ${getStationHours(selectedStation)}` : 'Hours: not available'}
                  </Text>                              
            </View>
            <View style={ styles.stationDetailCloseButton }>
              <TouchableOpacity onPress={() => toggleSheet(null)} style={[styles.buttons, { backgroundColor: '#333', width: 60, height: 30, justifyContent: 'center' }]}>
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
            </View>

          </View>
          </Shadow>
          </Animated.View>
    </>
  );
}


const styles = StyleSheet.create({
  box: { width: 10000, height: 10000,
    backgroundColor: '#fff',
   },
  //buttons
  buttonBox: {
    position: 'absolute',
    display: 'flex',
    right: 16,
  },

   openBox: {
    top: 24,
  },
  buttons: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1e1e1eff'
  },
  pinchCenter: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1e1e1eff',
    position: 'absolute',
    left: 50,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',

  },

  stationDetail: {
    width: VIEW_W,
    height: VIEW_H / 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // iOS shadow
    shadowColor: '#000000ff',
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 20,
    // Android shadow
    // elevation: 30,
  },
  stationDetailContent: {
    padding: 16,
  },
  stationTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  stationBusList: {
    marginTop: 10,
    color: '#444',
  },
  stationHours: {
    marginTop: 8,
    fontSize: 14,
    color: '#111',
  },
  stationDetailCloseButton: {
    top: 10, right:10,
    position: 'absolute',
    borderRadius: 10,
    padding: 6
  },
  bus: {
    position: 'absolute',
    display: 'flex',
  }

});