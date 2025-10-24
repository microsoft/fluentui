import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TestWrapperDecoratorFixedWidth } from '../../utilities';
import { TooltipHost } from '@fluentui/react';

export default {
  title: 'Tooltip - Multiple',

  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: {
      steps: new Steps()
        .hover('#outerTooltip')
        .wait(200)
        .snapshot('hover outer')
        .hover('#innerTooltip')
        .wait(200)
        .snapshot('hover inner')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof TooltipHost>;

export const TwoTooltips = () => (
  <div>
    <TooltipHost content="I am the outer tooltip">
      <div id="outerTooltip">I am the outer tooltip text</div>
      <div id="innerTooltip" style={{ padding: '20px' }}>
        <TooltipHost content="I am the inner tooltip">and I am the inner tooltip text</TooltipHost>
      </div>
    </TooltipHost>
  </div>
);
