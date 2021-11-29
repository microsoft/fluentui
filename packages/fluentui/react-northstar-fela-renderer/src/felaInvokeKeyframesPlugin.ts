import { AnimationKeyFrame, callable, ICSSInJSStyle } from '@fluentui/styles';
import * as _ from 'lodash';

/**
 * Fela plugin for invoking keyframes with params. The keyframes, defined in the animationName prop,
 * are called with the params object, if defined in the animationName prop.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
export const felaInvokeKeyframesPlugin = (styles: ICSSInJSStyle): ICSSInJSStyle => {
  return Object.keys(styles).reduce((acc: ICSSInJSStyle, cssPropertyName: keyof ICSSInJSStyle) => {
    const cssPropertyValue = styles[cssPropertyName];

    if (_.isPlainObject(cssPropertyValue)) {
      if (cssPropertyName === 'animationName') {
        const animationDefinition = cssPropertyValue as AnimationKeyFrame;

        if (animationDefinition.keyframe) {
          styles[cssPropertyName] = callable(animationDefinition.keyframe)(animationDefinition.params || {});
        }

        acc[cssPropertyName] = styles[cssPropertyName];
        return acc;
      }

      // Without casting to any TSC gives "Expression produces a union type that is too complex to represent" error
      (acc as any)[cssPropertyName] = felaInvokeKeyframesPlugin(cssPropertyValue as ICSSInJSStyle);
      return acc;
    }

    (acc as any)[cssPropertyName] = styles[cssPropertyName];
    return acc;
  }, {});
};
