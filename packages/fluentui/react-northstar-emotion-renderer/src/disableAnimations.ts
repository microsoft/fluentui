import { ICSSInJSStyle } from '@fluentui/styles';
import { isStyleObject } from './utils';

const animationProps: (keyof ICSSInJSStyle)[] = [
  'animation',
  'animationName',
  'animationDuration',
  'animationTimingFunction',
  'animationDelay',
  'animationIterationCount',
  'animationDirection',
  'animationFillMode',
  'animationPlayState',
];

export function disableAnimations(styles: ICSSInJSStyle): ICSSInJSStyle {
  let property: keyof ICSSInJSStyle;

  for (property in styles) {
    if (animationProps.indexOf(property) !== -1) {
      delete styles[property];
    } else if (isStyleObject(styles[property])) {
      styles[property] = disableAnimations(styles[property] as ICSSInJSStyle);
    }
  }

  return styles;
}
