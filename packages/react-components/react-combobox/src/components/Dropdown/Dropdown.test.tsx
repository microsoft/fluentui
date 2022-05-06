import * as React from 'react';
import { render } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { isConformant } from '../../common/isConformant';

describe('Dropdown', () => {
  isConformant({
    Component: Dropdown,
    displayName: 'Dropdown',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Dropdown>Default Dropdown</Dropdown>);
    expect(result.container).toMatchSnapshot();
  });
});
