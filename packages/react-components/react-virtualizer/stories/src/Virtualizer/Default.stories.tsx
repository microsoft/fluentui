import * as React from 'react';
import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-components/unstable';
import { makeStyles, useMergedRefs, Button } from '@fluentui/react-components';

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
    lineHeight: '25px',
    width: '100%',
  },
});

export const Default = () => {
  const styles = useStyles();
  const childLength = 1000;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef, containerSizeRef } = useStaticVirtualizerMeasure({
    defaultItemSize: 25,
    bufferItems: 1,
    bufferSize: 12,
  });

  const mergedRef = useMergedRefs(scrollRef);

  return (
    <div>
      <Button
        onClick={() => {
          mergedRef.current?.scrollTo({ top: 1000 });
        }}
      >
        {'Go to pos: 1000'}
      </Button>
      <Button
        onClick={() => {
          mergedRef.current?.scrollTo({ top: 8000 });
        }}
      >
        {'Go to pos: 8000'}
      </Button>
      <div aria-label="Virtualizer Example" className={styles.container} role={'list'} ref={mergedRef}>
        <Virtualizer
          numItems={childLength}
          virtualizerLength={virtualizerLength}
          bufferItems={bufferItems}
          bufferSize={bufferSize}
          itemSize={25}
          containerSizeRef={containerSizeRef}
          scrollViewRef={mergedRef}
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
