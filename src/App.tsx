import React from 'react';
import { View, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { RandomScreen, SendScreen } from './screens';

const pages = {
    Aleatorio: { screen: RandomScreen },
    Enviar: { screen: SendScreen },
};

const options = {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
            backgroundColor: '#fff',
        },
        style: {
            backgroundColor: '#3C7',
        },
    },
};

const Tabs = TabNavigator(pages, options);

export default () => (
    <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='#2B6' />
        <Tabs />
    </View>
);
