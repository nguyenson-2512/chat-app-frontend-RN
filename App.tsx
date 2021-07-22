import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const setDefaultTheme = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("theme", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      const defaultTheme = 'light'
      await setDefaultTheme(defaultTheme);
    }
    getUserInfo();
  }, []);

  // let colorScheme;
  const setUpTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      // colorScheme = useColorScheme(theme);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function handleTheme() {
      await setUpTheme();
    }
    handleTheme();
  }, [colorScheme]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
