import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import routes_data from '../../assets/data/routes_data.json';
import { addMinutesToTimes, getNextBusTime } from '../shared/busTrackUtils';
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



export default function ToggleTable({ selectedStation, selectedRoute, isHoliday }: Props) {
  const [isHolidayLocal, setIsHolidayLocal] = useState<boolean>(isHoliday);
  const scrollRef = useRef<ScrollView>(null); // 👈 스크롤뷰 참조

  
  const nonRevisitStop = useMemo(
    () => selectedRoute?.stops.find(s => s.name === selectedStation?.name && !s.revisit),
    [selectedRoute, selectedStation]
  );
  const revisitStop = useMemo(
    () => selectedRoute?.stops.find(s => s.name === selectedStation?.name && s.revisit),
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
    () => (revisitStop?.durationFromStart ? Math.round(revisitStop.durationFromStart / 60) : 0),
    [revisitStop]
  );

  // 파생 스케줄
  const scheduleListOutbound = useMemo(() => {
    if (!(selectedStation?.revisit && nonRevisitStop)) return null;
    return addMinutesToTimes(baseSchedule, outboundOffsetMin);
  }, [baseSchedule, selectedStation, nonRevisitStop, outboundOffsetMin]);

  const scheduleListInbound = useMemo(() => {
    if (!(selectedStation?.revisit && revisitStop)) return null;
    return addMinutesToTimes(baseSchedule, inboundOffsetMin);
  }, [baseSchedule, selectedStation, revisitStop, inboundOffsetMin]);

  const singleSchedule = useMemo(() => {
    if (selectedStation?.revisit) return null;
    // 단방향(리비짓 아님)일 때: 해당 정류장의 offset만 적용
    return addMinutesToTimes(baseSchedule, inboundOffsetMin);
  }, [baseSchedule, inboundOffsetMin, selectedStation]);

  const [tick, setTick] = useState(0);
    useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000); // 1초마다
    return () => clearInterval(id);
    }, []);
  
  const now = React.useMemo(() => new Date(), [tick]);


  const nextBusTimeOutbound = useMemo(() => {
    return scheduleListOutbound ? getNextBusTime(scheduleListOutbound, now, 0)[1] : null;
  }, [tick, scheduleListOutbound, now]);
  const nextBusTimeInbound = useMemo(() => {
    return scheduleListInbound ? getNextBusTime(scheduleListInbound, now, 0)[1] : null;
  }, [tick, scheduleListInbound, now]);
  const nextBusTimeSingleSchedule = useMemo(() => {
    return singleSchedule ? getNextBusTime(singleSchedule, now, 0)[1] : null;
  }, [tick, singleSchedule, now]);


    // 🧭 스크롤 위치 자동 이동
  useEffect(() => {
    const scrollToNext = (scheduleList: string[] | null, target: string | null) => {
      if (!scheduleList || !target) return;
      const idx = scheduleList.findIndex(time => time === target);
      if (idx >= 0 && scrollRef.current) {
        const itemHeight = 50; // styles.timeBlock.height
        const scrollY = itemHeight * idx - 300; // 가운데쯤 오게 조정
        scrollRef.current.scrollTo({ y: Math.max(scrollY, 0), animated: true });
      }
    };

    if (selectedStation?.revisit) {
      scrollToNext(scheduleListOutbound, nextBusTimeOutbound);
    } else {
      scrollToNext(singleSchedule, nextBusTimeSingleSchedule);
    }
  }, [nextBusTimeOutbound, nextBusTimeSingleSchedule, selectedStation]);

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

      <ScrollView ref={scrollRef} style={{ maxHeight: 600 }}>
        {selectedStation?.revisit && scheduleListOutbound && scheduleListInbound ? (
          
          (scheduleListOutbound.length > scheduleListInbound.length
            ? scheduleListInbound
            : scheduleListOutbound
          ).map((_, idx) => {
            const labelFirst  = scheduleListOutbound?.[idx] ?? '';
            const labelSecond = scheduleListInbound?.[idx] ?? '';
            return (
              <View key={idx} style={styles.timeBlock}>
                <Text style={[styles.time, {backgroundColor: (labelFirst === nextBusTimeOutbound)? '#eeeeeeff' : 'transparent'}]}>{labelFirst}</Text>
                <Text style={[styles.time, {backgroundColor: (labelSecond === nextBusTimeInbound)? '#eeeeeeff' : 'transparent'}]}>{labelSecond}</Text>
              </View>
            );
          })
        ) : (
          // 단방향(리비짓 아님)
          singleSchedule?.map((time, idx) => (
            <View key={idx} style={[styles.timeBlock, {backgroundColor: (time === nextBusTimeSingleSchedule)? '#eeeeeeff' : 'transparent'}]}>
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
