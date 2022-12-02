import React from 'react'
import Text, { PropsGlobalStyle } from '../Text';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { numberFormat, percentageColor } from '../../utils/number';

interface IDetailsCard {
    data: any,
}

const DetailsCard = ({ data, ...props }: IDetailsCard) => {

    const Row = ({ name = '-', detail = '-' }: { name: string, detail: any }) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flex: 0.5 }}>
                    <Text>{name}</Text>
                </View>
                <View style={{ marginLeft: "auto", alignItems: "flex-end", flex: 0.5 }}>
                    <Text>{detail}</Text>
                </View>
            </View>
        )
    }


    const RowAllTime = ({ name = '-', detail = '-', percentage = '-', date = '-' }: { name: string, detail: any, percentage: string, date: any }) => {

        return (
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flex: 0.5 }}>
                    <Text>{name}</Text>
                </View>
                <View style={{ marginLeft: "auto", alignItems: "flex-end", flex: 0.5 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginRight: 5 }}>{numberFormat(detail)}</Text>
                        <Icon
                            name={Number(percentage) < 0 ? "caretdown" : "caretup"}
                            size={12}
                            color={percentageColor(Number(percentage)) as string}
                            style={{ alignSelf: "center", marginRight: 5 }}
                        />
                        <Text style={{ color: percentageColor(Number(percentage)) }}>
                            {Number(percentage).toFixed(2)}%
                        </Text>
                    </View>
                    <Text>
                        {new Date(date).toDateString()}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#35444e', margin: 16, borderRadius: 10, padding: 16 }}>
            <Text h2 style={{ marginBottom: 16 }}>Details</Text>
            <Row name={'Market Cap Rank'} detail={`#${data.market_cap_rank}`} />
            <Row name={'Market Cap'} detail={numberFormat(data.market_data.market_cap.usd)} />
            <Row name={'fully Diluted Valuation'} detail={numberFormat(data.market_data.fully_diluted_valuation.usd)} />
            <Row name={'Market Cap / TVL Ratio'} detail={data.mcap_to_tvl_ratio} />
            <Row name={'FDV / TVL Ratio'} detail={data.fdv_to_tvl_ratio} />
            <Row name={'24H High'} detail={data.market_data.high_24h.usd} />
            <Row name={'24H Low'} detail={data.market_data.low_24h.usd} />
            <RowAllTime name={'ALL-Time Hihg'} detail={data.market_data.ath.usd} percentage={data.market_data.ath_change_percentage.usd} date={data.market_data.ath_date.usd} />
            <RowAllTime name={'ALL-Time Low'} detail={data.market_data.atl.usd} percentage={data.market_data.atl_change_percentage.usd} date={data.market_data.atl_date.usd} />
        </View>
    )
}

export default DetailsCard