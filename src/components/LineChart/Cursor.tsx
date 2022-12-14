import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { getYForX, parse } from 'react-native-redash';
import { CursorValue } from './CursorValue';
import { getMaxMinValues } from './getMaxMinValues';
import { IValue } from './getXYscale';
import * as d3Scale from 'd3-scale';

const CURSOR = 40;
const cursorOutherColor = 'rgba(141, 226, 222, 0.1)';
const cursorInnerColor = 'white';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: cursorOutherColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursorBody: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: cursorInnerColor,
  },
  panArea: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
  },
  cursorValuesContainer: {
    height: 30,
    width: 140,
    alignItems: 'center',
    position: 'absolute',
    top: -30,
    // borderWidth: 1,
  },
});

interface CursorProps {
  linePath: string;
  xScale: d3Scale.ScaleLinear<number, number>;
  yScale: d3Scale.ScaleLinear<number, number>;
  readonly data: ReadonlyArray<IValue>;
}

export const Cursor = ({
  linePath,
  yScale,
  xScale,
  data,
}: any): JSX.Element => {


  const formattedValues = data.map(
    (price) => [parseFloat(price[1]), price[0]] as [number, number]
  );
  const prices = formattedValues.map((value) => value[1]);
  const dates = formattedValues.map((value) => value[0]);

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const minY = Math.min(...prices);
  const maxY = Math.max(...prices);
  const GRAPH_HEIGHT = 400;
  const GRAPH_WIDTH = 360;


  const maxXvalueScaled = xScale(max);
  const minXvalueScaled = xScale(min);
  const maxYvalueScaled = yScale(maxY);
  const minYvalueScaled = yScale(minY);

  const parsedPath = parse(linePath);

  // define variables for animation
  const isActive = useSharedValue(false);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  // get x and y values when dragging cursor along the curve (path)
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true;
    },
    onActive: event => {
      // limit cursor for min and max X value
      translationX.value =
        event.x > minXvalueScaled
          ? event.x > maxXvalueScaled
            ? maxXvalueScaled
            : event.x
          : minXvalueScaled;

      translationY.value = Number(getYForX(parsedPath, translationX.value));
    },
    onEnd: () => {
      isActive.value = false;
    },
  });

  // cursor pointer animation -> movement and scale
  const styleAnimatedCursor = useAnimatedStyle(() => {
    const translateX = Number(translationX.value) - CURSOR / 2 + 35;
    const translateY = Number(translationY.value) - CURSOR / 2 + 10;
    return {
      transform: [
        { translateX },
        { translateY },
        { scale: withSpring(isActive.value ? 1 : 0) },
      ],
    };
  });

  // values animation
  const styleAnimatedValues = useAnimatedStyle(() => {
    return {
      opacity: withSpring(isActive.value ? 1 : 0),
    };
  });

  const x = useDerivedValue(() => {
    return interpolate(
      translationX.value,
      [0, maxXvalueScaled],
      [0, max],
    ).toFixed(2);
  }, [translationX]);

  const y = useDerivedValue(() => {
    return interpolate(
      translationY.value,
      [minYvalueScaled, maxYvalueScaled],
      [minY, maxY],
    ).toFixed(2);
  }, [translationY]);

  return (
    <View style={styles.mainContainer}>
      <Animated.View
        style={[styles.cursorValuesContainer, styleAnimatedValues]}>
        <CursorValue x={x} y={y} />
      </Animated.View>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={styles.panArea}>
          <Animated.View style={[styles.cursor, styleAnimatedCursor]}>
            <View style={styles.cursorBody} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
