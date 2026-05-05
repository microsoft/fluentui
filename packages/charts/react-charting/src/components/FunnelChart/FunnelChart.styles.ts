import { FontWeights } from '@fluentui/react/lib/Styling';
import { IFunnelChartStyleProps, IFunnelChartStyles } from './FunnelChart.types';
import { getChartTitleStyle, getSvgTooltipStyle } from '../../utilities/Common.styles';

export const getFunnelChartStyles = (props: IFunnelChartStyleProps): IFunnelChartStyles => {
  const { theme, className, chartWidth, chartHeight } = props;
  return {
    // root: { minHeight: '200px', minWidth: '200px', position: 'relative' },
    root: [
      theme.fonts.medium,
      'ms-FunnelChart',
      {
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
      className,
    ],
    chart: {
      display: 'block',
      width: chartWidth,
      height: chartHeight,
    },
    chartTitle: getChartTitleStyle(theme),
    text: [
      theme.fonts.medium,
      {
        pointerEvents: 'none',
        fontWeight: FontWeights.semibold,
        fill: theme.palette.neutralPrimary,
      },
    ],
    svgTooltip: getSvgTooltipStyle(theme),
    subComponentStyles: {
      calloutStyles: {
        root: {
          maxWidth: '238px',
        },
      },
    },
  };
};
