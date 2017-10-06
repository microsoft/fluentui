/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Persona, PersonaPresence, PersonaSize } from 'office-ui-fabric-react';
import { TestImages } from '../common/TestImages';

const examplePersona = {
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  primaryText: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

storiesOf('Persona', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Tiny', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.tiny }
      presence={ PersonaPresence.offline }
    />
  )).add('Extra extra small', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.extraExtraSmall }
      presence={ PersonaPresence.none }
    />
  )).add('Size 28', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.size28 }
      presence={ PersonaPresence.none }
    />
  )).add('Extra small', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.extraSmall }
      presence={ PersonaPresence.online }
    />
  )).add('Extra small with details', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.extraSmall }
      presence={ PersonaPresence.none }
      showSecondaryText
    />
  )).add('Small', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.small }
      presence={ PersonaPresence.away }
    />
  )).add('Medium', () => (
    <Persona
      { ...examplePersona }
      presence={ PersonaPresence.busy }
    />
  )).add('Medium, details hidden', () => (
    <Persona
      { ...examplePersona }
      presence={ PersonaPresence.busy }
      hidePersonaDetails
    />
  )).add('Large', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.large }
      presence={ PersonaPresence.dnd }
    />
  )).add('Extra large', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.extraLarge }
      presence={ PersonaPresence.blocked }
    />
  )).add('Initials', () => (
    <Persona
      { ...examplePersona }
      imageUrl={ undefined }
    />
  ));