import { Menu } from '@fluentui/react-menu';
import { ComponentMeta } from '@storybook/react';

export { NestedSubmenusSmallViewportStacked } from './NestedMenuSmallViewportStacked.stories';
export { NestedSubmenusSmallViewportFlipped } from './NestedMenuSmallViewportFlipped.stories';

export default {
  title: 'Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;
