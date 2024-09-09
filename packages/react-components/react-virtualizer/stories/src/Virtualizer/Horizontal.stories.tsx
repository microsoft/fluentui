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
  },
  child: {
    minWidth: '100px',
    minHeight: '100px',
    height: '100%',
  },
});

export const Horizontal = () => {
  const styles = useStyles();
  const childLength = 1000;
  const itemWidth = 100;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: itemWidth,
    direction: 'horizontal',
  });

  return (
    <div aria-label="Horizontal Virtualizer Example" className={styles.container} role={'list'} ref={scrollRef}>
      <Virtualizer
        numItems={childLength}
        axis={'horizontal'}
        virtualizerLength={virtualizerLength}
        bufferItems={bufferItems}
        bufferSize={bufferSize}
        itemSize={itemWidth}
      >
        {index => {
          return (
            <span
              role={'listItem'}
              aria-setsize={childLength}
              aria-posinset={index}
              key={`test-virtualizer-child-${index}`}
              className={styles.child}
            >{`Node-${index}`}</span>
          );
        }}
      </Virtualizer>
    </div>
  );
};
