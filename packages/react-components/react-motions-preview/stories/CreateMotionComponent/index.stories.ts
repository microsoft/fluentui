import CreateMotionComponentDescription from './CreateMotionComponentDescription.md';

export { CreateMotionComponentDefault as Default } from './CreateMotionComponentDefault.stories';

export { CreateMotionComponent as createMotionComponent } from './CreateMotionComponent.stories';

export { ImperativeRefPlayState as imperativeRef } from './ImperativeRefPlayState.stories';
export { TokensUsage as tokens } from './TokensUsage.stories';

export default {
  title: 'Utilities/Web Motions (Preview)/createMotionComponent',
  component: null,
  parameters: {
    docs: {
      description: {
        component: CreateMotionComponentDescription,
      },
    },
  },
};
