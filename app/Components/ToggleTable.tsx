import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import routes_data from '../../assets/data/routes_data.json';
import { Route, Stop } from "../shared/types/routes";
import ButtonH221 from './Buttons/buttonH221';
import ButtonHovey from './Buttons/buttonHovey';
import ButtonIsHoliday from './Buttons/buttonIsHoliday';
import ButtonTMC from './Buttons/buttonTMC';



const [routeTMC, routeH221, routeHovey] = routes_data.routes;


export default function ToggleTable({selectedStation, selectedRoute, isHoliday}: {selectedStation: Stop | null; selectedRoute: Route; isHoliday: boolean;}) {

    const [isHolidayLocal, setIsHolidayLocal] = useState<boolean>(isHoliday);

    const scheduleList = selectedRoute? isHolidayLocal ? selectedRoute.schedule_holidays :
    selectedRoute.schedule_weekdays : [];

    return (
        <View>
            <View style={styles.titleBox}>
                <Text style={styles.title}> {selectedRoute ? selectedRoute.name : ''} Schedule</Text>
                <View style={styles.busButtonBox}>
                {selectedRoute && selectedRoute.name === "TMC"? <ButtonTMC/> :
                selectedRoute && selectedRoute.name === "H221"? <ButtonH221/> :
                selectedRoute && selectedRoute.name === "Hovey"? <ButtonHovey/> : null}  
                </View>
            </View>

            <ButtonIsHoliday checked={isHolidayLocal} onChange={setIsHolidayLocal} style={{ width: 130, marginLeft: 10, marginBottom: 10 }}/>
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
    titleBox: {
        height: 45,
        margin: 10,
        marginLeft: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        marginRight: 5,
    },

    busButtonBox: {
        flexDirection: 'row',
        alignItems: 'center',
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
        borderWidth: 0.2,
        borderRadius: 3,
        width: '50%',
        fontWeight: '500',
    },
});