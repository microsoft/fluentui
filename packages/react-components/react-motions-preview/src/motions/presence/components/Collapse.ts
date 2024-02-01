import { PresenceMotionFn, createPresence } from '@fluentui/react-motions-preview';
// TODO: set up export from @fluentui/react-motions-preview
import { easingDecelerateMid } from '../../../motions/atom/tokens';
import { PresenceOverride, PresenceTransitionName } from '../../../types';

type DurationMS = number;
type EasingString = string;

export type CollapseParams = {
  duration?: DurationMS;
  easing?: EasingString;
};

export const defaults: Required<CollapseParams> = {
  duration: 200,
  easing: easingDecelerateMid,
} as const;

const findPropertyValue = <T, K extends keyof T>(
  propertyName: K,
  objects: (Partial<T> | undefined)[],
): T[K] | undefined => {
  for (const obj of objects) {
    const value = obj?.[propertyName];
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
};

const getOverride = <K extends keyof CollapseParams>(
  propertyName: K,
  transitionName: PresenceTransitionName,
  override: PresenceOverride<CollapseParams> | undefined,
) => {
  return findPropertyValue(propertyName, [override?.[transitionName], override?.all, defaults])!;
};

// Define a presence motion (enter/exit transitions) for collapse/expand
const collapseMotion: PresenceMotionFn<CollapseParams> = ({ element, override }) => {
  const enterKeyframes = [
    { opacity: 0, maxHeight: 0, overflow: 'hidden' },
    // Transition to the height of the content, at 99.99% of the duration.
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, offset: 0.9999 },
    // On completion, remove the maxHeight because the content might need to expand later.
    // This extra keyframe is simpler than firing a callback on completion.
    { opacity: 1, maxHeight: 'unset', overflow: 'hidden' },
  ];

  const exitKeyframes = [
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, overflow: 'hidden' },
    { opacity: 0, maxHeight: 0, overflow: 'hidden' },
  ];

  // TODO: if this override style will be adopted for motion component props,
  // and applied to more custom properties, consider abstracting further
  // to reduce repetitiveness across molecule implementations.
  const durationEnter = getOverride('duration', 'enter', override);
  const durationExit = getOverride('duration', 'exit', override);
  const easingEnter = getOverride('easing', 'enter', override);
  const easingExit = getOverride('easing', 'exit', override);

  // This is the manual approach, replaced by the above `getOverride` utility.
  // const durationEnter = override?.enter?.duration ?? override?.all?.duration ?? defaults.duration;
  // const durationExit = override?.exit?.duration ?? override?.all?.duration ?? defaults.duration;

  // const easingEnter = override?.enter?.easing ?? override?.all?.easing ?? defaults.easing;
  // const easingExit = override?.exit?.easing ?? override?.all?.easing ?? defaults.easing;

  return {
    enter: { duration: durationEnter, easing: easingEnter, keyframes: enterKeyframes },
    exit: { duration: durationExit, easing: easingExit, keyframes: exitKeyframes },
  };
};

// Create a React component that applies collapse/expand transitions to its children
export const Collapse = createPresence(collapseMotion);
