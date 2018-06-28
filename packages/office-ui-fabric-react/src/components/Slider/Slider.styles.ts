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
  const { className, titleLabel, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const slideBoxActiveSectionStyles = props.rootIsEnabled && {
    backgroundColor: theme.palette.themePrimary,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight'
      }
    }
  };

  const slideBoxInactiveSectionStyles = props.rootIsEnabled && {
    backgroundColor: theme.palette.themeLight,
    selectors: {
      [HighContrastSelector]: {
        borderColor: 'Highlight'
      }
    }
  };

  const slideBoxActiveThumbStyles = props.rootIsEnabled && {
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
      {
        userSelect: 'none'
      },
      props.rootIsVertical && {
        marginRight: 8
      },
      className,
      ...[props.rootIsEnabled ? classNames.enabled : undefined],
      ...[props.rootIsDisabled ? classNames.disabled : undefined],
      ...[props.rootIsHorizontal ? classNames.row : undefined],
      ...[props.rootIsVertical ? classNames.column : undefined]
    ],
    titleLabel: [
      {
        padding: 0
      },
      titleLabel
    ],
    container: [
      classNames.container,
      {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center'
      },
      props.rootIsVertical && {
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
            classNames.thumb,
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
            props.rootIsHorizontal && {
              top: -6,
              transform: getRTL() ? 'translateX(50%)' : 'translateX(-50%)'
            },
            props.rootIsVertical && {
              left: -6,
              margin: '0 auto',
              transform: 'translateY(8px)'
            },
            props.showTransitions && {
              transition: `left ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
            },
            props.rootIsDisabled && {
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
      props.rootIsHorizontal && {
        height: 28,
        width: '100%',
        padding: '0 8px' // Make room for thumb at ends of line
      },
      props.rootIsVertical && {
        height: '100%',
        width: 28,
        padding: '8px 0' // Make room for thumb at bottom of line
      },
      ...[props.showValue ? classNames.showValue : undefined],
      ...[props.showTransitions ? classNames.showTransitions : undefined]
    ],
    thumb: [{}],
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
            props.rootIsHorizontal && {
              height: 4,
              width: '100%'
            },
            props.rootIsVertical && {
              width: 4,
              height: '100%'
            }
          ]
        }
      },
      props.rootIsHorizontal && {
        width: '100%'
      },
      props.rootIsVertical && {
        height: '100%',
        width: 4,
        margin: '0 auto',
        flexDirection: 'column-reverse'
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
      props.rootIsDisabled && {
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
      props.rootIsDisabled && {
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
      props.rootIsHorizontal && {
        margin: '0 8px',
        whiteSpace: 'nowrap',
        width: 40
      },
      props.rootIsVertical && {
        margin: '0 auto',
        whiteSpace: 'nowrap',
        width: 40
      }
    ]
  };
};
