import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G, Line, Polyline } from 'react-native-svg';
import { NativeTouchEvent } from 'react-native/types_generated/index';


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

export default function PannableMap() {
  const [vx, setVx] = useState(0); // viewBox x 좌단
  const [vy, setVy] = useState(0); // viewBox y 상단
  const vxRef = useRef(0);
  const vyRef = useRef(0);
  const startRefPan = useRef({ vx: 0, vy: 0 });
  
  const scale = useRef(new Animated.Value(1)).current;
  // useEffect(() => {scale.setValue(scale);}, [scale]);

  const initialDistance = useRef<number>();


  //렌더가 시작했을 때, vx,vy가 각각 바꼈으면 ref 업데이트
  useEffect(() => { vxRef.current = vx; }, [vx]);
  useEffect(() => { vyRef.current = vy; }, [vy]);
  

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startRefPan.current = { vx: vxRef.current, vy: vyRef.current };
      },
      onPanResponderMove: (_e, g) => {
        if(g.numberActiveTouches == 1){
        // const nextX = clamp(startRefPan.current.vx - g.dx, 0, DOC_W - VIEW_W);
        // const nextY = clamp(startRefPan.current.vy - g.dy, 0, DOC_H - VIEW_H);
          const nextX = startRefPan.current.vx - g.dx;
          const nextY = startRefPan.current.vy - g.dy;
          setVx(nextX);
          setVy(nextY);
        }else if(g.numberActiveTouches == 2){
          if(initialDistance.current){
            scale.setValue(getDistance(_e.nativeEvent.touches)/initialDistance.current);

          }else{
            initialDistance.current = getDistance(_e.nativeEvent.touches);
          }
          
          console.log("initialDistance: "+initialDistance.current);
          // console.log("scale: "+scale.current);
          // console.log(_e.nativeEvent);
          // console.log(typeof(_e.nativeEvent));

        }
        

      },
      onPanResponderRelease: () => {
        // initialDistance.current = 0;
      }
    })
  ).current;

  return (
    <>
      <Animated.View style={[styles.box, {transform: [{scale}]}]} {...pan.panHandlers}>
        <Svg width={VIEW_W} height={VIEW_H} viewBox={`${vx} ${vy} ${VIEW_W} ${VIEW_H}`}>
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
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.refreshButton} onPress={() => {setVx(0);setVy(200)} } >
          <FontAwesome6 name="arrow-rotate-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    display: 'flex',
  },
  refreshButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1e1e1eff'
  },
  box: { width: VIEW_W, height: VIEW_H,
    backgroundColor: '#fff',
   },

});