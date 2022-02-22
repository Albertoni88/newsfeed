import React, { useState } from 'react';
//import { Tab, TabView } from 'react-native-elements';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
        <Text>First</Text>
    </View>
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
        <Text>Second</Text>
    </View>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export default function Menu() {


    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );

    // const [index, setIndexState] = useState(0);

    // const setIndex = (index) => {
    //     setIndexState(index);
    // }
    // return (
    //     <View style={{ height: '100%', marginTop: 20 }}>
    //         <Tab value={index} onChange={setIndex}>
    //             <Tab.Item titleStyle={{ color: 'violet' }} style={{ borderColor: 'violet', borderWidth: 2 }} title="recent" />
    //             <Tab.Item titleStyle={{ color: 'violet' }} style={{ borderColor: 'violet', borderWidth: 2 }} title="favorite" />
    //             <Tab.Item titleStyle={{ color: 'violet' }} style={{ borderColor: 'violet', borderWidth: 2 }} title="cart" />
    //         </Tab>

    //         <TabView style={{ color: 'orange' }} animationType={'timing'} value={index}  >
    //             <TabView.Item style={{ color: 'orange' }} onChange={setIndex} style={{ backgroundColor: 'white', width: '100%' }}>
    //                 <Text h1 style={{ color: 'black' }}>Recent</Text>
    //             </TabView.Item>
    //             <TabView.Item onChange={setIndex} style={{ backgroundColor: 'white', width: '100%' }}>
    //                 <Text h1>Favorite</Text>
    //             </TabView.Item>
    //             <TabView.Item onChange={setIndex} style={{ backgroundColor: 'white', width: '100%' }}>
    //                 <Text h1>Cart</Text>
    //             </TabView.Item>
    //         </TabView>
    //     </View>
    // )
}