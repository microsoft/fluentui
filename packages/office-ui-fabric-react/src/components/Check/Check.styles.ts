import { ICheckStyleProps, ICheckStyles } from './Check.types';
import { HighContrastSelector, IStyle, IRawStyle, getGlobalClassNames } from '../../Styling';
import { getRTL } from '../../Utilities';

const GlobalClassNames = {
  root: 'ms-Check',
  circle: 'ms-Check-circle',
  check: 'ms-Check-check'
};

export const getStyles = (props: ICheckStyleProps): ICheckStyles => {
  const { height = props.checkBoxHeight || '18px', checked, className, theme } = props;

  const { palette, semanticColors } = theme;
  const isRTL = getRTL();

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const sharedCircleCheck: IStyle = {
    fontSize: height,
    position: 'absolute',
    left: 0,
    top: 0,
    width: height,
    height: height,
    textAlign: 'center',
    verticalAlign: 'middle'
  };

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        // lineHeight currently needs to be a string to output without 'px'
        lineHeight: '1',
        width: height,
        height: height,
        verticalAlign: 'top',
        position: 'relative',
        userSelect: 'none',

        selectors: {
          ':before': {
            content: '""',
            position: 'absolute',
            top: '1px',
            right: '1px',
            bottom: '1px',
            left: '1px',
            borderRadius: '50%',
            opacity: 1,
            background: semanticColors.bodyBackground
          },

          /**
           * TODO: Come back to this once .checkHost has been
           * converted to mergeStyles
           */
          '$checkHost:hover &, $checkHost:focus &, &:hover, &:focus': {
            opacity: 1
          }
        }
      },

      checked && [
        'is-checked',
        {
          selectors: {
            ':before': {
              background: palette.themePrimary,
              opacity: 1,
              selectors: {
                [HighContrastSelector]: {
                  background: 'Window'
                }
              }
            }
          }
        }
      ],
      className
    ],

    circle: [
      classNames.circle,
      sharedCircleCheck,

      {
        color: palette.neutralSecondary,

        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText'
          }
        }
      },

      checked && {
        color: palette.white
      }
    ],

    check: [
      classNames.check,
      sharedCircleCheck,

      {
        opacity: 0,
        color: palette.neutralSecondary,
        fontSize: '16px',
        left: isRTL ? '-0.5px' : '.5px', // for centering the check icon inside the circle.

        selectors: {
          ':hover': {
            opacity: 1
          },

          [HighContrastSelector]: {
            MsHighContrastAdjust: 'none'
          }
        }
      },

      checked && {
        opacity: 1,
        color: palette.white,
        fontWeight: 900,

        selectors: {
          [HighContrastSelector]: {
            border: 'none',
            color: 'WindowText'
          }
        }
      }
    ],

    checkHost: [{}]
  };
};

/**
 * Style which should be applied to the parent element of the check, so that the check's opacity
 * is set when the parent is hovered/focused. This replaces `ICheckStyles.checkHost` because
 * calculating the check styles in the parent component causes an unacceptable perf penalty.
 * (Global class names must be enabled for this to work.)
 */
export const CHECK_HOST_HOVER_STYLE: IRawStyle = {
  selectors: {
    [`:hover, :hover .${GlobalClassNames.root}, :focus, :focus .${GlobalClassNames.root}`]: {
      opacity: 1
    }
  }
};
