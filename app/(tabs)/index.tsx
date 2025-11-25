import { StatusBar, StyleSheet, View } from 'react-native';
import MapMain from '../Components/MapMain';


export default function HomeScreen() {
  return (
    <View>
      <StatusBar barStyle="dark-content"/>
      <MapMain/>
      <meta name="google-site-verification" content="UspP3DDYnSWFI8GVFIh9aga5ERmrszCflG4i1JVqJVk" />
    </View>
  );
}

const styles = StyleSheet.create({

  headerImage : {
    height : 10
  }

});
