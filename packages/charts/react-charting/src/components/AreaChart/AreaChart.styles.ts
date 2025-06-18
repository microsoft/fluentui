import { IAreaChartStyleProps, IAreaChartStyles } from './AreaChart.types';
import { getTooltipStyles } from '../../CartesianChart';

export const getStyles = (props: IAreaChartStyleProps): IAreaChartStyles => {
  return {
    tooltip: getTooltipStyles(props.theme!),
  };
};
