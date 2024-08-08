import { Meta } from '@storybook/react';
import { Tree } from '@fluentui/react-northstar';
import TreeExclusiveExample from '../../examples/components/Tree/Types/TreeExclusiveExample.shorthand';
import TreeInitiallyOpenExampleShorthand from '../../examples/components/Tree/Usage/TreeInitiallyOpenExample.shorthand';

export default { component: Tree, title: 'Tree' } as Meta<typeof Tree>;

export { TreeExclusiveExample, TreeInitiallyOpenExampleShorthand };
