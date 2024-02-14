import * as atom from './motions/atom';
import * as presence from './motions/presence';

export { createAtom } from './factories/createAtom';
export { createPresence } from './factories/createPresence';

export { createGroupAtom } from './factories/createGroupAtom';
export { createSequenceAtom } from './factories/createSequenceAtom';

export { atom, presence };
export type { AtomMotion, AtomMotionFn, PresenceMotion, PresenceMotionFn, MotionImperativeRef } from './types';
