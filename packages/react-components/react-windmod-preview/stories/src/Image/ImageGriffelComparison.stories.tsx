import * as React from 'react';
import { Image } from '@fluentui/react-windmod-preview/image';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  FluentProvider as GriffelFluentProvider,
  Image as GriffelImage,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

// See ImageDefault.stories for why the source is an inline data URI.
const src = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">' +
    '<rect width="120" height="60" fill="#e8ecfb"/>' +
    '<rect x="0" y="0" width="30" height="15" fill="#c50f1f"/>' +
    '<rect x="90" y="45" width="30" height="15" fill="#107c10"/>' +
    '</svg>',
)}`;

type LookProps = {
  block?: boolean;
  bordered?: boolean;
  fit?: 'none' | 'center' | 'contain' | 'cover' | 'default';
  shadow?: boolean;
  shape?: 'square' | 'circular' | 'rounded';
  width?: number;
  height?: number;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'default', props: {} },
    { label: 'bordered', props: { bordered: true } },
    { label: 'shadow', props: { shadow: true } },
    { label: 'circular', props: { shape: 'circular', width: 64, height: 64 } },
    { label: 'rounded', props: { shape: 'rounded', width: 64, height: 64 } },
    { label: 'fit none', props: { fit: 'none' } },
    { label: 'fit center', props: { fit: 'center' } },
    { label: 'fit contain', props: { fit: 'contain' } },
    { label: 'fit cover', props: { fit: 'cover' } },
    { label: 'fit cover sized', props: { fit: 'cover', width: 80, height: 80 } },
    { label: 'block', props: { block: true } },
    { label: 'bordered shadow circular', props: { bordered: true, shadow: true, shape: 'circular' } },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div style={{ width: 100, height: 60 }}>
            <FluentProvider>
              <Image alt="" src={src} {...props} />
            </FluentProvider>
          </div>
          <div style={{ width: 100, height: 60 }}>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelImage alt="" src={src} {...props} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
