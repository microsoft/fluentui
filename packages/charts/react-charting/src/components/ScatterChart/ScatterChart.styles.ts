import { FontSizes, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { IScatterChartStyleProps, IScatterChartStyles } from './ScatterChart.types';
import { getTooltipStyle } from '../../utilities/index';

export const getStyles = (props: IScatterChartStyleProps): IScatterChartStyles => {
  return {
    tooltip: getTooltipStyle(props.theme!),
    markerLabel: {
      fontSize: FontSizes.medium,
      fill: props.theme!.semanticColors.bodyText,
      textAnchor: 'middle',
      selectors: {
        [HighContrastSelector]: {
          fill: 'CanvasText',
        },
      },
    },
  };
};
