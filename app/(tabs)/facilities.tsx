import { FontAwesome6 } from '@expo/vector-icons';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const VIEW_H = Dimensions.get('window').height;

export default function Facilities() {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.InfoBox]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="burger" size={52} color="#e53935" style={styles.InfoLogo}/>
            <Text style={styles.InfoTitle}>DFAC</Text>
            <Text style={styles.InfoDetail}>Main l Thunder l Argonne l Hovey</Text>
        </View>
        </Shadow>
      </View>
      <View style={[styles.InfoBox]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="bowl-rice" size={52} color="#ff7043" style={styles.InfoLogo}/>
            <Text style={styles.InfoTitle}>KATUSA Snack Bar</Text>
            <Text style={styles.InfoDetail}>Canteen l Thunder l Shortie l Drangon Valley l Hovey</Text>
        </View>
        </Shadow>
      </View>
      <View style={[styles.InfoBox]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="scissors" size={52} color="#fbc02d" style={styles.InfoLogo}/>
            <Text style={styles.InfoTitle}>Barber Shop</Text>
            <Text style={styles.InfoDetail}>Haircut & Grooming</Text>
        </View>
        </Shadow>
      </View>
      <View style={[styles.InfoBox]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="dumbbell" size={45} color="#42a5f5" style={styles.InfoLogo}/>
            <Text style={styles.InfoTitle}>Gym</Text>
            <Text style={styles.InfoDetail}>Hanson l Carrey l Hovey</Text>
        </View>
        </Shadow>
      </View>
      <View style={[styles.InfoBox]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="gamepad" size={47} color="#4caf50" style={styles.InfoLogo}/>
            <Text style={styles.InfoTitle}>CAC</Text>
            <Text style={styles.InfoDetail}>Casey l Hovey</Text>
        </View>
        </Shadow>
      </View>
      <View style={[styles.InfoBox]}>
        <Shadow
                  startColor={"#00000010"}
                  endColor={"#00000000"}
                  distance={5}
                  >
        <View style={[styles.InfoBoxInner]}>
            <FontAwesome6 name="book-open" size={47} color="#ba68c8" style={[styles.InfoLogo, {marginLeft: 30}]}/>
            <Text style={styles.InfoTitle}>Library</Text>
            <Text style={styles.InfoDetail}>Casey l Hovey</Text>
        </View>
        </Shadow>
      </View>
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
    width: '100%', height: 120,
    borderRadius: 10,
    
  },
  InfoLogo: {
    marginLeft: 25,
    lineHeight: 120,

  },

  InfoTitle: {
    position: 'absolute',
    top: 31,
    left: 100,
    fontSize: 22,
    fontWeight: 500,
    color: '#383838ff'
  },
    InfoDetail: {
    position: 'absolute',
    top: 65,
    width: 240,
    left: 100,
    fontSize: 13,
    fontWeight: 300,
    
  },

  headerImage : {
    height : 10
  }

});
