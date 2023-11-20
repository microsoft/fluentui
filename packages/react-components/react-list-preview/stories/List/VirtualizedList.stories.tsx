import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { List, ListItem } from '@fluentui/react-list-preview';

import countries from './countries';

const CountriesList = React.forwardRef<HTMLUListElement>((props: React.ComponentProps<typeof List>, ref) => (
  <List aria-label="Countries" tabIndex={0} {...props} ref={ref} />
));

export const VirtualizedList = () => {
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
          {data[index]}
        </ListItem>
      )}
    </FixedSizeList>
  );
};

VirtualizedList.parameters = {
  docs: {
    description: {
      story: [
        'When creating a list of large size, one way of making sure you are getting the best performance',
        'is to use virtualization. In this example we are leveraging the `react-window` package.',
        '',
        'Please note that if the virtualized list contains non-actionable list items, scrolling should be achieved',
        'by using the `tabIndex={0}` property on the List.',
        '',
        'It is also important to manually set `aria-setsize` and `aria-posinset` attributes on the list items, since',
        'the virualization will only render the visible items. Relying on the DOM state for these attributes will not work.',
      ].join('\n'),
    },
  },
};
