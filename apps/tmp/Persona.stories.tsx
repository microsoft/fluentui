import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Persona } from '@fluentui/react-persona';
import { AvatarSizes } from '@fluentui/react-avatar';
import { BadgeProps } from '@fluentui/react-badge/src/Badge';

const avatarSizes: AvatarSizes[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];
const badgeSizes: BadgeProps['size'][] = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'];

storiesOf('Persona Converged', module)
  .addDecorator(story => (
    <div className="testWrapper" style={{ maxWidth: '750px' }}>
      {story()}
    </div>
  ))
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory(
    'basic',
    () => (
      <div
        className="testWrapper"
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', maxWidth: '750px' }}
      >
        <Persona name="Kevin Sturgis" secondaryText="Available" />
        <Persona name="Kevin Sturgis" secondaryText="Available" presence={{ status: 'available' }} />
        <Persona presenceOnly name="Kevin Sturgis" secondaryText="Available" presence={{ status: 'available' }} />
      </div>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('single-double-lines', () => (
    <div
      className="testWrapper"
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', maxWidth: '750px' }}
    >
      <Persona name="Kevin Sturgis" />
      <Persona presence={{ status: 'available' }} name="Kevin Sturgis" />
      <Persona presenceOnly presence={{ status: 'available' }} name="Kevin Sturgis" />
      <Persona name="Kevin Sturgis" secondaryText="Available" />
      <Persona presence={{ status: 'available' }} name="Kevin Sturgis" secondaryText="Available" />
      <Persona presenceOnly presence={{ status: 'available' }} name="Kevin Sturgis" secondaryText="Available" />
    </div>
  ))
  .addStory('size-avatar', () => (
    <div
      className="testWrapper"
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', maxWidth: '750px' }}
    >
      {avatarSizes.map(size => (
        <Persona avatar={{ size }} name="Kevin Sturgis" secondaryText="Software Engineer" key={size} />
      ))}
    </div>
  ))
  .addStory('size-presence', () => (
    <div
      className="testWrapper"
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', maxWidth: '750px' }}
    >
      {badgeSizes.map(size => (
        <Persona
          presenceOnly
          presence={{ size, status: 'available' }}
          name="Kevin Sturgis"
          secondaryText="Available"
          key={size}
        />
      ))}
    </div>
  ))
  .addStory('scaling', () => (
    <div
      className="testWrapper"
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', maxWidth: '750px' }}
    >
      <Persona name="Kevin Sturgis" presence={{ status: 'away' }} />
      <Persona name="Kevin Sturgis" presence={{ status: 'away' }} secondaryText="Away" />
      <Persona
        name="Kevin Sturgis"
        presence={{ status: 'away' }}
        secondaryText="Away"
        tertiaryText="Software Engineer"
      />
      <Persona
        name="Kevin Sturgis"
        presence={{ status: 'away' }}
        secondaryText="Away"
        tertiaryText="Software Engineer"
        quaternaryText="Last available 4:00 pm"
      />
    </div>
  ));
