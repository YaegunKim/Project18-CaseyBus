import { StyleSheet, Text, View } from "react-native";
import routes_data from '../../assets/data/routes_data.json';
import { Stop } from '../shared/types/routes';
import ButtonH221 from './Buttons/buttonH221';
import ButtonHovey from './Buttons/buttonHovey';
import ButtonTMC from './Buttons/buttonTMC';


const [routeTMC, routeH221, routeHovey] = routes_data.routes;

  function getStationHours(s: Stop | null) {
    if (!s) return null;
    return (s.openingHours || null);
  }


export default function ToggleStation({
  selectedStation,
  toggleSheet,
}: { selectedStation: Stop | null; toggleSheet: (station: Stop | null) => void; }) {
  return (
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
  );
}

const styles = StyleSheet.create({


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

});