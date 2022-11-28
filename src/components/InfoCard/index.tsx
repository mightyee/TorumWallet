import React from 'react'
import Text, { PropsGlobalStyle } from '../Text';
import { View, ViewStyle } from 'react-native';

interface IInfoCard {
    data: any,
}

const InfoCard = ({ data, ...props }: IInfoCard) => {

    function massageData(data: any) {
        if (data.lenght == 0) return <Text numberOfLines={1}>-</Text>;

        let reducedData = data
            .reduce(function (acc, value) {
                if (value !== '') {
                    acc.push(value);
                }
                return acc;
            }, [])
            .map(page => <Text numberOfLines={1}>{page ? page : '-'}</Text>);

        if (reducedData.length == 0) return <Text numberOfLines={1}>--</Text>;

        return reducedData;
    }


    return (
        <>
            <View style={{ backgroundColor: '#35444e', margin: 16, borderRadius: 10, padding: 16 }}>
                <Text h2 style={{ marginBottom: 16 }}>Information</Text>
                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View style={{ flex: 0.5 }}>
                        <Text>Homepage</Text>
                    </View>
                    <View style={{ marginLeft: "auto", alignItems: "flex-end", flex: 0.5 }}>
                        {massageData(data.links.homepage)}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View style={{ flex: 0.5 }}>
                        <Text>blockchain_site</Text>
                    </View>
                    <View style={{ marginLeft: "auto", alignItems: "flex-end", flex: 0.5 }}>
                        {massageData(data.links.blockchain_site)}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View style={{ flex: 0.5 }}>
                        <Text>official_forum_url</Text>
                    </View>
                    <View style={{ marginLeft: "auto", alignItems: "flex-end", flex: 0.5 }}>
                        {massageData(data.links.official_forum_url)}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View style={{ flex: 0.5 }}>
                        <Text>Announcement</Text>
                    </View>
                    <View style={{ marginLeft: "auto", alignItems: "flex-end", flex: 0.5 }}>

                        {massageData(data.links.announcement_url)}
                    </View>
                </View>
            </View>

            <View style={{ margin: 16 }}>
                <Text>{data.description.en}</Text>
            </View>
        </>
    )
}

export default InfoCard