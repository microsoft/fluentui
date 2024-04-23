import * as React from 'react';
import { VirtualizerScrollView } from '@fluentui/react-components/unstable';
import type { ScrollToInterface } from '@fluentui/react-components/unstable';
import { Text, Input, makeStyles } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';

const useStyles = makeStyles({
  child: {
    height: '100px',
    lineHeight: '100px',
    width: '100%',
  },
});

export const ScrollTo = () => {
  const styles = useStyles();
  const childLength = 1000;
  const scrollRef = React.useRef<ScrollToInterface>(null);
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

  return (
    <div>
      <Input defaultValue={'0'} onChange={onChangeGoToIndex} />
      <Button onClick={scrollToIndex}>{'GoTo'}</Button>
      <Text>{message}</Text>
      <VirtualizerScrollView
        numItems={childLength}
        itemSize={100}
        container={{ role: 'list', style: { maxHeight: '100vh' } }}
        imperativeRef={scrollRef}
      >
        {(index: number) => {
          return (
            <div
              role={'listitem'}
              aria-posinset={index}
              aria-setsize={childLength}
              key={`test-virtualizer-child-${index}`}
              className={styles.child}
            >{`Node-${index}`}</div>
          );
        }}
      </VirtualizerScrollView>
    </div>
  );
};
