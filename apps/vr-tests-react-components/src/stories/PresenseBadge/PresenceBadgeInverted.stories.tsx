import * as React from 'react';
import type { Meta } from '@storybook/react';
import { PresenceBadge } from '@fluentui/react-badge';
import { tokens } from '@fluentui/react-theme';
import { Steps } from 'storywright';
import { getStoryVariant, withStoryWrightSteps, TestWrapperDecorator, HIGH_CONTRAST, DARK_MODE } from '../../utilities';

const statuses = ['available', 'away', 'busy', 'do-not-disturb', 'offline', 'out-of-office', 'unknown'] as const;
const sizes = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

export default {
  title: 'PresenceBadge Converged - inverted background',
  decorators: [
    TestWrapperDecorator,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof PresenceBadge>;

export const Default = () => (
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
);
Default.storyName = 'default';

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
