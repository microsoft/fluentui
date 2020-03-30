import { RosterSectionTitle } from '../RosterTitle';
import RosterItemCustom from '../RosterItemCustom';

const initialRosterData = [
  {
    id: 'presenters',
    title: 'Presenters',
    children: RosterSectionTitle,
    items: [
      {
        id: `0`,
        key: `0`,
        title: {
          userId: `0`,
          type: 'presenters',
          displayName: 'Justin Bieber',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'justen.jpg',
          isMuted: false,
        },
      },
      {
        id: '1',
        key: '1',
        title: {
          userId: '1',
          type: 'presenters',
          displayName: 'Jenny from the Block',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'jenny.jpg',
          isMuted: false,
        },
      },
      {
        id: '2',
        key: '2',
        title: {
          userId: '2',
          type: 'presenters',
          displayName: 'Lena Headey',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'lena.png',
          isMuted: false,
        },
      },
      {
        id: '3',
        key: '3',
        title: {
          userId: '3',
          type: 'presenters',
          displayName: 'Lindsay Lohan',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'lindsay.png',
          isMuted: false,
        },
      },
      {
        id: '4',
        key: '4',
        title: {
          userId: '4',
          type: 'presenters',
          displayName: 'Mark Ruffalo',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'mark.png',
          isMuted: false,
        },
      },
      {
        id: '5',
        key: '5',
        title: {
          userId: '5',
          type: 'presenters',
          displayName: 'Matt Smith',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'matt.jpg',
          isMuted: false,
        },
      },
      {
        id: '6',
        key: '6',
        title: {
          userId: '6',
          type: 'presenters',
          displayName: 'Matthew McConaughey',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'matthew.png',
          isMuted: false,
        },
      },
      {
        id: '7',
        key: '7',
        title: {
          userId: '7',
          type: 'presenters',
          displayName: 'Molly Rankin',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'molly.png',
          isMuted: false,
        },
      },
      {
        id: '8',
        key: '8',
        title: {
          userId: '8',
          type: 'presenters',
          displayName: 'Nan Nanny',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'nan.jpg',
          isMuted: false,
        },
      },
      {
        id: '9',
        key: '9',
        title: {
          userId: '9',
          type: 'presenters',
          displayName: 'Nom Tasty',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'nom.jpg',
          isMuted: false,
        },
      },
    ],
  },
  {
    id: 'attendees',
    title: 'Attendees',
    children: RosterSectionTitle,
    items: [
      {
        id: '12',
        key: '12',
        title: {
          userId: '12',
          type: 'attendees',
          displayName: 'Joe Hill',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'joe.jpg',
          isMuted: false,
        },
      },
      {
        id: '22',
        key: '22',
        title: {
          userId: '22',
          type: 'attendees',
          displayName: 'Laura Marling',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'laura.jpg',
          isMuted: false,
        },
      },
      {
        id: '31',
        key: '31',
        title: {
          userId: '31',
          type: 'attendees',
          displayName: 'Tom Bombadil',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'tom.jpg',
          isMuted: false,
        },
      },
      {
        id: '42',
        key: '42',
        title: {
          userId: '42',
          type: 'attendees',
          displayName: 'Veronica Rothe',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'veronika.jpg',
          isMuted: false,
        },
      },
      {
        id: '51',
        key: '51',
        title: {
          userId: '51',
          type: 'attendees',
          displayName: 'Zoe Deschanel',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'zoe.jpg',
          isMuted: false,
        },
      },
    ],
  },
  {
    id: 'suggestions',
    label: 'Suggestions',
    title: 'Suggestions',
    children: RosterSectionTitle,
    items: [
      {
        id: `50`,
        key: `50`,
        title: {
          userId: `50`,
          type: 'suggestions',
          displayName: 'Justin Bieber',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'justen.jpg',
          isMuted: false,
        },
      },
      {
        id: '112',
        key: '112',
        title: {
          userId: '112',
          type: 'suggestions',
          displayName: 'Jenny from the Block',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'jenny.jpg',
          isMuted: false,
        },
      },
      {
        id: '222',
        key: '222',
        title: {
          userId: '222',
          type: 'suggestions',
          displayName: 'Lena Headey',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'lena.png',
          isMuted: false,
        },
      },
      {
        id: '333',
        key: '333',
        title: {
          userId: '333',
          type: 'suggestions',
          displayName: 'Lindsay Lohan',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'lindsay.png',
          isMuted: false,
        },
      },
      {
        id: '44',
        key: '44',
        title: {
          userId: '44',
          type: 'suggestions',
          displayName: 'Mark Ruffalo',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'mark.png',
          isMuted: false,
        },
      },
      {
        id: '522',
        key: '522',
        title: {
          userId: '522',
          type: 'suggestions',
          displayName: 'Matt Smith',
          message: 'Program the sensor to the SAS alarm through the haptic SQL card!',
          visuals: 'matt.jpg',
          isMuted: false,
        },
      },
    ],
  },
];

initialRosterData.forEach(item => {
  item.items.forEach(internalItem => {
    internalItem.title['as'] = RosterItemCustom;
  });
});

export default initialRosterData;
