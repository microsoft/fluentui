import { tokens } from '@fluentui/react-theme';
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
        fontWeight: tokens.fontWeightSemibold,
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
