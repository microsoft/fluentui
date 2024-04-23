import * as React from 'react';
import { VirtualizerScrollView } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  child: {
    height: '100px',
    lineHeight: '100px',
    width: '100%',
  },
});

export const Default = () => {
  const styles = useStyles();
  const childLength = 100;

  return (
    <VirtualizerScrollView
      numItems={childLength}
      itemSize={100}
      container={{ role: 'list', style: { maxHeight: '100vh' } }}
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
