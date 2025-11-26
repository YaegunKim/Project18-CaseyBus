import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

import { FontAwesome6 } from '@expo/vector-icons';
import holidaysData from '../../assets/data/holidays_data.json';

type MarkedItem = {
  customStyles: {
    container?: any;
    text?: any;
  };
  eventNames: string[];
  meta: { US: boolean; KATUSA: boolean };
};

type MarkedDates = Record<string, MarkedItem>;


export default function Calendar() {
  const [marked, setMarked] = useState<MarkedDates>({});
  const [selectedEvent, setSelectedEvent] = useState<string[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const marks: any = {};

    const year = new Date().getFullYear();
    const start = new Date(year, 0, 1);
    const end = new Date(year+3, 11, 31);


        holidaysData.holidays.forEach((holiday) => {
      const { Year, Month, Date, name, US, KATUSA } = holiday;
      const key = `${Year}-${String(Month).padStart(2, '0')}-${String(Date).padStart(2, '0')}`;

      const prev = marks[key] as MarkedItem | null;

      // 누적 플래그(OR)
      const us = (prev&&prev.meta? prev.meta.US? true : US : US);
      const katusa = (prev&&prev.meta? prev.meta.KATUSA? true : KATUSA : KATUSA);

      // 색 계산
      const bg =
        us && katusa ? '#f1e2fdff' :
        us ? '#fdf6ddff' :
        katusa ? '#d9ecdcff' :
        'transparent';

      const fg =
        us && katusa ? '#770095ff' :
        us ? '#ffc400ff' :
        katusa ? '#00570cff' :
        'black';

      marks[key] = {
        customStyles: {
          container: { backgroundColor: bg, borderRadius: 5 },
          text: { color: fg },
        },
        eventNames: prev&&prev.eventNames ? [...prev.eventNames, name] : [name],
        meta: { US: us, KATUSA: katusa },
      };
    });

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const weekday = d.getDay();

      const prev = marks[key] as MarkedItem | null;
      
        if (weekday === 0) {
          // 일요일
          marks[key] = {
            customStyles: {
              container: {
                backgroundColor: '#feebebff',
                borderRadius: 8,
              },
              text: { color: '#c62828' },
            },
            eventNames: prev&&prev.eventNames ? prev.eventNames : null,
          };
        } else if (weekday === 6) {
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


    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const prev = marks[today] as MarkedItem | null;

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
          color: 'white',              
          fontWeight: '400',
        },
      },

      eventNames: prev&&prev.eventNames ? [...prev.eventNames, 'Today'] : ['Today'],
    };




    

    setMarked(marks);
  }, []);

  return (
    <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <FontAwesome6 name="calendar" size={26} style={{ color: '#fff' }} />
          </View>
          <Text style={styles.title}>USFK Calendar</Text>
          <Text style={styles.subtitle}>Unified schedule & holiday guide</Text>
        </View>


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

        style={styles.calendar}
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
            setSelectedEvent(info.eventNames);
          } else {
            setSelectedEvent(null);
          }
        }}
        
      />

      {selectedEvent && (
                   
        <View style={styles.eventBox}>
          <Text style={styles.eventDate}>{selectedDate}</Text>
          <Text style={styles.eventButton}>EVENT</Text>
          <View style={styles.eventText}>
             {selectedEvent.map((event, idx) => (
               <Text key={idx} style={styles.eventText}>• {event}</Text>
             ))}
          </View>
        </View>
      )}

    <Text style={styles.footer}>
              © {new Date().getFullYear()} CaseyBus · Built with respect for the Camp Casey community.
            </Text>
      
    </View>
  );
}

const CARD_BG = "#fff";
const TEXT = "rgba(56, 56, 56, 1)";
const MUTED = "#919191ff";
const LIGHT_BLUE = "#338AE0";
const LIGHT_GRAY = "#0000002f";


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f7f6',
    paddingTop: 50,
    paddingBottom: 30,
    flex: 1
  },
    header: { alignItems: "center", marginTop: 8, marginBottom: 18 },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LIGHT_BLUE,
  },
  title: { marginTop: 10, fontSize: 20, fontWeight: "700", color: TEXT, letterSpacing: 0.5 },
  subtitle: { marginTop: 4, fontSize: 12, color: MUTED },




  calendar: {
    marginHorizontal: 20,
    borderRadius: 16,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
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
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    backgroundColor: CARD_BG,
  },
  eventDate: {
    position: 'absolute',
    top: 10, right: 15,
    fontSize: 15,
    fontWeight: '500',
    color: TEXT
  },
  eventButton: {
    fontSize: 10,
    marginLeft: 20,
    marginVertical: 12,
    width: 50,
    height: 20,
    backgroundColor: LIGHT_BLUE,
    textAlign: 'center',
    lineHeight: 20,
    borderRadius: 8,
    color: '#fff',

  },
  eventText: {
    marginHorizontal: 10,
    fontSize: 13,
    marginBottom: 10,
  },

  footer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    textAlign: "center",
    fontSize: 11.5,
    color: MUTED,
    opacity: 0.9,
  },

});
