import * as React from 'react';
import { PresenceBadge } from '@fluentui/react-badge';

export const PresenceBadgeStatus = () => (
  <>
    <h2>Circular (default)</h2>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
      }}
    >
      <PresenceBadge status="busy" />
      <PresenceBadge status="away" />
      <PresenceBadge status="available" />
      <PresenceBadge status="outOfOffice" />
      <PresenceBadge status="offline" />
    </div>
  </>
);
