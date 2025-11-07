import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TestWrapperDecorator } from '../../utilities';
import { TooltipHost } from '@fluentui/react';

export default {
  title: 'Tooltip',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().hover('.ms-TooltipHost').wait(200).snapshot('default').end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof TooltipHost>;

export const Default = () => (
  <TooltipHost content="This is the tooltip" id="myID" calloutProps={{ gapSpace: 0 }}>
    Hover over me
  </TooltipHost>
);
