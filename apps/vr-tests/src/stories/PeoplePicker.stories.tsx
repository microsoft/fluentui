import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
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

export default {
  title: 'PeoplePicker',
  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-BasePicker-input')
        .hover('.ms-Suggestions-item')
        .snapshot('suggestions')
        .end(),
    ),
  ],
};

export const NormalWithText = () => (
  <Fabric>
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  </Fabric>
);

NormalWithText.storyName = 'Normal with text';
NormalWithText.parameters = {
  steps: new Steps()
    .snapshot('default', { cropTo: '.testWrapper' })
    .setValue('.ms-BasePicker-input', 'a')
    .snapshot('suggestion: "a"')
    .end(),
};

export const Normal = () => (
  <Fabric>
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  </Fabric>
);

export const NormalSelected = () => (
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
);

NormalSelected.storyName = 'Normal selected';

export const NormalSelectedRTL = getStoryVariant(NormalSelected, RTL);

export const NormalOverflowSelected = () => (
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
);

NormalOverflowSelected.storyName = 'Normal Overflow selected';

export const NormalOverflowSelectedRTL = getStoryVariant(NormalOverflowSelected, RTL);

export const List = () => (
  <Fabric>
    <ListPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  </Fabric>
);

export const ListSelected = () => (
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
);

ListSelected.storyName = 'List selected';

export const ListSelectedRTL = getStoryVariant(ListSelected, RTL);

export const Compact = () => (
  <Fabric>
    <CompactPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  </Fabric>
);

export const CompactSelected = () => (
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
);

CompactSelected.storyName = 'Compact selected';

export const CompactSelectedRTL = getStoryVariant(CompactSelected, RTL);
