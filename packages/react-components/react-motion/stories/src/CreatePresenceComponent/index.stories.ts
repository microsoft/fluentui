import type { Meta } from '@storybook/react';
import CreatePresenceComponentDescription from './CreatePresenceComponentDescription.md';
import { PresenceComponent } from './utils.stories';

export { CreatePresenceComponentDefault as Default } from './CreatePresenceComponentDefault.stories';

export { CreatePresenceComponent as createPresenceComponent } from './CreatePresenceComponent.stories';

export { PresenceAppear as appear } from './PresenceAppear.stories';
export { PresenceUnmountOnExit as unmountOnExit } from './PresenceUnmountOnExit.stories';
export { PresenceLifecycleCallbacks as LifecycleCallbacks } from './PresenceLifecycleCallbacks.stories';

export { PresenceMotionArrays as arrays } from './PresenceMotionArrays.stories';
export { PresenceMotionFunctions as functions } from './PresenceMotionFunctions.stories';
export { PresenceMotionFunctionParams as functionParams } from './PresenceMotionFunctionParams.stories';

export default {
  title: 'Motion/APIs/createPresenceComponent',
  component: PresenceComponent,
  parameters: {
    docs: {
      description: {
        component: CreatePresenceComponentDescription,
      },
    },
  },
} satisfies Meta;
