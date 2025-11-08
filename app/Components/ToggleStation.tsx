import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import routes_data from '../../assets/data/routes_data.json';
import { getNextBusTime } from "../shared/busTrackUtils";
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
  selectedStation, isHoliday, onOpenTable
}: { selectedStation: Stop | null; isHoliday: boolean; onOpenTable: (station: Stop | null, route: any) => void; }) {
  const routeList = selectedStation  && selectedStation.intersaction3 ? [routeTMC, routeH221, routeHovey] :
                    selectedStation  && selectedStation.intersaction2 ? [routeH221, routeHovey] :
                    selectedStation  && routeTMC.stops.some(s => s.name === selectedStation.name) ? [routeTMC] :
                    selectedStation  && routeH221.stops.some(s => s.name === selectedStation.name) ? [routeH221] :
                    selectedStation  && routeHovey.stops.some(s => s.name === selectedStation.name) ? [routeHovey] :
                    [];

  const [tick, setTick] = useState(0);
  useEffect(() => {
  const id = setInterval(() => setTick(t => t + 1), 1000); // 1초마다
  return () => clearInterval(id);
  }, []);

  const now = React.useMemo(() => new Date(), [tick]);
  

  
  return (
    <View style={styles.stationDetailContent}>          
        <Text style={styles.stationTitle}>{selectedStation ? selectedStation.name : ''}</Text>
            <View style={styles.stationBusList}>
              {selectedStation?.revisit ? 
              <View style={[styles.busRow]}>
              <View style={[styles.busButtonBox, {width: 70}]}>
              </View>
                <View style={styles.busLabelBox}>
                  <Text style={[styles.busLabelText, {opacity: 0.5, fontSize:12}]}>Outbound</Text>
                  <Text style={[styles.busLabelText, {opacity: 0.5, fontSize:12}]}>Inbound</Text>
                </View>
                </View>

              :selectedStation?.description }
            </View>
        <ScrollView style={styles.upcomingBusBlockBox}>
        {selectedStation?.revisit?
        routeList.map((route, idx) => {
          const nonRevistStop = route.stops.find(s => s.name === selectedStation.name && !s.revisit);
          const label_first = getNextBusTime(isHoliday ? route.schedule_holidays: route.schedule_weekdays, now, nonRevistStop?.durationFromStart || 0);
          const label_second = getNextBusTime(isHoliday ? route.schedule_holidays: route.schedule_weekdays, now, selectedStation?.durationFromStart || 0);
            return <View key={idx} style={[styles.upcomingBusBlock]}>
              <View key={idx} style={styles.busRow}>
                <View style={styles.busButtonBox}>
                  {route === routeTMC ? (
                    <ButtonTMC />
                  ) : route === routeH221 ? (
                    <ButtonH221 />
                  ) : (
                    <ButtonHovey />
                  )}
                </View>

                <Pressable
                    style={styles.busLabelBox}
                    onPress={() => onOpenTable?.(selectedStation, route)} // ✅ 콜백 호출
                    hitSlop={6}
                  >
                  <Text style={styles.busLabelText}>{label_first[2]}</Text>
                  <Text style={styles.busLabelText}>{label_second[2]}</Text>
                </Pressable>
              </View>
            </View>
        }) : 
        routeList.map((route, idx) => {
          const label = getNextBusTime(isHoliday ? route.schedule_holidays: route.schedule_weekdays, now, selectedStation?.durationFromStart || 0);
            return <View key={idx} style={[styles.upcomingBusBlock]}>
              <View key={idx} style={styles.busRow}>
                <View style={styles.busButtonBox}>
                  {route === routeTMC ? (
                    <ButtonTMC />
                  ) : route === routeH221 ? (
                    <ButtonH221 />
                  ) : (
                    <ButtonHovey />
                  )}
                </View>

                <Pressable
                    style={styles.busLabelBox}
                    onPress={() => onOpenTable?.(selectedStation, route)} // ✅ 콜백 호출
                    hitSlop={6}
                  >
                  <Text >{label[2]}</Text>
                </Pressable>
              </View>
            </View>
        })}          
        </ScrollView>                 
    </View>
  );
}

const styles = StyleSheet.create({


  stationDetailContent: {
    padding: 16,
    flexGrow: 1,
    minHeight: 0,
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


  upcomingBusBlockBox: {
    marginTop: 12,
    maxHeight: 130,
  },
  upcomingBusBlock: {
    borderTopWidth: 1,
    borderTopColor: '#00000030',
    height: 50,
    marginTop: 3,
    justifyContent: 'center',
  },


  busRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busButtonBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  busLabelBox: {
    marginTop: 5,
    flex: 1,       
    flexDirection: 'row',       
    justifyContent: 'space-around',
    },
  busLabelText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222',
    textAlign: 'left',
  },
});