import { HighContrastSelector } from '@fluentui/react/lib/Styling';
import { ILineChartStyleProps, ILineChartStyles } from './LineChart.types';
import { getTooltipStyles } from '../../CartesianChart';

export const getStyles = (props: ILineChartStyleProps): ILineChartStyles => {
  return {
    tooltip: getTooltipStyles(props.theme!),
    markerLabel: {
      selectors: {
        [HighContrastSelector]: {
          fill: 'CanvasText',
        },
      },
    },
  };
};
