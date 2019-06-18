import { ISliderStyleProps, ISliderStyles } from './Slider.types';
import { getGlobalClassNames, HighContrastSelector, AnimationVariables, getFocusStyle } from '../../Styling';
import { getRTL } from '@uifabric/utilities';

const GlobalClassNames = {
  root: 'ms-Slider',
  enabled: 'ms-Slider-enabled',
  disabled: 'ms-Slider-disabled',
  row: 'ms-Slider-row',
  column: 'ms-Slider-column',
  container: 'ms-Slider-container',
  slideBox: 'ms-Slider-slideBox',
  line: 'ms-Slider-line',
  thumb: 'ms-Slider-thumb',
  activeSection: 'ms-Slider-active',
  inactiveSection: 'ms-Slider-inactive',
  valueLabel: 'ms-Slider-value',
  showValue: 'ms-Slider-showValue',
  showTransitions: 'ms-Slider-showTransitions',
  zeroTick: 'ms-Slider-zeroTick'
};

export const getStyles = (props: ISliderStyleProps): ISliderStyles => {
  const { className, titleLabelClassName, theme, vertical, disabled, showTransitions, showValue } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  // Tokens
  const sliderInteractedActiveSectionColor = palette.themePrimary;
  const sliderInteractedInactiveSectionColor = palette.themeLight;
  const sliderRestActiveSectionColor = palette.neutralSecondary;
  const sliderRestInactiveSectionColor = palette.neutralTertiaryAlt;

  const sliderDisabledActiveSectionColor = palette.neutralTertiary;
  const sliderDisabledInactiveSectionColor = palette.neutralLight;

  const sliderThumbBackgroundColor = palette.white;
  const sliderThumbBorderColor = palette.neutralSecondary;
  const sliderThumbDisabledBorderColor = palette.neutralTertiaryAlt;

  const slideBoxActiveSectionStyles = !disabled && {
    backgroundColor: sliderInteractedActiveSectionColor,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight'
      }
    }
  };

  const slideBoxInactiveSectionStyles = !disabled && {
    backgroundColor: sliderInteractedInactiveSectionColor,
    selectors: {
      [HighContrastSelector]: {
        borderColor: 'Highlight'
      }
    }
  };

  const slideBoxActiveThumbStyles = !disabled && {
    border: `2px solid ${sliderInteractedActiveSectionColor}`,
    selectors: {
      [HighContrastSelector]: {
        borderColor: 'Highlight'
      }
    }
  };

  const slideBoxActiveZeroTickStyles = !props.disabled && {
    backgroundColor: theme.palette.themeLight,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight'
      }
    }
  };

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        userSelect: 'none'
      },
      vertical && {
        marginRight: 8
      },
      ...[!disabled ? classNames.enabled : undefined],
      ...[disabled ? classNames.disabled : undefined],
      ...[!vertical ? classNames.row : undefined],
      ...[vertical ? classNames.column : undefined],
      className
    ],
    titleLabel: [
      {
        padding: 0
      },
      titleLabelClassName
    ],
    container: [
      classNames.container,
      {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center'
      },
      vertical && {
        flexDirection: 'column',
        height: '100%',
        textAlign: 'center',
        margin: '8px 0'
      }
    ],
    slideBox: [
      classNames.slideBox,
      getFocusStyle(theme),
      {
        background: 'transparent',
        border: 'none',
        flexGrow: 1,
        lineHeight: 28,
        display: 'flex',
        alignItems: 'center',
        selectors: {
          ':active $activeSection': slideBoxActiveSectionStyles,
          ':hover $activeSection': slideBoxActiveSectionStyles,
          ':active $inactiveSection': slideBoxInactiveSectionStyles,
          ':hover $inactiveSection': slideBoxInactiveSectionStyles,
          ':active $thumb': slideBoxActiveThumbStyles,
          ':hover $thumb': slideBoxActiveThumbStyles,
          ':active $zeroTick': slideBoxActiveZeroTickStyles,
          ':hover $zeroTick': slideBoxActiveZeroTickStyles,
          $thumb: [
            {
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: sliderThumbBorderColor,
              borderRadius: 10,
              boxSizing: 'border-box',
              background: sliderThumbBackgroundColor,
              display: 'block',
              width: 16,
              height: 16,
              position: 'absolute'
            },
            vertical
              ? {
                  left: -6,
                  margin: '0 auto',
                  transform: 'translateY(8px)'
                }
              : {
                  top: -6,
                  transform: getRTL() ? 'translateX(50%)' : 'translateX(-50%)'
                },
            showTransitions && {
              transition: `left ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
            },
            disabled && {
              borderColor: sliderThumbDisabledBorderColor,
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'GrayText'
                }
              }
            }
          ]
        }
      },
      vertical
        ? {
            height: '100%',
            width: 28,
            padding: '8px 0' // Make room for thumb at bottom of line
          }
        : {
            height: 28,
            width: 'auto',
            padding: '0 8px' // Make room for thumb at ends of line
          },
      ...[showValue ? classNames.showValue : undefined],
      ...[showTransitions ? classNames.showTransitions : undefined]
    ],
    thumb: [classNames.thumb],
    line: [
      classNames.line,
      {
        display: 'flex',
        position: 'relative',
        selectors: {
          $lineContainer: [
            {
              borderRadius: 4,
              boxSizing: 'border-box'
            },
            vertical
              ? {
                  width: 4,
                  height: '100%'
                }
              : {
                  height: 4,
                  width: '100%'
                }
          ]
        }
      },
      vertical
        ? {
            height: '100%',
            width: 4,
            margin: '0 auto',
            flexDirection: 'column-reverse'
          }
        : {
            width: '100%'
          }
    ],
    lineContainer: [{}],
    activeSection: [
      classNames.activeSection,
      {
        background: sliderRestActiveSectionColor,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText'
          }
        }
      },
      showTransitions && {
        transition: `width ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
      },
      disabled && {
        background: sliderDisabledActiveSectionColor,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'GrayText',
            borderColor: 'GrayText'
          }
        }
      }
    ],
    inactiveSection: [
      classNames.inactiveSection,
      {
        background: sliderRestInactiveSectionColor,
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText'
          }
        }
      },
      showTransitions && {
        transition: `width ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
      },
      disabled && {
        background: sliderDisabledInactiveSectionColor,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'GrayText'
          }
        }
      }
    ],
    zeroTick: [
      classNames.zeroTick,
      {
        position: 'absolute',
        background: theme.palette.neutralTertiaryAlt,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText'
          }
        }
      },
      props.disabled && {
        background: theme.palette.neutralLight,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'GrayText'
          }
        }
      },
      props.vertical
        ? {
            width: '16px',
            height: '1px',
            transform: getRTL() ? 'translateX(6px)' : 'translateX(-6px)'
          }
        : {
            width: '1px',
            height: '16px',
            transform: 'translateY(-6px)'
          }
    ],
    valueLabel: [
      classNames.valueLabel,
      {
        flexShrink: 1,
        width: 30,
        lineHeight: '1' // using a string here meaning it's relative to the size of the font
      },
      vertical
        ? {
            margin: '0 auto',
            whiteSpace: 'nowrap',
            width: 40
          }
        : {
            margin: '0 8px',
            whiteSpace: 'nowrap',
            width: 40
          }
    ]
  };
};
