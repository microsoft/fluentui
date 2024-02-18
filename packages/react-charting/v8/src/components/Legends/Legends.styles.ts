import { ILegendsStyles, ILegendStyleProps } from './Legends.types';
import { HighContrastSelector, getFocusStyle, IGetFocusStylesOptions, IStyle } from '@fluentui/react/lib/Styling';

export const getStyles = (props: ILegendStyleProps): ILegendsStyles => {
  const { className, theme, isLineLegendInBarChart = false } = props;
  const { palette, fonts } = theme!;
  const options: IGetFocusStylesOptions = {
    inset: undefined,
    position: undefined,
    highContrastStyle: {
      outlineColor: theme!.semanticColors.focusBorder,
    },
    borderColor: 'transparent',
    outlineColor: undefined,
  };
  return {
    root: [
      {
        whiteSpace: 'nowrap',
        width: '100%',
        alignItems: 'center',
        margin: '-8px 0 0 -8px',
      },
      className,
    ],
    legend: [
      getFocusStyle(theme!, options),
      {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        border: 'none',
        padding: '8px',
        background: 'none',
        textTransform: 'capitalize',
      },
    ],
    rect: {
      selectors: {
        [HighContrastSelector]: {
          content: `linear-gradient(to right, ${props.colorOnSelectedState}, ${props.colorOnSelectedState})`,
          opacity: props.colorOnSelectedState === theme!.semanticColors.buttonBackground ? '0.6' : '',
        },
      },
      width: '12px',
      height: isLineLegendInBarChart ? '4px' : '12px',
      backgroundColor: props.stripePattern ? '' : props.colorOnSelectedState,
      marginRight: '8px',
      border: '1px solid',
      borderColor: props.borderColor ? props.borderColor : theme?.semanticColors.buttonBorder,
      content: props.stripePattern
        ? // eslint-disable-next-line @fluentui/max-len
          `repeating-linear-gradient(135deg, transparent, transparent 3px, ${props.colorOnSelectedState} 1px, ${props.colorOnSelectedState} 4px)`
        : '',
    },
    shape: [
      {
        marginRight: '8px',
      },
    ],
    triangle: {
      width: '0',
      height: '0',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '10.4px solid',
      borderTopColor: props.colorOnSelectedState,
      marginRight: '8px',
      opacity:
        props.colorOnSelectedState === theme!.semanticColors.buttonBackground
          ? '0.6'
          : props.opacity
          ? props.opacity
          : '',
      selectors: {
        [HighContrastSelector]: {
          border: '0px',
          height: '10.4px',
          width: '10.4px',
          clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
          backgroundImage: `linear-gradient(to right, ${props.colorOnSelectedState}, ${props.colorOnSelectedState})`,
        } as IStyle,
      },
    },
    text: {
      ...fonts.small,
      lineHeight: '16px',
      color: theme?.semanticColors.bodyText,
      opacity: props.colorOnSelectedState === theme!.semanticColors.buttonBackground ? '0.67' : '',
    },
    hoverChange: {
      width: '12px',
      height: '12px',
      backgroundColor: theme!.semanticColors.buttonBackground,
      marginRight: '8px',
      border: '1px solid',
      borderColor: props.borderColor ? props.borderColor : palette.black,
    },
    overflowIndicationTextStyle: [
      getFocusStyle(theme!, options),
      {
        cursor: 'pointer',
        color: theme?.semanticColors.bodyText,
        ...fonts.small,
        lineHeight: '16px',
        padding: '8px',
      },
    ],
    hoverCardRoot: {
      padding: '8px',
    },
    subComponentStyles: {
      hoverCardStyles: {
        host: [getFocusStyle(theme!, options)],
      },
    },
  };
};
