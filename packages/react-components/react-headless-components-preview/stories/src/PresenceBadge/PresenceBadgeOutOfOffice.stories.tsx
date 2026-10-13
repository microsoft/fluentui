import * as React from 'react';
import { PresenceBadge, type PresenceBadgeStatus } from '@fluentui/react-headless-components-preview/badge';
import {
  PresenceAvailableRegular,
  PresenceBlockedRegular,
  PresenceDndRegular,
  PresenceOofRegular,
  PresenceUnknownRegular,
} from '@fluentui/react-icons';

import styles from './presence-badge.module.css';

const outOfOfficeIcons: Record<PresenceBadgeStatus, React.ReactElement> = {
  available: <PresenceAvailableRegular />,
  away: <PresenceOofRegular />,
  blocked: <PresenceBlockedRegular />,
  busy: <PresenceUnknownRegular />,
  'do-not-disturb': <PresenceDndRegular />,
  offline: <PresenceOofRegular />,
  'out-of-office': <PresenceOofRegular />,
  unknown: <PresenceUnknownRegular />,
};

export const OutOfOffice = (): React.ReactNode => (
  <div className={styles.demo}>
    {(Object.keys(outOfOfficeIcons) as PresenceBadgeStatus[]).map(status => (
      <PresenceBadge
        key={status}
        className={styles.presenceBadge}
        status={status}
        outOfOffice
        icon={{ className: styles.presenceIcon, children: outOfOfficeIcons[status] }}
      />
    ))}
  </div>
);
