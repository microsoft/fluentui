import { AnimationName, callable, ICSSInJSStyle } from '@fluentui/styles';
import * as _ from 'lodash';

/**
 * Fela plugin for invoking keyframes with params. The keyframes, defined in the animationName prop,
 * are called with the params object, if defined in the animationName prop.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
const felaInvokeKeyframesPlugin = (styles: ICSSInJSStyle): ICSSInJSStyle => {
  for (const property in styles) {
    if (_.isPlainObject(styles[property])) {
      if (property === 'animationName') {
        const value = styles[property] as AnimationName;

        if (value.keyframe) {
          styles[property] = callable(value.keyframe)(value.params || {});
        }

        continue;
      }

      styles[property] = felaInvokeKeyframesPlugin(styles[property]);
    }
  }

  return styles;
};

export default felaInvokeKeyframesPlugin;
