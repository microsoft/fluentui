import { IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles } from '../../index';
import { getBarLabelStyle, getTooltipStyle } from '../../utilities/index';

export const getStyles = (props: IGroupedVerticalBarChartStyleProps): IGroupedVerticalBarChartStyles => {
  const { theme, href } = props;
  return {
    opacityChangeOnHover: {
      cursor: href ? 'pointer' : 'default',
    },
    tooltip: getTooltipStyle(theme),
    barLabel: getBarLabelStyle(theme),
  };
};
