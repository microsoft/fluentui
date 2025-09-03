import type { Meta } from '@storybook/react';
import CreateMotionComponentDescription from './CreateMotionComponentDescription.md';
import { CreateMotionComponentDefault } from './CreateMotionComponentDefault.stories';

export { CreateMotionComponentDefault as Default } from './CreateMotionComponentDefault.stories';

export { CreateMotionComponentFactory as createMotionComponent } from './CreateMotionComponentFactory.stories';
export { CreateMotionComponentVariantDefault as createMotionComponentVariant } from '../CreateMotionComponentVariant/CreateMotionComponentVariantDefault.stories';

export { CreateMotionComponentImperativeRefPlayState as imperativeRef } from './CreateMotionComponentImperativeRefPlayState.stories';
export { CreateMotionComponentTokensUsage as tokens } from './CreateMotionComponentTokensUsage.stories';

export { CreateMotionComponentLifecycleCallbacks as LifecycleCallbacks } from './CreateMotionComponentLifecycleCallbacks.stories';
export { CreateMotionComponentArrays as arrays } from './CreateMotionComponentArrays.stories';
export { CreateMotionComponentFunctions as functions } from './CreateMotionComponentFunctions.stories';
export { CreateMotionComponentFunctionParams as functionParams } from './CreateMotionComponentFunctionParams.stories';

export default {
  title: 'Motion/APIs/createMotionComponent',
  component: CreateMotionComponentDefault,
  parameters: {
    docs: {
      description: {
        component: CreateMotionComponentDescription,
      },
    },
  },
} satisfies Meta;
