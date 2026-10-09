import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tooltip } from '@fluentui/react-windmod-preview/tooltip';

import styles from '../compare.module.css';

export const Default = (): React.ReactNode => (
  <FluentProvider>
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
  </FluentProvider>
);
