import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ButtonTMC = () => {
    const router = useRouter();
  return (
    <View style={{paddingRight: 5}}>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#0345fc' }]} onPress={() => router.push('/Components/MinimapTMC')}>
        <FontAwesome6 name="bus-simple" size={12} color="#fff" style={{ paddingRight: 5 }}/>
        <Text style={styles.text}>TMC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 1,
    paddingHorizontal: 7,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ButtonTMC;
