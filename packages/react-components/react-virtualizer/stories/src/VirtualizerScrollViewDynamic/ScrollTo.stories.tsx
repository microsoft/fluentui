import * as React from 'react';
import { VirtualizerScrollViewDynamic } from '@fluentui/react-components/unstable';
import type { ScrollToInterface } from '@fluentui/react-components/unstable';
import type { VirtualizerDataRef } from '@fluentui/react-virtualizer';
import { Button, Input, makeStyles, Text } from '@fluentui/react-components';
import { useEffect } from 'react';

const useStyles = makeStyles({
  child: {
    lineHeight: '42px',
    width: '100%',
    minHeight: '42px',
  },
});

export const ScrollTo = () => {
  const styles = useStyles();
  const childLength = 1000;
  const minHeight = 42;
  // Array size ref stores a list of random num for div sizing and callbacks
  const arraySize = React.useRef(new Array<number>(childLength).fill(minHeight));
  // totalSize flag drives our callback update
  const [totalSize, setTotalSize] = React.useState(minHeight * childLength);

  const scrollRef = React.useRef<ScrollToInterface>(null);
  const sizeRef = React.useRef<VirtualizerDataRef>(null);
  const [goToIndex, setGoToIndex] = React.useState(0);
  const [message, setMessage] = React.useState('');

  const scrollToIndex = () => {
    if (scrollRef?.current?.scrollTo) {
      setMessage(`Going to index: ${goToIndex}`);
      scrollRef.current.scrollTo(goToIndex, 'smooth', (index: number) => {
        setMessage(`Reached index: ${index}`);
      });
    }
  };

  const onChangeGoToIndex = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>) => {
    const indexValue = ev ? (ev.currentTarget as HTMLInputElement).value : '';
    const newIndex = Math.min(Math.max(parseInt(indexValue, 10), 0), childLength - 1);
    setGoToIndex(newIndex);
  };

  useEffect(() => {
    let _totalSize = 0;
    for (let i = 0; i < childLength; i++) {
      arraySize.current[i] = Math.random() * 250 + minHeight;
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
    <div>
      <Input defaultValue={'0'} onChange={onChangeGoToIndex} />
      <Button onClick={scrollToIndex}>{'GoTo'}</Button>
      <Text>{message}</Text>
      <VirtualizerScrollViewDynamic
        numItems={childLength}
        itemSize={100}
        getItemSize={getItemSizeCallback}
        imperativeRef={scrollRef}
        imperativeVirtualizerRef={sizeRef}
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
    </div>
  );
};
