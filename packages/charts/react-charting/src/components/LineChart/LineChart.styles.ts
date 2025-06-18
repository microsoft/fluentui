import { HighContrastSelector } from '@fluentui/react/lib/Styling';
import { ILineChartStyleProps, ILineChartStyles } from './LineChart.types';
import { getTooltipStyle } from '../../utilities/index';

export const getStyles = (props: ILineChartStyleProps): ILineChartStyles => {
  return {
    tooltip: getTooltipStyle(props.theme!),
    markerLabel: {
      selectors: {
        [HighContrastSelector]: {
          fill: 'CanvasText',
        },
      },
    },
  };
};
