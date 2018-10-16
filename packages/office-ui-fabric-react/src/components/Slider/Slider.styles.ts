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
  showTransitions: 'ms-Slider-showTransitions'
};

export const getStyles = (props: ISliderStyleProps): ISliderStyles => {
  const { className, titleLabelClassName, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const slideBoxActiveSectionStyles = !props.disabled && {
    backgroundColor: theme.palette.themePrimary,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight'
      }
    }
  };

  const slideBoxInactiveSectionStyles = !props.disabled && {
    backgroundColor: theme.palette.themeLight,
    selectors: {
      [HighContrastSelector]: {
        borderColor: 'Highlight'
      }
    }
  };

  const slideBoxActiveThumbStyles = !props.disabled && {
    border: `2px solid ${theme.palette.themePrimary}`,
    selectors: {
      [HighContrastSelector]: {
        borderColor: 'Highlight'
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
      props.vertical && {
        marginRight: 8
      },
      ...[!props.disabled ? classNames.enabled : undefined],
      ...[props.disabled ? classNames.disabled : undefined],
      ...[!props.vertical ? classNames.row : undefined],
      ...[props.vertical ? classNames.column : undefined],
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
      props.vertical && {
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
        selectors: {
          ':active $activeSection': slideBoxActiveSectionStyles,
          ':hover $activeSection': slideBoxActiveSectionStyles,
          ':active $inactiveSection': slideBoxInactiveSectionStyles,
          ':hover $inactiveSection': slideBoxInactiveSectionStyles,
          ':active $thumb': slideBoxActiveThumbStyles,
          ':hover $thumb': slideBoxActiveThumbStyles,
          $thumb: [
            {
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: theme.palette.neutralSecondary,
              borderRadius: 10,
              boxSizing: 'border-box',
              background: theme.palette.white,
              display: 'block',
              width: 16,
              height: 16,
              position: 'absolute'
            },
            props.vertical
              ? {
                  left: -6,
                  margin: '0 auto',
                  transform: 'translateY(8px)'
                }
              : {
                  top: -6,
                  transform: getRTL() ? 'translateX(50%)' : 'translateX(-50%)'
                },
            props.showTransitions && {
              transition: `left ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
            },
            props.disabled && {
              borderColor: theme.palette.neutralTertiaryAlt,
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'GrayText'
                }
              }
            }
          ]
        }
      },
      props.vertical
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
      ...[props.showValue ? classNames.showValue : undefined],
      ...[props.showTransitions ? classNames.showTransitions : undefined]
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
            props.vertical
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
      props.vertical
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
        background: theme.palette.neutralSecondary,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText'
          }
        }
      },
      props.showTransitions && {
        transition: `width ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
      },
      props.disabled && {
        background: theme.palette.neutralTertiaryAlt,
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
        background: theme.palette.neutralTertiaryAlt,
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText'
          }
        }
      },
      props.showTransitions && {
        transition: `width ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
      },
      props.disabled && {
        background: theme.palette.neutralLight,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'GrayText',
            borderColor: 'GrayText'
          }
        }
      }
    ],
    valueLabel: [
      classNames.valueLabel,
      {
        flexShrink: 1,
        width: 30,
        lineHeight: '1' // using a string here meaning it's relative to the size of the font
      },
      props.vertical
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
