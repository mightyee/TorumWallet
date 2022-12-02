import React from 'react';
import { G, Line, Text } from 'react-native-svg';
import * as d3 from 'd3-scale';

interface IDrawYaxis {
  height: number;
  width: number;
  yScale: d3.ScaleLinear<number, number>;
}

export const DrawYaxis = ({ yScale, height, width }: IDrawYaxis): JSX.Element => {
  const numberOfTicks = yScale.ticks().length;
  const ticks = yScale.ticks(numberOfTicks);

  return (
    <G key="yAxis" fill="none" transform="translate(30, 10)">
      {ticks.map(tick => {
        const yTick = yScale(tick);
        return (
          <G
            key={`ya_${tick}_0`}
            opacity="1"
            transform={`translate(0, ${yTick})`}>
            <Line
              key={`ya_${tick}_1`}
              x2={width - 30}//80
              strokeWidth={1}
              opacity="0.3"
              stroke="white"
            />
            <Text fontSize="10" fill="white" x="-25" y="5">
              {tick}
            </Text>
          </G>
        );
      })}
    </G>
  );
};
