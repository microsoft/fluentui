/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { TooltipHost } from 'office-ui-fabric-react';

const TooltipDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .hover('.ms-TooltipHost')
      .wait(200)
      .snapshot('default')
      .end()
    }
  >
    {story()}
  </Screener>
);

const tooltipStories = {
  decorators: [FabricDecorator, TooltipDecorator],
  stories: {
    'Default': () => (
      <TooltipHost content='This is the tooltip' id='myID' calloutProps={{ gapSpace: 0 }}>
        Hover over me
      </TooltipHost>
    )
  }
};

runStories('Tooltip', tooltipStories);