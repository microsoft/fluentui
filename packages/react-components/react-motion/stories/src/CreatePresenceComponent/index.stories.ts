import type { Meta } from '@storybook/react';

import CreatePresenceComponentDescription from './CreatePresenceComponentDescription.md';
import { CreatePresenceComponentDefault } from './CreatePresenceComponentDefault.stories';

export { CreatePresenceComponentDefault as Default } from './CreatePresenceComponentDefault.stories';

export { CreatePresenceComponentFactory as createPresenceComponent } from './CreatePresenceComponentFactory.stories';
export { CreatePresenceComponentInAndOut as InAndOut } from './CreatePresenceComponentInAndOut.stories';

export { CreatePresenceComponentAppear as appear } from './CreatePresenceComponentAppear.stories';
export { CreatePresenceComponentReducedMotion as reducedMotion } from './CreatePresenceComponentReducedMotion.stories';
export { CreatePresenceComponentUnmountOnExit as unmountOnExit } from './CreatePresenceComponentUnmountOnExit.stories';
export { CreatePresenceComponentLifecycleCallbacks as LifecycleCallbacks } from './CreatePresenceComponentLifecycleCallbacks.stories';

export { CreatePresenceComponentArrays as arrays } from './CreatePresenceComponentArrays.stories';
export { CreatePresenceComponentFunctions as functions } from './CreatePresenceComponentFunctions.stories';
export { CreatePresenceComponentFunctionParams as functionParams } from './CreatePresenceComponentFunctionParams.stories';

export default {
  title: 'Motion/APIs/createPresenceComponent',
  component: CreatePresenceComponentDefault,
  parameters: {
    docs: {
      description: {
        component: CreatePresenceComponentDescription,
      },
    },
  },
} satisfies Meta;
