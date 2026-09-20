import * as React from 'react';
import styles from './InfoButton.module.css';

export const DefaultInfoButtonIcon = (): React.ReactElement => (
  <svg aria-hidden="true" className={styles.icon} focusable="false" viewBox="0 0 20 20">
    <path d="M10 1.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM3.25 10a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Zm5.9-1.25h1.5v5.5h-1.5v-5.5ZM10 5.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
  </svg>
);
