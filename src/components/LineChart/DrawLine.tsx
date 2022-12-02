import React from 'react';
import { G, Path, LinearGradient, Defs, Stop } from 'react-native-svg';

interface IDrawLine {
  linePath: string;
  width: number;
  height: number;
}

export const DrawLine = ({
  linePath,
  width,
  height
}: IDrawLine): JSX.Element => {
  return (
    <G>
      {/* <Defs>
        <LinearGradient id="gradient" x1="50%" y1="0%" x2="0%" y2="0%">
          <Stop offset="0%" stopColor="#cee3f9" stop-opacity='0.7' />
          <Stop offset="80%" stopColor="#ddedfa" stop-opacity='0.3' />
          <Stop offset="100%" stopColor="#ddedfa" stop-opacity='0.1' />
        </LinearGradient>
      </Defs>
      <Path
        key="gradient"
        transform="translate(35,10)"
        d={`${linePath} L ${width - 30} ${height - 41} L 25 ${height - 41}`}
        fill="url(#gradient)" //url(#gradient)
      /> */}
      <Path
        key="line"
        transform="translate(35,10)"
        d={linePath}
        fill="transparent"
        strokeWidth={2}
        stroke="#46a2f8"
      />
    </G>
  );
};
