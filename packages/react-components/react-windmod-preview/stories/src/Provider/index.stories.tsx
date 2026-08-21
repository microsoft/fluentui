import * as React from 'react';
import {
  Button,
  teamsDarkThemeClassName,
  teamsHighContrastThemeClassName,
  ThemeProvider,
  Tooltip,
  webDarkThemeClassName,
} from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

export default {
  title: 'Windmod/ThemeProvider',
  component: ThemeProvider,
};

/**
 * Nested theme subtrees from a `display: contents` provider. The dark subtree's tooltip
 * opens in the TOP LAYER and stays dark-themed — top-layer elements keep their DOM
 * ancestry, so the provider's custom properties cascade into them.
 */
export const NestedThemes = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      <div className={styles.surface}>
        <div className={styles.row}>
          <Button appearance="primary">Web light (default)</Button>
          <Tooltip content="Light-themed tooltip" relationship="label" withArrow visible>
            <Button>Pinned tooltip</Button>
          </Tooltip>
        </div>
      </div>
      <ThemeProvider theme={webDarkThemeClassName}>
        <div className={styles.surface}>
          <div className={styles.row}>
            <Button appearance="primary">Web dark subtree</Button>
            <Tooltip content="Dark-themed tooltip (top layer)" relationship="label" withArrow visible>
              <Button>Pinned tooltip</Button>
            </Tooltip>
          </div>
        </div>
      </ThemeProvider>
      <ThemeProvider theme={teamsDarkThemeClassName}>
        <div className={styles.surface}>
          <div className={styles.row}>
            <Button appearance="primary">Teams dark subtree</Button>
            <Button appearance="outline">Outline</Button>
            <Button appearance="subtle">Subtle</Button>
          </div>
        </div>
      </ThemeProvider>
      <ThemeProvider theme={teamsHighContrastThemeClassName}>
        <div className={styles.surface}>
          <div className={styles.row}>
            <Button appearance="primary">Teams high contrast subtree</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  </ThemeProvider>
);
