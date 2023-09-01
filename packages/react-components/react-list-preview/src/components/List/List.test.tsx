import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { List } from './List';

describe('List', () => {
  isConformant({
    Component: List,
    displayName: 'List',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<List>Default List</List>);
    expect(result.container).toMatchSnapshot();
  });
});
