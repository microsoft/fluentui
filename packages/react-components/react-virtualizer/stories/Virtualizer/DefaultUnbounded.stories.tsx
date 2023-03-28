import * as React from 'react';
import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

import { useFluent } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    maxHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowAnchor: 'none',
    width: '100%',
    height: '100%',
  },
  child: {
    display: 'flex',
    height: '100px',
    lineHeight: '100px',
    width: '100%',
  },
  block: {
    width: '100%',
    paddingTop: '100px',
    paddingBottom: '100px',
    fontSize: '36px',
    textAlign: 'center',
  },
});

export const DefaultUnbounded = () => {
  const styles = useStyles();
  const childLength = 1000;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: 100,
  });

  const { targetDocument } = useFluent();
  if (targetDocument) {
    scrollRef(targetDocument.body);
  }

  return (
    <div aria-label="Virtualizer Example" className={styles.container} role={'list'}>
      <div key={`virtualizer-header`} className={styles.block}>{`Virtualizer`}</div>
      <Virtualizer
        numItems={childLength}
        virtualizerLength={virtualizerLength}
        bufferItems={bufferItems}
        bufferSize={bufferSize}
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
      <div key={`virtualizer-footer`} className={styles.block}>
        Footer
      </div>
    </div>
  );
};
