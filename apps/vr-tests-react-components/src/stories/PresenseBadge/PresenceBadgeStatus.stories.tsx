import * as React from 'react';
import type { Meta } from '@storybook/react';
import { PresenceBadge } from '@fluentui/react-badge';
import { getStoryVariant, RTL } from '../../utilities';

const statuses = ['available', 'away', 'busy', 'do-not-disturb', 'offline', 'out-of-office', 'unknown'] as const;

export default {
  title: 'PresenceBadge Converged - status',
} satisfies Meta<typeof PresenceBadge>;

export const Default = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    {statuses.map(status => (
      <PresenceBadge status={status} key={status} />
    ))}
  </div>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
