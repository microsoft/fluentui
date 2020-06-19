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
  for (const property in styles) {
    if (animationProps.indexOf(property) !== -1) {
      styles[property] = undefined;
    } else if (isStyleObject(property)) {
      styles[property] = disableAnimations(styles[property]);
    }
  }

  return styles;
}
