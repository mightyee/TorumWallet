import React, { useRef } from "react";
import { View, StyleSheet } from 'react-native';
import { useQuery } from "@tanstack/react-query";
import { getCoinDetails, getTickerDetails } from '../services/api';
import Text from '../components/Text';
import styled from 'styled-components/native';
import Loader from '../components/Loader';
import { LineChart } from '../components/LineChart';
import Animated from "react-native-reanimated";
import DetailHeader, { HEADER_IMAGE_HEIGHT, MIN_HEADER_HEIGHT } from '../components/DetailHeader';
import Header from '../components/Header';

import { onScrollEvent } from "react-native-redash/src/v1/Gesture";
import { useValue } from 'react-native-redash/src/v1/Hooks'
import { useWalletlist } from '../contexts/WalletContext';
import { useToast } from '../contexts/ToastContext';
import GradientButton from '../components/GradientButton';
import InfoCard from '../components/InfoCard';
import DetailsCard from '../components/DetailsCard';
import PriceChangePercentage from '../components/PriceChangePercentage';

const Detail = ({ route, navigation }) => {
    const { id } = route.params;
    const scrollView = useRef<Animated.ScrollView>(null);

    const y = useValue(0);
    const onScroll = onScrollEvent({ y });

    const { isLoading, error, data, refetch } = useQuery(
        ['details', id],
        () => getCoinDetails(id),
    );

    const { isLoading: tickerLoading, data: tickerData } = useQuery(
        ['ticker', id],
        () => getTickerDetails(id),
    );


    if (isLoading || tickerLoading) {
        return <Loader />
    }

    const { walletCoinIds, storeWalletlistCoinId, removeWalletlistCoinId } = useWalletlist();
    const { show } = useToast();

    const checkIfCoinIsWalletlisted = () => walletCoinIds.some((coinIdValue) => String(coinIdValue) === String(id));

    const handleWatchlistCoin = () => {

        if (checkIfCoinIsWalletlisted()) {
            show({ message: `Sell ${data.name} successfully!` })
            return removeWalletlistCoinId(id)
        }
        show({ message: `Buy ${data.name} successfully!` })

        return storeWalletlistCoinId(id)
    }

    console.log(JSON.stringify(tickerData, undefined, 4));


    const date = new Date(1669573860537);

    console.log(date.toLocaleDateString('en-US')); // 👉️ "1/20/2022"



    return (
        <Container>
            <DetailHeader {...{ y, data }} />
            <View style={{
                height: HEADER_IMAGE_HEIGHT,
                marginBottom: MIN_HEADER_HEIGHT,
            }} />
            <Animated.ScrollView
                ref={scrollView}
                style={[StyleSheet.absoluteFill, { bottom: 80 }]}
                scrollEventThrottle={1}
                {...{ onScroll }}
            >
                <View style={{
                    height: HEADER_IMAGE_HEIGHT,
                    marginBottom: MIN_HEADER_HEIGHT,
                }} />
                <LineChart tickerData={tickerData?.prices} />
                {/* percentage_change */}
                <PriceChangePercentage market_data={data?.market_data || []} />
                {/* coin details */}
                <DetailsCard data={data} />
                {/*company information */}
                <InfoCard data={data} />
            </Animated.ScrollView>
            <Header {...{ y, scrollView, data }} />
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 34, justifyContent: 'center', alignItems: 'center' }}>
                <GradientButton style={{ width: 300, height: 50 }} onPress={handleWatchlistCoin} text={checkIfCoinIsWalletlisted() ? `Sell ${data.name}` : `Buy ${data.name}`} />
            </View>

        </Container >
    )
}
const Container = styled.View`
    flex:1;
    background-color: #1B232A;
`

const Buton = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    border-radius: 10px;
    background-color: 'hsl(0, 0%, 95%)'};
`
export default Detail