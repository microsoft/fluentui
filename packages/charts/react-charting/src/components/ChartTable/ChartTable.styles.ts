import { IChartTableStyleProps, IChartTableStyles } from './ChartTable.types';
import { FontWeights, HighContrastSelector } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IChartTableStyleProps): IChartTableStyles => {
  const { theme } = props;
  const { fonts } = theme!;

  return {
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      borderCollapse: 'collapse',
    },
    headerCell: {
      ...fonts.small,
      fontWeight: FontWeights.semibold,
      backgroundColor: theme!.palette.neutralQuaternary,
      color: theme!.semanticColors.bodyText,
      padding: '8px',
      textAlign: 'left',
      border: `2px solid ${theme!.palette.neutralLighter}`,
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: 'Window',
          color: 'WindowText',
        },
      },
    },
    bodyCell: {
      ...fonts.small,
      padding: '8px',
      border: `2px solid ${theme!.palette.neutralLighter}`,
      color: theme!.semanticColors.bodyText,
      textAlign: 'left',
      selectors: {
        [HighContrastSelector]: {
          color: 'WindowText',
        },
      },
    },
  };
};
