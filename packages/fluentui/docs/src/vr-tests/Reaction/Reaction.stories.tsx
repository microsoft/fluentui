import { ComponentMeta } from '@storybook/react';
import { Reaction } from '@fluentui/react-northstar';
import ReactionGroupExampleRtl from '../../examples/components/Reaction/Rtl/ReactionExample.rtl';
import ReactionExample from '../../examples/components/Reaction/Types/ReactionExample.shorthand';
import ReactionGroupExample from '../../examples/components/Reaction/Types/ReactionGroupExample.shorthand';

export default { component: Reaction, title: 'Reaction' } as ComponentMeta<typeof Reaction>;

export { ReactionGroupExampleRtl, ReactionExample, ReactionGroupExample };
