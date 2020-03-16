import { callable } from '@fluentui/styles';
import * as _ from 'lodash';

/**
 * Fela plugin for invoking keyframes with params. The keyframes, defined in the animationName prop,
 * are called with the params object, if defined in the animationName prop.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
export default () => {
  const invokeKeyframes = (styles: Object) => {
    return Object.keys(styles).reduce((acc, cssPropertyName) => {
      const cssPropertyValue = styles[cssPropertyName];

      if (_.isPlainObject(cssPropertyValue)) {
        if (cssPropertyName === 'animationName') {
          if (cssPropertyValue.keyframe) {
            styles[cssPropertyName] = callable(cssPropertyValue.keyframe)(cssPropertyValue.params || {});
          }

          return {
            ...acc,
            [cssPropertyName]: styles[cssPropertyName],
          };
        }

        return {
          ...acc,
          [cssPropertyName]: invokeKeyframes(cssPropertyValue),
        };
      }

      return { ...acc, [cssPropertyName]: styles[cssPropertyName] };
    }, {});
  };

  return invokeKeyframes;
};
