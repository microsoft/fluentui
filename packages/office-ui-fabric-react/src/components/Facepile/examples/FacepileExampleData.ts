import * as React from 'react';
import { IFacepilePersona } from 'office-ui-fabric-react/lib/Facepile';
import { PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';
import { TestImages } from '@uifabric/example-data';

/** @deprecated Use the version from `@uifabric/example-data` instead. */
export const facepilePersonas: IFacepilePersona[] = [
  {
    imageUrl: TestImages.personaFemale,
    personaName: 'Annie Lindqvist',
    data: '50%'
  },
  {
    imageUrl: TestImages.personaFemale,
    personaName: 'Aaron Reid',
    data: '$1,000'
  },
  {
    personaName: 'Alex Lundberg',
    data: '75%',
    onClick: (ev: React.MouseEvent<HTMLElement>, persona: IFacepilePersona) =>
      alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
  },
  {
    personaName: 'Roko Kolar',
    data: '4 hrs'
  },
  {
    imageInitials: 'CB',
    personaName: 'Christian Bergqvist',
    initialsColor: PersonaInitialsColor.green,
    data: '25%'
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    personaName: 'Valentina Lovric',
    initialsColor: PersonaInitialsColor.lightBlue,
    data: 'Emp1234',
    onClick: (ev: React.MouseEvent<HTMLElement>, persona: IFacepilePersona) =>
      alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    personaName: 'Maor Sharett',
    initialsColor: PersonaInitialsColor.lightGreen
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'PV',
    personaName: 'Annie Lindqvist2',
    initialsColor: PersonaInitialsColor.lightPink
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'AR',
    personaName: 'Aaron Reid2',
    initialsColor: PersonaInitialsColor.magenta,
    data: 'Emp1234',
    onClick: (ev: React.MouseEvent<HTMLElement>, persona: IFacepilePersona) =>
      alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'AL',
    personaName: 'Alex Lundberg2',
    initialsColor: PersonaInitialsColor.orange
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'RK',
    personaName: 'Roko Kolar2',
    initialsColor: PersonaInitialsColor.pink
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'CB',
    personaName: 'Christian Bergqvist2',
    initialsColor: PersonaInitialsColor.purple
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    personaName: 'Valentina Lovric2',
    initialsColor: PersonaInitialsColor.red
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    personaName: 'Maor Sharett2',
    initialsColor: PersonaInitialsColor.teal
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    personaName: 'Another A Name',
    initialsColor: PersonaInitialsColor.blue
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    personaName: 'Another A Name (So Many A names!)',
    initialsColor: PersonaInitialsColor.darkBlue
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    personaName: 'Another Anecdotal A Name',
    initialsColor: PersonaInitialsColor.darkGreen
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    personaName: 'Anerobic A Name',
    initialsColor: PersonaInitialsColor.darkRed
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    personaName: 'Aerobic A Name',
    initialsColor: PersonaInitialsColor.green
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    personaName: 'Maor Sharett2',
    initialsColor: PersonaInitialsColor.lightBlue
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    personaName: 'Valentina Lovric2',
    initialsColor: PersonaInitialsColor.lightGreen
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    personaName: 'Maor Sharett2',
    initialsColor: PersonaInitialsColor.lightPink
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    personaName: 'Valentina Lovric2',
    initialsColor: PersonaInitialsColor.magenta
  },
  {
    imageUrl: TestImages.personaMale,
    imageInitials: 'MS',
    personaName: 'Maor Sharett2',
    initialsColor: PersonaInitialsColor.orange
  }
];
