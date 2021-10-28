import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Divider } from '../Divider'; // codesandbox-dependency: @fluentui/react-divider ^9.0.0-beta

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    background: 'white',
    minHeight: '96px',
  },
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
