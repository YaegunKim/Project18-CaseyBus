import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ButtonH221 = () => {
    const router = useRouter();
  return (
    <View style={{paddingRight: 5}}>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#009623' }]} onPress={() => router.push('/Components/MinimapH221')}>
        <FontAwesome6 name="bus-simple" size={12} color="#fff" style={{ paddingRight: 5 }}/>
        <Text style={styles.text}>H221</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    paddingVertical: 1,
    paddingHorizontal: 7,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 3,
    color: '#fff',
    fontWeight: '600',
  },
});

export default ButtonH221;
