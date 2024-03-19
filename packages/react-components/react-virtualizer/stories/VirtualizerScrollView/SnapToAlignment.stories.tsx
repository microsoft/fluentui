import * as React from 'react';
import { VirtualizerScrollView } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  child: {
    display: 'flex',
    height: '100px',
    lineHeight: '100px',
    width: '100px',
    minWidth: '100px',
  },
  container: {
    scrollSnapType: 'x mandatory',
  },
});

export const SnapToAlignment = () => {
  const styles = useStyles();
  const childLength = 100;

  return (
    <VirtualizerScrollView
      numItems={childLength}
      itemSize={100}
      axis={'horizontal'}
      container={{ role: 'list', className: styles.container }}
      enablePagination
    >
      {(index: number) => {
        return (
          <div
            role={'listitem'}
            aria-posinset={index}
            aria-setsize={childLength}
            key={`test-virtualizer-child-${index}`}
            className={styles.child}
          >{`Node-${index}`}</div>
        );
      }}
    </VirtualizerScrollView>
  );
};
