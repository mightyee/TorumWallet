

import { ActivityIndicator } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';

interface ILoader {
    value?: "large" | 'small'
    color?: string
}

const Loader = ({ value, color }: ILoader) => {
    return (
        <Container>
            <ActivityIndicator size={value ? value : 'large'} color={color ? color : "#7c64cc"} />
        </Container>
    )
}

export default Loader;

const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.background};
    justify-content: center;
    align-items: center;
`