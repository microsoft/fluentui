import * as React from 'react';
import { Image, ThemeProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

/* A self-contained source: the storybook build serves no outbound network. Explicit width and
   height on the svg root give it the intrinsic size object-fit needs. */
const src = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">' +
    '<rect width="120" height="60" fill="#e8ecfb"/>' +
    '<rect x="0" y="0" width="30" height="15" fill="#c50f1f"/>' +
    '<rect x="90" y="45" width="30" height="15" fill="#107c10"/>' +
    '</svg>',
)}`;

const fits = ['default', 'none', 'center', 'contain', 'cover'] as const;
const shapes = ['square', 'circular', 'rounded'] as const;

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {fits.map(fit => (
          <div key={fit} style={{ width: 100, height: 60, overflow: 'hidden' }}>
            <Image alt="" src={src} fit={fit} />
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {shapes.map(shape => (
          <Image key={shape} alt="" src={src} shape={shape} width={64} height={64} />
        ))}
      </div>
      <div className={styles.row} style={{ gap: 24 }}>
        <Image alt="" src={src} bordered width={64} height={64} />
        <Image alt="" src={src} shadow width={64} height={64} />
        <Image alt="" src={src} bordered shadow shape="rounded" width={64} height={64} />
      </div>
      <div style={{ width: 240 }}>
        <Image alt="" src={src} block bordered />
      </div>
    </div>
  </ThemeProvider>
);
