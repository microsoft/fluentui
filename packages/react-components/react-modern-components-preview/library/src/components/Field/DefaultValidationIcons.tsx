import * as React from 'react';
import styles from './Field.module.css';

export const ErrorValidationIcon = (): React.ReactElement => (
  <svg aria-hidden="true" className={styles.validationIconGlyph} focusable="false" viewBox="0 0 12 12">
    <path d="M5.3.8a1 1 0 0 1 1.4 0l4.5 4.5a1 1 0 0 1 0 1.4l-4.5 4.5a1 1 0 0 1-1.4 0L.8 6.7a1 1 0 0 1 0-1.4L5.3.8ZM4.9 4l1.1 1.1L7.1 4 8 4.9 6.9 6 8 7.1 7.1 8 6 6.9 4.9 8 4 7.1 5.1 6 4 4.9 4.9 4Z" />
  </svg>
);

export const WarningValidationIcon = (): React.ReactElement => (
  <svg aria-hidden="true" className={styles.validationIconGlyph} focusable="false" viewBox="0 0 12 12">
    <path d="M5.15 1.5a1 1 0 0 1 1.7 0l4.5 7.5a1 1 0 0 1-.85 1.5h-9A1 1 0 0 1 .65 9l4.5-7.5ZM5.4 4v3.5h1.2V4H5.4Zm0 4.5v1.2h1.2V8.5H5.4Z" />
  </svg>
);

export const SuccessValidationIcon = (): React.ReactElement => (
  <svg aria-hidden="true" className={styles.validationIconGlyph} focusable="false" viewBox="0 0 12 12">
    <path d="M6 .75a5.25 5.25 0 1 0 0 10.5A5.25 5.25 0 0 0 6 .75Zm2.8 3.8L5.4 8 3.2 5.8l.85-.85L5.4 6.3l2.55-2.6.85.85Z" />
  </svg>
);
