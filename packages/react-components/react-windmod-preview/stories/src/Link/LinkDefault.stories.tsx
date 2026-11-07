import * as React from 'react';
import { Link } from '@fluentui/react-windmod-preview/link';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

const appearances = ['default', 'subtle'] as const;
const inlines = [false, true] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {appearances.map(appearance =>
        inlines.map(inline => (
          <div key={`${appearance}-${inline}`} className={styles.row}>
            <Link appearance={appearance} inline={inline} href="https://example.com">
              {appearance}
              {inline ? ' inline' : ''}
            </Link>
            <Link appearance={appearance} inline={inline} href="https://example.com" disabled>
              Disabled
            </Link>
            <Link appearance={appearance} inline={inline} href="https://example.com" disabledFocusable>
              Disabled focusable
            </Link>
          </div>
        )),
      )}
      <div className={styles.row}>
        <Link href="https://example.com">Anchor</Link>
        <Link>Button</Link>
        <Link as="span">Span</Link>
      </div>
    </div>
  </FluentProvider>
);
