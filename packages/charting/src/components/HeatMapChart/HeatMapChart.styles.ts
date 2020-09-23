import { IHeatMapChartStyleProps, IHeatMapChartStyles } from './HeatMapChart.types';

export const getHeatMapChartStyles = (_props: IHeatMapChartStyleProps): IHeatMapChartStyles => {
  return {
    root: {},
    subComponentStyles: {
      cartesianStyles: {},
      calloutStyles: {
        root: {
          maxWidth: '238px',
        },
      },
    },
  };
};
