

import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import Text from '../Text';
import { percentageColor } from '../../utils/number';
import Icon from 'react-native-vector-icons/AntDesign';

interface IPriceChange {
    market_data: any;
}
const PriceChangePercentage = ({ market_data }: IPriceChange) => {
    if (market_data.length == 0) return <Text>Error</Text>
    const {
        price_change_percentage_24h_in_currency,
        price_change_percentage_7d_in_currency,
        price_change_percentage_14d_in_currency,
        price_change_percentage_30d_in_currency,
        price_change_percentage_60d_in_currency,
        price_change_percentage_1y_in_currency
    } = market_data;

    const Column = ({ percentage }) => {
        return (
            <>
                <Icon
                    name={Number(percentage) < 0 ? "caretdown" : "caretup"}
                    size={10}
                    color={percentageColor(Number(percentage)) as string}
                    style={{ alignSelf: "center", marginRight: -5 }}
                />
                <Text style={{ color: percentageColor(Number(percentage)) }}>
                    {Math.abs(Number(percentage)).toFixed(2)}%
                </Text>
            </>
        )
    }
    return (
        <View style={{ flex: 1, margin: 16, backgroundColor: '#35444e', borderRadius: 10, padding: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'auto', borderBottomWidth: 1, borderBottomColor: 'white', paddingBottom: 10 }}>
                <Text>24H</Text>
                <Text>7D</Text>
                <Text>14D</Text>
                <Text>30D</Text>
                <Text>60D</Text>
                <Text>1Y</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'auto', paddingTop: 10 }}>
                <Column percentage={price_change_percentage_24h_in_currency.usd ? price_change_percentage_24h_in_currency.usd.toFixed(2) : 0} />
                <Column percentage={price_change_percentage_7d_in_currency.usd ? price_change_percentage_7d_in_currency.usd.toFixed(2) : 0} />
                <Column percentage={price_change_percentage_14d_in_currency.usd ? price_change_percentage_14d_in_currency.usd.toFixed(2) : 0} />
                <Column percentage={price_change_percentage_30d_in_currency.usd ? price_change_percentage_30d_in_currency.usd.toFixed(2) : 0} />
                <Column percentage={price_change_percentage_60d_in_currency.usd ? price_change_percentage_60d_in_currency.usd.toFixed(2) : 0} />
                <Column percentage={price_change_percentage_1y_in_currency.usd ? price_change_percentage_1y_in_currency.usd.toFixed(2) : 0} />
            </View>
        </View>
    )
}

export default PriceChangePercentage;