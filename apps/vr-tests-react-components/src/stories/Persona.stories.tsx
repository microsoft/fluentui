import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Persona } from '@fluentui/react-persona';
import type { PersonaProps } from '@fluentui/react-persona';
import { getStoryVariant, withStoryWrightSteps, RTL, HIGH_CONTRAST, DARK_MODE } from '../utilities';

const sizes: PersonaProps['size'][] = ['extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'];
const textPositions: PersonaProps['textPosition'][] = ['before', 'below', 'after'];
const textAlignments: PersonaProps['textAlignment'][] = ['start', 'center'];

export default {
  title: 'Persona Converged',

  decorators: [
    story => (
      <div className="testWrapper" style={{ maxWidth: '750px' }}>
        {story()}
      </div>
    ),
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof Persona>;

export const Basic = () => (
  <div
    className="testWrapper"
    style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', maxWidth: '750px' }}
  >
    <Persona name="Kevin Sturgis" secondaryText="Available" />
    <Persona name="Kevin Sturgis" secondaryText="Available" presence={{ status: 'available' }} />
    <Persona presenceOnly name="Kevin Sturgis" secondaryText="Available" presence={{ status: 'available' }} />
  </div>
);
Basic.storyName = 'basic';

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicHighContrast = getStoryVariant(Basic, HIGH_CONTRAST);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

export const SizeAvatar = () => (
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
);
SizeAvatar.storyName = 'size-avatar';

export const SizePresence = () => (
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
);
SizePresence.storyName = 'size-presence';

export const TextPosition = () => (
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
);
TextPosition.storyName = 'textPosition';

export const TextAlignment = () => (
  <div className="testWrapper" style={{ display: 'flex', gap: '50px', padding: '10px', maxWidth: '750px' }}>
    {textAlignments.map(textAlignment => (
      <div key={textAlignment} style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <Persona
          textAlignment={textAlignment}
          presenceOnly
          presence={{ status: 'available' }}
          name="Kevin Sturgis"
          secondaryText="Software Engineer"
          tertiaryText="Available"
          quaternaryText="Microsoft"
          key={'presence-' + textAlignment}
        />
        {/* This test is to verify that when the Avatar takes more space
          than the text lines, the text lines are centered */}
        <Persona
          textAlignment={textAlignment}
          size="huge"
          name="Kevin Sturgis"
          secondaryText="Software Engineer"
          key={'avatar-' + textAlignment}
        />
      </div>
    ))}
  </div>
);
TextAlignment.storyName = 'textAlignment';

export const TextWrap = () => (
  <div className="testWrapper" style={{ padding: '10px', width: '200px' }}>
    <Persona
      presence={{ status: 'available' }}
      name="Do in incididunt ea minim laboris et est do consequat."
      secondaryText="Ea cupidatat esse ullamco velit officia sint ea sit duis id ea id eu."
      tertiaryText="Eiusmod mollit labore cupidatat enim amet dolor dolor."
      quaternaryText="Commodo est aute sunt eiusmod sint elit irure incididunt reprehenderit culpa."
    />
  </div>
);
TextWrap.storyName = 'textWrap';
