import * as React from 'react';
import { InfoLabel } from '@fluentui/react-headless-components-preview/info-label';
import { InfoRegular } from '@fluentui/react-icons';

import styles from './info-label.module.css';

export const Default = (): React.ReactNode => (
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
      children: <InfoRegular fontSize={16} />,
    }}
  >
    Example label
  </InfoLabel>
);
