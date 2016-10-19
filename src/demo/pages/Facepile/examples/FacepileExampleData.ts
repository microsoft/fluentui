import * as React from 'react';
import {
  IFacepilePersona,
  PersonaInitialsColor
} from '../../../../index';

export const facepilePersonas: IFacepilePersona[] = [
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'PV',
    personaName: 'Annie Lindqvist',
    initialsColor: PersonaInitialsColor.blue
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'AR',
    personaName: 'Aaron Reid',
    initialsColor: PersonaInitialsColor.darkBlue
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'AL',
    personaName: 'Alex Lundberg',
    initialsColor: PersonaInitialsColor.darkGreen,
    data: 'Emp1234',
    onClick: (ev: React.MouseEvent, persona: IFacepilePersona) =>
      alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'RK',
    personaName: 'Roko Kolar',
    initialsColor: PersonaInitialsColor.darkRed
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'CB',
    personaName: 'Christian Bergqvist',
    initialsColor: PersonaInitialsColor.green
  },
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    personaName: 'Valentina Lovric',
    initialsColor: PersonaInitialsColor.lightBlue,
    data: 'Emp1234',
    onClick: (ev: React.MouseEvent, persona: IFacepilePersona) =>
      alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    personaName: 'Maor Sharett',
    initialsColor: PersonaInitialsColor.lightGreen
  },
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'PV',
    personaName: 'Annie Lindqvist2',
    initialsColor: PersonaInitialsColor.lightPink
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'AR',
    personaName: 'Aaron Reid2',
    initialsColor: PersonaInitialsColor.magenta,
    data: 'Emp1234',
    onClick: (ev: React.MouseEvent, persona: IFacepilePersona) =>
      alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'AL',
    personaName: 'Alex Lundberg2',
    initialsColor: PersonaInitialsColor.orange
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'RK',
    personaName: 'Roko Kolar2',
    initialsColor: PersonaInitialsColor.pink
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'CB',
    personaName: 'Christian Bergqvist2',
    initialsColor: PersonaInitialsColor.purple
  },
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    personaName: 'Valentina Lovric2',
    initialsColor: PersonaInitialsColor.red
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    personaName: 'Maor Sharett2',
    initialsColor: PersonaInitialsColor.teal
  },
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    personaName: 'Another A Name',
    initialsColor: PersonaInitialsColor.blue
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    personaName: 'Another A Name (So Many A names!)',
    initialsColor: PersonaInitialsColor.darkBlue
  },
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    personaName: 'Another Anecdotal A Name',
    initialsColor: PersonaInitialsColor.darkGreen
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    personaName: 'Anerobic A Name',
    initialsColor: PersonaInitialsColor.darkRed
  },
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    personaName: 'Aerobic A Name',
    initialsColor: PersonaInitialsColor.green
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    personaName: 'Maor Sharett2',
    initialsColor: PersonaInitialsColor.lightBlue
  },
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    personaName: 'Valentina Lovric2',
    initialsColor: PersonaInitialsColor.lightGreen
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    personaName: 'Maor Sharett2',
    initialsColor: PersonaInitialsColor.lightPink
  },
  {
    imageUrl: './images/persona-female.png',
    imageInitials: 'VL',
    personaName: 'Valentina Lovric2',
    initialsColor: PersonaInitialsColor.magenta
  },
  {
    imageUrl: './images/persona-male.png',
    imageInitials: 'MS',
    personaName: 'Maor Sharett2',
    initialsColor: PersonaInitialsColor.orange
  },
];