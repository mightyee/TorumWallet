import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { normalizeMarketCap, numberFormat } from '../../utils/number';
import styled from 'styled-components/native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import AntIcon from 'react-native-vector-icons/AntDesign';
import Text from '../Text';

interface ListItemProps
    extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    marketCoin: any
    navigation: NavigationProp<ParamListBase>;
    onDismiss?: (marketCoin: any) => void;
}

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const SwipeCoinItem: React.FC<ListItemProps> = ({
    marketCoin,
    navigation,
    onDismiss,
    simultaneousHandlers,
}) => {

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

    const percentageColor =
        price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || 'white';


    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const marginVertical = useSharedValue(10);
    const opacity = useSharedValue(1);

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished && onDismiss) {
                        runOnJS(onDismiss)(marketCoin.id);
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        },
    });

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
            translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
        );
        return { opacity };
    });

    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value,
        };
    });

    return (
        <TaskContainer
            key={id}
            style={rTaskContainerStyle}>
            <CoinContainer
                onPress={() => navigation.navigate('Detail', { id })}
            >
                <IconContainer style={rIconContainerStyle}>
                    <Icon name={'trash'} size={LIST_ITEM_HEIGHT * 0.4} color={'red'} />
                </IconContainer>
                <PanGestureHandler
                    simultaneousHandlers={simultaneousHandlers}
                    onGestureEvent={panGesture}
                >
                    <Animated.View style={[styles.task, rStyle]}>
                        <CoinImage source={{ uri: image }} />
                        <View>
                            <Text>{name}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <RankContainer>
                                    <Text>{market_cap_rank}</Text>
                                </RankContainer>
                                <Text style={{ marginRight: 5 }}>{symbol.toUpperCase()}</Text>
                                <AntIcon
                                    name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
                                    size={12}
                                    color={percentageColor}
                                    style={{ alignSelf: "center", marginRight: 5 }}
                                />
                                <Text style={{ color: percentageColor }}>
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
                    </Animated.View>
                </PanGestureHandler>
            </CoinContainer>
        </TaskContainer>
    );
};




const CoinContainer = styled.TouchableOpacity`
    width : 100%;
    align-items: center;
`;

const CoinImage = styled.Image`
    height: 40px;
    width: 40px;
    margin-right: 10px;
    align-self: center;
    `;

const RankContainer = styled.View`
    background-color: #585858;
    padding-horizontal: 5px;
    border-radius: 5px;
    margin-right: 5px;
`;


const TaskContainer = styled(Animated.View)`
    width : 100%;
    align-items: center;
`;

const IconContainer = styled(Animated.View)`
    height: 70px;
    width: 70px;
    position: absolute;
    right: 10%;
    justify-content: center;
    align-items: center;

`;



const styles = StyleSheet.create({
    taskContainer: {
        width: '100%',
        alignItems: 'center',
    },
    task: {
        flexDirection: 'row',
        width: '90%',
        marginVertical: 5,

        height: LIST_ITEM_HEIGHT,
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#35444e',
        borderRadius: 10,
        // Shadow for iOS
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        // Shadow for Android
        elevation: 5,
    },
    taskTitle: {
        fontSize: 16,
    },
    iconContainer: {
        height: LIST_ITEM_HEIGHT,
        width: LIST_ITEM_HEIGHT,
        position: 'absolute',
        right: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SwipeCoinItem;
