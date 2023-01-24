import { ComponentMeta } from '@storybook/react';
import { Box } from '@fluentui/react-northstar';
import BoxDefaultBsize from '../../examples/components/Box/Performance/BoxDefault.bsize';
import BoxShorthandExample from '../../examples/components/Box/Types/BoxExample.shorthand';
import BoxExample from '../../examples/components/Box/Types/BoxExample';

export default { component: Box, title: 'Box' } as ComponentMeta<typeof Box>;

export { BoxDefaultBsize, BoxShorthandExample, BoxExample };
