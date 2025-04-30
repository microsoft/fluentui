import { ILegendsStyles, ILegendStyleProps } from './Legends.types';
import { HighContrastSelector, getFocusStyle, IGetFocusStylesOptions, IStyle } from '@fluentui/react/lib/Styling';

// Constants needed to create legends using SVG for image export
export const LEGEND_CONTAINER_MARGIN_TOP = 8;
export const LEGEND_CONTAINER_MARGIN_START = 12;
export const LEGEND_PADDING = 8;
export const LEGEND_HEIGHT = 32;
export const LEGEND_SHAPE_BORDER = 1;
const LEGEND_SHAPE_SIZE_WITHOUT_BORDER = 12;
// SVG strokes are drawn centered around the path, with half of the stroke width extending inward
// (overlapping the fill area) and half outward. To ensure the filled area maintains its intended size,
// expand the shape accordingly.
export const LEGEND_SHAPE_SIZE = LEGEND_SHAPE_SIZE_WITHOUT_BORDER + LEGEND_SHAPE_BORDER;
export const LEGEND_SHAPE_MARGIN_END = 8;
export const INACTIVE_LEGEND_TEXT_OPACITY = 0.67;

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
        padding: `${LEGEND_PADDING}px`,
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
      width: `${LEGEND_SHAPE_SIZE_WITHOUT_BORDER}px`,
      height: isLineLegendInBarChart ? '4px' : `${LEGEND_SHAPE_SIZE_WITHOUT_BORDER}px`,
      backgroundColor: props.stripePattern ? '' : props.colorOnSelectedState,
      marginRight: `${LEGEND_SHAPE_MARGIN_END}px`,
      border: `${LEGEND_SHAPE_BORDER}px solid`,
      borderColor: props.borderColor ? props.borderColor : theme?.semanticColors.buttonBorder,
      content: props.stripePattern
        ? // eslint-disable-next-line @fluentui/max-len
          `repeating-linear-gradient(135deg, transparent, transparent 3px, ${props.colorOnSelectedState} 1px, ${props.colorOnSelectedState} 4px)`
        : '',
    },
    shape: [
      {
        marginRight: `${LEGEND_SHAPE_MARGIN_END}px`,
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
      opacity:
        props.colorOnSelectedState === theme!.semanticColors.buttonBackground ? `${INACTIVE_LEGEND_TEXT_OPACITY}` : '',
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
        padding: `${LEGEND_PADDING}px`,
      },
    ],
    hoverCardRoot: {
      padding: '8px',
      position: 'relative',
      overflowY: 'auto',
      maxHeight: '300px',
    },
    subComponentStyles: {
      hoverCardStyles: {
        host: [getFocusStyle(theme!, options)],
      },
    },
  };
};
