import { ISliderStyleProps, ISliderStyles, getFocusStyle, AnimationVariables } from '../..';
import { HighContrastSelector } from '@uifabric/styling';

export const getStyles = (
  props: ISliderStyleProps
): ISliderStyles => {

  const { className, theme, vertical, buttonClassName, showValue, disabled } = props;
  const { palette } = theme;

  return ({
    root: [
      'ms-Slider',
      {
        userSelect: 'none',
        selectors: {
          '&.titleLabel': {
            padding: 0
          }
        }
      },
      vertical && [
        {
          marginRight: 8
        }
      ],
      className,
      disabled ? 'ms-Slider-disabled' : 'ms-Slider-enabled', // @TODO(keco): encapsulate styles
      vertical ? 'ms-Slider-column' : 'ms-Slider-row' // @TODO(keco): encapsulate styles
    ],

    container: [
      'ms-Slider-container',
      {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center'
      },
      vertical && [
        {
          flexDirection: 'column',
          height: '100%',
          textAlign: 'center',
          margin: '8px 0'
        }
      ]
    ],

    showTransitions: [
      // @TODO(keco): Make sure this is conditionally applied
      'ms-Slider-showTransitions',
      {
        selectors: {
          '.thumb': {
            transition: 'left',
            transitionDuration: AnimationVariables.durationValue3,
            transitionTimingFunction: AnimationVariables.easeFunction1
          },
          // @TODO(keco): Is this OK or should we still target .activeSection
          '.ms-Slider-active': {
            transition: 'width',
            transitionDuration: AnimationVariables.durationValue3,
            transitionTimingFunction: AnimationVariables.easeFunction1
          },
          // @TODO(keco): Is this OK or should we still target .inactiveSection
          '.ms-Slider-inactive': {
            transition: 'width',
            transitionDuration: AnimationVariables.durationValue3,
            transitionTimingFunction: AnimationVariables.easeFunction1
          }
        }
      }
    ],

    slideBox: [
      'ms-Slider-slideBox',
      getFocusStyle(theme),
      {
        background: 'transparent',
        border: 'none',
        flexGrow: 1,
        lineHeight: 28
        // (renderedValue === value) && ('ms-Slider-showTransitions ' + styles.showTransitions)
      },
      vertical && [
        {
          height: '100%',
          width: 28,
          padding: '8px 0'
        }
      ],
      !vertical && [
        {
          height: 28,
          padding: '0 8px'
        }
      ],
      buttonClassName,
      showValue && 'ms-Slider-showValue'
    ],

    line: [
      'ms-Slider-line',
      {
        display: 'flex',
        position: 'relative',
        selectors: {
          '.lineContainer': {
            borderRadius: 4,
            boxSizing: 'border-box',
          },
          // @TODO(keco): Verify
          '.line .lineContainer': {
            borderRadius: 4,
            boxSizing: 'border-box'
          }
        }
      },
      vertical && [
        {
          height: '100%',
          width: 4,
          margin: '0 auto',
          flexDirection: 'column-reverse',
          selectors: {
            // @TODO(keco): Verify
            '.line .lineContainer': {
              width: 4,
              height: '100%'
            }
          }
        }
      ],
      !vertical && [
        {
          height: 4,
          width: '100%',
          selectors: {
            // @TODO(keco): Verify
            '.line .lineContainer': {
              height: 4
            }
          }
        }
      ]
    ],

    thumb: [
      'ms-Slider-thumb',
      {
        border: `2px solid ${palette.neutralSecondary}`,
        boxSizing: 'border-box',
        background: palette.white,
        display: 'block',
        width: 16,
        height: 16,
        position: 'absolute',
        borderRadius: 10
      },
      vertical && [
        {
          left: -6,
          margin: '0 auto',
          transform: 'translateY(8px)' // @TODO(keco): JS method alternative?
        }
      ],
      !vertical && [
        {
          top: -6,
          transform: 'translateX(-50%)' // @TODO(keco): JS method alternative?
        }
      ],
      disabled && [
        {
          borderColor: palette.neutralTertiaryAlt,
          selectors: {
            [HighContrastSelector]: {
              borderColor: 'GrayText'
            }
          }
        }
      ]
    ],

    active: [
      'ms-Slider-active',
      {
        background: palette.neutralSecondary,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText'
          }
        }
      },
      disabled && [
        {
          background: palette.neutralTertiaryAlt,
          selectors: {
            [HighContrastSelector]: {
              backgroundColor: 'GrayText',
              borderColor: 'GrayText'
            }
          }
        }
      ]
    ],

    inactive: [
      'ms-Slider-inactive',
      {
        background: palette.neutralTertiaryAlt,
        selectors: {
          [HighContrastSelector]: {
            border: `1px solid WindowText`
          }
        }
      },
      disabled && [
        {
          background: palette.neutralLight,
          selectors: {
            [HighContrastSelector]: {
              backgroundColor: 'GrayText',
              borderColor: 'GrayText'
            }
          }
        }
      ]
    ],

    value: [
      'ms-Slider-value',
      {
        flexShrink: 1,
        width: 30,
        lineHeight: 1
      },
      vertical && [
        {
          margin: '0 auto',
          whiteSpace: 'nowrap',
          width: 40
        }
      ],
      !vertical && [
        {
          margin: '0 8px',
          whiteSpace: 'nowrap',
          width: 40
        }
      ]
    ]
  });
};