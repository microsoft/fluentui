import * as React from 'react';
import { InfoLabel } from '@fluentui/react-headless-components-preview/info-label';
import { Info16Regular } from '@fluentui/react-icons';

import styles from './info-label.module.css';

export const Required = (): React.ReactNode => (
  <InfoLabel
    className={styles.infoLabel}
    info={{
      className: styles.popover,
      children: (
        <>
          This is an InfoLabel's information.
          <a href="https://storybooks.fluentui.dev/headless/">Learn more</a>
        </>
      ),
    }}
    infoButton={{
      className: styles.infoButton,
      children: <Info16Regular />,
    }}
    required={{ className: styles.required, children: '*' }}
  >
    Example label
  </InfoLabel>
);
