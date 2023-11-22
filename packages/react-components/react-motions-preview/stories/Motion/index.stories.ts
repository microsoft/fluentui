import MotionDescription from './MotionDescription.md';

export { MotionDefault } from './MotionDefault.stories';

export { CreateAtom as createAtom } from './CreateAtom.stories';
export { CreateTransition as createTransition } from './CreateTransition.stories';

export { TransitionAppear as appear } from './TransitionAppear.stories';
export { TransitionUnmountOnExit as unmountOnExit } from './TransitionUnmountOnExit.stories';

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
