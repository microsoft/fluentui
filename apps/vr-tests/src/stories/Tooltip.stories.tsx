/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator, FabricDecoratorFixedWidth } from '../utilities';
import { TooltipHost } from 'office-ui-fabric-react';

storiesOf('Tooltip', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .hover('.ms-TooltipHost')
        .wait(200)
        .snapshot('default')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Default', () => (
    <TooltipHost content="This is the tooltip" id="myID" calloutProps={{ gapSpace: 0 }}>
      Hover over me
    </TooltipHost>
  ));

storiesOf('Tooltip - Multiple', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .hover('#outerTooltip')
        .wait(200)
        .snapshot('hover outer')
        .hover('#innerTooltip')
        .wait(200)
        .snapshot('hover inner')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Two Tooltips', () => (
    <div>
      <TooltipHost content="I am the outer tooltip">
        <div id="outerTooltip">I am the outer tooltip text</div>
        <div id="innerTooltip" style={{ padding: '20px' }}>
          <TooltipHost content="I am the inner tooltip">
            and I am the inner tooltip text
          </TooltipHost>
        </div>
      </TooltipHost>
    </div>
  ));
