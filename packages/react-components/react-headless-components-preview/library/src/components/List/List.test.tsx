import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { List } from './List';

describe('List', () => {
  isConformant({
    Component: List,
    displayName: 'List',
  });

  it('renders a default list', () => {
    const { getByRole } = render(<List>content</List>);
    expect(getByRole('list')).toBeInTheDocument();
  });

  it('renders a listbox when selectionMode is provided', () => {
    const { getByRole } = render(<List selectionMode="single">content</List>);
    expect(getByRole('listbox')).toBeInTheDocument();
  });

  it('renders a grid when navigationMode is composite', () => {
    const { getByRole } = render(<List navigationMode="composite">content</List>);
    expect(getByRole('grid')).toBeInTheDocument();
  });
});
