import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-windmod-preview/popover';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <Popover>
        <PopoverTrigger>
          <Button>Click me</Button>
        </PopoverTrigger>
        <PopoverSurface>Example popover</PopoverSurface>
      </Popover>
      <Popover withArrow>
        <PopoverTrigger>
          <Button>Click me (arrow)</Button>
        </PopoverTrigger>
        <PopoverSurface>With an arrow</PopoverSurface>
      </Popover>
      <Popover withArrow appearance="brand" size="large">
        <PopoverTrigger>
          <Button>Click me (brand)</Button>
        </PopoverTrigger>
        <PopoverSurface>Brand appearance, large</PopoverSurface>
      </Popover>
      <Popover withArrow trapFocus>
        <PopoverTrigger>
          <Button>Click me (modal)</Button>
        </PopoverTrigger>
        <PopoverSurface>
          Focus is trapped here — Escape closes.
          <Button>Focusable</Button>
        </PopoverSurface>
      </Popover>
    </div>
  </FluentProvider>
);
