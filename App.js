import React, { useEffect, useState, useCallback, createContext } from 'react';
import ThemeContext from './src/context/ThemeContext';
import { Appearance } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Linking from 'expo-linking';
import I18n from './src/config/locales';

const prefix = Linking.makeUrl('/');

export default function App() {


  useEffect(()=>{

    async function getInitialUrl(){
      const initialUrl = Linking.getInitialURL();
      if(initialUrl) setData(Linking.parse(initialUrl))
    }
    Linking.addEventListener("url", handleDeepLink);
    if(!data){
      getInitialUrl();
    }
    return (()=>{
      Linking.removeEventListener("url");
    })
  },[])

  function handleDeepLink(event){
    let data1 = Linking.parse(event.url);
    setData(data1);
    console.log("data ", data)
  }
  //const ThemeContext = createContext();
  const colorScheme1 = Appearance.getColorScheme();
  
  const colorScheme = useColorScheme();
  const [data, setData] = useState(null)
  const [locale, setLocale] = React.useState('en');
  const [theme, setTema] = React.useState(colorScheme);
    
    const linking = {
      prefixes: [prefix],
      config: {
        screens:{
          News : "news",
          Details : "details"
        }
      }
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