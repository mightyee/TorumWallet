import React from 'react';
import { G, Path } from 'react-native-svg';

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
        <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">

          <Stop offset="0%" stopColor="#cee3f9" />
          <Stop offset="80%" stopColor="transparent" />
          <Stop offset="100%" stopColor="transparent" />
        </LinearGradient>
      </Defs> */}


      <Path
        // key="gradient"
        transform="translate(35,10)"
        d={`${linePath} L ${width - 80} ${height - 41} L 25 ${height - 41}`}
        fill="url(#gradient)"
      />
      <Path
        // key="line"
        transform="translate(35,10)"
        d={linePath}
        fill="transparent"
        strokeWidth={2}
        stroke="#46a2f8"
      />
    </G>
  );
};
