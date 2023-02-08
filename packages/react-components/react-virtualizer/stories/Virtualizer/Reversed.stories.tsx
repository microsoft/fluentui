import * as React from 'react';
import { Virtualizer } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowAnchor: 'none',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '750px',
  },
  child: {
    height: '100px',
    lineHeight: '100px',
    width: '100%',
  },
});

export const Reversed = () => {
  const styles = useStyles();
  const childLength = 1000;

  return (
    <div aria-label="Reversed Virtualizer Example" className={styles.container} role={'list'}>
      <Virtualizer numItems={childLength} reversed virtualizerLength={100} itemSize={100}>
        {index => {
          return (
            <span
              role={'listItem'}
              aria-posinset={index}
              aria-setsize={childLength}
              key={`test-virtualizer-child-${index}`}
              className={styles.child}
            >{`Node-${index}`}</span>
          );
        }}
      </Virtualizer>
    </div>
  );
};
