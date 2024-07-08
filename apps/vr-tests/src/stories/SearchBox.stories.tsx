import * as React from 'react';
import { Steps } from 'storywright';
import { SearchBox, Fabric } from '@fluentui/react';
import {
  getStoryVariant,
  STORY_VARIANT,
  StoryWrightDecorator,
  TestWrapperDecorator,
} from '../utilities';

export default {
  title: 'SearchBox',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-SearchBox-field')
        .hover('.ms-SearchBox-field')
        .snapshot('default', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
};

export const Root = () => (
  <Fabric style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', overflow: 'hidden', width: '300px' }}>
      <SearchBox placeholder="Search" />
    </div>
  </Fabric>
);

export const RootRTL = getStoryVariant(Root, STORY_VARIANT.RTL);

export const Full = () => (
  <Fabric className="testWrapper">
    <SearchBox placeholder="Search" />
  </Fabric>
);

export const FullRTL = getStoryVariant(Full, STORY_VARIANT.RTL);

export const ShowIcon = () => (
  <Fabric className="testWrapper">
    <SearchBox placeholder="Search" showIcon={true} defaultValue="Test" />
  </Fabric>
);

ShowIcon.storyName = 'ShowIcon';

export const ShowIconRTL = getStoryVariant(ShowIcon, STORY_VARIANT.RTL);
