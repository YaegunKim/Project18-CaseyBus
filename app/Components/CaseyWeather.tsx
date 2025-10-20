import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CampCaseyWeatherWidget() {
  const widgetHtml = `
    <a class="weatherwidget-io" href="https://forecast7.com/en/37d91n127d05/dongducheon-si/"
      data-label_1="CAMP CASEY" data-label_2="WEATHER" data-theme="pure">
      CAMP CASEY WEATHER
    </a>
    <script>
      !function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0];
        if(!d.getElementById(id)){
          js=d.createElement(s);js.id=id;
          js.src='https://weatherwidget.io/js/widget.min.js';
          fjs.parentNode.insertBefore(js,fjs);
        }
      }(document,'script','weatherwidget-io-js');
    </script>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: widgetHtml }}
        style={{ height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginVertical: 16,
  },
});
