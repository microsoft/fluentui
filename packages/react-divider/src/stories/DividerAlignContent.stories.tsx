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

export const AlignContent = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider alignContent="start">start</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="center">center (default)</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="end">end</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="start" vertical>
          start
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="center" vertical>
          center (default)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="end" vertical>
          end
        </Divider>
      </div>
    </div>
  );
};
