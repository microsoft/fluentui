import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { List, ListItem, ListItemButton } from '@fluentui/react-list-preview';

import countries from './countries';

const CountriesList = (props: React.ComponentProps<typeof List>) => <List aria-label="Countries" {...props} />;

export const VirtualizedListWithActionableItems = () => {
  return (
    <FixedSizeList
      height={400}
      itemCount={countries.length}
      itemSize={20}
      width="100%"
      itemData={countries}
      outerElementType={CountriesList}
    >
      {({ index, style, data }) => (
        <ListItem style={style} key={index} aria-setsize={countries.length} aria-posinset={index + 1}>
          <ListItemButton onClick={() => alert(data[index])}>{data[index]}</ListItemButton>
        </ListItem>
      )}
    </FixedSizeList>
  );
};

VirtualizedListWithActionableItems.parameters = {
  docs: {
    description: {
      story: [
        'Virtualized list can also be used with interactive elements. Note that the list itself is not focusable',
        'anymore, since each list item is focusable. To make sure list items are focusable, the `button` slot',
        'is used.',
      ].join('\n'),
    },
  },
};
