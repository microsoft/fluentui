/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { SearchBox } from '@fluentui/react';
import { FabricDecorator } from '../utilities';

// FabricDecorator isn't added at the top level so that the full SearchBox can be rendered without a parent div

storiesOf('SearchBox', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-SearchBox-field')
        .hover('.ms-SearchBox-field')
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <div style={{ display: 'flex' }}>
        <div
          className="testWrapper"
          style={{ padding: '10px', overflow: 'hidden', width: '300px' }}
        >
          <SearchBox placeholder="Search" />
        </div>
      </div>
    ),
    { rtl: true },
  )
  .addStory(
    'Full',
    () => (
      <div className="testWrapper">
        <SearchBox placeholder="Search" />
      </div>
    ),
    { rtl: true },
  );
