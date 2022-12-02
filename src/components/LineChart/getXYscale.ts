import * as d3Scale from 'd3-scale';
import {getMaxMinValues} from './getMaxMinValues';

// export interface IValue
export type IValue = [number, number][];

interface IGetScaleFunction {
  domain: Array<number>;
  range: Array<number>;
}
const getD3ScaleFunction = ({
  domain,
  range,
}: IGetScaleFunction): d3Scale.ScaleLinear<number, number> => {
  return d3Scale
    .scaleLinear()
    .domain(domain) // input
    .range(range) // output
    .nice(); // will round the domain to ‘nice’ round values
};

interface IgetXYscale {
  width: number;
  height: number;
  data: any;
}

interface IgetXYscaleR {
  xScale: d3Scale.ScaleLinear<number, number>;
  yScale: d3Scale.ScaleLinear<number, number>;
}

export const getXYscale = ({
  width,
  height,
  data,
}: IgetXYscale): IgetXYscaleR => {
  const {minXvalue, maxXvalue, minYvalue, maxYvalue} = getMaxMinValues({
    data,
  });

  // const formattedValues = data.map(
  //   price => [parseFloat(price[1]), price[0]] as [number, number],
  // );

  const formattedValues = data.map(
    ([x, y]) => [parseFloat(y), x] as [number, number],
  );

  const prices = formattedValues.map(value => value[1]);
  const dates = formattedValues.map(value => value[0]);

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const minY = Math.min(...dates);
  const maxY = Math.max(...dates);

  const xScale = getD3ScaleFunction({
    domain: [min, max], // 30 -> fixed max X to avoid x scale dynamic ticks change
    range: [0, width - 30], //80
  });
  const yScale = getD3ScaleFunction({
    domain: [minY, maxY], // 18 -> fixed max Y to avoid x scale dynamic ticks change
    range: [height - 50, 0],
  });

  return {
    xScale,
    yScale,
  };
};
