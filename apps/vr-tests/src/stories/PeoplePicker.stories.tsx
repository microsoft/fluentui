import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import {
  Fabric,
  CompactPeoplePicker,
  ListPeoplePicker,
  NormalPeoplePicker,
  IPersonaProps,
  PersonaPresence,
} from '@fluentui/react';

import { TestImages } from '@fluentui/example-data';

const overflowPersona: IPersonaProps & { key: string | number } = {
  key: 2,
  imageUrl: TestImages.personaMale,
  imageInitials: 'AR',
  text: 'Aaron Reid Lundberg Kolar Lundberg Lindqvist Kolar Reid',
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
  presence: PersonaPresence.busy,
};
const people: (IPersonaProps & { key: string | number })[] = [
  {
    key: 1,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'PV',
    text: 'Annie Lindqvist',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online,
  },
  {
    key: 2,
    imageUrl: TestImages.personaMale,
    imageInitials: 'AR',
    text: 'Aaron Reid',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy,
  },
  {
    key: 3,
    imageUrl: TestImages.personaMale,
    imageInitials: 'AL',
    text: 'Alex Lundberg',
    secondaryText: 'Software Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.dnd,
  },
  {
    key: 4,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Roko Kolar',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline,
  },
  {
    key: 5,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg1',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline,
  },
  {
    key: 6,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg2',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline,
  },
  {
    key: 7,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg2',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline,
  },
  {
    key: 8,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg3',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline,
  },
  {
    key: 9,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    text: 'Alex Lundberg4',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline,
  },
];

const suggestionProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

const getTextFromItem = (persona: IPersonaProps): string => persona.text as string;

const getPeople = () => people;

// Pickers that are 'disabled' are added before the StoryWright decorator because css classes for
// suggestion items won't exist
storiesOf('PeoplePicker', module)
  .addDecorator(TestWrapperDecorator)
  .addStory('Normal disabled', () => (
    <Fabric>
      <NormalPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
        disabled
      />
    </Fabric>
  ))
  .addStory('List disabled', () => (
    <Fabric>
      <ListPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
        disabled
      />
    </Fabric>
  ))
  .addStory('Compact disabled', () => (
    <Fabric>
      <CompactPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
        disabled
      />
    </Fabric>
  ))
  .addStory('Normal with placeholder', () => (
    <Fabric>
      <NormalPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
        inputProps={{
          placeholder: 'Add items here',
        }}
      />
    </Fabric>
  ))
  .addStory('Normal disabled with placeholder', () => (
    <Fabric>
      <NormalPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
        inputProps={{
          placeholder: 'Add items here',
        }}
        disabled
      />
    </Fabric>
  ));

storiesOf('PeoplePicker', module)
  .addDecorator(TestWrapperDecorator)
  .addStory('Normal with text', () => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .setValue('.ms-BasePicker-input', 'a')
        .snapshot('suggestion: "a"')
        .end()}
    >
      <Fabric>
        <NormalPeoplePicker
          onResolveSuggestions={getPeople}
          onEmptyInputFocus={getPeople}
          getTextFromItem={getTextFromItem}
          className={'ms-PeoplePicker'}
          pickerSuggestionsProps={suggestionProps}
        />
      </Fabric>
    </StoryWright>
  ));

storiesOf('PeoplePicker', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-BasePicker-input')
        .hover('.ms-Suggestions-item')
        .snapshot('suggestions')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Normal', () => (
    <Fabric>
      <NormalPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
      />
    </Fabric>
  ))
  .addStory(
    'Normal selected',
    () => (
      <Fabric>
        <NormalPeoplePicker
          onResolveSuggestions={getPeople}
          onEmptyInputFocus={getPeople}
          getTextFromItem={getTextFromItem}
          className={'ms-PeoplePicker'}
          pickerSuggestionsProps={suggestionProps}
          defaultSelectedItems={[people[2]]}
        />
      </Fabric>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Normal Overflow selected',
    () => (
      <Fabric>
        <NormalPeoplePicker
          onResolveSuggestions={getPeople}
          onEmptyInputFocus={getPeople}
          getTextFromItem={getTextFromItem}
          className={'ms-PeoplePicker'}
          pickerSuggestionsProps={suggestionProps}
          styles={{ root: { maxWidth: 200 } }}
          defaultSelectedItems={[people[1], overflowPersona]}
        />
      </Fabric>
    ),
    { includeRtl: true },
  )
  .addStory('List', () => (
    <Fabric>
      <ListPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
      />
    </Fabric>
  ))
  .addStory(
    'List selected',
    () => (
      <Fabric>
        <ListPeoplePicker
          onResolveSuggestions={getPeople}
          onEmptyInputFocus={getPeople}
          getTextFromItem={getTextFromItem}
          className={'ms-PeoplePicker'}
          pickerSuggestionsProps={suggestionProps}
          defaultSelectedItems={[people[2]]}
        />
      </Fabric>
    ),
    { includeRtl: true },
  )
  .addStory('Compact', () => (
    <Fabric>
      <CompactPeoplePicker
        onResolveSuggestions={getPeople}
        onEmptyInputFocus={getPeople}
        getTextFromItem={getTextFromItem}
        className={'ms-PeoplePicker'}
        pickerSuggestionsProps={suggestionProps}
      />
    </Fabric>
  ))
  .addStory(
    'Compact selected',
    () => (
      <Fabric>
        <CompactPeoplePicker
          onResolveSuggestions={getPeople}
          onEmptyInputFocus={getPeople}
          getTextFromItem={getTextFromItem}
          className={'ms-PeoplePicker'}
          pickerSuggestionsProps={suggestionProps}
          defaultSelectedItems={[people[2]]}
        />
      </Fabric>
    ),
    { includeRtl: true },
  );
