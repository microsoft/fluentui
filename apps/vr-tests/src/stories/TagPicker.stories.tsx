/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator, FabricDecoratorFixedWidth } from '../utilities';
import { TagPicker, Fabric, ITag } from 'office-ui-fabric-react';

const testTags: ITag[] = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'magenta',
  'mauve',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'violet',
  'white',
  'yellow'
].map(item => ({ key: item, name: item }));

const getTextFromItem = (item: ITag) => item.name;

const getList = () => testTags;

// Pickers that are 'disabled' are added before the Screener decorator because css classes for suggestion items won't exist
storiesOf('TagPicker', module)
  .addDecorator(FabricDecorator)
  .addStory('TagPicker disabled', () => <TagPicker onResolveSuggestions={getList} disabled />)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-BasePicker-input')
        .setValue('.ms-BasePicker-input', 'a')
        .snapshot('Open Suggestion Menu', { cropTo: '.testWrapper' })
        .hover('.ms-Suggestions-item')
        .snapshot('Suggestion Menu Item Hover', { cropTo: '.testWrapper' })
        .keys('.ms-BasePicker-input', Screener.Keys.upArrow)
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => (
    <TagPicker
      onResolveSuggestions={getList}
      onEmptyInputFocus={getList}
      getTextFromItem={getTextFromItem}
      pickerSuggestionsProps={{
        suggestionsHeaderText: 'Suggested Tags',
        noResultsFoundText: 'No Color Tags Found',
        searchForMoreText: 'Get more Results'
      }}
      itemLimit={2}
    />
  ))
  .addStory(
    'Selected',
    () => (
      <Fabric>
        <TagPicker
          defaultSelectedItems={[testTags[4]]}
          onResolveSuggestions={getList}
          onEmptyInputFocus={getList}
          getTextFromItem={getTextFromItem}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found'
          }}
          itemLimit={2}
        />
      </Fabric>
    ),
    { rtl: true }
  );

storiesOf('TagPicker', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('With long tag', () => (
    // This example MUST be inside a narrow container which forces the tag to overflow
    <Fabric style={{ width: 180 }}>
      <TagPicker
        onResolveSuggestions={getList}
        defaultSelectedItems={[
          {
            key: 'test',
            name: 'Very very long tag (this part should be truncated)'
          }
        ]}
      />
    </Fabric>
  ));

storiesOf('TagItem', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-TagItem')
        .snapshot('Tag Item Hover', { cropTo: '.testWrapper' })
        .hover('.ms-TagItem-close')
        .snapshot('Tag Item Clear Button Hover', { cropTo: '.testWrapper' })
        .click('.ms-TagItem')
        .snapshot('Tag Item Select', { cropTo: '.testWrapper' })
        .hover('.ms-TagItem-close')
        .snapshot('Tag Item Clear Button Selected Hover', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Selected',
    () => (
      <Fabric>
        <TagPicker
          defaultSelectedItems={[testTags[4]]}
          onResolveSuggestions={getList}
          onEmptyInputFocus={getList}
          getTextFromItem={getTextFromItem}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found'
          }}
          itemLimit={2}
        />
      </Fabric>
    ),
    { rtl: true }
  );
