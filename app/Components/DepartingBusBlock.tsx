import React, { useEffect, useState } from "react";
import { Circle, G, Polyline, Text as SvgText } from "react-native-svg";
import routes_data from '../../assets/data/routes_data.json';
import { getNextBusTime } from "../shared/busTrackUtils";
import { Route } from "../shared/types/routes";


const [routeTMC, routeH221, routeHovey] = routes_data.routes;





export default function DepartingBusBlock({
    route
}: { route: Route }) {

    const Points = route == routeTMC ? "-120,460 0,460 0,500 -120,500 -120,460" :
                   route == routeH221 ? "-120,540 0,540 0,580 -120,580 -120,540" :
                   "-120,620 0,620 0,660 -120,660 -120,620";

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
        return getNextBusTime(route.schedule_weekdays, new Date())[1];
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
         <Circle cx={-100} cy={Cy} r={18} fill={Color} />
         <SvgText
            fill="#fff"
            x={-100} y={Cy+2}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={10}
            fontWeight="500">
        {route.name}
        </SvgText>
        <SvgText
            x={-75} y={Cy+4}
            fontSize={10}
            fontWeight="500">
        Next: {nextBus ? nextBus : 'No more today'}
        </SvgText>
    </G>
    )
}