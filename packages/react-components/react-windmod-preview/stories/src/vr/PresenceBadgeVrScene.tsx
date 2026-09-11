// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const statuses = [
  'available',
  'away',
  'blocked',
  'busy',
  'do-not-disturb',
  'offline',
  'out-of-office',
  'unknown',
] as const;
const sizes = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

type PresenceBadgeLike = React.ComponentType<{
  status?: (typeof statuses)[number];
  outOfOffice?: boolean;
  size?: (typeof sizes)[number];
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const PresenceBadgeVrScene = ({ PresenceBadge }: { PresenceBadge: PresenceBadgeLike }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {statuses.map(status => (
      <div key={status} style={row}>
        {sizes.map(size => (
          <PresenceBadge key={size} status={status} size={size} />
        ))}
      </div>
    ))}
    {statuses.map(status => (
      <div key={`oof-${status}`} style={row}>
        {sizes.map(size => (
          <PresenceBadge key={size} status={status} size={size} outOfOffice />
        ))}
      </div>
    ))}
  </div>
);
