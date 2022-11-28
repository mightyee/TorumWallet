import { View, StyleSheet } from 'react-native'
import React from 'react'

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';

interface ISplash {
    isReady: boolean,
    children: React.ReactNode,
}

const AnimatedSplashScreen = ({ isReady, children }: ISplash) => {

    const [isAppReady, setIsAppReady] = React.useState(false);

    React.useEffect(() => {
        // start animation when data loading is complete
        if (isReady) {
            animateSize();
            containerOpacity();

        }
    }, [isReady]);

    const animateSize = () => {
        scale.value = withTiming(
            1,
            {
                duration: 1500,
            },
        );
    };

    const containerOpacity = () => {
        container.value = withTiming(
            0,
            {
                duration: 1500,
            },
            // toggle app ready state when animation is finished
            (isFinished) => {
                if (isFinished) {
                    runOnJS(hideAnimation)();
                }
            }
        );
    };


    const hideAnimation = () => {
        setIsAppReady(true);
    };


    const scale = useSharedValue(0);
    const container = useSharedValue(1);

    // create animated styles
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: scale.value,
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
        opacity: container.value
    }));



    return (
        <View style={{ flex: 1 }}>
            {!isAppReady && (
                <Animated.View
                    style={[animatedContainerStyle, {
                        zIndex: 999,
                        elevation: 9,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: 'black',
                        ...StyleSheet.absoluteFillObject,
                    }]}
                >
                    <Animated.Image source={require('../assest/logo.png')}
                        style={animatedStyle} />
                    {/* </View> */}
                </Animated.View>
            )}

            {children}
        </View>
    )
}

export default AnimatedSplashScreen;