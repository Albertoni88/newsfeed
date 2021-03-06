/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../src/screens/ModalScreen';
import NotFoundScreen from '../src/screens/NotFoundScreen';
import TabOneScreen from '../src/screens/TabOneScreen';
import TabTwoScreen from '../src/screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import i18n from '../src/config/locales';
import { createStackNavigator } from '@react-navigation/stack';
import News from '../src/screens/News';
import Details from '../src/screens/Details';

// export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator colorScheme = {colorScheme}/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

function RootNavigator({colorScheme}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} initialParams= {{colorScheme : colorScheme}} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();
function HomeStack() {
  //const { t } = React.useContext(LocalizationContext);
  //const Stack = createStackNavigator();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
          <Stack.Screen
              name="News"
              component={News}
              options={{ headerShown: false, title: i18n.t('news') }}
              />
          <Stack.Screen
              name="Details"
              component={Details}
              options={{ headerShown: false, title: i18n.t('details') }}
              />
      </Stack.Navigator>
  );
}
const BottomTab = createBottomTabNavigator();
function BottomTabNavigator({route}) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        //component={TabOneScreen}
        component={HomeStack}
        // options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          options={({ navigation }) => ({
          title: i18n.t('news'),
          tabBarIcon: ({ color }) => <AntDesign name="home" color={color} size = {30}/>
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        children={()=><TabTwoScreen tema={route.params.colorScheme}/>}
        //children={()=><SettingsStack>}
        //component={TabTwoScreen}
        options={{
          title: i18n.t('settings'),
          tabBarIcon: ({ color }) => <AntDesign name="setting" color={color} size = {30}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// name: React.ComponentProps<typeof FontAwesome>['name'];
// color: string;
function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
