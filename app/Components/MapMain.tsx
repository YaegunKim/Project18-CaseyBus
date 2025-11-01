import { FontAwesome6 } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ImageBackground, NativeTouchEvent, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Svg, { Circle, G, Line, Path, Polyline, Text as SvgText, Rect} from 'react-native-svg';
import routes_data from '../../assets/data/routes_data.json';
import { trackBus } from '../shared/busTrackUtils';
import { checkHoliday } from '../shared/holidayUtils';
import { Route, Stop } from '../shared/types/routes';
import ButtonIsHoliday from './Buttons/buttonIsHoliday';
import DepartingBusBlock from './DepartingBusBlock';
import ToggleStation from './ToggleStation';
import ToggleTable from './ToggleTable';

const VIEW_W = Dimensions.get('window').width;
const VIEW_H = Dimensions.get('window').height;
const [routeTMC, routeH221, routeHovey] = routes_data.routes;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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


export default function MapMain() {

  const [highlightedRoute, setHighlightedRoute] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState<Stop | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route>(routeTMC);
  const pinScale = useRef(new Animated.Value(0)).current;
  const [isHoliday, setIsHoliday] = useState<boolean>(checkHoliday(new Date().getFullYear(),new Date().getMonth() + 1, new Date().getDate()));

  const highlightRoutes = useCallback(() => {
    routeTMC.highlighted = highlightedRoute === 'TMC';
    routeH221.highlighted = highlightedRoute === 'H221';
    routeHovey.highlighted = highlightedRoute === 'Hovey';
  }, [highlightedRoute]);

  useEffect(() => {
    if (selectedStation) {
      pinScale.setValue(0);
      Animated.spring(pinScale, {
        toValue:1,
        useNativeDriver: false,
        friction:4,
        tension:60,
      }).start();
    }
  }, [selectedStation]);

  // ensure highlights sync when state changes
  useEffect(() => {
    highlightRoutes();
  }, [highlightRoutes]);

  // Pan을 위한 state/ref
  const [{vx,vy,vw,vh}, setVB] = useState({ vx: -150, vy: 170, vw: VIEW_W, vh: VIEW_H });
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
  const [sheetH, setSheetH] = useState<number>(0);
  const offsetY = useRef(new Animated.Value(VIEW_H / 3)).current; // 열린 상태 기준 0
  const isStationDetailOpened = useRef(false);


  const toggleSheet = useCallback(
    (station: Stop | null) => {
      const openWindow = station !== null;
      setSelectedStation(station);
      isStationDetailOpened.current = openWindow;

      const h = sheetH || VIEW_H / 3;

      Animated.spring(offsetY, {
        toValue: openWindow ? 0 : h,
        useNativeDriver: true,
        damping: 100,
        stiffness: 180,
        mass: 0.8,
        overshootClamping: true,
      }).start();
    },
    [offsetY, sheetH]
  );


    //schedule window
  const [tableH, setTableH] = useState<number>(0);
  const tableOffsetY = useRef(new Animated.Value(VIEW_H)).current; // 열린 상태 기준 0
  const isTableOpened = useRef(false);


  const toggleTable = useCallback(
    (station: Stop | null, route: Route) => {
      const openWindow = station !== null;
      setSelectedStation(station);
      setSelectedRoute(route);
      isTableOpened.current = openWindow;

      const h = tableH || VIEW_H;

      Animated.spring(tableOffsetY, {
        toValue: openWindow ? 0 : h,
        useNativeDriver: true,
        damping: 100,
        stiffness: 180,
        mass: 0.8,
        overshootClamping: true,
      }).start();
    },
    [tableOffsetY, tableH]
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


                  <DepartingBusBlock route={routeTMC} onPress={() => {toggleTable(routeTMC.stops[routeTMC.stops.length - 1], routeTMC)}}/>
                  <DepartingBusBlock route={routeH221} onPress={() => {toggleTable(routeH221.stops[routeH221.stops.length - 1], routeH221)}}/>
                  <DepartingBusBlock route={routeHovey} onPress={() => {toggleTable(routeHovey.stops[routeHovey.stops.length - 1], routeHovey)}}/>

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



                  {/* text */}
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

                  {/* Buses */}
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

{selectedStation && (
  <>
  <Rect
      x={selectedStation.x - 45}      // left padding
      y={selectedStation.y - 33}      // above the circle
      width={90}                      // box width
      height={20}                     // box height
      fill="white"                    // background color
      stroke="black"                  // border color
      strokeWidth={1.5}
      rx={4}                          // rounded corners
    />
  <SvgText
      x={selectedStation.x}
      y={selectedStation.y - 18}   // position above circle
      fontSize={12}
      fill="black"
      fontWeight="bold"
      textAnchor="middle"
    >
      You are here!
    </SvgText>
    <AnimatedCircle
    cx={selectedStation.x}
    cy={selectedStation.y}
    r={pinScale.interpolate({
      inputRange: [0, 1],
      outputRange: [6, 15],   // grows from small to bigger
    })}
    fill="black"
    stroke="black"
    strokeWidth={1}
  />
  </>
)}


            
          </Svg>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {right: 110}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVB(v => ({...v, vw: vw/1.25, vh: vh/1.25, vx: vx+0.1*vw, vy: vy+0.1*vh}));} } >
            <FontAwesome6 name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {right: 65}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVB(v => ({...v, vw: vw/0.8, vh: vh/0.8, vx: vx-0.125*vw, vy: vy-0.125*vh}));} } >
            <FontAwesome6 name="minus" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {right: 20}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVB(v => ({...v, vw: VIEW_W, vh: VIEW_H, vx: -150, vy: 170}));} } >
            <FontAwesome6 name="arrow-rotate-right" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {left: 20, width:210}]}>

          <ImageBackground style={[styles.clockBox]} source={require('../../assets/images/night.png')} imageStyle={{ borderRadius: 10}}>
            <View style={styles.clock}>
            <Text style={styles.clockTime}>
              {(() => {
                const now = new Date();
                const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                return `${time}`;
              })()}
            </Text>
            <Text style={styles.clockDate}>
              {(() => {
                const now = new Date();
                const month = now.toLocaleString('en-US', { month: 'short' }); // "Oct"
                const day = now.getDate();
                const year = now.getFullYear();
                return `${month} ${day}, ${year}`;
              })()}
            </Text>  
          </View>
          </ImageBackground>
        </Animated.View>

        <View style={[{position:'absolute', top:85 ,right: 20}]}>
          <ButtonIsHoliday checked={isHoliday} onChange={setIsHoliday} disabled={true} style={{ width: 130 }}/>
        </View> 

        <Animated.View style={{position: 'absolute', left: 0, bottom: -45, transform: [{ translateY: offsetY }]}}>
          <Shadow
          startColor={isStationDetailOpened.current ? "#00000030" :"#00000000"}
          endColor={"#00000000"}
          distance={35}
          offset={[0,0]}
          >
            
          
          <View style={styles.stationDetail} onLayout={e => setSheetH(e.nativeEvent.layout.height)}>
            <ToggleStation selectedStation={selectedStation} isHoliday={isHoliday}/>
            <View style={ styles.stationDetailCloseButton }>
              <TouchableOpacity onPress={() => toggleSheet(null)} style={[styles.buttons, { backgroundColor: '#333', width: 60, height: 30, justifyContent: 'center' }]}>
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
            </View>

          </View>
          </Shadow>
        </Animated.View>

        <Animated.View style={{position: 'absolute', left: 0, bottom: -45, transform: [{ translateY: tableOffsetY }]}}>
        <Shadow
        startColor={isTableOpened.current ? "#00000030" :"#00000000"}
        endColor={"#00000000"}
        distance={35}
        offset={[0,0]}
        >
          
          <View style={styles.table} onLayout={e => setTableH(e.nativeEvent.layout.height)}>
                        <ToggleTable selectedStation={selectedStation} selectedRoute={selectedRoute} isHoliday={isHoliday}/>
            <View style={ styles.tableCloseButton }>
              <TouchableOpacity onPress={() => toggleTable(null, routeTMC)} style={[styles.buttons, { backgroundColor: '#333', width: 60, height: 30, justifyContent: 'center' }]}>
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
            </View>

          </View>
          </Shadow>
        </Animated.View>

      </View>
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
    top: 40,
  },


  buttons: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#343434'
  },
  clockBox: {
    width: 205,
    height: 70,  
    borderRadius: 10,
    backgroundColor: '#1e1e1e1a',
  },
  clock: {
    marginLeft: 10,
    width: '40%',
    display: 'flex',
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },

  clockTime: {
    lineHeight: 17,
    color: '#fff',  
    fontSize: 17,
    fontWeight: '600',
  },
  clockDate: {
    margin: 0, padding: 0,
    color: '#fff',  
    fontSize: 11,
    fontWeight: '300',
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
    padding: 0,
    width: VIEW_W,
    height: VIEW_H / 3,
    backgroundColor: '#ffffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // iOS shadow
    // shadowColor: '#000000ff',
    // shadowOffset: { width: 20, height: 20 },
    // shadowOpacity: 1,
    // shadowRadius: 20,
    // Android shadow
    // elevation: 30,
  },
  stationDetailCloseButton: {
    top: 10, right:10,
    position: 'absolute',
    borderRadius: 10,
    padding: 6
  },
    table: {
    padding: 0,
    width: VIEW_W,
    height: VIEW_H - 75,
    backgroundColor: '#ffffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // iOS shadow
    // shadowColor: '#000000ff',
    // shadowOffset: { width: 20, height: 20 },
    // shadowOpacity: 1,
    // shadowRadius: 20,
    // Android shadow
    // elevation: 30,
  },
  tableCloseButton: {
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