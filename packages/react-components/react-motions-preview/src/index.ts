import * as atom from './motions/atom';
import * as presence from './motions/presence';

export { createAtom } from './factories/createAtom';
export { createPresence } from './factories/createPresence';

export { atom, presence };
export type { AtomMotion, AtomMotionFn, PresenceMotion, PresenceMotionFn, MotionImperativeRef } from './types';

export { Collapse } from './motions/presence/components/Collapse';
export { Fade } from './motions/presence/components/Fade';
