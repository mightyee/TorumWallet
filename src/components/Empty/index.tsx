import React from 'react'
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import GradientText from '../GradientText';

interface IEmpty {
    name: string,
    message: string
}
const Empty = ({ name = 'wallet', message = 'Empty' }: IEmpty) => {
    return (
        <Container>
            <Icon name={name} size={60} color='grey' style={{
                transform: [{ rotate: "30deg" }],
                padding: 20
            }} />
            <GradientText h1 text="Empty List" />
        </Container>

    )
}

const Container = styled.View`
    flex:1;
    background-color: ${props => props.theme.colors.background};
    justify-content: center;
    align-items: center;
`

export default Empty;