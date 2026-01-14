import { IHorizontalBarChartWithAxisStyleProps, IHorizontalBarChartWithAxisStyles } from '../../index';
import { FontWeights, HighContrastSelector } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IHorizontalBarChartWithAxisStyleProps): IHorizontalBarChartWithAxisStyles => {
  const { shouldHighlight, theme } = props;
  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
    },

    xAxisTicks: [],

    barLabel: {
      fontSize: theme.fonts.small.fontSize,
      fontWeight: FontWeights.semibold,
      fill: theme.semanticColors.bodyText,
      [HighContrastSelector]: {
        stroke: 'CanvasText',
      },
    },
  };
};
