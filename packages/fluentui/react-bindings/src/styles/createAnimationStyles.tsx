import { ICSSInJSStyle, ThemePrepared } from '@fluentui/styles';
import { ComponentAnimationProp } from '../styles/types';

// Notice:
// This temporary lives here, will be remove once `animation` prop will be dropped
export const createAnimationStyles = (animation: ComponentAnimationProp, theme: ThemePrepared) => {
  let animationCSSProp: ICSSInJSStyle;

  const { animations = {} } = theme;
  const animationName = animation.name;

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
    const animationPropKeyframeParams = animation.keyframeParams;

    const mergedKeyframeParams = animationPropKeyframeParams
      ? { ...animationThemeKeyframeParams, ...(animationPropKeyframeParams || {}) }
      : animationThemeKeyframeParams;

    const keyframeDefinition =
      typeof keyframe === 'string' ? keyframe : ({ keyframe, params: mergedKeyframeParams } as any);

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
  } else {
    // animations was not found in the theme object

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

  return animationCSSProp;
};
