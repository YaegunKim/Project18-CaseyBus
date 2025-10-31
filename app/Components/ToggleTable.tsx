import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import routes_data from '../../assets/data/routes_data.json';
import { Stop } from "../shared/types/routes";
import ButtonIsHoliday from './Buttons/buttonIsHoliday';



const [routeTMC, routeH221, routeHovey] = routes_data.routes;


export default function ToggleTable({selectedStation, isHoliday}: {selectedStation: Stop | null; isHoliday: boolean;}) {

    const [isHolidayLocal, setIsHolidayLocal] = useState<boolean>(isHoliday);
    const selectedRoute = selectedStation ?
    routeTMC.stops.some(s => s.name === selectedStation.name) ? routeTMC :
    routeH221.stops.some(s => s.name === selectedStation.name) ? routeH221 :
    routeHovey.stops.some(s => s.name === selectedStation.name) ? routeHovey :
     null : null;

    const scheduleList = selectedRoute? isHolidayLocal ? selectedRoute.schedule_holidays :
    selectedRoute.schedule_weekdays : [];

    return (
        <View>
            <Text style={styles.title}>{selectedRoute ? selectedRoute.name : ''}</Text>
            <ButtonIsHoliday checked={isHolidayLocal} onChange={setIsHolidayLocal} style={{ width: 130, marginBottom: 10 }}/>
            <ScrollView style={{ maxHeight: 600 }}>
            {selectedStation?.revisit ?
            scheduleList.map((time, idx) => {
                const nonRevistStop = selectedRoute?.stops.find(s => s.name === selectedStation.name && !s.revisit);
                const label_first = scheduleList[idx];
                const label_second = scheduleList[idx];
                return <View key={idx} style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                        <Text style={styles.timeBlock}>{label_first}</Text>
                        <Text style={styles.timeBlock}>{label_second}</Text>
                    </View>
                      
            }) :
            scheduleList.map((time, idx) => {
                const parts = time.split(',');
                
                return <View key={idx} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <Text>{parts[0]}</Text>
                </View>;
            })
            }
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },

    timeBlock: {
        margin: 0,
        padding: 0,
        height: 50,
        lineHeight: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: '#2d2d2dff',
        borderWidth: 1,
        borderRadius: 3,
        width: '50%',
        fontWeight: '500',
    },
});