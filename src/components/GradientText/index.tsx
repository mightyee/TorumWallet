import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Text, { PropsGlobalStyle } from '../Text';
import { ViewStyle } from 'react-native';

interface IGradientText extends PropsGlobalStyle {
    text: string,
    style?: ViewStyle;
}

const GradientText = ({ text, style, ...props }: IGradientText) => {
    return (
        <MaskedView maskElement={<Text {...props} style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}>
            <LinearGradient
                start={{ x: 0, y: 0.8 }} end={{ x: 1, y: 1 }} colors={['#7c64cc', '#adf3d5', '#efd87d']}
            >
                <Text {...props} style={[style, { opacity: 0 }]}>{text}</Text>
            </LinearGradient>
        </MaskedView>

    )
}

export default GradientText