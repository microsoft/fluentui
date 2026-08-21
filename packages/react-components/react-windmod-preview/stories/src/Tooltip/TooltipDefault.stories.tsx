import * as React from 'react';
import { Button, ThemeProvider, Tooltip } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.spacer}>
      <Tooltip content="Example tooltip" relationship="label">
        <Button>Hover me</Button>
      </Tooltip>
      <Tooltip content="With an arrow" relationship="label" withArrow>
        <Button>Hover me (arrow)</Button>
      </Tooltip>
      <Tooltip content="Inverted appearance" relationship="label" appearance="inverted" withArrow>
        <Button>Hover me (inverted)</Button>
      </Tooltip>
    </div>
  </ThemeProvider>
);
