import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const VIEW_H = Dimensions.get('window').height;



export default function Facilities() {
  const [InfoTime_DFAC, setInfoTime_DFAC] = useState<boolean>(false);
  const [InfoTime_KSB, setInfoTime_KSB] = useState<boolean>(false);
  const [InfoTime_BarberShop, setInfoTime_BarborShop] = useState<boolean>(false);
  const [InfoTime_GYM, setInfoTime_GYM] = useState<boolean>(false);
  const [InfoTime_CAC, setInfoTime_CAC] = useState<boolean>(false);
  const [InfoTime_USO, setInfoTime_USO] = useState<boolean>(false);
  const [InfoTime_Library, setInfoTime_Library] = useState<boolean>(false);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={[styles.InfoBox]} onPress={() => {setInfoTime_DFAC(!InfoTime_DFAC)}}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="burger" size={52} color="#e53935" style={styles.InfoLogo}/>
            <View style={styles.InfoText}>
              <Text style={styles.InfoTitle}>DFAC</Text>
              <Text style={styles.InfoDetail}>Main l Thunder l Argonne l Hovey</Text>
            </View>
        </View>
        </Shadow>
      </TouchableOpacity>
      {InfoTime_DFAC && (
      <View style={[styles.InfoBox, {backgroundColor: '#e6e6e6ff', height: 90, marginTop: 10}]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner, {backgroundColor: '#e6e6e6ff', height: 90}]}>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 5, left: 80, fontWeight: 400}]}>Weekdays</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 5, left: 210, fontWeight: 400}]}>Holidays</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 30, left: 37}]}>Breakfast : 0730~0900</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 47.5, left: 55}]}>Lunch : 1130~1300</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 65, left: 53}]}>Dinner : 1700~1830</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 37, left: 195}]}>Brunch : 0930~1300</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 55, left: 195}]}>Dinner : 1700~1830</Text>
        </View>
        </Shadow>
      </View>
      )}
      <TouchableOpacity style={[styles.InfoBox]} onPress={() => {setInfoTime_KSB(!InfoTime_KSB)}}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="bowl-rice" size={52} color="#ff7043" style={styles.InfoLogo}/>
            <View style={styles.InfoText}>
              <Text style={styles.InfoTitle}>KATUSA Snack Bar</Text>
              <Text style={styles.InfoDetail}>Canteen l Thunder l Shortie l Drangon Valley l Hovey</Text>
            </View>
        </View>
        </Shadow>
      </TouchableOpacity>
      {InfoTime_KSB && (
      <View style={[styles.InfoBox, {backgroundColor: '#e6e6e6ff', height: 120, marginTop: 10}]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner, {backgroundColor: '#e6e6e6ff', height: 120}]}>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 5, left: 132, fontWeight: 400}]}>Weekdays</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 5, left: 241, fontWeight: 400}]}>Holidays</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 30, left: 45, width: 300}]}>Canteen :            1100~1900                  Random</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 45, left: 45, width: 300}]}>Thunder :            1100~1900                  Random</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 60, left: 51, width: 300}]}>Shortie :            1100~1900                  Random</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 75, left: 10, width: 300}]}>Drangon Valley :            1100~1900                  Random</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 90, left: 56, width: 300}]}>Hovey :            1100~1900                  Random</Text>
        </View>
        </Shadow>
      </View>
      )}
      <TouchableOpacity style={[styles.InfoBox]} onPress={() => {setInfoTime_BarborShop(!InfoTime_BarberShop)}}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="scissors" size={52} color="#fbc02d" style={styles.InfoLogo}/>
            <View style={styles.InfoText}>
              <Text style={styles.InfoTitle}>Barber Shop</Text>
              <Text style={styles.InfoDetail}>Haircut & Grooming</Text>
            </View>
        </View>
        </Shadow>
      </TouchableOpacity>
      {InfoTime_BarberShop && (
      <View style={[styles.InfoBox, {backgroundColor: '#e6e6e6ff', height: 90, marginTop: 10}]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner, {backgroundColor: '#e6e6e6ff', height: 90}]}>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 15, left: 110, fontWeight: 500}]}>MON-FRI</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 35, left: 140, fontWeight: 500}]}>SAT</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 55, left: 139, fontWeight: 500}]}>SUN</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 15, left: 180}]}>1000 - 1900</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 35, left: 180}]}>1000 - 1800</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 55, left: 180}]}>1000 - 1900</Text>
        </View>
        </Shadow>
      </View>
      )}
      <TouchableOpacity style={[styles.InfoBox]} onPress={() => {setInfoTime_GYM(!InfoTime_GYM)}}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="dumbbell" size={45} color="#42a5f5" style={styles.InfoLogo}/>
            <View style={styles.InfoText}>
              <Text style={styles.InfoTitle}>Gym</Text>
              <Text style={styles.InfoDetail}>Hanson l Carrey l Hovey</Text>
            </View>
        </View>
        </Shadow>
      </TouchableOpacity>
      {InfoTime_GYM && (
      <View style={[styles.InfoBox, {backgroundColor: '#e6e6e6ff', height: 90, marginTop: 10}]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner, {backgroundColor: '#e6e6e6ff', height: 90}]}>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 15, left: 110, fontWeight: 500}]}>MON-FRI</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 35, left: 140, fontWeight: 500}]}>SAT</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 55, left: 139, fontWeight: 500}]}>SUN</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 15, left: 180}]}>TBD</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 35, left: 180}]}>TBD</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 55, left: 180}]}>TBD</Text>
        </View>
        </Shadow>
      </View>
      )}
      <TouchableOpacity style={[styles.InfoBox]} onPress={() => {setInfoTime_CAC(!InfoTime_CAC)}}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="gamepad" size={47} color="#4caf50" style={styles.InfoLogo}/>
            <View style={styles.InfoText}>
              <Text style={styles.InfoTitle}>CAC</Text>
              <Text style={styles.InfoDetail}>Casey l Hovey</Text>
            </View>
        </View>
        </Shadow>
      </TouchableOpacity>
      {InfoTime_CAC && (
      <View style={[styles.InfoBox, {backgroundColor: '#e6e6e6ff', height: 70, marginTop: 10}]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner, {backgroundColor: '#e6e6e6ff', height: 70}]}>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 15, left: 110, fontWeight: 500}]}>MON-SAT</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 35, left: 140, fontWeight: 500}]}>SUN</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 15, left: 180}]}>0900 - 2100</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 35, left: 180}]}>1000 - 1900</Text>
        </View>
        </Shadow>
      </View>
      )}
      <TouchableOpacity style={[styles.InfoBox]} onPress={() => {setInfoTime_USO(!InfoTime_USO)}}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="rocket" size={55} color="#5575f7ff" style={styles.InfoLogo}/>
            <View style={styles.InfoText}>
              <Text style={styles.InfoTitle}>USO</Text>
              <Text style={styles.InfoDetail}>Casey</Text>
            </View>
        </View>
        </Shadow>
      </TouchableOpacity>
      {InfoTime_USO && (
      <View style={[styles.InfoBox, {backgroundColor: '#e6e6e6ff', height: 70, marginTop: 10}]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner, {backgroundColor: '#e6e6e6ff', height: 70}]}>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 15, left: 110, fontWeight: 500}]}>MON-SAT</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 35, left: 140, fontWeight: 500}]}>SUN</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 15, left: 180}]}>0900 - 1800</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 35, left: 180}]}>1000 - 1700</Text>
        </View>
        </Shadow>
      </View>
      )}
      <TouchableOpacity style={[styles.InfoBox]} onPress={() => {setInfoTime_Library(!InfoTime_Library)}}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="book-open" size={47} color="#ba68c8" style={[styles.InfoLogo, {marginLeft: 30}]}/>
            <View style={styles.InfoText}>
              <Text style={styles.InfoTitle}>Library</Text>
              <Text style={styles.InfoDetail}>Casey l Hovey</Text>
            </View>
        </View>
        </Shadow>
      </TouchableOpacity>
      {InfoTime_Library && (
      <View style={[styles.InfoBox, {backgroundColor: '#e6e6e6ff', height: 70, marginTop: 10}]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner, {backgroundColor: '#e6e6e6ff', height: 70}]}>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 15, left: 110, fontWeight: 500}]}>MON-SAT</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', top: 35, left: 140, fontWeight: 500}]}>SUN</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 15, left: 180}]}>1000 - 1900</Text>
            <Text style={[styles.InfoDetail, {color: '#4b4b4bff', position: 'absolute', fontSize: 12, top: 35, left: 180}]}>Closed</Text>
        </View>
        </Shadow>
      </View>
      )}

      <View style={[styles.InfoBox, {backgroundColor: 'transparent', height: 60}]}>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f5f7f6',
    flex: 1,
    paddingTop: 50,
    maxHeight: VIEW_H-90,
  },
  InfoBox: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10, marginRight: 10,
    height: 120,
    borderRadius: 10,
  },
  InfoBoxInner: {
    flexDirection: 'row',
    width: '100%', height: 120,
    borderRadius: 10,
  },
  InfoLogo: {
    marginLeft: 25,
    lineHeight: 120,
  },
  InfoText: {
    marginLeft: 22,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  InfoTitle: {
    fontSize: 22,
    fontWeight: 500,
    color: '#383838ff'
  },
    InfoDetail: {
    width: 245,
    fontSize: 13,
    fontWeight: 300,
    
  },

  headerImage : {
    height : 10
  }

});
