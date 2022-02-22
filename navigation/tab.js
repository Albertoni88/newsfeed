import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Map, Scroll, Login, Menu } from "../screens";
import { COLORS, icons, FONTS } from "../constants";
import { createAppContainer, FlatList } from 'react-navigation';
//import { createBottomTabNavigator } from 'react-navigation-tabs';

//Initil bottom-tabs
const Tab = createBottomTabNavigator();
const data = new Array(3).fill(0);
export default function Tabs() {

    // renderItem = ({ index }) => {
    //     return (
    //         <View style={{ height: 50 }}>
    //             <Text style={{ textAlign: 'center' }}>Item {index + 1}</Text>
    //         </View>
    //     );
    // };
    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <FlatList
        //         data={data}
        //         renderItem={renderItem}
        //         contentContainerStyle={{ padding: 10 }}
        //     />
        // </View>
        <Tab.Navigator
            tabBarOptions={{
                showLabel:false,
                style:{
                    // activeTintColor: 'tomato',
                    // inactiveTintColor: 'gray',
                    borderColor:0,
                    backgroundColor:'rgb(255,255,255)',
                    elevation:3,
                    height:79.8
                }
            }}
        >
            {/* Login */}
            <Tab.Screen 
                name='Menu'
                component={Menu}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={icons.home}
                                style={{...styles.iconTab, tintColor: focused ? COLORS.primary : COLORS.secondary}}
                            />
                            <Text style={{
                                ...FONTS.textTabBar,
                                color:focused ? COLORS.primary : COLORS.secondary
                                }}>Menu</Text>
                        </View>
                    )
                  }}
            />
            {/* Maps */}
            <Tab.Screen 
                name='Map'
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={icons.home}
                                style={{...styles.iconTab, tintColor: focused ? COLORS.primary : COLORS.secondary}}
                            />
                            <Text style={{
                                ...FONTS.textTabBar,
                                color:focused ? COLORS.primary : COLORS.secondary
                                }}>Maps</Text>
                        </View>
                    )
                  }}
            />
            <Tab.Screen 
                name='Scroll'
                component={Scroll}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={icons.home}
                                style={{...styles.iconTab, tintColor: focused ? COLORS.primary : COLORS.secondary}}
                            />
                            <Text style={{
                                ...FONTS.textTabBar,
                                color:focused ? COLORS.primary : COLORS.secondary
                                }}>Scroll</Text>
                        </View>
                    )
                  }}
            />

        </Tab.Navigator>
    )
}
// const TabNavigator = createBottomTabNavigator({
//     Tabs: { screen: Tabs },
//   });
  
//   export default createAppContainer(TabNavigator);


const styles = StyleSheet.create({
    iconTab: {
        width: 42.56,
        height: 10
    },
    customTabBarEmptyView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 30,
        backgroundColor: 'white'
    }
});