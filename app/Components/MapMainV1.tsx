import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Svg, { Circle, G, Line, Polyline, Text } from 'react-native-svg';
import routes_data from '../../assets/data/routes_data.json';
import { trackBus } from '../shared/busTrackUtils';
import { Stop } from '../shared/types/routes';

const VIEW_W = Dimensions.get('window').width;
const VIEW_H = Dimensions.get('window').height;
const [routeTMC, routeH221, routeHovey] = routes_data.routes;






export default function MapMain() {

  const [highlightedRoute, setHighlightedRoute] = useState('');

  function highlightRoutes() {
    if(highlightedRoute == 'TMC') {routeTMC.highlighted = true;
    }else{routeTMC.highlighted = false;}
    if(highlightedRoute == 'H221') {routeH221.highlighted = true;
    }else{routeH221.highlighted = false;}
    if(highlightedRoute == 'Hovey') {routeHovey.highlighted = true;
    }else{routeHovey.highlighted = false;}
  }
  highlightRoutes();


  // Pan을 위한 state/ref
  const [vx, setVx] = useState(0); // viewBox x 좌단
  const [vy, setVy] = useState(200); // viewBox y 상단
  const [vw, setVw] = useState(VIEW_W); // viewBox width
  const [vh, setVh] = useState(VIEW_H); // viewBox height
  const vxRef = useRef(0);
  const vyRef = useRef(0);
  const vwRef = useRef(0);
  const vhRef = useRef(0);
  const startRef = useRef({ vx: 0, vy: 0, vw: VIEW_W, vh: VIEW_H});
  const tapStartRef = useRef({ t: 0 });
  

  //렌더가 시작했을 때, vx,vy가 각각 바꼈으면 ref 업데이트
  useEffect(() => { vxRef.current = vx; }, [vx]);
  useEffect(() => { vyRef.current = vy; }, [vy]);
  useEffect(() => { vwRef.current = vw; }, [vw]);
  useEffect(() => { vhRef.current = vh; }, [vh]);
 

  
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_e, g) => {
        startRef.current = { vx: vxRef.current, vy: vyRef.current, vw:vwRef.current, vh:vhRef.current };
        tapStartRef.current = { t:Date.now() };
      },
      onPanResponderMove: (_e, g) => {
          const currentScale = vwRef.current/VIEW_W;
          const nextX = startRef.current.vx - g.dx*currentScale;
          const nextY = startRef.current.vy - g.dy*currentScale;
          setVx(nextX);
          setVy(nextY);
      },
      onPanResponderRelease: () => {
        if (Date.now() - tapStartRef.current.t < 100) {
          toggleSheet('');


          const newTime =  new Date("2025-09-22 "+"05:00");
          
          console.log("newTime: " + newTime);
          console.log("TMC: " + trackBus());
        
        }
      }
    })
  ).current;

  //stationDetail window
  const stationDetail_H = VIEW_H / 4;
  const stationDetail_offsetY = useRef(new Animated.Value(stationDetail_H)).current;
  const isStationDetailOpened = useRef(false);

  //station pin
  const pinTMC = false;
  const pinH221 = false;
  const pinHovey = false;


  const toggleSheet = React.useCallback((nextHighlight: '' | 'TMC' | 'H221' | 'Hovey') => {
    const openWindow = ['TMC', 'H221', 'Hovey'].includes(nextHighlight);
    setHighlightedRoute(nextHighlight);
    isStationDetailOpened.current = openWindow;

    Animated.spring(stationDetail_offsetY, {
      toValue: openWindow ? 0 : stationDetail_H,
      useNativeDriver: true,
      damping: 100,
      stiffness: 180,
      mass: 0.8,
    }).start(() => {
    });
  }, [stationDetail_offsetY, stationDetail_H]);
  



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
                      <>
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
                                onPress={() => {toggleSheet("Hovey")}}/>
                      </>

                    ) // return
                  })}
                  {routeH221.stops.map((station:Stop, index) => {
                    return(
                      <>
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
                                onPress={() => {toggleSheet("H221")}}/>
                      </>

                      ) // return
                  })}
                  
                  {routeTMC.stops.map((station, index) => {
                    return(
                      <>
                        <Circle cx={station.x}  cy={station.y}
                                r={station.intersaction3? 3 : 1.5}
                                fill={station.intersaction3? (routeH221.highlighted || routeHovey.highlighted? "#0345fc50" : "#0345fc") : "white"}
                                />
                        <Circle cx={station.x}  cy={station.y}
                                r={20}
                                fill='black'
                                opacity={0}
                                onPress={() => {toggleSheet("TMC")}}/>
                      </>
                    ) // return
                  })}




                  {routeTMC.stops.map((station, index) => {
                    if(station.revisit) return null;
                    if(station.intersaction3 && (routeH221.highlighted || routeHovey.highlighted)) return null;
                    return (
                      <Text 
                      x={station.x + 10} y={station.y}
                      fontSize={8}
                      fontWeight={routeTMC.highlighted? 600 : routeH221.highlighted || routeHovey.highlighted? 200 : 400}
                      transform={`rotate(-40, ${station.x}, ${station.y})`}>
                        {station.name}
                    </Text>
                    ) 
                  })}

                  {/* text */}
                  {routeH221.stops.map((station:Stop, index) => {
                    if(station.revisit) return null;
                    if(station.intersaction3 && !routeH221.highlighted) return null;
                    if(station.intersaction2 && routeHovey.highlighted) return null;
                    return (
                      <Text 
                      x={station.x + 10} y={station.y}
                      fontSize={8}
                      fontWeight={routeH221.highlighted? 600 : routeTMC.highlighted || routeHovey.highlighted? 200 : 400}
                      transform={`rotate(-40, ${routeH221.highlighted && station.intersaction3? station.x+5 : station.x}, ${routeH221.highlighted && station.intersaction3 ? station.y-5 : station.y})`}>
                        {station.name}
                    </Text>
                    ) 
                  })}

                  {routeHovey.stops.map((station:Stop, index) => {
                    if(station.revisit) return null;
                    if(station.intersaction3 && !routeHovey.highlighted) return null;
                    if(station.intersaction2 && !routeHovey.highlighted) return null;
                    return (
                      <Text 
                      x={station.x + 10} y={station.y}
                      fontSize={8}
                      fontWeight={routeHovey.highlighted? 600 : routeTMC.highlighted || routeH221.highlighted? 200 : 400}
                      transform={`rotate(-40, ${routeHovey.highlighted && (station.intersaction3 || station.intersaction2)? station.x+5 : station.x}, ${routeHovey.highlighted && (station.intersaction3 || station.intersaction2) ? station.y-5 : station.y})`}>
                        {station.name}
                    </Text>
                    ) 
                  })}

            
          </Svg>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {transform: [{ translateY: Animated.add(stationDetail_offsetY, 380) }]}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVx(vx+0.1*vw);setVy(vy+0.1*vh);setVw(vw/1.25);setVh(vh/1.25);} } >
            <FontAwesome6 name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {transform: [{ translateY: Animated.add(stationDetail_offsetY, 425) }]}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVx(vx-0.125*vw);setVy(vy-0.125*vh);setVw(vw/0.8);setVh(vh/0.8)} } >
            <FontAwesome6 name="minus" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonBox, {transform: [{ translateY: Animated.add(stationDetail_offsetY, 470) }]}]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {setVx(0);setVy(200);setVw(VIEW_W);setVh(VIEW_H);} } >
            <FontAwesome6 name="arrow-rotate-right" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        {/* <View style={[styles.buttonBox, styles.openBox]}>
          <TouchableOpacity style={styles.buttons} onPress={() => {toggleSheet('')}} >
            <FontAwesome6 name="arrow-rotate-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View> */}
      </View>

        <Animated.View style={{position: 'absolute', left: 0, right: 0, bottom: 0, transform: [{ translateY: stationDetail_offsetY }]}}>
        <Shadow
        startColor={isStationDetailOpened.current ? "#00000030" :"#00000000"}
        endColor={"#00000000"}
        distance={35}
        offset={[0,-4]}
        >
          <View style={styles.stationDetail} />
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
  }

});