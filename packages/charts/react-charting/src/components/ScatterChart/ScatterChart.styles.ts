import { FontSizes, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { IScatterChartStyleProps, IScatterChartStyles } from './ScatterChart.types';
import { getTooltipStyles } from '../../CartesianChart';

export const getStyles = (props: IScatterChartStyleProps): IScatterChartStyles => {
  return {
    tooltip: getTooltipStyles(props.theme!),
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
