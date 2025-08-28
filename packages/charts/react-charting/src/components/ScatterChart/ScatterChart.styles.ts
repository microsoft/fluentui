import { IScatterChartStyleProps, IScatterChartStyles } from './ScatterChart.types';
import { getMarkerLabelStyle, getTooltipStyle } from '../../utilities/index';

export const getStyles = (props: IScatterChartStyleProps): IScatterChartStyles => {
  return {
    tooltip: getTooltipStyle(props.theme!),
    markerLabel: getMarkerLabelStyle(props.theme!),
  };
};
