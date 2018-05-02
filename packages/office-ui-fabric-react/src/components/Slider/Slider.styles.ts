import { ISliderStyleProps, ISliderStyles, getFocusStyle, AnimationVariables, getGlobalClassNames } from '../..';
import { HighContrastSelector } from '@uifabric/styling';

const GlobalClassNames = {
  root: 'ms-Slider',
  container: 'ms-Slider-container',
  showTransitions: 'ms-Slider-showTransitions',
  slideBox: 'ms-Slider-slideBox',
  line: 'ms-Slider-line',
  thumb: 'ms-Slider-thumb',
  active: 'ms-Slider-active',
  inactive: 'ms-Slider-inactive',
  value: 'ms-Slider-value'
};

export const getStyles = (props: ISliderStyleProps): ISliderStyles => {

  const { className, theme, vertical, buttonClassName, showValue, disabled } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  // @TODO(keco): Do we need to apply .rootIsDisabled / .rootIsEnabled classes for backwards-compat?
  return ({
    root: [
      classNames.root,
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
      disabled && [
        {
          selectors: {
            '.thumb': {
              borderColor: palette.neutralTertiaryAlt,
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'GrayText'
                }
              }
            },
            // @TODO(keco): Is this OK or should we still target .activeSection
            '.ms-Slider-active': {
              background: palette.neutralTertiaryAlt,
              selectors: {
                [HighContrastSelector]: {
                  backgroundColor: 'GrayText',
                  borderColor: 'GrayText'
                }
              }
            },
            // @TODO(keco): Is this OK or should we still target .inactiveSection
            '.ms-Slider-inactive': {
              background: palette.neutralLight,
              selectors: {
                [HighContrastSelector]: {
                  backgroundColor: 'GrayText',
                  borderColor: 'GrayText'
                }
              }
            }
          }
        }
      ],
      className,
      disabled ? 'ms-Slider-disabled' : 'ms-Slider-enabled', // @TODO(keco): encapsulate styles
      vertical ? 'ms-Slider-column' : 'ms-Slider-row' // @TODO(keco): encapsulate styles
    ],

    container: [
      classNames.container,
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
      classNames.showTransitions,
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
      classNames.slideBox,
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
      !disabled && [
        {
          selectors: {
            ':hover, :active': { // @TODO(keco): Doesn't seem to work w/ .thumb?
              selectors: {
                '.thumb': {
                  border: `2px solid ${palette.themePrimary}`,
                  selectors: {
                    [HighContrastSelector]: {
                      borderColor: 'Highlight'
                    }
                  }
                },
                '.ms-Slider-active': { // @TODO(keco): Used ms- prefix instead of .activeSection
                  backgroundColor: palette.themePrimary,
                  selectors: {
                    [HighContrastSelector]: {
                      borderColor: 'Highlight'
                    }
                  }
                },
                '.ms-Slider-inactive': { // @TODO(keco): Used ms-prefix instead of .inactiveSection
                  backgroundColor: palette.themeLight,
                  selectors: {
                    [HighContrastSelector]: {
                      borderColor: 'Highlight'
                    }
                  }
                }
              }
            },
            ':active': {
              selectors: {
                '.thumb': {
                  border: `2px solid ${palette.themeDarkAlt}`
                },
                '.activeSection': {
                  backgroundColor: palette.themeDarkAlt
                }
              }
            }
          }
        }
      ],
      buttonClassName,
      showValue && 'ms-Slider-showValue'
    ],

    line: [
      classNames.line,
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
      classNames.thumb,
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
      classNames.active,
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
      classNames.inactive,
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
      classNames.value,
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