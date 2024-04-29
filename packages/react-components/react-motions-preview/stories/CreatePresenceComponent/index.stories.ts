import CreatePresenceComponentDescription from './CreatePresenceComponentDescription.md';

export { CreatePresenceComponentDefault as Default } from './CreatePresenceComponentDefault.stories';

export { CreatePresenceComponent as createPresenceComponent } from './CreatePresenceComponent.stories';

export { PresenceAppear as appear } from './PresenceAppear.stories';
export { PresenceUnmountOnExit as unmountOnExit } from './PresenceUnmountOnExit.stories';
export { PresenceOnMotionFinish as onMotionFinish } from './PresenceOnMotionFinish.stories';

export { MotionFunctions as functions } from './MotionFunctions.stories';

export default {
  title: 'Utilities/Web Motions (Preview)/createPresenceComponent',
  component: null,
  parameters: {
    docs: {
      description: {
        component: CreatePresenceComponentDescription,
      },
    },
  },
};
