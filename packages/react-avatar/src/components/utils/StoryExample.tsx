import * as React from 'react';
import * as classes from './StoryExample';

export const StoryExample = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <div className={classes.root}>
    <h2>{title}</h2>
    <div className={classes.flex}>{children}</div>
  </div>
);
