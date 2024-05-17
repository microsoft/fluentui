export { motionTokens, durations, curves } from './motions/motionTokens';

export { createMotionComponent } from './factories/createMotionComponent';
export { createPresenceComponent } from './factories/createPresenceComponent';
export { createVariantComponent } from './factories/createVariantComponent';

export { PresenceGroup } from './components/PresenceGroup';

export type { AtomMotion, AtomMotionFn, PresenceMotion, PresenceMotionFn, MotionImperativeRef } from './types';

export { Collapse, CollapseSnappy, CollapseExaggerated } from './motions/presence/components/Collapse';
export { Fade } from './motions/presence/components/Fade';
export { Scale } from './motions/presence/components/Scale';
