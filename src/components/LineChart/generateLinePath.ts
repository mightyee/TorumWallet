import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import {IValue} from './getXYscale';

interface IGenerateLinePath {
  readonly data: ReadonlyArray<IValue>;
  xScale: d3Scale.ScaleLinear<number, number>;
  yScale: d3Scale.ScaleLinear<number, number>;
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
  const formattedValues = data.map(
    price => [parseFloat(price[1]), price[0]] as [number, number],
  );
  const prices = formattedValues.map(value => value[1]);
  const dates = formattedValues.map(value => value[0]);

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const minY = Math.min(...dates);
  const maxY = Math.max(...dates);

  const scaleX = d3Scale
    .scaleLinear()
    .domain([min, max])
    .range([10, width - 80])
    .nice();

  const scaleY = d3Scale
    .scaleLinear()
    .domain([Math.min(...dates), Math.max(...dates)])
    .range([height - 50, 0])
    .nice();

  const line = d3Shape
    .line<IValue>()
    .x(([, x]) => scaleX(Number(x))) // set the x values for the line generator
    .y(([y]) => scaleY(Number(y))) // set the y values for the line generator
    .curve(d3Shape.curveMonotoneX); // apply smoothing to the line

  return {linePath: line(formattedValues)};
};
