import { IAreaChartStyleProps, IAreaChartStyles } from './AreaChart.types';
import { getTooltipStyle } from '../../utilities/index';

export const getStyles = (props: IAreaChartStyleProps): IAreaChartStyles => {
  return {
    tooltip: getTooltipStyle(props.theme!),
  };
};
