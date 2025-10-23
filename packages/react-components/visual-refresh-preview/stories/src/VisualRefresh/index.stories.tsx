import * as React from 'react';
import { Meta } from '@storybook/react';

export { VisualRefresh } from './VisualRefresh.stories';
export { ButtonVisualRefresh as Button } from './Button.stories';

const Component = () => <div />;

export default {
  title: 'Components/VisualRefresh',
  component: Component,
  parameters: {},
} as Meta;
