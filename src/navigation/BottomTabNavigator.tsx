import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Wallet } from '../screens';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text } from 'react-native';


export default () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: '#10171d' },
                tabBarLabel: ({ focused, color }) => (
                    <Text style={{ color: focused ? 'white' : '#35444e', fontSize: 10 }}>
                        {route.name}
                    </Text>
                ),
                tabBarIcon: ({ size, focused }) => {
                    const iconName = route.name.toLowerCase();
                    return (
                        <Icon
                            name={iconName}
                            color={focused ? '#4a3fbf' : '#35444e'}
                            size={size}
                        />
                    );
                },
            })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};
