import { createPresenceComponent } from '../../../factories/createPresenceComponent';
import { durations, curves } from '../../motionTokens';
import { PresenceMotionFn, PresenceOverrideFields, PresenceTransitionProps } from '../../../types';
import { createPresenceVariant } from '../../../factories/createPresenceVariant';

const { durationSlow, durationNormal, durationUltraFast } = durations;
const { curveEasyEaseMax } = curves;

const duration = durationNormal;
const easing = curveEasyEaseMax;

// There may be Collapse-specific parameters in the future, e.g. for partial collapse
type CollapseParams = PresenceOverrideFields;

export const defaults: Required<PresenceTransitionProps<CollapseParams>> = {
  enter: { duration, easing },
  exit: { duration, easing },
} as const;

// Define a presence motion (enter/exit transitions) for collapse/expand
const collapseMotion: PresenceMotionFn<CollapseParams> = ({
  element,
  enter: enterOverride,
  exit: exitOverride,
  animateOpacity = true,
}) => {
  const fromOpacity = animateOpacity ? 0 : 1;
  const toOpacity = 1;
  const fromHeight = '0'; // Could be a custom param in the future: start partially expanded
  const toHeight = `${element.scrollHeight}px`;
  const overflow = 'hidden';

  const enterKeyframes = [
    { opacity: fromOpacity, maxHeight: fromHeight, overflow },
    // Transition to the height of the content, at 99.99% of the duration.
    { opacity: toOpacity, maxHeight: toHeight, offset: 0.9999, overflow },
    // On completion, remove the maxHeight because the content might need to expand later.
    // This extra keyframe is simpler than firing a callback on completion.
    { opacity: toOpacity, maxHeight: 'unset', overflow },
  ];

  const exitKeyframes = [
    { opacity: toOpacity, maxHeight: toHeight, overflow },
    { opacity: fromOpacity, maxHeight: fromHeight, overflow },
  ];

  return {
    enter: { ...defaults.enter, ...enterOverride, keyframes: enterKeyframes },
    exit: { ...defaults.exit, ...exitOverride, keyframes: exitKeyframes },
  };
};

/** A React component that applies collapse/expand transitions to its children. */
export const Collapse = createPresenceComponent(collapseMotion);

export const CollapseSnappy = createPresenceVariant({
  component: Collapse,
  override: { all: { duration: durationUltraFast } },
});

export const CollapseExaggerated = createPresenceVariant({
  component: Collapse,
  override: {
    enter: { duration: durationSlow, easing: curveEasyEaseMax },
    exit: { duration: durationNormal, easing: curveEasyEaseMax },
  },
});

// Support default <Collapse> plus variants like <Collapse.Snappy>
// const WithVariants = Object.assign(Collapse, { Snappy, Gentle, Pushy: Exaggerated });

// export { WithVariants as Collapse };
