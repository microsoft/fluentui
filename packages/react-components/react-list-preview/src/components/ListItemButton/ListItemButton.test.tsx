import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ListItemButton } from './ListItemButton';

describe('ListItemButton', () => {
  isConformant({
    Component: ListItemButton,
    displayName: 'ListItemButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ListItemButton>Default ListItemButton</ListItemButton>);
    expect(result.container).toMatchSnapshot();
  });
});
