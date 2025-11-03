import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

import holidaysData from '../../assets/data/holidays_data.json';

type MarkedDate = {
  marked: boolean;
  dotColor: string;
  eventName: string;
};

type MarkedDates = {
  [date: string]: MarkedDate;
};

export default function Calendar() {
  const [marked, setMarked] = useState<MarkedDates>({});
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  useEffect(() => {
    const marks: MarkedDates = {};

    holidaysData.holidays.forEach((holiday) => {
      const { Year, Month, Date, name } = holiday;

      const key = `${Year}-${String(Month).padStart(2, '0')}-${String(Date).padStart(2, '0')}`;

      marks[key] = {
        marked: true,
        dotColor: "red",
        eventName: name,
      };
    });

    setMarked(marks);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camp Casey Event Calendar</Text>

      <RNCalendar
        markingType="dot"
        markedDates={marked}
        onDayPress={(day) => {
          const info = marked[day.dateString];
          if (info) {
            setSelectedEvent(info.eventName);
          } else {
            setSelectedEvent(null);
          }
        }}
        theme={{
          todayTextColor: "#d62828",
          textMonthFontWeight: "700",
        }}
      />

      {selectedEvent && (
        <View style={styles.eventBox}>
          <Text style={styles.eventText}>{selectedEvent}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  eventBox: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#ececec",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  eventText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
