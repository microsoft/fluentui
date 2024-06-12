import CreateMotionComponentDescription from './CreateMotionComponentDescription.md';

export { CreateMotionComponentDefault as Default } from './CreateMotionComponentDefault.stories';

export { CreateMotionComponent as createMotionComponent } from './CreateMotionComponent.stories';

export { ImperativeRefPlayState as imperativeRef } from './ImperativeRefPlayState.stories';
export { TokensUsage as tokens } from './TokensUsage.stories';

export { MotionLifecycleCallbacks as LifecycleCallbacks } from './MotionLifecycleCallbacks.stories';
export { MotionArrays as arrays } from './MotionArrays.stories';
export { MotionFunctions as functions } from './MotionFunctions.stories';
export { MotionFunctionParams as functionParams } from './MotionFunctionParams.stories';

export default {
  title: 'Utilities/Motion/createMotionComponent',
  component: null,
  parameters: {
    docs: {
      description: {
        component: CreateMotionComponentDescription,
      },
    },
  },
};
