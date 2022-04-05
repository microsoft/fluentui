import { mergeStyleSets, HighContrastSelector } from '../../Styling';
import type { IKeytipStyleProps, IKeytipStyles } from './Keytip.types';
import type { ICalloutContentStyleProps, ICalloutContentStyles } from '../../Callout';
import type { IStyleFunction, Point } from '../../Utilities';

export const getStyles = (props: IKeytipStyleProps): IKeytipStyles => {
  const { theme, disabled, visible } = props;
  return {
    container: [
      {
        backgroundColor: theme.palette.neutralDark,
      },
      disabled && {
        opacity: 0.5,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            opacity: 1,
          },
        },
      },
      !visible && {
        visibility: 'hidden',
      },
    ],
    root: [
      theme.fonts.medium,
      {
        textAlign: 'center',
        paddingLeft: '3px',
        paddingRight: '3px',
        backgroundColor: theme.palette.neutralDark,
        color: theme.palette.neutralLight,
        minWidth: '11px',
        lineHeight: '17px',
        height: '17px',
        display: 'inline-block',
      },
      disabled && {
        color: theme.palette.neutralTertiaryAlt,
      },
    ],
  };
};

export const getCalloutStyles = (props: ICalloutContentStyleProps): ICalloutContentStyles => {
  return {
    container: [],
    root: [
      {
        border: 'none',
        boxShadow: 'none',
      },
    ],
    beak: [],
    beakCurtain: [],
    calloutMain: [
      {
        backgroundColor: 'transparent',
      },
    ],
  };
};

export const getCalloutOffsetStyles = (
  offset: Point,
): IStyleFunction<ICalloutContentStyleProps, ICalloutContentStyles> => {
  return (props: ICalloutContentStyleProps): ICalloutContentStyles => {
    return mergeStyleSets(getCalloutStyles(props), {
      root: [
        {
          // eslint-disable-next-line deprecation/deprecation
          marginLeft: offset.left || offset.x,
          // eslint-disable-next-line deprecation/deprecation
          marginTop: offset.top || offset.y,
        },
      ],
    });
  };
};
