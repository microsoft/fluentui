/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { IPersonaProps, Persona, PersonaPresence, PersonaSize } from 'office-ui-fabric-react';
import { TestImages } from '../common/TestImages';

const examplePersona: IPersonaProps = {
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

// prettier-ignore
storiesOf('Persona', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('size10 (tiny)', () => (
    <div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size10}
        presence={PersonaPresence.offline}
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.tiny}
        presence={PersonaPresence.offline}
      />
    </div>
  ))
  .addStory('size24 (extraExtraSmall)', () => (
    <div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size24}
        presence={PersonaPresence.none}
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.extraExtraSmall}
        presence={PersonaPresence.none}
      />
    </div>
  ))
  .addStory('size28 (extraSmall)', () => (
    <div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size28}
        presence={PersonaPresence.none}
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.extraSmall}
        presence={PersonaPresence.none}
      />
    </div>
  ))
  .addStory('size32', () => (
    <Persona
      {...examplePersona}
      size={PersonaSize.size32}
      presence={PersonaPresence.online}
    />
  ))
  .addStory('size40 (small)', () => (
    <div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size40}
        presence={PersonaPresence.none}
        showSecondaryText
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.small}
        presence={PersonaPresence.none}
        showSecondaryText
      />
    </div>
  ))
  .addStory('size48 (regular)', () => (
    <div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size48}
        presence={PersonaPresence.away}
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.regular}
        presence={PersonaPresence.away}
      />
    </div>
  ))
  .addStory('default size, presences', () => (
    <div>
      <Persona
        {...examplePersona}
        text="PersonaPresence.away"
        presence={PersonaPresence.away}
      />
      <Persona
        {...examplePersona}
        text="PersonaPresence.blocked"
        presence={PersonaPresence.blocked}
      />
      <Persona
        {...examplePersona}
        text="PersonaPresence.busy"
        presence={PersonaPresence.busy}
      />
      <Persona
        {...examplePersona}
        text="PersonaPresence.dnd"
        presence={PersonaPresence.dnd}
      />
      <Persona
        {...examplePersona}
        text="PersonaPresence.none"
        presence={PersonaPresence.none}
      />
      <Persona
        {...examplePersona}
        text="PersonaPresence.offline"
        presence={PersonaPresence.offline}
      />
      <Persona
        {...examplePersona}
        text="PersonaPresence.online"
        presence={PersonaPresence.online}
      />
    </div>
  ))
  .addStory('default size, details hidden', () => (
    <Persona
      {...examplePersona}
      presence={PersonaPresence.busy}
      hidePersonaDetails
    />
  ))
  .addStory('size72 (large)', () => (
    <div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size72}
        presence={PersonaPresence.dnd}
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.large}
        presence={PersonaPresence.dnd}
      />
    </div>
  ))
  .addStory(
    'size100 (extraLarge)',
    () => (
      <div>
        <Persona
          {...examplePersona}
          size={PersonaSize.size100}
          presence={PersonaPresence.blocked}
        />
        <Persona
          {...examplePersona}
          size={PersonaSize.extraLarge}
          presence={PersonaPresence.blocked}
        />
      </div>
    ),
    { rtl: true }
  )
  .addStory(
    'Initials',
    () => (
      <Persona
        {...examplePersona}
        imageUrl={undefined}
      />
    ),
    { rtl: true }
  )
  .addStory('Persona with children', () => (
    <Persona { ...examplePersona }>
      <span>Persona Children</span>
    </Persona>
  ));
