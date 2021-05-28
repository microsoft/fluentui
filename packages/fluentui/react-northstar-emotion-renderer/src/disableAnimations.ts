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
    if (animationProps.indexOf(property as keyof ICSSInJSStyle) !== -1) {
      delete styles[property as keyof ICSSInJSStyle];
    } else if (isStyleObject(property)) {
      styles[property as keyof ICSSInJSStyle] = disableAnimations(
        styles[property as keyof ICSSInJSStyle] as ICSSInJSStyle,
      );
    }
  }

  return styles;
}
