import * as React from 'react';
import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-components/unstable';
import { makeStyles, useFluent } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    /*
     * This is an 'unbounded' example intended to show virtualization in Body doc scroll
     * However, we need a sensible height limit
     * this would be enforced by a browser window,
     * but iFrames can break this if not capped.
     */
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '300VH',
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

export const MultiUnbounded = () => {
  const styles = useStyles();
  const childLength = 100;
  const repeatingVirtualizers = 5;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: 100,
  });

  const { targetDocument } = useFluent();
  if (targetDocument) {
    scrollRef(targetDocument.body);
  }

  const renderHeader = (index: number) => {
    return <div key={`virtualizer-header-${index}`} className={styles.block}>{`Virtualizer Instance - ${index}`}</div>;
  };

  const renderVirtualization = (index: number) => {
    return (
      <Virtualizer
        numItems={childLength}
        virtualizerLength={virtualizerLength}
        bufferItems={bufferItems}
        bufferSize={bufferSize}
        itemSize={100}
        key={`virtualizer-container-${index}`}
      >
        {rowIndex => {
          return (
            <span
              role={'listitem'}
              aria-posinset={index * childLength + rowIndex}
              aria-setsize={childLength * repeatingVirtualizers}
              key={`virtualizer-child-${index}-${rowIndex}`}
              className={styles.child}
            >{`Node-${index}-${rowIndex}`}</span>
          );
        }}
      </Virtualizer>
    );
  };

  const renderVirtualizerLoop = () => {
    // Virtualizer instances can all run independently, even inline a single scroll view.
    const array = [];
    for (let i = 0; i < repeatingVirtualizers; i++) {
      array.push(renderHeader(i));
      array.push(renderVirtualization(i));
    }
    return array;
  };

  return (
    <div
      aria-label="Virtualizer Example"
      className={styles.container}
      role={'list'}
      key={'multi-virtualizer-container'}
    >
      {renderVirtualizerLoop()}
      <div key={`virtualizer-footer`} className={styles.block}>
        Footer
      </div>
    </div>
  );
};
