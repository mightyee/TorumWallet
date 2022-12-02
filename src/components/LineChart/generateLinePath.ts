import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import {IValue} from './getXYscale';

interface IGenerateLinePath {
  readonly data: ReadonlyArray<IValue>;
  xScale: d3Scale.ScaleLinear<number, number>;
  yScale: d3Scale.ScaleTime<number, number>;
}
interface IGenerateLinePathR {
  linePath: string | null;
}

export const generateLinePath = ({
  xScale,
  yScale,
  width,
  height,
  data,
}: any): IGenerateLinePathR => {
  // const formattedValues = data.map(
  //   price => [parseFloat(price[1]), price[0]] as [number, number],
  // );

  const formattedValues = data.map(
    ([x, y]) => [parseFloat(y.toFixed(2)), parseFloat(x)] as [number, number],
  );
  console.log('data', data);

  console.log('formattedValues', formattedValues);

  const prices = formattedValues.map(value => value[1]);
  const dates = formattedValues.map(value => value[0]);

  console.log('price', prices);
  console.log('dates', dates);

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const minY = Math.min(...dates);
  const maxY = Math.max(...dates);

  console.log('min', min);
  console.log('max', max);

  console.log('minY', minY);
  console.log('maxY', maxY);

  const scaleX = d3Scale
    .scaleLinear()
    .domain([min, max])
    .range([0, width - 30]) //width - 30
    .nice();

  const scaleY = d3Scale
    .scaleTime()
    .domain([minY, maxY])
    .range([height - 50, 20]) //    .range([height - 50, 0])
    .nice();

  const line = d3Shape
    .line()
    .x(([, x]) => scaleX(Number(x))) // set the x values for the line generator
    .y(([y]) => scaleY(Number(y.toFixed(2)))) // set the y values for the line generator
    .defined(([x, y]) => typeof y === 'number')
    .curve(d3Shape.curveMonotoneX)(formattedValues) as string; // apply smoothing to the line
  // console.log('line', line);
  // console.log('linePath', line);

  return {linePath: line};
};
