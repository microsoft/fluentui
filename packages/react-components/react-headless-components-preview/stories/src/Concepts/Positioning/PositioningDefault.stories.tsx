import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

import styles from './positioning.module.css';

export const Default = (props: PositioningProps): React.ReactNode => (
  <Popover positioning={props}>
    <PopoverTrigger>
      <button className={styles.trigger}>Click me</button>
    </PopoverTrigger>
    <PopoverSurface className={styles.surfaceCallout}>Container</PopoverSurface>
  </Popover>
);

Default.argTypes = {
  position: {
    control: 'select',
    options: ['above', 'below', 'before', 'after'],
  },
  align: {
    control: 'select',
    options: ['start', 'center', 'end'],
  },
  offset: {
    control: 'number',
  },
  coverTarget: {
    control: 'boolean',
  },
  fallbackPositions: { control: { disable: true } },
  autoSize: { control: { disable: true } },
};

Default.args = {
  position: 'above',
  align: 'center',
};
