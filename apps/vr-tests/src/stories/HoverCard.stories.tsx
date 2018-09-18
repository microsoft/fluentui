/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, TestWrapperDecorator, runStories } from '../utilities';
import { HoverCard } from 'office-ui-fabric-react';

const onRenderCompactCard = (item: any) => {
  return (
    <div>
      Content
    </div>
  );
};

const expandingCardProps = {
  onRenderCompactCard: onRenderCompactCard,
  renderData: 'New York'
};

const hoverCardStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'Root': () => (
      <HoverCard
        expandingCardProps={expandingCardProps}
        instantOpenOnClick={true}
      >
        Hover over me
      </HoverCard>
    )
  }
};

runStories('HoverCard', hoverCardStories);