import React, { RefObject } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
    Extrapolate, useCode, greaterThan, set, block
} from "react-native-reanimated";
import { withTimingTransition } from "react-native-redash/src/v1/Transitions";
import { useValue } from 'react-native-redash/src/v1/Hooks'
import Icon from 'react-native-vector-icons/Feather';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { HEADER_IMAGE_HEIGHT } from "../DetailHeader";
import { withAnimated } from '../WithAnimated';
import GradientText from '../GradientText';
import { numberFormat } from '../../utils/number';

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,

    },
    header: {
        flexDirection: "row",
        height: MIN_HEADER_HEIGHT,
        alignItems: "center",
        paddingHorizontal: PADDING,
    },
    title: {
        fontFamily: 'ZonaPro-Thin',
        fontSize: 18,
        color: 'white',
        marginLeft: PADDING,
        flex: 1,
    },
});
const value = Platform.OS === "ios" ? -15 : 30

interface HeaderProps {
    y: Animated.Value<number>;
    // tabs: TabModel[];
    scrollView: RefObject<Animated.ScrollView>;
    data: any;
}

export default ({ y, data }: HeaderProps) => {
    const { goBack } = useNavigation();
    const toggle = useValue<0 | 1>(0);
    const transition = withTimingTransition(toggle, { duration: 100 });
    const { top: paddingTop } = useSafeAreaInsets();
    const translateX = y.interpolate({
        inputRange: [0, HEADER_IMAGE_HEIGHT],
        outputRange: [-ICON_SIZE - PADDING + 10, 0],
        extrapolate: Extrapolate.CLAMP,
    });
    const translateY = y.interpolate({
        inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
        outputRange: [
            HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
            HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + value,
            0,
        ],
        extrapolateRight: Extrapolate.CLAMP,
    });
    const opacity = transition;
    useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
        toggle,
        y,
    ]);
    const AnimatedLinearGradient = withAnimated(GradientText);

    return (
        <Animated.View style={[styles.container, { paddingTop: paddingTop }]}>
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity,
                    backgroundColor: '#10171d'
                }}
            />
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => goBack()}>
                    <View style={{ backgroundColor: '#35444e', borderRadius: 10, padding: 5 }}>
                        <Icon name="arrow-left" size={ICON_SIZE} color="white" />
                        <Animated.View
                            style={{ ...StyleSheet.absoluteFillObject, opacity: transition }}
                        >
                            <View style={{ backgroundColor: '#35444e', borderRadius: 10, padding: 5 }}>
                                <Icon name="arrow-left" size={ICON_SIZE} color="black" />
                            </View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ flex: 1 }}>
                    <AnimatedLinearGradient text={numberFormat(data.market_data.current_price.usd)} h1 style={[
                        { transform: [{ translateX }, { translateY }], paddingLeft: 15 },
                    ]} />
                </View>
                <View style={{ backgroundColor: '#35444e', borderRadius: 10, padding: 5 }}>
                    <IonicIcon name="notifications" size={ICON_SIZE} color="white" />
                </View>
            </View>
        </Animated.View>
    );
};
