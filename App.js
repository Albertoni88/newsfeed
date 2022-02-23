import React, { useEffect, useCallback, createContext } from 'react';
import ThemeContext from './src/context/ThemeContext';
import { Appearance } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Linking from 'expo-linking';
import I18n from './src/config/locales';

const prefix = Linking.createURL('/abrir');
export default function App() {
  //const ThemeContext = createContext();
  const colorScheme1 = Appearance.getColorScheme();
  
  const colorScheme = useColorScheme();

  const [locale, setLocale] = React.useState('en');
  const [theme, setTema] = React.useState(colorScheme);

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
    
    function setTheme(){
        setTema(theme === "light" ? "dark" : "light");
    }
    
    if (!isLoadingComplete) {
      return null;
    } else {
      return (
        <SafeAreaProvider>
        <ThemeContext.Provider value={{theme, setTheme}}>
          <Navigation colorScheme={theme} />
        </ThemeContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

//export const ThemeContext;