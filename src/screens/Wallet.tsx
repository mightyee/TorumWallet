import React, { useEffect, useRef, useCallback } from 'react';
import { RefreshControl, SafeAreaView } from 'react-native';
import { useWalletlist } from '../contexts/WalletContext';
import { getWatchlistedCoins } from '../services/api';
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import SwipeCoinItem from '../components/SwipeCoinItem';

import { useToast } from '../contexts/ToastContext';
import Empty from '../components/Empty';

const Wallet = (props) => {
    const { walletCoinIds, removeWalletlistCoinId, setWalletCoinIds } = useWalletlist();
    const transformCoinIds = () => walletCoinIds.join('%2C');
    const scrollRef = useRef(null);
    const { show } = useToast();

    const { isLoading, error, data, refetch } = useQuery(
        ['wallets'],
        () => getWatchlistedCoins(1, transformCoinIds()),
        {
            enabled: false,
        }
    );

    const keyExtractor = useCallback((item, index) => item.id.toString() + index.toString(), [])
    const renderItem = ({ item }: any) => {
        return (
            <SwipeCoinItem marketCoin={item}
                simultaneousHandlers={scrollRef}
                key={item.id}
                onDismiss={onDismiss}
                navigation={props.navigation}
            />
        )
    }

    useEffect(() => {
        if (walletCoinIds.length > 0) {
            refetch();
        }
    }, [walletCoinIds])


    const onDismiss = useCallback(async (id) => {

        if (walletCoinIds.some((coinIdValue) => String(coinIdValue) === String(id))) {
            removeWalletlistCoinId(id)
            //Toast
            show({ message: `Sell ${id} successfully!` })


        }
    }, [walletCoinIds]);

    if (walletCoinIds.length == 0) return <Empty name='wallet' message='No Coins' />

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1B232A' }}>

            <FlashList
                estimatedItemSize={64}
                data={data}
                extraData={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        tintColor="white"
                        onRefresh={refetch}
                    />
                }
            />
        </SafeAreaView>
    )
};

export default Wallet;