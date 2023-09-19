import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { List, ListItem } from '@fluentui/react-list-preview';

import countries from './countries';

export const VirtualizedList = () => {
  return (
    <List focusableItems>
      <FixedSizeList height={400} itemCount={countries.length} itemSize={20} width="100%" itemData={countries}>
        {({ index, style, data }) => (
          <ListItem style={style} key={index}>
            {data[index]}
          </ListItem>
        )}
      </FixedSizeList>
    </List>
  );
};

VirtualizedList.parameters = {
  docs: {
    description: {
      story: [
        'When creating a list of large size, one way of making sure you are getting the best performance',
        'is to use virtualization. In this example we are leveraging the `react-window` package.',
      ].join('\n'),
    },
  },
};
