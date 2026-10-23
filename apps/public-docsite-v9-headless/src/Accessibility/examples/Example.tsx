import * as React from 'react';

import styles from './accessibility.module.css';

export type ExampleProps = {
  variant: 'good' | 'bad';
  /** What to try, e.g. "Tab to the button". */
  hint?: string;
  children: React.ReactNode;
};

/**
 * Frames a live Good/Bad accessibility example on the Accessibility docs pages.
 */
export const Example = ({ variant, hint, children }: ExampleProps): React.ReactElement => (
  <figure className={styles.example} data-variant={variant}>
    <figcaption className={styles.caption}>
      <span className={styles.badge}>{variant === 'good' ? 'Do' : "Don't"}</span>
      {hint && <span className={styles.hint}>{hint}</span>}
    </figcaption>
    <div className={styles.canvas}>{children}</div>
  </figure>
);

export const ExampleGrid = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <div className={styles.grid}>{children}</div>
);
