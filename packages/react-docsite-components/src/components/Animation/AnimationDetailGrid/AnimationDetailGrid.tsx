import * as React from 'react';
import { mergeStyleSets } from '@fluentui/react';
import { IAnimationDetailGridProps } from './AnimationDetailGrid.types';

const styles = mergeStyleSets({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '28px 0 52px 0',
  },
  item: {
    minWidth: '50%',
    marginBottom: 20,
  },
});

export const AnimationDetailGrid: React.FunctionComponent<IAnimationDetailGridProps> = props => {
  return (
    <div className={styles.root}>
      {props.children.map((item: JSX.Element, i: number) => (
        <div key={i} className={styles.item}>
          {item}
        </div>
      ))}
    </div>
  );
};
