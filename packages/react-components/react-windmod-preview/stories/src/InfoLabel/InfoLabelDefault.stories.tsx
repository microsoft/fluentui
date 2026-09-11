import * as React from 'react';
import { InfoLabel } from '@fluentui/react-windmod-preview/info-label';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <InfoLabel info="An InfoButton opens a popover holding this text.">Label with info</InfoLabel>
      <InfoLabel>Label without info</InfoLabel>
    </div>
  </FluentProvider>
);
