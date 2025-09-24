import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, NativeTouchEvent, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G, Line, Polyline } from 'react-native-svg';


const VIEW_W = Dimensions.get('window').width;
const VIEW_H = Dimensions.get('window').height;
const DOC_W  = 1000;
const DOC_H  = 1000;


function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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
  const [vx, setVx] = useState(0); // viewBox x 좌단
  const [vy, setVy] = useState(0); // viewBox y 상단
  const [vw, setVw] = useState(VIEW_W); // viewBox width
  const [vh, setVh] = useState(VIEW_H); // viewBox height
  const vxRef = useRef(0);
  const vyRef = useRef(0);
  const vwRef = useRef(0);
  const vhRef = useRef(0);
  const startRef = useRef({ vx: 0, vy: 0, vw: VIEW_W, vh: VIEW_H});
  let initialDistance = 0;
  let initialCenterPinchX = 0;
  let initialCenterPinchY = 0;

  
  


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
        initialDistance = 0;
        initialCenterPinchX = 0;
        initialCenterPinchX = 0;
      },
      onPanResponderMove: (_e, g) => {
        if(g.numberActiveTouches == 1){
          const currentScale = vwRef.current/VIEW_W;

          const nextX = startRef.current.vx - g.dx*currentScale;
          const nextY = startRef.current.vy - g.dy*currentScale;
          setVx(nextX);
          setVy(nextY);
        }else if(g.numberActiveTouches == 2){
          if (initialDistance !== 0) {

            // 이번 제스처에서의 배율
            const factor = getDistance(_e.nativeEvent.touches) / initialDistance;

            // 핀치의 x,y 중앙점 정보
            const cx = getCenterLocationX(_e.nativeEvent.touches);
            const cy = getCenterLocationY(_e.nativeEvent.touches);

            // 새 viewBox 크기
            let nextVw = startRef.current.vw / factor;
            let nextVh = startRef.current.vh / factor;
            setVw(nextVw);
            setVh(nextVh);


            // 핀치 중심의 "월드 좌표"를 유지
            let nextVx = startRef.current.vx + cx*(factor-1)/factor;
            let nextVy = startRef.current.vy + cy*(factor-1)/factor;
            

            setVx(nextVx);
            setVy(nextVy);
          } else {
            initialDistance = getDistance(_e.nativeEvent.touches);
            initialCenterPinchX = getCenterLocationX(_e.nativeEvent.touches);
            initialCenterPinchY = getCenterLocationY(_e.nativeEvent.touches);
          }

                    
        }
        

      },
    })
  ).current;

  return (
    <>
      <Animated.View style={styles.box} {...pan.panHandlers}>
        <Svg width={VIEW_W} height={VIEW_H} viewBox={`${vx} ${vy} ${vw} ${vh}`}>
                <G id="route-TMC">
                  <Polyline
                    fill="none"
                    stroke="#0345fc"
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
                    stroke="#009623"
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
                    stroke="#ff2a00"
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
                <G id="dots-TMC">
                  <Circle cx={50}  cy={550} r={3}   fill="#0345fc" />
                  <Circle cx={150} cy={550} r={3}   fill="#0345fc" />
                  <Circle cx={250} cy={550} r={3}   fill="#0345fc" />
                  <Circle cx={350} cy={550} r={3}   fill="#0345fc" />
                  <Circle cx={470} cy={400} r={1.5} fill="white" />
                  <Circle cx={370} cy={350} r={1.5} fill="white" />
                  <Circle cx={180} cy={350} r={1.5} fill="white" />
                  <Circle cx={80}  cy={400} r={1.5} fill="white" />
                  <Circle cx={240} cy={450} r={1.5} fill="white" />
                  <Circle cx={370} cy={450} r={1.5} fill="white" />
                </G>
          
                <G id="dots-h221">
                  <Circle cx={50}  cy={560} r={3}   fill="#009623" />
                  <Circle cx={150} cy={560} r={3}   fill="#009623" />
                  <Circle cx={250} cy={560} r={3}   fill="#009623" />
                  <Circle cx={350} cy={560} r={3}   fill="#009623" />
                  <Circle cx={520} cy={560} r={3}   fill="#009623" />
                  <Circle cx={620} cy={560} r={3}   fill="#009623" />
                  <Circle cx={720} cy={560} r={3}   fill="#009623" />
                  <Circle cx={944} cy={554} r={1.5} fill="white" />
                  <Circle cx={944} cy={466} r={1.5} fill="white" />
                  <Circle cx={856} cy={466} r={1.5} fill="white" />
                </G>
          
                <G id="dots-hovey">
                  <Circle cx={50}  cy={570} r={3}   fill="#ff2a00" />
                  <Circle cx={150} cy={570} r={3}   fill="#ff2a00" />
                  <Circle cx={250} cy={570} r={3}   fill="#ff2a00" />
                  <Circle cx={350} cy={570} r={3}   fill="#ff2a00" />
                  <Circle cx={520} cy={570} r={3}   fill="#ff2a00" />
                  <Circle cx={620} cy={570} r={3}   fill="#ff2a00" />
                  <Circle cx={720} cy={570} r={3}   fill="#ff2a00" />
          
                  <Circle cx={750} cy={640} r={1.5} fill="white" />
                  <Circle cx={750} cy={700} r={1.5} fill="white" />
                  <Circle cx={700} cy={770} r={1.5} fill="white" />
          
                  <Circle cx={570} cy={770} r={1.5} fill="white" />
                  <Circle cx={490} cy={770} r={1.5} fill="white" />
                  <Circle cx={410} cy={770} r={1.5} fill="white" />
                  <Circle cx={330} cy={770} r={1.5} fill="white" />
                  <Circle cx={250} cy={770} r={1.5} fill="white" />
                  <Circle cx={170} cy={770} r={1.5} fill="white" />
          
                  <Circle cx={80}  cy={720} r={1.5} fill="white" />
          
                  <Circle cx={285} cy={670} r={1.5} fill="white" />
                  <Circle cx={490} cy={670} r={1.5} fill="white" />
                </G>
          
        </Svg>
      </Animated.View>
      <View style={[styles.buttonBox, styles.zoomIn]}>
        <TouchableOpacity style={styles.buttons} onPress={() => {setVx(vx+0.1*vw);setVy(vy+0.1*vh);setVw(vw/1.25);setVh(vh/1.25);console.log(vx);} } >
          <FontAwesome6 name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonBox, styles.zoomOut]}>
        <TouchableOpacity style={styles.buttons} onPress={() => {setVx(vx-0.125*vw);setVy(vy-0.125*vh);setVw(vw/0.8);setVh(vh/0.8)} } >
          <FontAwesome6 name="minus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonBox, styles.refresh]}>
        <TouchableOpacity style={styles.buttons} onPress={() => {setVx(0);setVy(0);setVw(VIEW_W);setVh(VIEW_H);} } >
          <FontAwesome6 name="arrow-rotate-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.pinchCenter}>
        
        <FontAwesome6 name="arrow-rotate-right" size={20} color="#fff" />
        
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
    right: 16,
    display: 'flex',
  },
  zoomIn: {
    bottom: 114,
  },
  zoomOut: {
    bottom: 69,
  },
  refresh: {
    bottom: 24,
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

  }

});