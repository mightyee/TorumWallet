import React, { useContext } from 'react';
import CoinItem from '../components/CoinItem';
import styled from 'styled-components/native';
import { FlashList } from "@shopify/flash-list";
import { useInfiniteCoins } from '../hooks/useInfiniteCoins';
import Loader from '../components/Loader';
import { useToast } from '../contexts/ToastContext';
import { TouchableOpacity } from 'react-native';
import Text from '../components/Text';

const Home = (props) => {
    const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteCoins()
    const renderItem = React.useCallback(({ item }: any) => <CoinItem marketCoin={item} navigation={props.navigation} />, [])
    const keyExtractor = React.useCallback((item: any, index: any) => item.id.toString() + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString(), [])
    const ListFooterComponent = React.useCallback(() => {
        return <Loader />;
    }, [])

    if (isLoading) {
        return <Loader />;
    }


    const loadNext = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    return (
        <Container>
            <FlashList
                estimatedItemSize={64}
                data={data?.coins}
                renderItem={renderItem}
                onEndReached={loadNext}
                onEndReachedThreshold={0.3}
                ListFooterComponent={isFetchingNextPage ? ListFooterComponent : null}
            />
        </Container>
    )
}

const Container = styled.View`
    flex:1;
    background-color: #10171d;
`

export default Home