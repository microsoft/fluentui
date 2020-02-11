import {
  ComponentAnimationProp,
  unstable_createAnimationStyles as createAnimationStyles,
} from '@fluentui/react-bindings'

export default {
  root: ({ props: p, theme }) => {
    const animation: ComponentAnimationProp = {
      name: p.name,
      keyframeParams: p.keyframeParams,
      duration: p.duration,
      delay: p.delay,
      iterationCount: p.iterationCount,
      direction: p.direction,
      fillMode: p.fillMode,
      playState: p.playState,
      timingFunction: p.timingFunction,
    }

    return createAnimationStyles(animation, theme)
  },
}
