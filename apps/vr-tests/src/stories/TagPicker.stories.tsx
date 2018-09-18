/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { TagPicker } from 'office-ui-fabric-react';

const testTags = [
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

const getTextFromItem = (item) => item.name;

const getList = () => testTags;

const TagPickerDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .click('.ms-BasePicker-input')
      .hover('.ms-Suggestions-item')
      .snapshot('suggestions')
      .end()
    }
  >
    {story()}
  </Screener>
);

// Pickers that are 'disabled' are added before the Screener decorator
// because css classes for suggestion items won't exist
const disabledTagPickerStories = {
  decorators: [FabricDecorator],
  stories: {
    'TagPicker disabled': () => (
      <TagPicker
        onResolveSuggestions={getList}
        disabled
      />
    )
  }
};

const tagPickerStories = {
  decorators: [FabricDecorator, TagPickerDecorator],
  stories: {
    'Root': () => (
      <TagPicker
        onResolveSuggestions={getList}
        onEmptyInputFocus={getList}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={
          {
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found'
          }
        }
        itemLimit={2}
      />
    ),
    'Selected': () => (
      <TagPicker
        defaultSelectedItems={[testTags[4]]}
        onResolveSuggestions={getList}
        onEmptyInputFocus={getList}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={
          {
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found'
          }
        }
        itemLimit={2}
      />
    )
  }
};

runStories('TagPicker', disabledTagPickerStories);
runStories('TagPicker', tagPickerStories);