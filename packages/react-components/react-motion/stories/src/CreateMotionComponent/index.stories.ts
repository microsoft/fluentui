import type { Meta } from '@storybook/react';
import CreateMotionComponentDescription from './CreateMotionComponentDescription.md';
import { MotionComponent } from './utils.stories';

export { CreateMotionComponentDefault as Default } from './CreateMotionComponentDefault.stories';

export { CreateMotionComponent as createMotionComponent } from './CreateMotionComponent.stories';

export { ImperativeRefPlayState as imperativeRef } from './ImperativeRefPlayState.stories';
export { TokensUsage as tokens } from './TokensUsage.stories';

export { MotionLifecycleCallbacks as LifecycleCallbacks } from './MotionLifecycleCallbacks.stories';
export { MotionArrays as arrays } from './MotionArrays.stories';
export { MotionFunctions as functions } from './MotionFunctions.stories';
export { MotionFunctionParams as functionParams } from './MotionFunctionParams.stories';

export default {
  title: 'Motion/APIs/createMotionComponent',
  component: MotionComponent,
  parameters: {
    docs: {
      description: {
        component: CreateMotionComponentDescription,
      },
    },
  },
} satisfies Meta;
