import MotionDescription from './MotionDescription.md';

export { MotionDefault } from './MotionDefault.stories';

export { CreateAtom as createAtom } from './CreateAtom.stories';
export { CreatePresence as createPresence } from './CreatePresence.stories';

export { PresenceAppear as appear } from './PresenceAppear.stories';
export { PresenceUnmountOnExit as unmountOnExit } from './PresenceUnmountOnExit.stories';

export { ImperativeRefPlayState as setPlayState } from './ImperativeRefPlayState.stories';

export default {
  title: 'Utilities/Motions (Preview)',
  component: null,
  parameters: {
    docs: {
      description: {
        component: MotionDescription,
      },
    },
  },
};
