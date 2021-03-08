import * as React from 'react';
import { PresenceBadge } from '@fluentui/react-badge';
import { SkypeMinusIcon, SkypeClockIcon, SkypeCheckIcon, CancelIcon, SkypeArrowIcon } from '@fluentui/react-icons-mdl2';

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
      <PresenceBadge status="busy" icon={<SkypeMinusIcon />} />
      <PresenceBadge status="away" icon={<SkypeClockIcon />} />
      <PresenceBadge status="available" icon={<SkypeCheckIcon />} />
      <PresenceBadge status="outOfOffice" icon={<SkypeArrowIcon />} />
      <PresenceBadge status="offline" icon={<CancelIcon />} />
    </div>
  </>
);
