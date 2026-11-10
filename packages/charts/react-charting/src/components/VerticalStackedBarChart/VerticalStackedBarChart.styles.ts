import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';
import { getBarLabelStyle, getTooltipStyle } from '../../utilities/index';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { shouldHighlight, href, theme } = props;
  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
    },
    tooltip: getTooltipStyle(theme),
    barLabel: getBarLabelStyle(theme),
  };
};
