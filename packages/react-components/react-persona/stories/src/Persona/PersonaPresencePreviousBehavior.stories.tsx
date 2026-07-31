import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Persona, presenceAvailableRegular, presenceOfflineRegular } from '@fluentui/react-components';

import styles from './PersonaPresencePreviousBehavior.module.css';

export const PresencePreviousBehavior = (): JSXElement => {
  const AwayFilledIcon = presenceAvailableRegular.small;
  const OfflineRegularIcon = presenceOfflineRegular.small;

  return (
    <div className={styles.root}>
      <span>Current Behavior</span>
      <Persona presence={{ status: 'away', outOfOffice: true }} name="Kevin Sturgis" secondaryText="Away - OOF" />
      <Persona presence={{ status: 'offline', outOfOffice: true }} name="Kevin Sturgis" secondaryText="Offline - OOF" />

      <span>Previous Behavior</span>
      <Persona
        presence={{
          status: 'away',
          outOfOffice: true,
          icon: <AwayFilledIcon />,
          className: styles.statusAway,
        }}
        name="Kevin Sturgis"
        secondaryText="Away - OOF"
      />
      <Persona
        presence={{
          status: 'offline',
          outOfOffice: true,
          icon: <OfflineRegularIcon />,
          className: styles.statusOffline,
        }}
        name="Kevin Sturgis"
        secondaryText="Offline - OOF"
      />
    </div>
  );
};

PresencePreviousBehavior.parameters = {
  docs: {
    description: {
      story: `PresenceBadge maps its presence to the behavior in v8. If the previous behavior is desired, it is
       possible to override the icon and className to match it. Note that Persona maps to one size
        smaller, such as \`huge\` to \`large\` and \`medium\` to \`small\`. As the size prop shows, Persona does not
        support tiny.`,
    },
  },
};
