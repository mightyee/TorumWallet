import {IValue} from './getXYscale';

interface IGetMaxMinValuesR {
  minXvalue: number;
  maxXvalue: number;
  minYvalue: number;
  maxYvalue: number;
}

interface IGetMaxMinValues {
  readonly data: ReadonlyArray<IValue>;
}

export type DataPoint = {
  data: IValue;
};

export const getMaxMinValues = ({data}: any): IGetMaxMinValuesR => {
  if (data?.length) {
    const formattedValues = data.map(
      price => [parseFloat(price[1]), price[0]] as [number, number],
    );

    const allXvalues = formattedValues.map(item => Number(item[1]));
    const allYvalues = formattedValues.map(item => Number(item[0]));

    const minXvalue = Math.min(...allXvalues);
    const maxXvalue = Math.max(...allXvalues);
    const minYvalue = Math.min(...allYvalues);
    const maxYvalue = Math.max(...allYvalues);
    return {minXvalue, maxXvalue, minYvalue, maxYvalue};
  }
  return {minXvalue: 0, maxXvalue: 0, minYvalue: 0, maxYvalue: 0};
};
