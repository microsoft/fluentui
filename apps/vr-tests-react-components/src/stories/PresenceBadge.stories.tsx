import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { PresenceBadge, PresenceBadgeProps } from '@fluentui/react-badge';

const statuses: PresenceBadgeProps['status'][] = [
  'available',
  'away',
  'busy',
  'doNotDisturb',
  'offline',
  'outOfOffice',
  'unknown',
];

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
      {(['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as PresenceBadgeProps['size'][]).map(
        size => (
          <PresenceBadge status="available" key={size} size={size} />
        ),
      )}
    </div>
  ),
  { includeRtl: true },
);
