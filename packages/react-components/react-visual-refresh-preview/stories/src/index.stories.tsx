import * as React from 'react';
import { Meta } from '@storybook/react';

export { ButtonStory as Button } from './Button.stories';
export { TooltipStory as Tooltip } from './Tooltip.stories';

const VisualRefreshStory = () => <div />;

export default {
  title: 'Visual Refresh',
  component: VisualRefreshStory,
  parameters: {},
} as Meta;
