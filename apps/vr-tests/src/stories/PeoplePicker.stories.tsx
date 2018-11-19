/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { CompactPeoplePicker, ListPeoplePicker, NormalPeoplePicker, IPersonaProps, PersonaPresence } from 'office-ui-fabric-react';

import { TestImages } from '../common/TestImages';

const people: (IPersonaProps & { key: string | number })[] = [
  {
    key: 1,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'PV',
    text: 'Annie Lindqvist',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 2,
    imageUrl: TestImages.personaMale,
    imageInitials: 'AR',
    text: 'Aaron Reid',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 3,
    imageUrl: TestImages.personaMale,
    imageInitials: 'AL',
    text: 'Alex Lundberg',
    secondaryText: 'Software Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.dnd
  },
  {
    key: 4,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Roko Kolar',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 5,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg1',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 6,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg2',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 7,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg2',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 8,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg3',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 9,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg4',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  }
];

const suggestionProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts'
};

const getTextFromItem = (persona: IPersonaProps): string => persona.text as string;

const getPeople = () => people;

// Pickers that are 'disabled' are added before the Screener decorator because css classes for suggestion items won't exist
storiesOf('PeoplePicker', module)
  .addDecorator(FabricDecorator)
  .addStory('Normal disabled', () => (
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      disabled
    />
  ))
  .addStory('List disabled', () => (
    <ListPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      disabled
    />
  ))
  .addStory('Compact disabled', () => (
    <CompactPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      disabled
    />
  )).addStory('Normal with text', () => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .setValue('.ms-BasePicker-input', 'a')
        .snapshot('suggestion: "a"')
        .end()}>
      <NormalPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
      />
    </Screener>))
  .addDecorator(story => (
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
  )).addStory('Normal', () => (
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  )).addStory('Normal selected', () => (
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      defaultSelectedItems={[people[2]]}
    />
  ), { rtl: true }).addStory('List', () => (
    <ListPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  )).addStory('List selected', () => (
    <ListPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      defaultSelectedItems={[people[2]]}
    />
  ), { rtl: true }).addStory('Compact', () => (
    <CompactPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  )).addStory('Compact selected', () => (
    <CompactPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      defaultSelectedItems={[people[2]]}
    />
  ), { rtl: true });
