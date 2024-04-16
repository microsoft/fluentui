import * as React from 'react';
import { useStaticVirtualizerMeasure, Virtualizer } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '750px',
    direction: 'rtl',
  },
  child: {
    minWidth: '100px',
    minHeight: '100px',
    height: '100%',
  },
});

export const RTL = () => {
  const styles = useStyles();
  const childLength = 1000;

  const itemWidth = 100;
  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: itemWidth,
    direction: 'horizontal',
  });

  return (
    <div className={styles.container} role={'list'} ref={scrollRef}>
      <Virtualizer
        numItems={childLength}
        reversed
        axis={'horizontal'}
        virtualizerLength={virtualizerLength}
        bufferItems={bufferItems}
        bufferSize={bufferSize}
        itemSize={100}
      >
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
