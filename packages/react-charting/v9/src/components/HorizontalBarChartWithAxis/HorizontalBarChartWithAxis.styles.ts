import { IHorizontalBarChartWithAxisStyleProps, IHorizontalBarChartWithAxisStyles } from '../../index';

export const getStyles = (props: IHorizontalBarChartWithAxisStyleProps): IHorizontalBarChartWithAxisStyles => {
  const { shouldHighlight, theme } = props;
  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
    },

    xAxisTicks: [],

    tooltip: {
      ...theme.fonts.medium,
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      background: theme.semanticColors.bodyBackground,
      borderRadius: '2px',
      pointerEvents: 'none',
    },
  };
};
