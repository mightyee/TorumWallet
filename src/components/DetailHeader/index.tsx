import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, { Extrapolate } from "react-native-reanimated";
import { percentageColor } from '../../utils/number';
import Text from '../Text';
import Icon from 'react-native-vector-icons/AntDesign';

const { height: wHeight, width: wWidth } = Dimensions.get("screen");

export const HEADER_IMAGE_HEIGHT = (wHeight / 3);

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
export const MIN_HEADER_HEIGHT = 45;

export default ({ y, data }: HeaderImageProps) => {

    const height = y.interpolate({
        inputRange: [-100, 0],
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
        <Animated.View style={[styles.image, { height, top, backgroundColor: '#1B232A', }]}>
            <Image
                source={{ uri: data.image.large }}
                style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    backgroundColor: '#10171d',
                    borderWidth: 1,
                    borderColor: '#38424e',
                    marginBottom: 20,
                    // marginTop: 70,

                }}
            />
            <Text style={{ marginBottom: 10 }} color={"grey"}>{data.name}({data.symbol})</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#76a18a' }}>{data.market_data.price_change_24h_in_currency.usd.toFixed(2)}  </Text>
                <Icon
                    name={data.market_data.price_change_percentage_24h_in_currency.usd < 0 ? "caretdown" : "caretup"}
                    size={12}
                    color={percentageColor(Number(data.market_data.price_change_percentage_24h_in_currency.usd))}
                    style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={{ color: percentageColor(Number(data.market_data.price_change_percentage_24h_in_currency.usd)) }}>
                    {data.market_data.price_change_percentage_24h_in_currency.usd?.toFixed(2)}%
                </Text>
            </View>
        </Animated.View >
    );


};

