import { ObserverList } from '../ObserverList';
import * as React from 'react';

export const ObserverListExample = () => {
  // @ts-ignore @todo(keco): clean-up for IE compat
  const items: number[] = Array(1000).fill(0);

  return (
    <ObserverList virtualized={true} items={items} rowHeight={47} onIntersection={() => {}}>
      {(item: number, index: number) => (
        <li
          style={{
            padding: 14,
            background: index % 2 === 0 ? '#f4f4f4' : '#ffffff',
            borderLeft: '3px solid #0078d4',
            listStyleType: 'none',
            paddingLeft: 27
          }}
          key={index}
        >{`Item #${index}`}</li>
      )}
    </ObserverList>
  );
};
