import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { List } from '../List';
import { ListItem } from './ListItem';

describe('ListItem', () => {
  isConformant({
    Component: ListItem,
    displayName: 'ListItem',
    renderOptions: {
      wrapper: ({ children }) => <List>{children}</List>,
    },
  });

  it('renders a default list item', () => {
    const { getByRole } = render(
      <List>
        <ListItem>Item</ListItem>
      </List>,
    );
    expect(getByRole('listitem')).toBeInTheDocument();
  });

  it('renders as option when inside a selectable list', () => {
    const { getByRole } = render(
      <List selectionMode="single">
        <ListItem value="a">Item</ListItem>
      </List>,
    );
    expect(getByRole('option')).toBeInTheDocument();
  });
});
