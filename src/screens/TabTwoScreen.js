import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, } from 'react-native';
import { Text, View } from '../components/Themed';
import i18n from '../config/locales/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabTwoScreen() {
  useEffect(async ()=>{
    var lang = await AsyncStorage.getItem('language') === 'en' ? false : true;
    setIsEnabled(lang);
    console.log("asd ", lang, 'lang ', await AsyncStorage.getItem('language'));
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
      <Text style={styles.title}>{i18n.t('settings')}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style = {{ flexDirection : 'row'}}>
      <Text style ={{ color : '#f5dd4b', marginHorizontal : 15, fontSize : 20}}>English</Text>
      <Switch
        trackColor={{ false: "#f4f3f4", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style ={{ color : '#81b0ff', marginHorizontal : 15, fontSize : 20}}>Español</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
