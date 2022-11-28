import React, { useState } from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail } from '../screens';
import AnimatedSplashScreen from '../screens/AnimatedSplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import WalletProvider from '../contexts/WalletContext';
import { ToastProvider } from '../contexts/ToastContext';
import Toast from '../components/Toast';
import { useTheme } from 'styled-components'


export default () => {
    const [isReady, setIsReady] = useState(false);
    const Stack = createNativeStackNavigator();
    const theme = useTheme()

    const markNavigationContainerReady = () => {
        setIsReady(true)
    }


    const navigationTheme = {
        ...DefaultTheme,
        dark: true,
        colors: {
            ...DefaultTheme.colors,
            border: 'rgba(0,0,0,0)',
            text: String(theme.colors.background),
            card: String(theme.colors.background),
            primary: String(theme.colors.background),
            notification: String(theme.colors.background),
            background: String(theme.colors.background),
        },
    };

    return (
        <NavigationContainer theme={navigationTheme} onReady={markNavigationContainerReady} >
            <AnimatedSplashScreen isReady={isReady}>

                <WalletProvider>
                    <Stack.Navigator>
                        <Stack.Screen name="Root"
                            component={BottomTabNavigator}
                            options={{ headerShown: false }} />
                        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </WalletProvider>
            </AnimatedSplashScreen>
        </NavigationContainer >
    );
};
