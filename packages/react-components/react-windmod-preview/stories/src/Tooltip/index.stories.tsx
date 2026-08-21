import * as React from 'react';
import { Button, ThemeProvider, Tooltip } from '@fluentui/react-windmod-preview';
import type { TooltipProps } from '@fluentui/react-windmod-preview';
import {
  Button as GriffelButton,
  FluentProvider,
  Tooltip as GriffelTooltip,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

export default {
  title: 'Windmod/Tooltip',
  component: Tooltip,
};

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

const placements = [
  'above-start',
  'above',
  'above-end',
  'before-top',
  'before',
  'before-bottom',
  'after-top',
  'after',
  'after-bottom',
  'below-start',
  'below',
  'below-end',
] as const;

/** All 12 placements pinned open — exercises data-placement re-keying + the pure-CSS arrow. */
export const Placements = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.spacer}>
      {placements.map(positioning => (
        <Tooltip
          key={positioning}
          content={positioning}
          relationship="label"
          withArrow
          visible
          positioning={positioning as TooltipProps['positioning']}
        >
          <Button>{positioning}</Button>
        </Tooltip>
      ))}
    </div>
  </ThemeProvider>
);

/**
 * Pinned-open windmod tooltip next to its Griffel-suite twin. Note the mechanisms differ
 * (top-layer popover + CSS anchor positioning vs portal + react-positioning) — the
 * BUBBLES must match pixel-for-pixel; small placement offsets are the audit surface.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.spacer}>
    <ThemeProvider>
      <Tooltip content="Windmod tooltip" relationship="label" withArrow visible>
        <Button>Windmod</Button>
      </Tooltip>
    </ThemeProvider>
    <FluentProvider theme={webLightTheme}>
      <GriffelTooltip content="Griffel tooltip" relationship="label" withArrow visible>
        <GriffelButton>Griffel</GriffelButton>
      </GriffelTooltip>
    </FluentProvider>
  </div>
);
