import { FontSizes, FontWeights, IStyle, ITheme } from '@fluentui/react';
import { IPolarChartStyleProps, IPolarChartStyles } from './PolarChart.types';

export const getStyles = (props: IPolarChartStyleProps): IPolarChartStyles => {
  const { theme } = props;

  return {
    root: {
      ...theme.fonts.medium,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      textAlign: 'left',
    },

    chart: {
      display: 'block',
    },

    gridLineInner: [
      {
        opacity: 0.2,
      },
      getGridLineStyle(theme),
    ],

    gridLineOuter: [
      {
        opacity: 1,
      },
      getGridLineStyle(theme),
    ],

    tickLabel: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
      fill: theme.palette.neutralPrimary,
    },

    legendContainer: {
      width: '100%',
    },
  };
};

const getGridLineStyle = (theme: ITheme): IStyle => {
  return {
    fill: 'none',
    stroke: theme.palette.neutralPrimary,
    strokeWidth: '1px',
  };
};
