import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

import { Shadow } from 'react-native-shadow-2';
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
                backgroundColor: '#feebebff',
                borderRadius: 8,
              },
              text: { color: '#c62828' },
            },
          };
        } else if (weekday === 0) {
          // 토요일
          marks[key] = {
            customStyles: {
              container: {
                backgroundColor: '#e7f4feff',
                borderRadius: 8,
              },
              text: { color: '#1565c0' },
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
                backgroundColor: US && KATUSA ? '#f1e2fdff' : US? '#fdf6ddff' : KATUSA? '#d9ecdcff' : 'transparent',
                borderRadius: 5,
            },
            text: {
                color: US && KATUSA ? '#770095ff' : US? '#ffc400ff' : KATUSA? '#00570cff' : 'black',
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
            <Text style={[styles.colorSquare, {backgroundColor: '#f1e2fdff', color:'#770095ff'}]}>1</Text>
        </View>
        <View style={styles.colorIndex}>
            <Text style={styles.colorIndexText}>US Only</Text>
            <Text style={[styles.colorSquare, {backgroundColor: '#fdf6ddff', color:'#ffc400ff'}]}>1</Text>
        </View>
        <View style={styles.colorIndex}>
            <Text style={styles.colorIndexText}>KATUSA Only</Text>
            <Text style={[styles.colorSquare, {backgroundColor: '#d9ecdcff', color:'#00570cff'}]}>1</Text>
        </View>
      </View>
      <RNCalendar

        
        markingType="custom"
        markedDates={marked}
        onDayPress={(day) => {
          const info = marked[day.dateString];
          
          const date = new Date(day.dateString).toLocaleDateString("en-US", {
            month: "short",  // "Nov"
            day: "numeric",  // 24
            year: "numeric", // 2025
            });
          setSelectedDate(date);
          if (info) {
            setSelectedEvent(info.eventName);
          } else {
            setSelectedEvent(null);
          }
        }}
        
      />

      {selectedEvent && (
        
            
        <View style={styles.eventBox}>
        <Shadow
        style={[styles.eventBox, {marginTop: 5}]}
        startColor={"#0000000d"}
          endColor={"#00000000"}
          distance={25}
          >
          <Text style={styles.eventDate}>{selectedDate}</Text>
          <Text style={styles.eventButton}>EVENT</Text>
          <Text style={styles.eventText}>{selectedEvent}</Text>
        
        </Shadow>
        </View>
      )}

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff'
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
  },







  eventBox: {
    width: '100%',
    height: 500,
    marginTop: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: "#ffffffff",
  },
  eventDate: {
    padding: 10,
    fontSize: 20,
    fontWeight: '500',
  },
  eventButton: {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5,
    width: 50,
    height: 25,
    backgroundColor: '#0a7342ff',
    textAlign: 'center',
    lineHeight: 25,
    borderRadius: 8,
    color: '#fff',

  },
  eventText: {
    marginLeft: 10,
    fontSize: 18,
  },

});
