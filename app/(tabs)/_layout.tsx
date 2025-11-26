import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import { StatusBar } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <StatusBar barStyle="dark-content"/>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#343434ff',
        tabBarInactiveTintColor: '#c2c2c2ff',
        headerShown: false,
        tabBarButton: HapticTab,

        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e6e6e6',
        },

        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name= "calendar" color={color} />,
        }}/>
      <Tabs.Screen
        name='facilities/index'
        options={{
          title: 'Facilites',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name= "clock.fill" color={color} />,
        }}/>
      <Tabs.Screen
        name="facilities/DFACmenu"
        options={{
          title: 'DFACmenu',
          href: null,
        }}
      />
      <Tabs.Screen
        name='setting/index'
        options={{
          title: 'Setting',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name= "gear" color={color} />,
        }}/>


      <Tabs.Screen
        name="(old)/aboutus"
        options={{
          title: 'AboutUs',
          href: null,
        }}
      />

      <Tabs.Screen
        name="(old)/explore"
        options={{
          title: 'Explore',
          href: null,
        }}
      />
      <Tabs.Screen
        name="(old)/indexExample"
        options={{
          title: 'Example',
          href: null,
        }}
      />
    </Tabs>
    </>
  );
}
