import { ISliderStyleProps, ISliderStyles } from './Slider.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Slider',
  container: 'ms-Slider-container',
  slideBox: 'ms-Slider-slideBox',
  line: 'ms-Slider-line',
  thumb: 'ms-Slider-thumb',
  activeSection: 'ms-Slider-active',
  inactiveSection: 'ms-Slider-inactive',
  valueLabel: 'ms-Slider-value'
};

export const getStyles = (props: ISliderStyleProps): ISliderStyles => {
  const { className, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, {}, className],
    container: [classNames.container, {}],
    slideBox: [classNames.slideBox, {}],
    line: [classNames.line, {}],
    thumb: [classNames.thumb, {}],
    lineContainer: [{}],
    activeSection: [classNames.activeSection, {}],
    inactiveSection: [classNames.inactiveSection, {}],
    valueLabel: [classNames.valueLabel, {}]
  };
};
