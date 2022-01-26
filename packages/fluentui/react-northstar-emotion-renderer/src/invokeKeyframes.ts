import { serializeStyles } from '@emotion/serialize';
import { EmotionCache } from '@emotion/utils';
import { AnimationKeyFrame, AnimationName, ICSSInJSStyle } from '@fluentui/styles';

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
  let property: keyof ICSSInJSStyle;

  for (property in styles) {
    if (isStyleObject(styles[property])) {
      if (property === 'animationName') {
        const style = styles[property] as AnimationName;

        if (style.keyframe) {
          styles[property] = keyframes(cache, style.keyframe, style.params);
          continue;
        }

        styles[property] = keyframes(cache, style as AnimationKeyFrame, style.params);
        continue;
      }

      // Cast to any to avoid "error TS2590: Expression produces a union type that is too complex to represent"
      (styles as any)[property] = invokeKeyframes(cache, styles[property] as ICSSInJSStyle);
    }
  }

  return styles;
}
