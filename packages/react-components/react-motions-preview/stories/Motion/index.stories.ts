import MotionDescription from './MotionDescription.md';

export { MotionDefault } from './MotionDefault.stories';

export { CreateAtom as createAtom } from './CreateAtom.stories';
export { CreatePresence as createPresence } from './CreatePresence.stories';

export { PresenceAppear as appear } from './PresenceAppear.stories';
export { PresenceUnmountOnExit as unmountOnExit } from './PresenceUnmountOnExit.stories';

export { ImperativeRefPlayState as setPlayState } from './ImperativeRefPlayState.stories';

export { CustomAtom } from './CustomAtom.stories';
export { TokensUsage } from './TokensUsage.stories';
export { MotionFunctions } from './MotionFunctions.stories';

export { MotionLibrary } from './MotionLibrary.stories';

export default {
  title: 'Utilities/Web Motions (Preview)',
  component: null,
  parameters: {
    docs: {
      description: {
        component: MotionDescription,
      },
    },
  },
};
