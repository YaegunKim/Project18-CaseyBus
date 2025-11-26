import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';



export default function Setting() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Mode & Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Useful Info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Error report</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingBox} onPress={() => router.push("/setting/aboutus")}>
        <Text style={styles.settingText}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Contact Info</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f5f7f6',
    flex: 1,
    paddingTop: 50,
  },
  settingBox: {
    borderWidth: 0.3,
    borderColor: '#e1e1e1ff',
    marginLeft: 5, marginRight: 5, marginTop: 0.5,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  settingText: {
    marginLeft: 20,
    color: '#383838ff'
  }

});
