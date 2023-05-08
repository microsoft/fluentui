import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { PresenceBadge } from '@fluentui/react-badge';
import { tokens } from '@fluentui/react-theme';
import { Steps, StoryWright } from 'storywright';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

const statuses = ['available', 'away', 'busy', 'do-not-disturb', 'offline', 'out-of-office', 'unknown'] as const;
const sizes = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

storiesOf('PresenceBadge Converged - status', module).addStory(
  'default',
  () => (
    <div style={{ display: 'flex', gap: 10 }}>
      {statuses.map(status => (
        <PresenceBadge status={status} key={status} />
      ))}
    </div>
  ),
  { includeRtl: true },
);

storiesOf('PresenceBadge Converged - OOF status', module).addStory(
  'default',
  () => (
    <div style={{ display: 'flex', gap: 10 }}>
      {statuses.map(status => (
        <PresenceBadge status={status} key={status} outOfOffice />
      ))}
    </div>
  ),
  { includeRtl: true },
);

storiesOf('PresenceBadge Converged - sizes', module).addStory(
  'default',
  () => (
    <div style={{ display: 'flex', gap: 10 }}>
      {sizes.map(size => (
        <PresenceBadge status="available" key={size} size={size} />
      ))}
    </div>
  ),
  { includeRtl: true },
);

storiesOf('PresenceBadge Converged - inverted background', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${2 * statuses.length}, auto)`,
          placeItems: 'start',
          gap: '10px',
          padding: '16px',
          backgroundColor: tokens.colorNeutralBackgroundInverted,
        }}
      >
        {sizes.map(size => (
          <>
            {statuses.map(status => (
              <PresenceBadge key={size + status} size={size} status={status} />
            ))}
            {statuses.map(status => (
              <PresenceBadge key={size + status + 'OOO'} size={size} status={status} outOfOffice />
            ))}
          </>
        ))}
      </div>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  );
