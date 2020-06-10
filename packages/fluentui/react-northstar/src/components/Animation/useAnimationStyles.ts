import {
  UseStylesResult,
  ComponentAnimationProp,
  unstable_getStyles as getStyles,
  unstable_createAnimationStyles as createAnimationStyles,
} from '@fluentui/react-bindings';
import { ThemePrepared } from '@fluentui/styles';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import * as _ from 'lodash';
import { AnimationProps } from './Animation';

const animationCache = new WeakMap<ThemePrepared, Record<string, UseStylesResult>>();
export const animationClassName = 'ui-animation';

const useAnimationStyles = (displayName: string, props: AnimationProps): UseStylesResult => {
  const animation: ComponentAnimationProp = {
    name: props.name,
    keyframeParams: props.keyframeParams,
    duration: props.duration,
    delay: props.delay,
    iterationCount: props.iterationCount,
    direction: props.direction,
    fillMode: props.fillMode,
    playState: props.playState,
    timingFunction: props.timingFunction,
  };

  const { theme, rtl, disableAnimations, renderer } = React.useContext(ThemeContext);

  // TODO: add check for cache enabled
  if (!animationCache.has(theme)) {
    animationCache.set(theme, {});
  }

  const cachePerTheme = animationCache.get(theme);
  const cacheKey = JSON.stringify(animation);

  if (cachePerTheme[cacheKey]) {
    return cachePerTheme[cacheKey];
  }

  const result = getStyles({
    allDisplayNames: [displayName],
    className: animationClassName,
    primaryDisplayName: displayName,
    props: {
      styles: createAnimationStyles(animation, theme),
    },

    disableAnimations,
    renderer,
    rtl,
    performance: {
      enableSanitizeCssPlugin: false,
      enableStylesCaching: false,
      enableVariablesCaching: false,
      enableBooleanVariablesCaching: false,
    },
    saveDebug: _.noop,
    theme,
  });

  cachePerTheme[cacheKey] = result;
  animationCache.set(theme, cachePerTheme);
  return result;
};

export default useAnimationStyles;
