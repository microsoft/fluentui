import * as React from 'react';
import { FluentProvider, InfoLabel } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const sizes = ['small', 'medium', 'large'] as const;

/** The size reaches the label typography, the button padding and the glyph — 12, 16 and 20px. */
export const Size = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {sizes.map(size => (
        <InfoLabel key={size} size={size} info={`Info at ${size}`}>
          Label {size}
        </InfoLabel>
      ))}
    </div>
  </FluentProvider>
);
