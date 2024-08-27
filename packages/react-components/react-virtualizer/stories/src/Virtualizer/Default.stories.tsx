import * as React from 'react';
import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-components/unstable';
import { makeStyles, useMergedRefs } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '60vh',
  },
  child: {
    height: '25px',
    lineHeight: '100px',
    width: '100%',
    minHeight: '100px',
  },
});

export const Default = () => {
  const styles = useStyles();
  const childLength = 1000;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef, containerSizeRef } = useStaticVirtualizerMeasure({
    defaultItemSize: 100,
  });

  const mergedref = useMergedRefs(scrollRef);

  return (
    <div>
      <div aria-label="Virtualizer Example" className={styles.container} role={'list'} ref={mergedref}>
        <Virtualizer
          numItems={childLength}
          virtualizerLength={virtualizerLength}
          bufferItems={bufferItems}
          bufferSize={bufferSize}
          itemSize={100}
          containerSizeRef={containerSizeRef}
          scrollViewRef={mergedref}
        >
          {index => {
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
        </Virtualizer>
      </div>
    </div>
  );
};
