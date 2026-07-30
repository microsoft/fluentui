import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';

import styles from './FluentCanvas.module.css';

/**
 * Canvas component to wrap stories in a styled container.
 * Provides a similar experience to Storybook's v7 `Canvas` component.
 */
export const FluentCanvas = (props: React.ComponentProps<'div'>): JSXElement => {
  return (
    <div className="sbdocs-preview">
      <div className={styles.canvas} {...props} />
    </div>
  );
};
