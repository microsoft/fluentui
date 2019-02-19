/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { HoverCard } from 'office-ui-fabric-react';

const onRenderCardContent = (item: any) => {
  return (
    <div style={{ padding: '10px' }}>
      <div>Card content goes here.</div>
      <div>Test string passed to cards: {item.test}</div>
    </div>
  );
};

const expandingCardProps = {
  onRenderCompactCard: onRenderCardContent,
  onRenderExpandedCard: onRenderCardContent,
  renderData: { test: 'Hello World!' }
};

storiesOf('HoverCard', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-HoverCard-host')
        .snapshot('fully expanded with test content', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory(
    'Root',
    () => (
      <HoverCard
        expandingCardProps={expandingCardProps}
        instantOpenOnClick={true}
        styles={{ host: { fontFamily: 'Segoe UI', fontSize: '14px', color: '#333333' } }}
      >
        Hover over me
      </HoverCard>
    ),
    { rtl: true }
  );
