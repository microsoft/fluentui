import { IAreaChartStyleProps, IAreaChartStyles } from './AreaChart.types';
import { getTooltipStyles } from '../../utilities';

export const getStyles = (props: IAreaChartStyleProps): IAreaChartStyles => {
  return {
    tooltip: getTooltipStyles(props.theme!),
  };
};
