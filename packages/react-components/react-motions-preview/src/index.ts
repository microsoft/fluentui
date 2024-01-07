import * as atom from './motions/atom';
import * as presence from './motions/presence';

export { createAtom } from './factories/createAtom';
export { createPresence } from './factories/createPresence';

export { atom, presence };
export type { AtomMotion, PresenceMotion, MotionImperativeRef } from './types';
