import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { IPersonaProps, Persona, PersonaPresence, PersonaSize } from '@fluentui/react';
import { TestImages } from '@fluentui/example-data';

const examplePersona: IPersonaProps = {
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
};

// prettier-ignore
storiesOf('Persona', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
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
    { includeRtl: true }
  )
  .addStory(
    'size120',
    () => (
      <div>
        <Persona
          {...examplePersona}
          size={PersonaSize.size120}
          presence={PersonaPresence.blocked}
        />
      </div>
    ),
    { includeRtl: true }
  )
  .addStory(
    'Initials',
    () => (
      <Persona
        {...examplePersona}
        imageUrl={undefined}
      />
    ),
    { includeRtl: true }
  )
  .addStory('Persona with children', () => (
    <Persona { ...examplePersona }>
      <span>Persona Children</span>
    </Persona>
  ));
