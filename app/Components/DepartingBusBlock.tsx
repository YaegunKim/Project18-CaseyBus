import React, { useEffect, useState } from "react";
import { Circle, G, Polyline, Rect, Text as SvgText } from "react-native-svg";
import routes_data from '../../assets/data/routes_data.json';
import { getNextBusTime } from "../shared/busTrackUtils";
import { Route } from "../shared/types/routes";


const [routeTMC, routeH221, routeHovey] = routes_data.routes;





export default function DepartingBusBlock({
    route, onPress
}: { route: Route, onPress?: () => void; }) {

    const Points = route == routeTMC ? "-120,450 0,450 0,510 -120,510 -120,450" :
                   route == routeH221 ? "-120,530 0,530 0,590 -120,590 -120,530" :
                   "-120,610 0,610 0,670 -120,670 -120,610";

    const Cy = route == routeTMC ? 480 :
               route == routeH221 ? 560 :
               640;

    const Color = route == routeTMC ? "#0345fc" :
                  route == routeH221 ? "#009623" :
                  "#ff2a00";


    const [tick, setTick] = useState(0);
    useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000); // 1초마다
    return () => clearInterval(id);
    }, []);

      const nextBus = React.useMemo(() => {
        return getNextBusTime(route.schedule_weekdays, new Date(), 0);
      }, [tick]);
    
      
    return (
    <G id="next-station-H221">

        <Polyline
            fill="none"
            stroke= {Color}
            strokeWidth={15}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={1}
            points={Points}
            />
        <Polyline
            fill="#fff"
            stroke="#ffffffff"
            strokeWidth={11}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={1}
            points={Points}
        />
         <Circle cx={-125} cy={Cy} r={18} fill={Color} />
         <SvgText
            fill="#fff"
            x={-125} y={Cy+1}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={10}
            fontWeight="500">
        {route.name}
        </SvgText>
        <SvgText
            x={-100} y={Cy-20}
            fontSize={8}
            fontWeight="500">
        Next:
        </SvgText>
        <SvgText
            x={-100} y={Cy}
            fontSize={18}
            fontWeight="500">
        {nextBus ? nextBus[1] : 'No more today'}
        </SvgText>
        <SvgText
            x={-52} y={Cy-2}
            fontSize={8}
            fontWeight="500">
        ({nextBus ? nextBus[2] : 'No more today'})
        </SvgText>
        <Polyline
            stroke={Color}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={1}
            points={`-100,${Cy+8} -10,${Cy+8}`}
        />
        <SvgText
            x={-100} y={Cy+20}
            opacity={0.5}
            fontSize={8}
            fontWeight="500">
        Prev:
        </SvgText>
        <SvgText
            x={-80} y={Cy+22}
            opacity={0.5}
            fontSize={13}
            fontWeight="500">
        {nextBus ? nextBus[0] : 'No more today'}
        </SvgText>


    <Rect
        x={-126}
        y={Cy - 40}
        width={134}
        height={80}
        fill="transparent"
        onPress={onPress}
      />
    </G>
    )
}