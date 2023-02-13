import { ComponentMeta } from '@storybook/react';
import { Tree } from '@fluentui/react-northstar';
import TreeExclusiveExample from '../../examples/components/Tree/Types/TreeExclusiveExample.shorthand';
import TreeInitiallyOpenExampleShorthand from '../../examples/components/Tree/Usage/TreeInitiallyOpenExample.shorthand';

export default { component: Tree, title: 'Tree' } as ComponentMeta<typeof Tree>;

export { TreeExclusiveExample, TreeInitiallyOpenExampleShorthand };
