import React from 'react';
import { G, Line, Text } from 'react-native-svg';
import * as d3 from 'd3-scale';

interface IDrawXaxis {
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number>;
}

export const DrawXaxis = ({
  xScale,
  width,
  height,
}: IDrawXaxis): JSX.Element => {

  const numberOfTicks = xScale.ticks().length;
  const ticks = xScale.ticks(numberOfTicks / 2);

  return (
    <G key="xAxis" fill="none" transform={`translate(35, ${height - 30})`}>
      {/* <Line stroke="white" x1="0" y1="0" x2={width - 80} y2="0" opacity="0.3" /> */}
      {ticks.map(tick => {
        const xTick = xScale(tick);
        const date = new Date(tick);


        let d = new Date(tick);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);

        return (
          <G
            key={`xa_${tick}_0`}
            opacity="1"
            transform={`translate(${xTick}, 0)`}>
            {/* <Line
              key={`xa_${tick}_1`}
              y2={5}
              opacity="0.3"
              strokeWidth={1}
              stroke="white"
            /> */}
            <Text fontSize="12" fill="white" y="20" x="-8">
              {ye}
            </Text>
          </G>
        );
      })}
    </G>
  );
};
