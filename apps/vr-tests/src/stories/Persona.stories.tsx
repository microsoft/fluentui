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
  .add('size10 (tiny)', () => (
    <div>
      <Persona
        { ...examplePersona }
        size={ PersonaSize.size10 }
        presence={ PersonaPresence.offline }
      />
      <Persona
        { ...examplePersona }
        size={ PersonaSize.tiny }
        presence={ PersonaPresence.offline }
      />
    </div>
  )).add('size24 (extraExtraSmall)', () => (
    <div>
      <Persona
        { ...examplePersona }
        size={ PersonaSize.size24 }
        presence={ PersonaPresence.none }
      />
      <Persona
        { ...examplePersona }
        size={ PersonaSize.extraExtraSmall }
        presence={ PersonaPresence.none }
      />
    </div>
  )).add('size28 (extraSmall)', () => (
    <div>
      <Persona
        { ...examplePersona }
        size={ PersonaSize.size28 }
        presence={ PersonaPresence.none }
      />
      <Persona
        { ...examplePersona }
        size={ PersonaSize.extraSmall }
        presence={ PersonaPresence.none }
      />
    </div>
  )).add('size32', () => (
    <Persona
      { ...examplePersona }
      size={ PersonaSize.size32 }
      presence={ PersonaPresence.online }
    />
  )).add('size40 (small)', () => (
    <div>
      <Persona
        { ...examplePersona }
        size={ PersonaSize.size40 }
        presence={ PersonaPresence.none }
        showSecondaryText
      />
      <Persona
        { ...examplePersona }
        size={ PersonaSize.small }
        presence={ PersonaPresence.none }
        showSecondaryText
      />
    </div>
  )).add('size48 (regular)', () => (
    <div>
      <Persona
        { ...examplePersona }
        size={ PersonaSize.size48 }
        presence={ PersonaPresence.away }
      />
      <Persona
        { ...examplePersona }
        size={ PersonaSize.regular }
        presence={ PersonaPresence.away }
      />
    </div>
  )).add('default size, presences', () => (
    <div>
      <Persona
        { ...examplePersona }
        primaryText='PersonaPresence.away'
        presence={ PersonaPresence.away }
      />
      <Persona
        { ...examplePersona }
        primaryText='PersonaPresence.blocked'
        presence={ PersonaPresence.blocked }
      />
      <Persona
        { ...examplePersona }
        primaryText='PersonaPresence.busy'
        presence={ PersonaPresence.busy }
      />
      <Persona
        { ...examplePersona }
        primaryText='PersonaPresence.dnd'
        presence={ PersonaPresence.dnd }
      />
      <Persona
        { ...examplePersona }
        primaryText='PersonaPresence.none'
        presence={ PersonaPresence.none }
      />
      <Persona
        { ...examplePersona }
        primaryText='PersonaPresence.offline'
        presence={ PersonaPresence.offline }
      />
      <Persona
        { ...examplePersona }
        primaryText='PersonaPresence.online'
        presence={ PersonaPresence.online }
      />
    </div>
  )).add('default size, details hidden', () => (
    <Persona
      { ...examplePersona }
      presence={ PersonaPresence.busy }
      hidePersonaDetails
    />
  )).add('size72 (large)', () => (
    <div>
      <Persona
        { ...examplePersona }
        size={ PersonaSize.size72 }
        presence={ PersonaPresence.dnd }
      />
      <Persona
        { ...examplePersona }
        size={ PersonaSize.large }
        presence={ PersonaPresence.dnd }
      />
    </div>
  )).add('size100 (extraLarge)', () => (
    <div>
      <Persona
        { ...examplePersona }
        size={ PersonaSize.size100 }
        presence={ PersonaPresence.blocked }
      />
      <Persona
        { ...examplePersona }
        size={ PersonaSize.extraLarge }
        presence={ PersonaPresence.blocked }
      />
    </div>
  )).add('Initials', () => (
    <Persona
      { ...examplePersona }
      imageUrl={ undefined }
    />
  ));