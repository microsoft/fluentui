import { ComponentMeta } from '@storybook/react';
import { Animation } from '@fluentui/react-northstar';
import AnimationExample from '../../examples/components/Animation/Types/AnimationExample.shorthand';
import AnimationExampleDelay from '../../examples/components/Animation/Types/AnimationExampleDelay.shorthand';
import AnimationExampleDirection from '../../examples/components/Animation/Types/AnimationExampleDirection.shorthand';
import AnimationExampleDuration from '../../examples/components/Animation/Types/AnimationExampleDuration.shorthand';
import AnimationExampleFillMode from '../../examples/components/Animation/Types/AnimationExampleFillMode.shorthand';
import AnimationExampleIterationCount from '../../examples/components/Animation/Types/AnimationExampleIterationCount.shorthand';
import AnimationExampleTimingFunction from '../../examples/components/Animation/Types/AnimationExampleTimingFunction.shorthand';
import AnimationExampleVisible from '../../examples/components/Animation/Usage/AnimationExampleVisible.shorthand';

export default { component: Animation, title: 'Animation' } as ComponentMeta<typeof Animation>;

export {
  AnimationExample,
  AnimationExampleDelay,
  AnimationExampleDirection,
  AnimationExampleDuration,
  AnimationExampleFillMode,
  AnimationExampleIterationCount,
  AnimationExampleTimingFunction,
  AnimationExampleVisible,
};
