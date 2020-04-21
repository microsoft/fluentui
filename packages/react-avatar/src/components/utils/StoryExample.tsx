import * as React from 'react';
import { mergeStyleSets } from '@fluentui/react';

const styles = mergeStyleSets({
  root: {
    padding: 10,
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    selectors: {
      '& > *:not(:first-child)': {
        marginLeft: 8,
      },
    },
  },
});

export const StoryExample = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <div className={styles.root}>
    <h2>{title}</h2>
    <div className={styles.flex}>{children}</div>
  </div>
);
