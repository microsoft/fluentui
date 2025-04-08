import * as React from 'react';
import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-virtualizer';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '80vh',
  },
  child: {
    height: '25px',
    lineHeight: '25px',
    width: '100%',
    minHeight: '25px',
  },
});

export const Default = () => {
  const styles = useStyles();
  const childLength = 1000;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef, containerSizeRef } = useStaticVirtualizerMeasure({
    defaultItemSize: 25,
  });

  return (
    <div>
      <div aria-label="Virtualizer Example" className={styles.container} role={'list'} ref={scrollRef}>
        <Virtualizer
          numItems={childLength}
          virtualizerLength={virtualizerLength}
          bufferItems={bufferItems}
          bufferSize={bufferSize}
          itemSize={25}
          containerSizeRef={containerSizeRef}
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
