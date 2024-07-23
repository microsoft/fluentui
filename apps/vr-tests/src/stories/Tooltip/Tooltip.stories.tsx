import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { TooltipHost } from '@fluentui/react';

export default {
  title: 'Tooltip',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().hover('.ms-TooltipHost').wait(200).snapshot('default').end()),
  ],
};

export const Default = () => (
  <TooltipHost content="This is the tooltip" id="myID" calloutProps={{ gapSpace: 0 }}>
    Hover over me
  </TooltipHost>
);
