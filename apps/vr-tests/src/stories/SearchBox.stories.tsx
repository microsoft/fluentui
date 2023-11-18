import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { SearchBox, Fabric } from '@fluentui/react';
import { TestWrapperDecorator } from '../utilities/index';

// TestWrapperDecorator isn't added at the top level so that the full SearchBox can be rendered without a parent div

storiesOf('SearchBox', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-SearchBox-field')
        .hover('.ms-SearchBox-field')
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
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
    { includeRtl: true },
  )
  .addStory(
    'Full',
    () => (
      <Fabric className="testWrapper">
        <SearchBox placeholder="Search" />
      </Fabric>
    ),
    { includeRtl: true },
  )
  .addStory(
    'ShowIcon',
    () => (
      <Fabric className="testWrapper">
        <SearchBox placeholder="Search" showIcon={true} defaultValue="Test" />
      </Fabric>
    ),
    { includeRtl: true },
  );
