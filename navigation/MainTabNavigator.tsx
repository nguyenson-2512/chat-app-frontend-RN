import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Fontisto } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CallScreen from '../screens/CallScreen';
// import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { FriendParamList, MainTabParamList, TabTwoParamList } from '../types';
import FriendListScreen from '../screens/FriendListScreen';
import FriendRequestScreen from '../screens/FriendRequestScreen';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();
const Tab = createMaterialTopTabNavigator();
function FriendTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, color: '#354a5f' },
        tabStyle: { width: 200, height: 40, marginTop: 10, justifyContent: 'center' },
        style: { backgroundColor: 'white', textAlign: 'center', display: 'flex', width: '100%' },
        indicatorStyle: {height: 37,width: 200, backgroundColor: '#69C1E6', borderRadius: 40}
      }}>
      <Tab.Screen name="Friend List" component={FriendListScreen} />
      <Tab.Screen name="Friend Request" component={FriendRequestScreen} />
    </Tab.Navigator>
  );
}
export default function MainTabNavigator() {
  const colorScheme = useColorScheme();



  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].text,
        style: {
          backgroundColor: Colors[colorScheme].background,
        },
        indicatorStyle: {
          backgroundColor: Colors[colorScheme].text,
          height: 4,
        },
        labelStyle: {
          fontWeight: 'bold'
        },
        showIcon: true,
      }}>
      <MainTab.Screen
        name="Chats"
        component={ChatsScreen}
      />
      <MainTab.Screen
        name="Friend"
        component={FriendTabs}
        // options={{

        //   tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} size={18} />,
        //   tabBarLabel: () => null
        // }}
      />
      <MainTab.Screen
        name="Call"
        component={CallScreen}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
