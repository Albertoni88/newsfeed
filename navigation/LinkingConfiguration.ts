/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';
import News from '../src/screens/News';
import Details from '../src/screens/Details';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      News : 'News',
      Details : 'Details',
      // Root: {
      //   screens: {
      //     TabOne: {
      //       screens: {
      //         //TabOneScreen: 'one',
      //         News : 'News'
      //       },
      //     },
      //     TabTwo: {
      //       screens: {
      //         //TabTwoScreen: 'two',
      //         Details : 'Details'
      //       },
      //     },
      //   },
      // },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
