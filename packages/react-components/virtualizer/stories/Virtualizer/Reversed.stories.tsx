import * as React from 'react';
import { Virtualizer } from '@fluentui/react-components/unstable';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowAnchor: 'none',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '750px',
  },
  child: {
    height: '100px',
    lineHeight: '100px',
    width: '100%',
  },
});

export const Reversed = () => {
  const styles = useStyles();
  const childLength = 1000;
  const childList = React.useMemo(() => {
    const nodeList: React.ReactNode[] = [];
    for (let i = 0; i < childLength; i++) {
      nodeList.push(<span className={styles.child}>{`Node-${i}`}</span>);
    }
    return nodeList;
  }, [styles.child]);

  return (
    <div className={styles.container}>
      <Virtualizer isReversed virtualizerLength={100} itemSize={100}>
        {childList}
      </Virtualizer>
    </div>
  );
};
