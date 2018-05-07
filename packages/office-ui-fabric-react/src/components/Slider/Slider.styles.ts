import { ISliderStyleProps, ISliderStyles } from './Slider.types';
import { getGlobalClassNames  } from '../..';

const GlobalClassNames = {
  root: 'ms-Slider',
  container: 'ms-Slider-container',
  slideBox: 'ms-Slider-slideBox',
  line: 'ms-Slider-line',
  thumb: 'ms-Slider-thumb',
  active: 'ms-Slider-active',
  inactive: 'ms-Slider-inactive',
  value: 'ms-Slider-value'
};

export const getStyles = (props: ISliderStyleProps): ISliderStyles => {

  const { className, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return ({
    root: [
      classNames.root,
      {},
      className
    ],
    container: [
      classNames.container,
      {}
    ],
    slideBox: [
      classNames.slideBox,
      {}
    ],
    line: [
      classNames.line,
      {}
    ],
    thumb: [
      classNames.thumb,
      {}
    ],
    active: [
      classNames.active,
      {}
    ],
    inactive: [
      classNames.inactive,
      {}
    ],
    value: [
      classNames.value,
      {}
    ]
  });
};
