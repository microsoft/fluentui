import { getGlobalClassNames, HighContrastSelector, AnimationVariables, getFocusStyle } from '../../Styling';
import { getRTL } from '@fluentui/utilities';
import type { ISliderStyleProps, ISliderStyles } from './Slider.types';
import type { IRawStyle } from '../../Styling';

/* eslint-disable deprecation/deprecation */

const tickLabelSpacing = 13;

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
  zeroTick: 'ms-Slider-zeroTick',
  regularTick: 'ms-Slider-regularTick',
  regularLabel: 'ms-Slider-regularLabel',
};

function getHighContrastSelector(systemColor: string): IRawStyle {
  return {
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: systemColor,
      },
    },
  };
}

/** @deprecated */
export const getStyles = (props: ISliderStyleProps): ISliderStyles => {
  const { className, titleLabelClassName, theme, vertical, disabled, showTransitions, showValue } = props;
  const { semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  /** Tokens:
   *   The word "active" in the token refers to the selected section of the slider
   *   The word "inactive" in the token refers to the unselected section of the slider */
  const pressedActiveSectionColor = semanticColors.inputBackgroundCheckedHovered;
  const hoveredActiveSectionColor = semanticColors.inputBackgroundChecked;
  const hoveredPressedinactiveSectionColor = semanticColors.inputPlaceholderBackgroundChecked;
  const restActiveSectionColor = semanticColors.smallInputBorder;
  const restInactiveSectionColor = semanticColors.disabledBorder;

  const disabledActiveSectionColor = semanticColors.disabledText;
  const disabledInactiveSectionColor = semanticColors.disabledBackground;

  const thumbBackgroundColor = semanticColors.inputBackground;
  const thumbBorderColor = semanticColors.smallInputBorder;
  const thumbDisabledBorderColor = semanticColors.disabledBorder;

  const slideBoxActiveSectionStyles = !disabled && {
    backgroundColor: pressedActiveSectionColor,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
      },
    },
  };

  const slideBoxInactiveSectionStyles = !disabled && {
    backgroundColor: hoveredPressedinactiveSectionColor,
    selectors: {
      [HighContrastSelector]: {
        borderColor: 'Highlight',
      },
    },
  };

  const slideHoverSectionStyles = !disabled && {
    backgroundColor: hoveredActiveSectionColor,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
      },
    },
  };

  const slideBoxActiveThumbStyles = !disabled && {
    border: `2px solid ${pressedActiveSectionColor}`,
    selectors: {
      [HighContrastSelector]: {
        borderColor: 'Highlight',
      },
    },
  };

  const slideBoxActiveZeroTickStyles = !props.disabled && {
    backgroundColor: semanticColors.inputPlaceholderBackgroundChecked,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
      },
    },
  };

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        userSelect: 'none',
      },
      vertical && {
        marginRight: 8,
      },
      ...[!disabled ? classNames.enabled : undefined],
      ...[disabled ? classNames.disabled : undefined],
      ...[!vertical ? classNames.row : undefined],
      ...[vertical ? classNames.column : undefined],
      className,
    ],
    titleLabel: [
      {
        padding: 0,
        display: 'inline-block',
      },
      titleLabelClassName,
    ],
    container: [
      classNames.container,
      {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        marginBottom: tickLabelSpacing,
      },
      vertical && {
        flexDirection: 'column',
        height: '100%',
        textAlign: 'center',
        margin: '8px 0',
        paddingBottom: '40px 0',
        marginTop: '40px',
      },
    ],
    slideBox: [
      classNames.slideBox,
      getFocusStyle(theme),
      {
        background: 'transparent',
        border: 'none',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        selectors: {
          [`:active .${classNames.activeSection}`]: slideBoxActiveSectionStyles,
          [`:hover .${classNames.activeSection}`]: slideHoverSectionStyles,
          [`:active .${classNames.inactiveSection}`]: slideBoxInactiveSectionStyles,
          [`:hover .${classNames.inactiveSection}`]: slideBoxInactiveSectionStyles,
          [`:active .${classNames.thumb}`]: slideBoxActiveThumbStyles,
          [`:hover .${classNames.thumb}`]: slideBoxActiveThumbStyles,
          [`:active .${classNames.zeroTick}`]: slideBoxActiveZeroTickStyles,
          [`:hover .${classNames.zeroTick}`]: slideBoxActiveZeroTickStyles,
        },
      },
      vertical
        ? {
            height: '100%',
            width: 28,
            padding: '8px 0', // Make room for thumb at bottom of line
          }
        : {
            height: 28,
            width: 'auto',
            padding: '0 8px', // Make room for thumb at ends of line
          },
      ...[showValue ? classNames.showValue : undefined],
      ...[showTransitions ? classNames.showTransitions : undefined],
    ],
    thumb: [
      classNames.thumb,
      {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: thumbBorderColor,
        borderRadius: 10,
        boxSizing: 'border-box',
        background: thumbBackgroundColor,
        display: 'block',
        width: 16,
        height: 16,
        position: 'absolute',
      },
      vertical
        ? {
            left: -6,
            margin: '0 auto',
            transform: 'translateY(8px)',
          }
        : {
            top: -6,
            transform: getRTL() ? 'translateX(50%)' : 'translateX(-50%)',
          },
      showTransitions && {
        transition: `left ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`,
      },
      disabled && {
        borderColor: thumbDisabledBorderColor,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'GrayText',
          },
        },
      },
    ],
    line: [
      classNames.line,
      {
        display: 'flex',
        position: 'relative',
      },
      vertical
        ? {
            height: '100%',
            width: 4,
            margin: '0 auto',
            flexDirection: 'column-reverse',
          }
        : {
            width: '100%',
          },
    ],
    lineContainer: [
      {
        borderRadius: 4,
        boxSizing: 'border-box',
      },
      vertical
        ? {
            width: 4,
            height: '100%',
          }
        : {
            height: 4,
            width: '100%',
          },
    ],
    activeSection: [
      classNames.activeSection,
      getHighContrastSelector(disabled ? 'GrayText' : 'WindowText'),
      {
        background: restActiveSectionColor,
      },
      showTransitions && {
        transition: `width ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`,
      },
      disabled && {
        background: disabledActiveSectionColor,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'GrayText',
          },
        },
      },
    ],
    inactiveSection: [
      classNames.inactiveSection,
      {
        background: restInactiveSectionColor,
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText',
          },
        },
      },
      showTransitions && {
        transition: `width ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`,
      },
      disabled && {
        background: disabledInactiveSectionColor,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'GrayText',
          },
        },
      },
    ],
    zeroTick: [
      classNames.zeroTick,
      getHighContrastSelector(disabled ? 'GrayText' : 'WindowText'),
      {
        position: 'absolute',
        background: semanticColors.disabledBorder,
      },
      disabled && {
        background: theme.palette.neutralLight,
      },
      vertical
        ? {
            width: '16px',
            height: '1px',
            transform: getRTL() ? 'translateX(6px)' : 'translateX(-6px)',
          }
        : {
            width: '1px',
            height: '16px',
            transform: 'translateY(-6px)',
          },
    ],
    regularLabel: [
      classNames.regularLabel,
      getHighContrastSelector(disabled ? 'GrayText' : 'WindowText'),
      {
        position: 'absolute',
        height: '0px',
        background: theme.palette.neutralTertiaryAlt,
        transform: getRTL() ? 'translateX(50%)' : 'translateX(-50%)',
        marginTop: tickLabelSpacing,
      },
      vertical && {
        margin: '0 auto 20px',
        transform: 'translate(13px,10px)',
      },
      disabled && {
        background: theme.palette.neutralLight,
      },
    ],

    regularTick: [
      classNames.regularTick,
      getHighContrastSelector(disabled ? 'GrayText' : 'WindowText'),
      {
        position: 'absolute',
        background: '#fff',
        width: '2px',
        height: '4px',
        transform: 'translateY(0px)',
      },
      disabled && {
        background: theme.palette.neutralLight,
      },
      vertical && {
        width: '16px',
        height: '1px',
        transform: 'translateX(-6px)',
      },
    ],
    valueLabel: [
      classNames.valueLabel,
      {
        flexShrink: 1,
        lineHeight: '1',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      },
      vertical && {
        margin: '0 auto',
        whiteSpace: 'nowrap',
        width: 40,
      },
    ],
  };
};
