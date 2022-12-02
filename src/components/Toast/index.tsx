import React, { useContext, useEffect, useRef } from 'react';
import { useToast } from '../../contexts/ToastContext';
import {
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';

export const Toast = () => {
    const { toast, hide } = useToast()
    const translateYRef = useRef(new Animated.Value(-100));

    useEffect(() => {
        if (toast.visible) {
            Animated.timing(translateYRef.current, {
                duration: 300,
                easing: Easing.ease,
                toValue: 30,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateYRef.current, {
                duration: 450,
                easing: Easing.ease,
                toValue: -100,
                useNativeDriver: true,
            }).start();
        }
    }, [toast]);

    return (
        <Animated.View
            style={[
                styles.toast,
                { transform: [{ translateY: translateYRef.current }], backgroundColor: toast.color || '#76a18a', },
            ]}>
            <TouchableOpacity onPress={hide} style={styles.content}>
                <Text style={styles.toastMessage}> {toast.message}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default Toast;

const styles = StyleSheet.create({
    toast: {
        borderRadius: 4,
        marginHorizontal: 16,
        padding: 4,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 999999,
        elevation: 999999,
        ...(Platform.OS === "web" ? { overflow: "hidden" } : null),

    },
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: 32,
        width: '100%',
    },
    toastMessage: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
        letterSpacing: 0.26,
        marginHorizontal: 10,
    },
});