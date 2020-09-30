import * as React from 'react';
import * as classes from './StoryExample.scss';

export const StoryExample = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <div className={classes.root}>
    <h2>{title}</h2>
    <div className={classes.content}>{children}</div>
  </div>
);
