import { useEffect, useState } from 'react';
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
    const marks: any = {};

  


    const year = new Date().getFullYear();
    const start = new Date(year, 0, 1);
    const end = new Date(year+3, 11, 31);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split('T')[0];
      const weekday = d.getDay(); // 0 = Sunday, 6 = Saturday

      
        if (weekday === 1) {
          // 일요일
          marks[key] = {
            customStyles: {
              container: {
                backgroundColor: '#ffdddd',
                borderRadius: 8,
              },
              text: { color: '#c62828', fontWeight: '600' },
            },
          };
        } else if (weekday === 0) {
          // 토요일
          marks[key] = {
            customStyles: {
              container: {
                backgroundColor: '#d0ebff',
                borderRadius: 8,
              },
              text: { color: '#1565c0', fontWeight: '600' },
            },
          };
        }
      
    }


    const today = new Date().toISOString().split("T")[0];

    marks[today] = {
      customStyles: {
        container: {
          backgroundColor: '#2f2d2dff',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        },
        text: {
          color: 'white',               // 흰색 글씨
          fontWeight: '400',
        },
      },

      eventName: 'Today',
    };


    holidaysData.holidays.forEach((holiday) => {
      const { Year, Month, Date, name, US, KATUSA } = holiday;

      const key = `${Year}-${String(Month).padStart(2, '0')}-${String(Date).padStart(2, '0')}`;

    //   marks[key] = {
    //     marked: true,
    //     dotColor: "red",
    //     eventName: name,
    //   };
      if(!marks[key]){
        marks[key] = {
            customStyles: {
            container: {
                backgroundColor: US && KATUSA ? '#e8cbffff' : US? '#ffedb3ff' : KATUSA? '#b0d9b5ff' : 'trasparant',
                borderRadius: 5,
            },
            text: {
                color: US && KATUSA ? '#770095ff' : US? '#ffc400ff' : KATUSA? '#00570cff' : 'black',
                fontWeight: US || KATUSA ? '600' : '250'
            },
            },
            eventName: name,
        };
      }else{
        marks[key] = {...marks[key], eventName: name}
      }
    });

    

    setMarked(marks);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Camp Casey Event Calendar</Text> */}

      <View style={styles.colorIndexBox}>
        <View style={styles.colorIndex}>
            <Text style={styles.colorIndexText}>US/KATUSA</Text>
            <Text style={[styles.colorSquare, {backgroundColor: '#e8cbffff', color:'#770095ff'}]}>1</Text>
        </View>
        <View style={styles.colorIndex}>
            <Text style={styles.colorIndexText}>US Only</Text>
            <Text style={[styles.colorSquare, {backgroundColor: '#ffedb3ff', color:'#ffc400ff'}]}>1</Text>
        </View>
        <View style={styles.colorIndex}>
            <Text style={styles.colorIndexText}>KATUSA Only</Text>
            <Text style={[styles.colorSquare, {backgroundColor: '#b0d9b5ff', color:'#00570cff'}]}>1</Text>
        </View>
      </View>
      <RNCalendar
        markingType="custom"
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


  colorIndexBox: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row'
  },

  colorIndex: {
    marginLeft: 4,
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorIndexText: {
    fontSize: 8,
  },

  colorSquare: {
    width: 18,
    height: 18,
    borderRadius: 4,
    marginLeft: 4,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 18,
    fontWeight: 600
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
