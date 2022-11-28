import React from 'react'

import Text, { PropsGlobalStyle } from '../Text';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import ButtonPress from '../ButtonPress';

interface IGradientText {
    text: string;
    style?: ViewStyle;
    onPress: () => void;
    disabled?: boolean;
    color?: string
    labelFontSize?: number
    labelColor?: string
}

const GradientButton = ({ text, style, onPress, labelFontSize, disabled, labelColor, color, ...props }: IGradientText) => {

    const getAngle = () => {
        if (!color) {
            return 100;
        }
        return 100;
    };

    const getColor = () => {
        if (!color) {
            return ["#70b2ef", "#96e1bf"];
        }
        return ["#70b2ef", "#96e1bf"];
    }
    const getLocation = () => {
        if (!color) {
            return [0, 0.93];
        }
        return [0, 0.93];
    }

    // #72b388
    // #96e1bf

    return (
        <ButtonPress onPress={onPress} disabled={disabled} style={[styles.shadow, { alignItems: "center" }]}>
            <LinearGradient
                colors={getColor()}
                locations={getLocation()}
                useAngle={true}
                angle={getAngle()}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={{
                    opacity: disabled ? 0.5 : 1,
                    ...styles.btn,
                    ...style,
                    borderWidth: 1,
                    borderColor: "#72b388"
                }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        ...styles.btnText,
                        color: labelColor ? labelColor : 'white',
                        fontSize: labelFontSize ? labelFontSize : 26
                    }}
                >
                    {text}
                </Text>
            </LinearGradient>
        </ButtonPress>

    )
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        height: 88,
        width: 700,
        paddingHorizontal: 20
    },
    btnText: {
        flex: 1,
        textAlign: "center"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    }
});

export default GradientButton;