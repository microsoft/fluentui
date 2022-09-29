import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Persona } from '@fluentui/react-persona';
import { AvatarSizes } from '@fluentui/react-avatar';
import { BadgeProps } from '@fluentui/react-badge/src/Badge';

const avatarSizes: AvatarSizes[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];
const badgeSizes: BadgeProps['size'][] = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'];

storiesOf('Persona Converged', module)
  .addDecorator(story => (
    <div
      className="testWrapper"
      style={{ display: 'grid', gap: '10px', padding: '10px', gridTemplateColumns: '1fr 1fr 1fr', maxWidth: '750px' }}
    >
      {story()}
    </div>
  ))
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory(
    'basic',
    () => (
      <>
        <Persona name="Kevin Sturgis" secondaryText="Available" />
        <Persona name="Kevin Sturgis" secondaryText="Available" presence={{ status: 'available' }} />
        <Persona presenceOnly name="Kevin Sturgis" secondaryText="Available" presence={{ status: 'available' }} />
      </>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('single-double-lines', () => (
    <>
      <Persona name="Kevin Sturgis" />
      <Persona presence={{ status: 'available' }} name="Kevin Sturgis" />
      <Persona presenceOnly presence={{ status: 'available' }} name="Kevin Sturgis" />
      <Persona name="Kevin Sturgis" secondaryText="Available" />
      <Persona presence={{ status: 'available' }} name="Kevin Sturgis" secondaryText="Available" />
      <Persona presenceOnly presence={{ status: 'available' }} name="Kevin Sturgis" secondaryText="Available" />
    </>
  ))
  .addStory('size-avatar', () => (
    <>
      {avatarSizes.map(size => (
        <Persona avatar={{ size }} name="Kevin Sturgis" secondaryText="Available" />
      ))}
    </>
  ))
  .addStory('size-presence', () => (
    <>
      {badgeSizes.map(size => (
        <Persona presence={{ size }} name="Kevin Sturgis" secondaryText="Available" />
      ))}
    </>
  ));
