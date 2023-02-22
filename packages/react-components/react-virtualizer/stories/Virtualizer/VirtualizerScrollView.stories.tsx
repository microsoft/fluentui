import * as React from 'react';
import { VirtualizerScrollView } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowAnchor: 'none',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '60vh',
  },
  child: {
    height: '100px',
    lineHeight: '100px',
    width: '100%',
  },
});

export const VirtualizerScrollViewDefault = () => {
  const styles = useStyles();
  const childLength = 1000;

  return (
    <div>
      <VirtualizerScrollView
        aria-label="Virtualizer Example"
        className={styles.container}
        role={'list'}
        numItems={childLength}
        itemSize={100}
        virtualizerLength={100}
        axis={'vertical'}
      >
        {(index: number) => {
          return (
            <span
              role={'listitem'}
              aria-posinset={index}
              aria-setsize={childLength}
              key={`test-virtualizer-child-${index}`}
              className={styles.child}
            >{`Node-${index}`}</span>
          );
        }}
      </VirtualizerScrollView>
    </div>
  );
};
