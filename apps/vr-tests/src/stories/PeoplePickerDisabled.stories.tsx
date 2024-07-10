import * as React from 'react';
import { TestWrapperDecorator } from '../utilities';
import {
  Fabric,
  CompactPeoplePicker,
  ListPeoplePicker,
  NormalPeoplePicker,
  IPersonaProps,
  PersonaPresence,
} from '@fluentui/react';

import { TestImages } from '@fluentui/example-data';

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
  decorators: [TestWrapperDecorator],
};

export const NormalDisabled = () => (
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
);

NormalDisabled.storyName = 'Normal disabled';

export const ListDisabled = () => (
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
);

ListDisabled.storyName = 'List disabled';

export const CompactDisabled = () => (
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
);

CompactDisabled.storyName = 'Compact disabled';

export const NormalWithPlaceholder = () => (
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
);
NormalWithPlaceholder.parameters = { steps: [] };

NormalWithPlaceholder.storyName = 'Normal with placeholder';

export const NormalDisabledWithPlaceholder = () => (
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
);

NormalDisabledWithPlaceholder.storyName = 'Normal disabled with placeholder';
