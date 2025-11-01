import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import routes_data from '../../assets/data/routes_data.json';
import { Route, Stop } from "../shared/types/routes";
import ButtonH221 from './Buttons/buttonH221';
import ButtonHovey from './Buttons/buttonHovey';
import ButtonIsHoliday from './Buttons/buttonIsHoliday';
import ButtonTMC from './Buttons/buttonTMC';

const [routeTMC, routeH221, routeHovey] = routes_data.routes;

type Props = {
  selectedStation: Stop | null;
  selectedRoute: Route;
  isHoliday: boolean;
};

function addMinutesToTimes(times: string[], offsetMin: number): string[] {
  return times.map((time) => {
    const [h, m] = time.split(':').map(Number);
    const total = h * 60 + m + (offsetMin || 0);
    const hh = ((Math.floor(total / 60) % 24) + 24) % 24; // 음수 방지
    const mm = ((total % 60) + 60) % 60;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  });
}

export default function ToggleTable({ selectedStation, selectedRoute, isHoliday }: Props) {
  const [isHolidayLocal, setIsHolidayLocal] = useState<boolean>(isHoliday);

  
  const nonRevisitStop = useMemo(
    () => selectedRoute?.stops.find(s => s.name === selectedStation?.name && !s.revisit),
    [selectedRoute, selectedStation]
  );

 
  const baseSchedule = useMemo(
    () => (isHolidayLocal ? selectedRoute.schedule_holidays : selectedRoute.schedule_weekdays),
    [isHolidayLocal, selectedRoute]
  );

  
  const outboundOffsetMin = useMemo(
    () => (nonRevisitStop?.durationFromStart ? Math.round(nonRevisitStop.durationFromStart / 60) : 0),
    [nonRevisitStop]
  );
  const inboundOffsetMin = useMemo(
    () => (selectedStation?.durationFromStart ? Math.round(selectedStation.durationFromStart / 60) : 0),
    [selectedStation]
  );

  // 파생 스케줄
  const scheduleListOutbound = useMemo(() => {
    if (!(selectedStation?.revisit && nonRevisitStop)) return null;
    return addMinutesToTimes(baseSchedule, outboundOffsetMin);
  }, [baseSchedule, selectedStation, nonRevisitStop, outboundOffsetMin]);

  const scheduleListInbound = useMemo(() => {
    if (!selectedStation?.revisit) return null;
    return addMinutesToTimes(baseSchedule, inboundOffsetMin);
  }, [baseSchedule, selectedStation, inboundOffsetMin]);

  const singleSchedule = useMemo(() => {
    if (selectedStation?.revisit) return null;
    // 단방향(리비짓 아님)일 때: 해당 정류장의 offset만 적용
    return addMinutesToTimes(baseSchedule, inboundOffsetMin);
  }, [baseSchedule, inboundOffsetMin, selectedStation]);

  return (
    <View>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{selectedRoute?.name} Schedule</Text>
        <View style={styles.busButtonBox}>
          {selectedRoute?.name === 'TMC' ? <ButtonTMC /> :
           selectedRoute?.name === 'H221' ? <ButtonH221 /> :
           selectedRoute?.name === 'Hovey' ? <ButtonHovey /> : null}
        </View>
      </View>

      <ButtonIsHoliday
        checked={isHolidayLocal}
        onChange={setIsHolidayLocal}
        style={{ width: 130, marginLeft: 10, marginBottom: 10 }}
      />

      
      {selectedStation?.revisit && (
        <View style={[styles.timeBlock, { justifyContent: 'space-between', width: '100%', backgroundColor: '#00000010' }]}>
          <Text style={styles.headerLabel}>Outbound</Text>
          <Text style={styles.headerLabel}>Inbound</Text>
        </View>
      )}

      <ScrollView style={{ maxHeight: 600 }}>
        {selectedStation?.revisit && scheduleListOutbound && scheduleListInbound ? (
          
          (scheduleListOutbound.length > scheduleListInbound.length
            ? scheduleListInbound
            : scheduleListOutbound
          ).map((_, idx) => {
            const labelFirst  = scheduleListOutbound?.[idx] ?? '';
            const labelSecond = scheduleListInbound?.[idx] ?? '';
            return (
              <View key={idx} style={styles.timeBlock}>
                <Text style={styles.time}>{labelFirst}</Text>
                <Text style={styles.time}>{labelSecond}</Text>
              </View>
            );
          })
        ) : (
          // 단방향(리비짓 아님)
          singleSchedule?.map((time, idx) => (
            <View key={idx} style={styles.timeBlock}>
              <Text style={[styles.time, { width: '100%' }]}>{time}</Text>
            </View>
          ))
        )}
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

  headerLabel: {
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },

  timeBlock: {
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#00000030',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  time: {
    lineHeight: 50,
    textAlign: 'center',
    width: '50%',
    fontWeight: '500',
  },
});
