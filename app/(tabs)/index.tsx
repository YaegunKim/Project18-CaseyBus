import { StyleSheet, View } from 'react-native';

import MapMain from '../Components/MapMain';


export default function HomeScreen() {
  return (
    <View>
      <MapMain/>
    </View>
  );
}

const styles = StyleSheet.create({

  headerImage : {
    height : 10
  }

});
