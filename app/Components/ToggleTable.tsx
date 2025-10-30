import { View } from 'react-native';
import routes_data from '../../assets/data/routes_data.json';
import { Stop } from "../shared/types/routes";



const [routeTMC, routeH221, routeHovey] = routes_data.routes;


export default function ToggleTable({selectedStation}: {selectedStation: Stop | null;}) {
    const scheduleList = selectedStation ?
    routeTMC.stops.some(s => s.name === selectedStation.name) ? routeTMC.schedule_weekdays :
    routeH221.stops.some(s => s.name === selectedStation.name) ? routeH221.schedule_weekdays :
    routeHovey.stops.some(s => s.name === selectedStation.name) ? routeHovey.schedule_weekdays :
     [] : [];
    return (
        <View>{scheduleList.join(', ')}</View>
    );
}