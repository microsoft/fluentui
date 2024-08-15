import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecoratorFixedWidth } from '../../utilities';
import { TooltipHost } from '@fluentui/react';

export default {
  title: 'Tooltip - Multiple',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    StoryWrightDecorator(
      new Steps()
        .hover('#outerTooltip')
        .wait(200)
        .snapshot('hover outer')
        .hover('#innerTooltip')
        .wait(200)
        .snapshot('hover inner')
        .end(),
    ),
  ],
};

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
