import { serializeStyles } from '@emotion/serialize';
import { EmotionCache } from '@emotion/utils';
import { AnimationName, ICSSInJSStyle } from '@fluentui/styles';

import { isStyleObject } from './utils';

// This code is taken from @emotion/core:
// https://github.com/emotion-js/emotion/blob/a076e7fa5f78fec6515671b78801cfc9d6cf1316/packages/core/src/keyframes.js#L11
const keyframes = (
  cache: EmotionCache,
  keyframe: AnimationName['keyframe'],
  params: AnimationName['params'] = {},
): object => {
  const style = typeof keyframe === 'function' ? keyframe(params) : keyframe;
  const insertable = serializeStyles([style as any], cache.registered, undefined);

  const name = `animation-${insertable.name}`;
  const styles = `@keyframes ${name}{${insertable.styles}}`;

  return {
    name,
    styles,
    anim: 1,
    toString() {
      return `_EMO_${name}_${styles}_EMO_`;
    },
  };
};

/**
 * Allows to transform animations that are defined under "animationName" to keyframes.
 */
export function invokeKeyframes(cache: EmotionCache, styles: ICSSInJSStyle) {
  for (const property in styles) {
    if (isStyleObject(styles[property])) {
      if (property === 'animationName') {
        const style = styles[property] as AnimationName;

        if (style.keyframe) {
          styles[property] = keyframes(cache, style.keyframe, style.params);
        }

        continue;
      }

      styles[property] = invokeKeyframes(cache, styles[property]);
    }
  }

  return styles;
}
