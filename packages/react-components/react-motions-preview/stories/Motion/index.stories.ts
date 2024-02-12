import MotionDescription from './MotionDescription.md';

export { MotionDefault } from './MotionDefault.stories';

export { CreateMotionComponent as createMotionComponent } from './CreateMotionComponent.stories';
export { CreatePresenceComponent as createPresenceComponent } from './CreatePresenceComponent.stories';

export { PresenceAppear as appear } from './PresenceAppear.stories';
export { PresenceUnmountOnExit as unmountOnExit } from './PresenceUnmountOnExit.stories';
export { PresenceOnMotionFinish as onMotionFinish } from './PresenceOnMotionFinish.stories';

export { ImperativeRefPlayState as setPlayState } from './ImperativeRefPlayState.stories';

export { CustomMotion } from './CustomMotion.stories';
export { TokensUsage } from './TokensUsage.stories';
export { MotionFunctions } from './MotionFunctions.stories';

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
