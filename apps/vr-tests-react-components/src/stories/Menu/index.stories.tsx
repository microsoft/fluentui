import { Menu } from '@fluentui/react-menu';
import { ComponentMeta } from '@storybook/react';
import { TestWrapperDecoratorNoAnimation } from '../../utilities';

export { NestedSubmenusSmallViewportStacked } from './NestedMenuSmallViewportStacked.stories';
export { NestedSubmenusSmallViewportFlipped } from './NestedMenuSmallViewportFlipped.stories';

export default {
  title: 'Menu',
  component: Menu,
  decorators: [TestWrapperDecoratorNoAnimation],
} as ComponentMeta<typeof Menu>;
