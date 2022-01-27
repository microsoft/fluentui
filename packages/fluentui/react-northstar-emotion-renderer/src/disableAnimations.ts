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
      // Cast to any to avoid "error TS2590: Expression produces a union type that is too complex to represent"
      (styles as any)[property] = disableAnimations(styles[property] as ICSSInJSStyle);
    }
  }

  return styles;
}
