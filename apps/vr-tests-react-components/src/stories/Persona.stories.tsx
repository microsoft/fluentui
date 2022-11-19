import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Persona } from '@fluentui/react-persona';
import type { PersonaProps } from '@fluentui/react-persona';

const sizes: PersonaProps['size'][] = ['extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'];
const textPositions: PersonaProps['textPosition'][] = ['before', 'below', 'after'];
const textAlignments: PersonaProps['textAlignment'][] = ['start', 'center'];

storiesOf('Persona Converged', module)
  .addDecorator(story => (
    <div className="testWrapper" style={{ maxWidth: '750px' }}>
      {story()}
    </div>
  ))
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
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
  .addStory('size-avatar', () => (
    <div
      className="testWrapper"
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', maxWidth: '750px' }}
    >
      {sizes.map(size => (
        <Persona
          size={size}
          name="Kevin Sturgis"
          secondaryText="Software Engineer"
          tertiaryText="Available"
          quaternaryText="Microsoft"
          key={size}
        />
      ))}
    </div>
  ))
  .addStory('size-presence', () => (
    <div
      className="testWrapper"
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', maxWidth: '750px' }}
    >
      {sizes.map(size => (
        <Persona
          size={size}
          presenceOnly
          presence={{ status: 'available' }}
          name="Kevin Sturgis"
          secondaryText="Software Engineer"
          tertiaryText="Available"
          quaternaryText="Microsoft"
          key={size}
        />
      ))}
    </div>
  ))
  .addStory('textPosition', () => (
    <div className="testWrapper" style={{ display: 'flex', gap: '50px', padding: '10px', maxWidth: '750px' }}>
      {textPositions.map(textPosition => (
        <Persona
          textPosition={textPosition}
          presenceOnly
          presence={{ status: 'available' }}
          name="Kevin Sturgis"
          secondaryText="Software Engineer"
          tertiaryText="Available"
          quaternaryText="Microsoft"
          key={textPosition}
        />
      ))}
    </div>
  ))
  .addStory('textAlignment', () => (
    <div className="testWrapper" style={{ display: 'flex', gap: '50px', padding: '10px', maxWidth: '750px' }}>
      {textAlignments.map(textAlignment => (
        <Persona
          textAlignment={textAlignment}
          presenceOnly
          presence={{ status: 'available' }}
          name="Kevin Sturgis"
          secondaryText="Software Engineer"
          tertiaryText="Available"
          quaternaryText="Microsoft"
          key={textAlignment}
        />
      ))}
    </div>
  ));
