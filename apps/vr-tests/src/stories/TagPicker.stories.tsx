/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { TagPicker } from 'office-ui-fabric-react';

let testTags = [
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

let getTextFromItem = (item) => item.name;

let getList = () => testTags;

// Pickers that are 'disabled' are added before the Screener decorator because css classes for suggestion items won't exist
storiesOf('TagPicker', module)
  .addDecorator(FabricDecorator)
  .add('TagPicker disabled', () => (
    <TagPicker
      onResolveSuggestions={ getList }
      disabled
    />
  ))
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-BasePicker-input')
        .hover('.ms-Suggestions-item')
        .snapshot('suggestions')
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <TagPicker
      onResolveSuggestions={ getList }
      onEmptyInputFocus={ getList }
      getTextFromItem={ getTextFromItem }
      pickerSuggestionsProps={
        {
          suggestionsHeaderText: 'Suggested Tags',
          noResultsFoundText: 'No Color Tags Found'
        }
      }
      itemLimit={ 2 }
    />
  )).add('Selected', () => (
    <TagPicker
      defaultSelectedItems={ [testTags[4]] }
      onResolveSuggestions={ getList }
      onEmptyInputFocus={ getList }
      getTextFromItem={ getTextFromItem }
      pickerSuggestionsProps={
        {
          suggestionsHeaderText: 'Suggested Tags',
          noResultsFoundText: 'No Color Tags Found'
        }
      }
      itemLimit={ 2 }
    />
  ));