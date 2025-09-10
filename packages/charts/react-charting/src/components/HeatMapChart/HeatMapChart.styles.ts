import { FontWeights } from '@fluentui/react/lib/Styling';
import { IHeatMapChartStyleProps, IHeatMapChartStyles } from './HeatMapChart.types';

export const getHeatMapChartStyles = (props: IHeatMapChartStyleProps): IHeatMapChartStyles => {
  const { theme } = props;
  return {
    root: {},
    text: [
      theme.fonts.medium,
      {
        pointerEvents: 'none',
        fontWeight: FontWeights.semibold,
      },
    ],
    subComponentStyles: {},
  };
};
