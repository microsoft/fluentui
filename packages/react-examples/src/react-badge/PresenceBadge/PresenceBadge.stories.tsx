import * as React from 'react';
import { PresenceBadge } from '@fluentui/react-badge';

export const PresenceBadgeStatus = () => (
  <>
    <h2>Status</h2>
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
      <PresenceBadge status="doNotDisturb" />
    </div>
    <h2>OOF</h2>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
      }}
    >
      <PresenceBadge outOfOffice status="busy" />
      <PresenceBadge outOfOffice status="away" />
      <PresenceBadge outOfOffice status="available" />
      <PresenceBadge outOfOffice status="outOfOffice" />
      <PresenceBadge outOfOffice status="offline" />
      <PresenceBadge outOfOffice status="doNotDisturb" />
    </div>
  </>
);
