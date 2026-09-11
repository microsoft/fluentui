import * as React from 'react';
import { InfoLabel } from '@fluentui/react-windmod-preview/info-label';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

/** The asterisk sits between the text and the button, and keeps its own disabled colour where
 * the label text takes the inherited one. */
export const Required = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <InfoLabel required info="Example info">
        Required
      </InfoLabel>
      <InfoLabel required disabled info="Example info">
        Required and disabled
      </InfoLabel>
    </div>
  </FluentProvider>
);
