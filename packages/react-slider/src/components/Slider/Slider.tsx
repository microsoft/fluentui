import * as React from 'react';
import { styled, css, memoizeFunction } from '@uifabric/utilities';
import { getGlobalClassNames, ITheme } from '@uifabric/styling';
import { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';
import { SliderBase } from './Slider.base';
import * as classes from './Slider.scss';

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
};

const getStaticStylesMemoized = memoizeFunction(
  (
    theme: ITheme,
    className: string | undefined,
    disabled: boolean | undefined,
    vertical: boolean | undefined,
    titleLabelClassName: string | undefined,
    showTransition: boolean | undefined,
    showValue: boolean | undefined,
  ) => {
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

    const propClasses = [
      disabled && classes.disabled,
      vertical && classes.vertical,
      disabled ? globalClassNames.disabled : globalClassNames.enabled,
      vertical ? globalClassNames.column : globalClassNames.row,
      showValue && globalClassNames.showValue,
    ];

    return {
      root: css(className, classes.root, globalClassNames.root, ...propClasses),
      container: css(classes.container, globalClassNames.container, ...propClasses),
      slideBox: css(classes.slideBox, globalClassNames.slideBox, ...propClasses),
      line: css(classes.line, globalClassNames.line, ...propClasses),
      thumb: css(classes.thumb, globalClassNames.thumb, ...propClasses),
      activeSection: css(classes.activeSection, globalClassNames.activeSection, ...propClasses),
      inactiveSection: css(classes.inactiveSection, globalClassNames.inactiveSection, ...propClasses),
      lineContainer: css(classes.lineContainer, ...propClasses),
      valueLabel: css(classes.valueLabel, globalClassNames.valueLabel, ...propClasses),
      titleLabel: css(classes.titleLabel, titleLabelClassName, ...propClasses),
      showTransitions: css(globalClassNames.showTransitions, ...propClasses),
      zeroTick: css(classes.zeroTick, globalClassNames.zeroTick, ...propClasses),
    };
  },
);

const getStaticStyles = (props: ISliderStyleProps): Required<ISliderStyles> => {
  const { className, titleLabelClassName, theme, vertical, disabled, showTransitions, showValue } = props;
  return getStaticStylesMemoized(theme, className, disabled, vertical, titleLabelClassName, showTransitions, showValue);
};

export const Slider: React.FunctionComponent<ISliderProps> = styled<ISliderProps, ISliderStyleProps, ISliderStyles>(
  SliderBase,
  getStaticStyles,
  undefined,
  {
    scope: 'Slider',
  },
);
