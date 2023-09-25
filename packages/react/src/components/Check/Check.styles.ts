import { HighContrastSelector, getGlobalClassNames, IconFontSizes, getHighContrastNoAdjustStyle } from '../../Styling';
import { getRTL } from '../../Utilities';
import type { ICheckStyleProps, ICheckStyles } from './Check.types';
import type { IStyle } from '../../Styling';

export const CheckGlobalClassNames = {
  root: 'ms-Check',
  circle: 'ms-Check-circle',
  check: 'ms-Check-check',
  /** Must be manually applied to the parent element of the check. */
  checkHost: 'ms-Check-checkHost',
};

export const getStyles = (props: ICheckStyleProps): ICheckStyles => {
  // eslint-disable-next-line deprecation/deprecation
  const { height = props.checkBoxHeight || '18px', checked, className, theme } = props;

  const { palette, semanticColors, fonts } = theme;
  const isRTL = getRTL(theme);

  const classNames = getGlobalClassNames(CheckGlobalClassNames, theme);

  const sharedCircleCheck: IStyle = {
    fontSize: height,
    position: 'absolute',
    left: 0,
    top: 0,
    width: height,
    height,
    textAlign: 'center',
    // inline-flex prevents the check from shifting with custom line height styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
  };

  return {
    root: [
      classNames.root,
      fonts.medium,
      {
        // lineHeight currently needs to be a string to output without 'px'
        lineHeight: '1',
        width: height,
        height,
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
            background: semanticColors.bodyBackground,
          },

          [`.${classNames.checkHost}:hover &, .${classNames.checkHost}:focus &, &:hover, &:focus`]: {
            opacity: 1,
          },
        },
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
                  background: 'Window',
                },
              },
            },
          },
        },
      ],
      className,
    ],

    circle: [
      classNames.circle,
      sharedCircleCheck,

      {
        color: palette.neutralSecondary,

        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText',
          },
        },
      },

      checked && {
        color: palette.white,
      },
    ],

    check: [
      classNames.check,
      sharedCircleCheck,

      {
        opacity: 0,
        color: palette.neutralSecondary,
        fontSize: IconFontSizes.medium,
        left: isRTL ? '-0.5px' : '.5px', // for centering the check icon inside the circle.
        top: '-1px', // the check is slightly lower than center compared to the circle.

        selectors: {
          ':hover': {
            opacity: 1,
          },

          [HighContrastSelector]: {
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      checked && {
        opacity: 1,
        color: palette.white,
        fontWeight: 900,

        selectors: {
          [HighContrastSelector]: {
            border: 'none',
            color: 'WindowText',
          },
        },
      },
    ],

    checkHost: classNames.checkHost,
  };
};
