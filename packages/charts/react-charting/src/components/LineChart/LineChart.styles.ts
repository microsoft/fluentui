import { ILineChartStyleProps, ILineChartStyles } from './LineChart.types';
import { getMarkerLabelStyle, getTooltipStyle } from '../../utilities/index';

export const getStyles = (props: ILineChartStyleProps): ILineChartStyles => {
  return {
    tooltip: getTooltipStyle(props.theme!),
    markerLabel: getMarkerLabelStyle(props.theme!),
  };
};
