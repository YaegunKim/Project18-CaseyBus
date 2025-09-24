import React from 'react';
import { StyleSheet, View } from 'react-native';
import routes_data from '../../assets/data/routes_data.json';


const [routeTMC, routeH221, routeHovey] = routes_data.routes;


export default function StationDetail() {

  return (
    <>
      <View style={[styles.stationDetail, ]} >

      </View>
    </>
  );
}


const styles = StyleSheet.create({
  stationDetail: {
    
  }

});