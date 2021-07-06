import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { SearchBox, Fabric } from '@fluentui/react';
import { FabricDecorator } from '../utilities/index';

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
      <Fabric style={{ display: 'flex' }}>
        <div
          className="testWrapper"
          style={{ padding: '10px', overflow: 'hidden', width: '300px' }}
        >
          <SearchBox placeholder="Search" />
        </div>
      </Fabric>
    ),
    { rtl: true },
  )
  .addStory(
    'Full',
    () => (
      <Fabric className="testWrapper">
        <SearchBox placeholder="Search" />
      </Fabric>
    ),
    { rtl: true },
  )
  .addStory(
    'ShowIcon',
    () => (
      <Fabric className="testWrapper">
        <SearchBox placeholder="Search" showIcon={true} defaultValue="Test" />
      </Fabric>
    ),
    { rtl: true },
  );
