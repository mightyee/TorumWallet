import React from "react";
import styled from 'styled-components/native';
import { View, Image, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Text from '../Text'
import { normalizeMarketCap, numberFormat, percentageColor } from '../../utils/number';
import Icon from 'react-native-vector-icons/AntDesign';

interface RouterProps {
    marketCoin: any
    navigation: NavigationProp<ParamListBase>;
}

const CoinItem = ({ marketCoin, navigation }: RouterProps) => {
    const {
        id,
        name,
        current_price,
        market_cap_rank,
        price_change_percentage_24h,
        symbol,
        market_cap,
        image,
    } = marketCoin;



    return (
        <CoinContainer
            key={id}
            onPress={() => navigation.navigate('Detail', { id })}
        >
            <ImageIcon source={{ uri: image }} />
            <View>
                <Text>{name}</Text>
                <View style={{ flexDirection: "row" }}>
                    <RankContainer>
                        <Text>{market_cap_rank}</Text>
                    </RankContainer>
                    <Text style={{ marginRight: 5 }}>{symbol.toUpperCase()}</Text>
                    <Icon
                        name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
                        size={12}
                        color={percentageColor(Number(price_change_percentage_24h))}
                        style={{ alignSelf: "center", marginRight: 5 }}
                    />
                    <Text style={{ color: percentageColor(Number(price_change_percentage_24h)) }}>
                        {price_change_percentage_24h?.toFixed(2)}%
                    </Text>
                </View>
            </View>
            <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
                <Text>{numberFormat(current_price)}</Text>
                <Text style={{ fontFamily: 'ZonaPro-Thin', fontWeight: 'normal' }}>
                    MCap {normalizeMarketCap(market_cap)}
                </Text>
            </View>
        </CoinContainer >
    );
};

const ImageIcon = styled.Image`
    height: 40px;
    width: 40px;
    margin-right: 10px;
    align-self: center;
`

const CoinContainer = styled.TouchableOpacity`
    flex-direction : row;
    padding: 15px;
    margin-horizontal: 15px;
    background-color: #35444e;
    border-radius: 10px;
    margin-vertical: 5px;
`;

const RankContainer = styled.View`
    background-color: #585858;
    padding-horizontal: 5px;
    border-radius: 5px;
    margin-right: 5px;
`;


export default React.memo(CoinItem);
