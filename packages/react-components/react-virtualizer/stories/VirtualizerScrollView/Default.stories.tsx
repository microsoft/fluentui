import * as React from 'react';
import { VirtualizerScrollView } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';
// @ts-expect-error - we don support path aliases for libraries with both v8 and v9 as dependencies
import { ThemeProvider } from '@fluentui/react';

const useStyles = makeStyles({
  root: {
    maxHeight: '100vh',
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

  return (
    <ThemeProvider className={styles.root} applyTo="body">
      <VirtualizerScrollView
        numItems={childLength}
        itemSize={100}
        container={{ role: 'list', style: { maxHeight: '100vh' } }}
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
    </ThemeProvider>
  );
};
