

import { View, ActivityIndicator } from 'react-native'
import React from 'react'

interface ILoader {
    value?: "large" | 'small'
    color?: string
}
const Loader = ({ value, color }: ILoader) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#1B232A', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={value ? value : 'large'} color={color ? color : "#7c64cc"} />
        </View>
    )
}

export default Loader;