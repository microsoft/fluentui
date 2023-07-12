import { Button, makeStyles, shorthands, useArrowNavigationGroup } from '@fluentui/react-components';
import * as React from 'react';
import { VirtualizerScrollView } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  container: {
    maxHeight: '300px',
    width: '100%',
    maxWidth: '100%',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'auto',
    ...shorthands.padding('10px', '2px'),
    ...shorthands.gap('10px'),
  },
  child: {
    scrollSnapAlign: 'start',
    height: '100px',
    width: '100px',
    midWidth: '100px',
  },
  button: {
    width: '100%',
    height: '100%',
  },
});

export const SnapToAlignment = () => {
  const styles = useStyles();
  const childLength = 1000;
  const attributes = useArrowNavigationGroup({
    axis: 'horizontal',
    memorizeCurrent: true,
  });

  return (
    <VirtualizerScrollView
      numItems={childLength}
      itemSize={100}
      axis="horizontal"
      container={{ role: 'list', className: styles.container, ...attributes }}
    >
      {(index: number) => {
        return (
          <div
            role={'listitem'}
            aria-posinset={index}
            aria-setsize={childLength}
            key={`test-virtualizer-child-${index}`}
            className={styles.child}
          >
            <Button className={styles.button}>{`Node-${index}`}</Button>
          </div>
        );
      }}
    </VirtualizerScrollView>
  );
};
