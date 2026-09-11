import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  FluentProvider,
  teamsDarkThemeClassName,
  teamsHighContrastThemeClassName,
  webDarkThemeClassName,
} from '@fluentui/react-windmod-preview/provider';
import { Tooltip } from '@fluentui/react-windmod-preview/tooltip';

import styles from '../compare.module.css';

/**
 * Nested theme subtrees, each provider painting its own theme's surface. The dark subtree's
 * tooltip opens in the TOP LAYER and stays dark-themed — top-layer elements keep their DOM
 * ancestry, so the provider's custom properties cascade into them.
 */
export const NestedThemes = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.surface}>
        <div className={styles.row}>
          <Button appearance="primary">Web light (default)</Button>
          <Tooltip
            content={{ children: 'Light-themed tooltip', popover: 'manual' }}
            relationship="label"
            withArrow
            visible
          >
            <Button>Pinned tooltip</Button>
          </Tooltip>
        </div>
      </div>
      <FluentProvider theme={webDarkThemeClassName}>
        <div className={styles.surface}>
          <div className={styles.row}>
            <Button appearance="primary">Web dark subtree</Button>
            <Tooltip
              content={{ children: 'Dark-themed tooltip (top layer)', popover: 'manual' }}
              relationship="label"
              withArrow
              visible
            >
              <Button>Pinned tooltip</Button>
            </Tooltip>
          </div>
        </div>
      </FluentProvider>
      <FluentProvider theme={teamsDarkThemeClassName}>
        <div className={styles.surface}>
          <div className={styles.row}>
            <Button appearance="primary">Teams dark subtree</Button>
            <Button appearance="outline">Outline</Button>
            <Button appearance="subtle">Subtle</Button>
          </div>
        </div>
      </FluentProvider>
      <FluentProvider theme={teamsHighContrastThemeClassName}>
        <div className={styles.surface}>
          <div className={styles.row}>
            <Button appearance="primary">Teams high contrast subtree</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </FluentProvider>
    </div>
  </FluentProvider>
);
