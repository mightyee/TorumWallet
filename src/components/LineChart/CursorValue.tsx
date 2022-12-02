import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ReText } from 'react-native-redash';
import Animated from 'react-native-reanimated';

interface ICursorValue {
  x: Readonly<Animated.SharedValue<string>>;
  y: Readonly<Animated.SharedValue<string>>;
  isCursorActive?: boolean;
}

const styles = StyleSheet.create({
  valuesContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  variableContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  valueContainer: {
    // width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  value: {
    color: 'white',
    fontSize: 16,
    textAlign: "center",
  },
});

export const CursorValue = ({
  x,
  y,
  isCursorActive = true,
}: ICursorValue): JSX.Element | null => {

  // const date = new Date(price.value)
  // console.log(date.toLocaleDateString('en-US')); // 👉️ "1/20/2022"
  // const formattedPrice = useDerivedValue(() => (date.toLocaleDateString('de-US')));

  return isCursorActive ? (
    <View style={styles.valuesContainer}>
      {/* <View style={styles.variableContainer}>
        <Text style={styles.value}>X:</Text>
      </View>
      <View style={styles.valueContainer}>
        <ReText text={x} style={{ color: "white", textAlign: "center" }} />
      </View> */}

      {/* y value */}

      <View style={styles.variableContainer}>
        <Text style={styles.value}>Y:</Text>
      </View>
      <View style={styles.valueContainer}>
        <ReText text={y} style={{ color: "white", textAlign: "center" }} />
      </View>
    </View>
  ) : null;
};
