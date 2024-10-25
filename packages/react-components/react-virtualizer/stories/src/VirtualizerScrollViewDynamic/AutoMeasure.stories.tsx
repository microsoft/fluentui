import * as React from 'react';
import { VirtualizerScrollViewDynamic } from '@fluentui/react-virtualizer';
import { makeStyles } from '@fluentui/react-components';
import { useEffect } from 'react';

const useStyles = makeStyles({
  child: {
    lineHeight: '25px',
    width: '100%',
    minHeight: '25px',
  },
});

export const AutoMeasure = () => {
  const styles = useStyles();
  const childLength = 100;
  const minHeight = 25;
  const maxHeightIncrease = 55;
  // Array size ref stores a list of random num for div sizing and callbacks
  const arraySize = React.useRef(new Array<number>(childLength).fill(minHeight));

  useEffect(() => {
    // Set random heights on init (to be measured)
    for (let i = 0; i < childLength; i++) {
      // if (i % 10 == 0) {
      if (i < 10) {
        arraySize.current[i] = 1000;
      } else {
        arraySize.current[i] = Math.floor(Math.random() * maxHeightIncrease + minHeight);
      }

      // arraySize.current[i] = Math.floor(Math.random() * maxHeightIncrease + minHeight);
    }
  }, []);

  return (
    <VirtualizerScrollViewDynamic
      numItems={childLength}
      // We can use itemSize to set average height and reduce unknown whitespace
      itemSize={minHeight + maxHeightIncrease / 2.0 + 100}
      container={{ role: 'list', style: { maxHeight: '80vh' } }}
      bufferItems={1}
      bufferSize={minHeight / 2.0}
    >
      {(index: number) => {
        const backgroundColor = index % 2 ? '#CCCCCC' : '#ABABAB';
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
