import { ICSSInJSStyle } from '@fluentui/styles';
import { FelaRenderer, FelaRendererParam } from './types';

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

function isPlainObject(val: any) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

/**
 * Fela plugin for disabling animations. The animations are disabled or not based on the
 * props' disableAnimations param. If the value of the prop is true, all animation related
 * styles are removed.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
export const felaDisableAnimationsPlugin = (
  styles: ICSSInJSStyle,
  type: string,
  renderer?: FelaRenderer,
  props?: Partial<FelaRendererParam>,
): ICSSInJSStyle => {
  if (props && props.disableAnimations && type === 'RULE') {
    return Object.keys(styles).reduce((acc, cssPropertyName: keyof ICSSInJSStyle) => {
      const cssPropertyValue = styles[cssPropertyName];

      if (animationProps.indexOf(cssPropertyName) !== -1) {
        return acc;
      }

      if (isPlainObject(cssPropertyValue)) {
        return {
          ...acc,
          [cssPropertyName]: felaDisableAnimationsPlugin(cssPropertyValue as ICSSInJSStyle, type, renderer, props),
        };
      }

      return { ...acc, [cssPropertyName]: styles[cssPropertyName] };
    }, {});
  }
  return styles;
};
