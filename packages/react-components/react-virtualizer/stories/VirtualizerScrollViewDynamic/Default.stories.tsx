import * as React from 'react';
import { VirtualizerScrollViewDynamic } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';
import { useEffect } from 'react';

const useStyles = makeStyles({
  child: {
    lineHeight: '42px',
    width: '100%',
    minHeight: '42px',
  },
});

export const Default = () => {
  const styles = useStyles();
  const childLength = 1000;
  const minHeight = 42;
  // Array size ref stores a list of random num for div sizing and callbacks
  const arraySize = React.useRef(new Array<number>(childLength).fill(minHeight));
  // totalSize flag drives our callback update
  const [totalSize, setTotalSize] = React.useState(minHeight * childLength);

  useEffect(() => {
    let _totalSize = 0;
    for (let i = 0; i < childLength; i++) {
      arraySize.current[i] = Math.floor(Math.random() * 150 + minHeight);
      _totalSize += arraySize.current[i];
    }
    setTotalSize(_totalSize);
  }, []);

  const getItemSizeCallback = React.useCallback(
    (index: number) => {
      return arraySize.current[index];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arraySize, totalSize],
  );

  return (
    <VirtualizerScrollViewDynamic
      numItems={childLength}
      itemSize={minHeight}
      getItemSize={getItemSizeCallback}
      container={{ role: 'list', style: { maxHeight: '100vh' } }}
    >
      {(index: number) => {
        const backgroundColor = index % 2 ? '#FFFFFF' : '#ABABAB';
        return (
          <div
            role={'listitem'}
            aria-posinset={index}
            aria-setsize={childLength}
            key={`test-virtualizer-child-${index}`}
            className={styles.child}
            style={{ minHeight: arraySize.current[index], backgroundColor }}
          >{`Node-${index} - size: ${arraySize.current[index]}`}</div>
        );
      }}
    </VirtualizerScrollViewDynamic>
  );
};
