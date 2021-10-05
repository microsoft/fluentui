import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  root: theme => ({
    padding: '10px',
    fontFamily: theme.fontFamilyBase,
    color: theme.colorNeutralForeground1,
    background: theme.colorNeutralBackground1,
  }),
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    '> *': { margin: '4px' },
  },
});

export const StoryExample = ({ title, children }: React.PropsWithChildren<{ title: string }>) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h2>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
