import React, { useEffect, useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { StyleSheet, Switch, } from 'react-native';
import { Text, View } from '../components/Themed';
import i18n from '../config/locales/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColorScheme from '../../hooks/useColorScheme';


export default function TabTwoScreen({tema}) {

  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(async ()=>{
    var lang = await AsyncStorage.getItem('language') === 'en' ? false : true;
    setIsEnabled(lang);
  },[])
  const [isEnabled, setIsEnabled] = useState(false);
  
  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState)
    if(isEnabled === true){
      await AsyncStorage.setItem('language', 'en');
    } else {
      await AsyncStorage.setItem('language', 'es');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={theme === 'dark' ? styles.title : styles.titlelight}>{i18n.t('settings')}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style = {{ flexDirection : 'row', marginBottom : 20, backgroundColor : 'grey'}}>
      <Text style ={{ color : theme === 'dark' ? 'white' : 'black', marginHorizontal : 15, fontSize : 20}}>English</Text>
      {/* <Text style ={ styles.title}>English</Text> */}
      <Switch
        trackColor={{ false: "#f4f3f4", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style ={{ color : theme === 'dark' ? 'white' : 'black', marginHorizontal : 15, fontSize : 20}}>Español</Text>
      {/* <Text style ={styles.title}>Español</Text> */}
      </View>
      <View style = {{ flexDirection : 'row', backgroundColor : 'grey'}}>
      {/* <Text style ={{ color : '#f5dd4b', marginHorizontal : 15, fontSize : 20}}>English</Text> */}
      <Text style ={{ color : theme === 'dark' ? 'white' : 'black', marginHorizontal : 15, fontSize : 20}}>Light</Text>
      <Switch
        trackColor={{ false: "#f4f3f4", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setTheme}
        value={ theme === 'light' ? false : true }
      />
      <Text style ={{ color : theme === 'dark' ? 'white' : 'black', marginHorizontal : 15, fontSize : 20}}>Dark</Text>
      {/* <Text style ={styles.title}>Dark</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : 'grey'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  titlelight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
