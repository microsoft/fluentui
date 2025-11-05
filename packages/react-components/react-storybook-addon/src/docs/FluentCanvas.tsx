import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  canvas: {
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
});

/**
 * Canvas component to wrap stories in a styled container.
 * Provides a similar experience to Storybook's v7 `Canvas` component.
 */
export const FluentCanvas = (props: React.ComponentProps<'div'>): JSXElement => {
  const styles = useStyles();

  return (
    <div className="sbdocs-preview">
      <div className={styles.canvas} {...props} />
    </div>
  );
};
