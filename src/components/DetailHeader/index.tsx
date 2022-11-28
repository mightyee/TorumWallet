import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, { Extrapolate } from "react-native-reanimated";
import Text from '../Text';

const { height: wHeight, width: wWidth } = Dimensions.get("window");

export const HEADER_IMAGE_HEIGHT = wHeight / 3;

const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 0,
        left: 0,
        width: wWidth,
    },
});


interface HeaderImageProps {
    y: Animated.Value<number>;
    data: any
}

const Max_Header_Height = 200;
const Min_Header_Height = 70;
const Scroll_Distance = Max_Header_Height - Min_Header_Height

export const MIN_HEADER_HEIGHT = 45;

export default ({ y, data }: HeaderImageProps) => {

    const height = y.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
        extrapolateRight: Extrapolate.CLAMP,
    }
    );

    const top = y.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -100],
        extrapolateLeft: Extrapolate.CLAMP,
    }
    );

    return (
        <Animated.View style={[styles.image, { height, top }]}>
            <Image
                source={{ uri: data.image.large }}
                style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    backgroundColor: '#10171d',
                    borderWidth: 1,
                    borderColor: '#38424e',
                    marginBottom: 20
                }}
            />
            <Text style={{ marginBottom: 10 }} color={"grey"}>{data.name}({data.symbol})</Text>
            <Text style={{ color: '#76a18a' }}>{data.market_data.price_change_24h_in_currency.usd}({data.market_data.price_change_percentage_24h_in_currency.usd})</Text>
        </Animated.View>
    );


};

