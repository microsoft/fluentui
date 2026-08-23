import * as React from 'react';
import { Button, FluentProvider, Tooltip } from '@fluentui/react-windmod-preview';
import {
  Button as GriffelButton,
  FluentProvider as GriffelFluentProvider,
  Tooltip as GriffelTooltip,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

/**
 * Pinned-open windmod tooltip next to its Griffel-suite twin. The mechanisms differ
 * (top-layer popover + CSS anchor positioning vs portal + react-positioning) — the
 * BUBBLES must match pixel-for-pixel; small placement offsets are the audit surface.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.spacer}>
    <FluentProvider>
      <Tooltip content={{ children: 'Windmod tooltip', popover: 'manual' }} relationship="label" withArrow visible>
        <Button>Windmod</Button>
      </Tooltip>
    </FluentProvider>
    <GriffelFluentProvider theme={webLightTheme}>
      <GriffelTooltip content="Griffel tooltip" relationship="label" withArrow visible>
        <GriffelButton>Griffel</GriffelButton>
      </GriffelTooltip>
    </GriffelFluentProvider>
  </div>
);
