import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Rect, Circle, Path } from 'react-native-svg';
import { DrawXaxis } from './DrawXaxis';
import { DrawYaxis } from './DrawYaxis';
import { DrawLine } from './DrawLine';
import { getXYscale } from './getXYscale';
import { generateLinePath } from './generateLinePath';
import { Cursor } from './Cursor';
import * as d3 from 'd3';

import Animated from "react-native-reanimated";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const width = screenWidth * 0.98 - 4;
const height = screenHeight * (5 / 17);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  chartContainer: {
    width,
    height,
    // borderWidth: 1,
  },
  cursorValuesContainer: {
    height: 30,
    width: 180, // 140
    alignItems: 'center',
    // borderWidth: 1,
  },
});

export const LineChart = ({ tickerData }: any): JSX.Element => {

  const { xScale, yScale } = getXYscale({
    width,
    height,
    data: tickerData,
  });


  const { linePath } = generateLinePath({
    xScale,
    yScale,
    width,
    height,
    data: tickerData,
  });


  return (
    <View style={styles.mainContainer}>
      <View style={styles.chartContainer}>
        <Svg width={width} height={height} style={[StyleSheet.absoluteFill]}>
          <G>
            <DrawXaxis xScale={xScale} height={height} width={width} />
            <DrawYaxis yScale={yScale} height={height} width={width} />
          </G>

          <DrawLine
            linePath={`${linePath}`}
            height={height}
            width={width}
          />
        </Svg>
        <Cursor
          linePath={linePath as string}
          xScale={xScale}
          yScale={yScale}
          data={tickerData}
        />
      </View>
    </View>
  );
};
