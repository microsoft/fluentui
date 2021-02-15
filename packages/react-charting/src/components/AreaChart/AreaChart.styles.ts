import { IAreaChartStyleProps, IAreaChartStyles } from './AreaChart.types';

export const getStyles = (props: IAreaChartStyleProps): IAreaChartStyles => {
  return {
    tooltip: {
      ...props.theme!.fonts.medium,
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      background: props.theme!.semanticColors.bodyBackground,
      borderRadius: '2px',
      pointerEvents: 'none',
    },
  };
};
