import * as React from 'react';
import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-components/unstable';
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

export const Default = () => {
  const styles = useStyles();
  const childLength = 1000;
  const scrollView = React.useRef<HTMLElement | null>(null);

  const { virtualizerLength, virtualizerBufferItems, virtualizerBufferSize } = useStaticVirtualizerMeasure(
    100,
    scrollView.current,
  );

  console.log('Got length:', virtualizerLength);
  console.log('Got virtualizerBufferItems:', virtualizerBufferItems);
  console.log('Got virtualizerBufferSize:', virtualizerBufferSize);

  return (
    <span aria-label="Virtualizer Example" className={styles.container} role={'list'} ref={scrollView}>
      <Virtualizer
        numItems={childLength}
        virtualizerLength={virtualizerLength}
        bufferItems={virtualizerBufferItems}
        bufferSize={virtualizerBufferSize}
        itemSize={100}
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
    </span>
  );
};
