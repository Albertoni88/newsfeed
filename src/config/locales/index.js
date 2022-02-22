import I18n from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import es from './es';
import en from './en';


I18n.translations = {
  es: es,
  en: en,
}

var lang = null;
async function language () {
  lang = await AsyncStorage.getItem('language');
  if(lang === null || lang === undefined){
    lang = 'en';
  }
  I18n.locale = lang;
}
language();
I18n.fallbacks = true;

export default I18n;


