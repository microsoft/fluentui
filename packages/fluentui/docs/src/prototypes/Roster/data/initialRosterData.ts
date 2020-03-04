import { RosterData, RosterItemData } from '../interface/roster.interface';

export const initialRosterData: RosterData = {
  presenters: new Map<string, RosterItemData>([
    ['1', { userId: '1', displayName: 'Jenny from the Block', visuals: 'jenny.jpg', isMuted: false }],
    ['2', { userId: '2', displayName: 'Lena Headey', visuals: 'lena.png', isMuted: false }],
    ['3', { userId: '3', displayName: 'Lindsay Lohan', visuals: 'lindsay.png', isMuted: false }],
    ['4', { userId: '4', displayName: 'Mark Ruffalo', visuals: 'mark.png', isMuted: false }],
    ['5', { userId: '5', displayName: 'Matt Smith', visuals: 'matt.jpg', isMuted: false }],
    ['6', { userId: '6', displayName: 'Matthew McConaughey', visuals: 'matthew.png', isMuted: false }],
    ['7', { userId: '7', displayName: 'Molly Rankin', visuals: 'molly.png', isMuted: false }],
    ['8', { userId: '8', displayName: 'Nan Nanny', visuals: 'nan.jpg', isMuted: false }],
    ['9', { userId: '9', displayName: 'Nom Tasty', visuals: 'nom.jpg', isMuted: false }],
    ['10', { userId: '10', displayName: 'Rachel McAdams', visuals: 'rachel.png', isMuted: false }],
    ['11', { userId: '11', displayName: 'Stevie Griffin', visuals: 'stevie.jpg', isMuted: false }]
  ]),
  attendees: new Map<string, RosterItemData>([
    ['12', { userId: '12', displayName: 'Joe Hill', visuals: 'joe.jpg', isMuted: false }],
    ['13', { userId: '13', displayName: 'Laura Marling', visuals: 'laura.jpg', isMuted: false }],
    ['14', { userId: '14', displayName: 'Tom Bombadil', visuals: 'tom.jpg', isMuted: false }],
    ['15', { userId: '15', displayName: 'Veronica Rothe', visuals: 'veronika.jpg', isMuted: false }],
    ['16', { userId: '16', displayName: 'Zoe Deschanel', visuals: 'zoe.jpg', isMuted: false }]
  ]),
  suggestions: new Map<string, RosterItemData>([
    ['17', { userId: '17', displayName: 'Justin Bieber', visuals: 'justen.jpg', isMuted: false }],
    ['18', { userId: '18', displayName: 'Christian Bale', visuals: 'christian.jpg', isMuted: false }],
    ['19', { userId: '19', displayName: 'Daniel Radcliffe', visuals: 'daniel.jpg', isMuted: false }],
    ['20', { userId: '20', displayName: 'Elliot Smith', visuals: 'elliot.jpg', isMuted: false }],
    ['21', { userId: '21', displayName: 'Ada Lovelace', visuals: 'ade.jpg', isMuted: false }],
    ['22', { userId: '22', displayName: 'Chris Pine', visuals: 'chris.jpg', isMuted: false }],
    ['23', { userId: '23', displayName: 'Helen Mirren', visuals: 'helen.jpg', isMuted: false }]
  ])
};
