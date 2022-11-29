import * as React from 'react';
import { Virtualizer } from '@fluentui/react-components/unstable';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    overflowAnchor: 'none',
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '750px',
  },
  child: {
    minWidth: '100px',
    minHeight: '100px',
    height: '100%',
    zIndex: 1,
  },
});

export const ReversedHorizontal = () => {
  const styles = useStyles();
  const childLength = 1000;
  const childList = React.useMemo(() => {
    const nodeList: React.ReactNode[] = [];
    for (let i = 0; i < childLength; i++) {
      nodeList.push(<span className={styles.child}>{`Node-${i}`}</span>);
    }
    return nodeList;
  }, [childLength]);

  return (
    <div className={styles.container}>
      <Virtualizer isReversed isHorizontal virtualizerLength={100} itemSize={100}>
        {childList}
      </Virtualizer>
    </div>
  );
};
