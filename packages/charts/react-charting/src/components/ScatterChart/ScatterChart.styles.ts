import { FontSizes, HighContrastSelector } from '@fluentui/react/lib/Styling';
import { IScatterChartStyleProps, IScatterChartStyles } from './ScatterChart.types';

export const getStyles = (props: IScatterChartStyleProps): IScatterChartStyles => {
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
      color: props.theme!.semanticColors.bodyText,
    },
    markerLabel: {
      fontSize: FontSizes.medium,
      fill: props.theme!.semanticColors.bodyText,
      textAnchor: 'middle',
      selectors: {
        [HighContrastSelector]: {
          fill: 'CanvasText',
        },
      },
    },
  };
};
