import * as React from 'react';
import { Divider, FluentProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const alignments = ['start', 'center', 'end'] as const;
const appearances = ['default', 'brand', 'subtle', 'strong'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {appearances.map(appearance =>
        alignments.map(alignContent => (
          <div key={`${appearance}-${alignContent}`} className={styles.row}>
            <div style={{ width: 240 }}>
              <Divider appearance={appearance} alignContent={alignContent}>
                {appearance} {alignContent}
              </Divider>
            </div>
            <div style={{ width: 240 }}>
              <Divider appearance={appearance} alignContent={alignContent} inset>
                inset
              </Divider>
            </div>
            <div style={{ width: 240 }}>
              <Divider appearance={appearance} alignContent={alignContent} />
            </div>
            <div style={{ display: 'flex', height: 120 }}>
              <Divider appearance={appearance} alignContent={alignContent} vertical>
                vertical
              </Divider>
            </div>
            <div style={{ display: 'flex', height: 120 }}>
              <Divider appearance={appearance} alignContent={alignContent} vertical />
            </div>
          </div>
        )),
      )}
    </div>
  </FluentProvider>
);
