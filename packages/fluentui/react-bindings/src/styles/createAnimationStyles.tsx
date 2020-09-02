import { ICSSInJSStyle, ThemePrepared } from '@fluentui/styles';
import { ComponentAnimationProp } from '../styles/types';

// Notice:
// This temporary lives here, will be remove once `animation` prop will be dropped
export const createAnimationStyles = (animation: ComponentAnimationProp, theme: ThemePrepared) => {
  let animationCSSProp: ICSSInJSStyle = {};
  const { animations = {} } = theme;

  if (animation) {
    const animationName = typeof animation === 'string' ? animation : animation.name;
    if (animations[animationName]) {
      const {
        keyframe,
        duration,
        delay,
        direction,
        fillMode,
        iterationCount,
        playState,
        timingFunction,
        keyframeParams,
      } = animations[animationName];

      const animationThemeKeyframeParams = keyframeParams || {};
      const animationPropKeyframeParams = (animation as any).keyframeParams;

      const mergedKeyframeParams =
        typeof animation === 'string' || !animationPropKeyframeParams
          ? animationThemeKeyframeParams
          : { ...animationThemeKeyframeParams, ...(animationPropKeyframeParams || {}) };

      const keyframeDefinition = typeof keyframe === 'string' ? keyframe : { keyframe, params: mergedKeyframeParams };

      if (typeof animation === 'string') {
        animationCSSProp = {
          animationName: keyframeDefinition,
          animationDelay: delay,
          animationDirection: direction,
          animationDuration: duration,
          animationFillMode: fillMode,
          animationIterationCount: iterationCount,
          animationPlayState: playState,
          animationTimingFunction: timingFunction,
        };
      } else {
        animationCSSProp = {
          animationName: keyframeDefinition,
          animationDelay: animation.delay || delay,
          animationDirection: animation.direction || direction,
          animationDuration: animation.duration || duration,
          animationFillMode: animation.fillMode || fillMode,
          animationIterationCount: animation.iterationCount || iterationCount,
          animationPlayState: animation.playState || playState,
          animationTimingFunction: animation.timingFunction || timingFunction,
        };
      }
    } else {
      // animations was not found in the theme object

      // TS issue, it's impossible to assign without this condition
      // eslint-disable-next-line no-lonely-if
      if (typeof animation === 'string') {
        animationCSSProp = { animationName: animation };
      } else {
        animationCSSProp = {
          animationName: animation.name,
          ...(animation.delay && { animationDelay: animation.delay }),
          ...(animation.direction && { animationDirection: animation.direction }),
          ...(animation.duration && { animationDuration: animation.duration }),
          ...(animation.fillMode && { animationFillMode: animation.fillMode }),
          ...(animation.iterationCount && {
            animationIterationCount: animation.iterationCount,
          }),
          ...(animation.playState && { animationPlayState: animation.playState }),
          ...(animation.timingFunction && {
            animationTimingFunction: animation.timingFunction,
          }),
        };
      }
    }
  }
  return animationCSSProp;
};
