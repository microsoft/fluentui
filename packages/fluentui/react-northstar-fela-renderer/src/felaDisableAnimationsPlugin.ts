import { ICSSInJSStyle, RendererParam } from '@fluentui/styles';
import { Renderer } from './types';

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

/**
 * Fela plugin for disabling animations. The animations are disabled or not based on the
 * props' disableAnimations param. If the value of the prop is true, all animation related
 * styles are removed.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
const felaDisableAnimationsPlugin = (
  styles: ICSSInJSStyle,
  type: string,
  renderer?: Renderer,
  props?: Partial<RendererParam>,
): ICSSInJSStyle => {
  if (props && props.disableAnimations && type === 'RULE') {
    return Object.keys(styles).reduce((acc, cssPropertyName: keyof ICSSInJSStyle) => {
      const cssPropertyValue = styles[cssPropertyName];

      if (animationProps.indexOf(cssPropertyName as string) !== -1) {
        return acc;
      }

      if (typeof cssPropertyValue === 'object') {
        return {
          ...acc,
          [cssPropertyName]: felaDisableAnimationsPlugin(cssPropertyValue, type, renderer, props),
        };
      }

      return { ...acc, [cssPropertyName]: styles[cssPropertyName] };
    }, {});
  }
  return styles;
};

export default felaDisableAnimationsPlugin;
