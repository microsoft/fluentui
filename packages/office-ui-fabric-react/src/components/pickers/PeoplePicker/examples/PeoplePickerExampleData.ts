import { IPersonaProps, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { TestImages } from '../../../../common/TestImages';

export const people: (IPersonaProps & { key: string | number })[] = [
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
  },
  {
    key: 5,
    imageUrl: TestImages.personaMale,
    imageInitials: 'CB',
    primaryText: 'Christian Bergqvist',
    secondaryText: 'Sr. Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 6,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    primaryText: 'Valentina Lovric',
    secondaryText: 'Design Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 7,
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    primaryText: 'Maor Sharett',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.away
  },
  {
    key: 8,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'PV',
    primaryText: 'Anny Lindqvist',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 9,
    imageUrl: TestImages.personaMale,
    imageInitials: 'AR',
    primaryText: 'Aron Reid',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.dnd
  },
  {
    key: 10,
    imageUrl: TestImages.personaMale,
    imageInitials: 'AL',
    primaryText: 'Alix Lundberg',
    secondaryText: 'Software Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 11,
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    primaryText: 'Roko Kular',
    secondaryText: 'Financial Analyst',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.none

  },
  {
    key: 12,
    imageUrl: TestImages.personaMale,
    imageInitials: 'CB',
    primaryText: 'Christian Bergqvest',
    secondaryText: 'Sr. Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 13,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    primaryText: 'Valintina Lovric',
    secondaryText: 'Design Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 14,
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    primaryText: 'Maor Sharet',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.blocked
  },
  {
    key: 15,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    primaryText: 'Anny Lindqvest',
    secondaryText: 'SDE',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.blocked
  },
  {
    key: 16,
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    primaryText: 'Alix Lunberg',
    secondaryText: 'SE',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.away
  },
  {
    key: 17,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    primaryText: 'Annie Lindqvest',
    secondaryText: 'SDET',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 18,
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    primaryText: 'Alixander Lundberg',
    secondaryText: 'Senior Manager of SDET',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 19,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    primaryText: 'Anny Lundqvist',
    secondaryText: 'Junior Manager of Software',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.away
  },
  {
    key: 20,
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    primaryText: 'Maor Shorett',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.blocked
  },
  {
    key: 21,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    primaryText: 'Valentina Lovrics',
    secondaryText: 'Design Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 22,
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    primaryText: 'Maor Sharet',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 23,
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    primaryText: 'Valentina Lovrecs',
    secondaryText: 'Design Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.blocked
  },
  {
    key: 24,
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    primaryText: 'Maor Sharitt',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 25,
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    primaryText: 'Maor Shariett',
    secondaryText: 'Design Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 3:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 26,
    imageUrl: './images/persona-female.png',
    imageInitials: 'AL',
    primaryText: 'Alix Lundburg',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 3:00pm',
    presence: PersonaPresence.away
  },
  {
    key: 27,
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    primaryText: 'Valantena Lovric',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 28,
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    primaryText: 'Velatine Lourvric',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 29,
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    primaryText: 'Valentyna Lovrique',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 30,
    imageUrl: './images/persona-female.png',
    imageInitials: 'AL',
    primaryText: 'Annie Lindquest',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.dnd
  },
  {
    key: 31,
    imageUrl: './images/persona-female.png',
    imageInitials: 'AL',
    primaryText: 'Anne Lindquist',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.blocked
  },
  {
    key: 32,
    imageUrl: './images/persona-female.png',
    imageInitials: 'AL',
    primaryText: 'Ann Lindqiest',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 33,
    imageUrl: './images/persona-male.png',
    imageInitials: 'AR',
    primaryText: 'Aron Reid',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.away
  },
  {
    key: 34,
    imageUrl: './images/persona-male.png',
    imageInitials: 'AR',
    primaryText: 'Aaron Reed',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 35,
    imageUrl: './images/persona-female.png',
    imageInitials: 'AL',
    primaryText: 'Alix Lindberg',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 36,
    imageUrl: './images/persona-male.png',
    imageInitials: 'AL',
    primaryText: 'Alan Lindberg',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.busy
  },
  {
    key: 37,
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    primaryText: 'Maor Sharit',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.offline
  },
  {
    key: 38,
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    primaryText: 'Maorr Sherit',
    secondaryText: 'UX Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  },
  {
    key: 39,
    imageUrl: './images/persona-male.png',
    imageInitials: 'AL',
    primaryText: 'Alex Lindbirg',
    secondaryText: 'Software Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.dnd
  },
  {
    key: 40,
    imageUrl: './images/persona-male.png',
    imageInitials: 'AL',
    primaryText: 'Alex Lindbarg',
    secondaryText: 'Software Developer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    presence: PersonaPresence.online
  }
];

export const mostRecentlyUsed: IPersonaProps[] = people.slice(0, 5);