import React, { useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Linking from 'expo-linking';
import I18n from './src/config/locales';

const prefix = Linking.createURL('/abrir');

export default function App() {
  
  const [locale, setLocale] = React.useState('en');
  const localizationContext = React.useMemo(
    ()=>({
      t:(scope, options) => I18n.translations(scope, {locale, ...options}),
      locale,
      setLocale,
    }),[locale],
  )

  const linking = {
    prefixes: [prefix],
  };

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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
