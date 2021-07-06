import { IHeatMapChartStyleProps, IHeatMapChartStyles } from './HeatMapChart.types';

export const getHeatMapChartStyles = (props: IHeatMapChartStyleProps): IHeatMapChartStyles => {
  const { theme } = props;
  return {
    root: {},
    text: [
      theme.fonts.medium,
      {
        pointerEvents: 'none',
        fill: theme.palette.white,
      },
    ],
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
