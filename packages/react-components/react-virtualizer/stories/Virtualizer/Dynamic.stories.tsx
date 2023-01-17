import * as React from 'react';
import { Virtualizer } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

const smallSize = 100;
const largeSize = 200;
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowAnchor: 'none',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '750px',
  },
  child: {
    height: `${smallSize}px`,
    lineHeight: `${smallSize}px`,
    width: '100%',
    backgroundColor: '#BBBBBB',
  },
  childLarge: {
    height: `${largeSize}px`,
    lineHeight: `${largeSize}px`,
    width: '100%',
    backgroundColor: '#DDDDDD',
  },
});

export const Dynamic = () => {
  const [flag, toggleFlag] = React.useState(false);
  const styles = useStyles();
  const childLength = 1000;

  React.useEffect(() => {
    updateTimeout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTimeout = () =>
    setTimeout(() => {
      toggleFlag(iFlag => !iFlag);
      updateTimeout();
    }, 2000);

  const getSizeForIndex = (index: number): number => {
    const sizeValue1 = flag ? largeSize : smallSize;
    const sizeValue2 = flag ? smallSize : largeSize;

    const sizeValue = index % 2 === 0 ? sizeValue1 : sizeValue2;
    return sizeValue;
  };

  return (
    <div aria-label="Dynamic Virtualizer Example" className={styles.container} role={'list'}>
      <Virtualizer
        getItemSize={index => getSizeForIndex(index)}
        numItems={childLength}
        bufferSize={50}
        virtualizerLength={25}
        itemSize={100}
      >
        {(index: number) => {
          const sizeValue = getSizeForIndex(index);
          const sizeClass = sizeValue === smallSize ? styles.child : styles.childLarge;
          return (
            <div
              className={sizeClass}
              role={'listItem'}
              aria-posinset={index}
              aria-setsize={childLength}
              key={`child-node-${index}-${sizeValue}`}
            >{`Node-${index}-size-${sizeValue}`}</div>
          );
        }}
      </Virtualizer>
    </div>
  );
};
