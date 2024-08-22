import { IChartHoverCardStyles, IChartHoverCardStyleProps } from './ChartHoverCard.types';
import { HighContrastSelector, HighContrastSelectorBlack } from '../index';
import { tokens } from '@fluentui/react-theme';

export const getChartHoverCardStyles = (props: IChartHoverCardStyleProps): IChartHoverCardStyles => {
  const { color, XValue, theme, isRatioPresent = false } = props;
  return {
    calloutContentRoot: [
      {
        display: 'grid',
        overflow: 'hidden',
        padding: '11px 16px 10px 16px',
        backgroundColor: tokens.colorNeutralBackground1,
        backgroundBlendMode: 'normal, luminosity',
      },
    ],
    calloutDateTimeContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    calloutContentX: [
      tokens.fontSizeBase100,
      {
        lineHeight: '16px',
        opacity: '0.8',
        color: tokens.colorNeutralForeground2,
      },
    ],
    calloutBlockContainer: [
      tokens.fontSizeHero700,
      {
        marginTop: XValue ? '13px' : 'unset',
        paddingLeft: '8px',
        lineHeight: '22px',
        color: tokens.colorNeutralForeground1,
        borderLeft: `4px solid ${color}`,
        selectors: {
          [HighContrastSelector]: {
            forcedColorAdjust: 'none',
          },
        },
      },
    ],
    calloutlegendText: [
      tokens.fontSizeBase100,
      {
        lineHeight: '16px',
        color: tokens.colorNeutralForeground1,
        selectors: {
          [HighContrastSelectorBlack]: {
            color: 'rgb(255, 255, 255)',
          },
        },
      },
    ],
    calloutContentY: [
      tokens.fontSizeHero700,
      {
        color: color ? color : tokens.colorNeutralForeground1,
        fontWeight: 'bold',
        lineHeight: '36px',
        selectors: {
          [HighContrastSelectorBlack]: {
            color: 'rgb(255, 255, 255)',
          },
        },
      },
    ],
    calloutInfoContainer: [
      isRatioPresent && {
        display: 'flex',
        alignItems: 'flex-end',
      },
    ],
    ratio: [
      tokens.fontSizeBase100,
      {
        marginLeft: '6px',
        color: tokens.colorNeutralForeground1,
      },
    ],
    numerator: {
      fontWeight: tokens.fontWeightBold,
    },
    denominator: {
      fontWeight: tokens.fontWeightSemibold,
    },
    descriptionMessage: [
      tokens.fontSizeBase100,
      {
        color: tokens.colorNeutralForeground1,
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
      },
    ],
  };
};
