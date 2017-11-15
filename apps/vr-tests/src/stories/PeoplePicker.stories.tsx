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
    primaryText: 'Annie Lindqvist',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 2,
    imageUrl: TestImages.personaMale,
    imageInitials: 'AR',
    primaryText: 'Aaron Reid',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 3,
    imageUrl: TestImages.personaMale,
    imageInitials: 'AL',
    primaryText: 'Alex Lundberg',
    secondaryText: 'Software Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.dnd
  },
  {
    key: 4,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    primaryText: 'Roko Kolar',
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

let getTextFromItem = (persona: IPersonaProps): string => persona.primaryText as string;

let getPeople = () => people;

// Pickers that are 'disabled' are added before the Screener decorator because css classes for suggestion items won't exist
storiesOf('PeoplePicker', module)
  .addDecorator(FabricDecorator)
  .add('Normal disabled', () => (
    <NormalPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
      disabled
    />
  ))
  .add('List disabled', () => (
    <ListPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
      disabled
    />
  ))
  .add('Compact disabled', () => (
    <CompactPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
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
  )).add('Normal', () => (
    <NormalPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
    />
  )).add('Normal selected', () => (
    <NormalPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
      defaultSelectedItems={ [people[2]] }
    />
  )).add('List', () => (
    <ListPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
    />
  )).add('List selected', () => (
    <ListPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
      defaultSelectedItems={ [people[2]] }
    />
  )).add('Compact', () => (
    <CompactPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
    />
  )).add('Compact selected', () => (
    <CompactPeoplePicker
      onResolveSuggestions={ getPeople }
      onEmptyInputFocus={ getPeople }
      getTextFromItem={ getTextFromItem }
      className={ 'ms-PeoplePicker' }
      pickerSuggestionsProps={ suggestionProps }
      defaultSelectedItems={ [people[2]] }
    />
  ));