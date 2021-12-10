import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Divider } from '../Divider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: theme => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: theme.colorNeutralBackground1,
  }),
});

export const Vertical = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider vertical style={{ height: '100%' }} />
      </div>
      <div className={styles.example}>
        <Divider vertical style={{ height: '100%' }}>
          Text
        </Divider>
      </div>
    </div>
  );
};
