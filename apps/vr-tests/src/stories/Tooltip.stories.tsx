import * as React from 'react';
import { Steps } from 'storywright';
import {
  StoryWrightDecorator,
  TestWrapperDecorator,
  TestWrapperDecoratorFixedWidth,
} from '../utilities';
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
TwoTooltips.decorators = [TestWrapperDecoratorFixedWidth];
TwoTooltips.parameters = {
  steps: new Steps()
    .hover('#outerTooltip')
    .wait(200)
    .snapshot('hover outer')
    .hover('#innerTooltip')
    .wait(200)
    .snapshot('hover inner')
    .end(),
};
