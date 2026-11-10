import * as React from 'react';
import { PresenceBadge, type PresenceBadgeStatus } from '@fluentui/react-headless-components-preview/badge';
import {
  PresenceAvailableFilled,
  PresenceAwayFilled,
  PresenceBlockedRegular,
  PresenceBusyFilled,
  PresenceDndFilled,
  PresenceOfflineRegular,
  PresenceOofRegular,
  PresenceUnknownRegular,
} from '@fluentui/react-icons';

import styles from './presence-badge.module.css';

const statusIcons: Record<PresenceBadgeStatus, React.ReactElement> = {
  available: <PresenceAvailableFilled />,
  away: <PresenceAwayFilled />,
  blocked: <PresenceBlockedRegular />,
  busy: <PresenceBusyFilled />,
  'do-not-disturb': <PresenceDndFilled />,
  offline: <PresenceOfflineRegular />,
  'out-of-office': <PresenceOofRegular />,
  unknown: <PresenceUnknownRegular />,
};

export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    {(Object.keys(statusIcons) as PresenceBadgeStatus[]).map(status => (
      <PresenceBadge
        key={status}
        className={styles.presenceBadge}
        status={status}
        icon={{ className: styles.presenceIcon, children: statusIcons[status] }}
      />
    ))}
  </div>
);
