import React, { Component, PureComponent } from "react";
import { Easing, Animated, TouchableOpacity, ViewStyle } from "react-native";


interface IButtonPress {
    style?: any;
    children?: React.ReactNode;
    onLayout?: any;
    disabled?: boolean;
    myRef?: any
    onPress: () => void
}


const ButtonPress = ({ style, myRef, onPress, onLayout, disabled, children, ...props }: IButtonPress) => {

    const aniValues = new Animated.Value(1);
    const scaleRatio = 0.9;


    const onPressOut = () => {
        aniValues.setValue(scaleRatio);
        Animated.timing(aniValues, {
            toValue: 1,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        //this.aniValue.setValue(1);
    };
    const onPressIn = () => {
        aniValues.setValue(1);
        Animated.timing(aniValues, {
            toValue: scaleRatio,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        // this.aniValue.setValue(1.1);
    };

    const aniValue = aniValues.interpolate({
        inputRange: [0, 2],
        outputRange: [0, 2],
    });
    return (
        <Animated.View style={{ ...style, transform: [{ scale: aniValue }] }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                ref={myRef}
                onLayout={onLayout}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                disabled={disabled}
            >
                {children}
            </TouchableOpacity>
        </Animated.View>
    );
}

export default ButtonPress;
