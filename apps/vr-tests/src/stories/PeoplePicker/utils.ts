import { TestImages } from '@fluentui/example-data';
import { IPersonaProps, PersonaPresence } from '@fluentui/react';

export const overflowPersona: IPersonaProps & { key: string | number } = {
  key: 2,
  imageUrl: TestImages.personaMale,
  imageInitials: 'AR',
  text: 'Aaron Reid Lundberg Kolar Lundberg Lindqvist Kolar Reid',
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
  presence: PersonaPresence.busy,
};

export const people: (IPersonaProps & { key: string | number })[] = [
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

export const suggestionProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

export const getTextFromItem = (persona: IPersonaProps): string => persona.text as string;

export const getPeople = () => people;
