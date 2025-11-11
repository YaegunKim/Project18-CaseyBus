import { StatusBar, StyleSheet, View } from 'react-native';
import MapMain from '../Components/MapMain';


export default function HomeScreen() {
  return (
    <View>
      <StatusBar barStyle="dark-content"/>
      <MapMain/>
    </View>
  );
}

const styles = StyleSheet.create({

  headerImage : {
    height : 10
  }

});
