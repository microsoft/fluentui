import * as React from 'react';
import { Meta } from '@storybook/react';

export { CAPBadgeStory as Badge } from './CAPBadge.stories';
export { CAPButtonStory as Button } from './CAPButton.stories';
export { CAPCardStory as Card } from './CAPCard.stories';
export { CAPInputStory as Input } from './CAPInput.stories';
export { CAPMenuStory as Menu } from './CAPMenu.stories';
export { CAPTooltipStory as Tooltip } from './CAPTooltip.stories';

const VisualRefreshStory = () => <div />;

export default {
  title: 'Visual Refresh',
  component: VisualRefreshStory,
  parameters: {},
} as Meta;
