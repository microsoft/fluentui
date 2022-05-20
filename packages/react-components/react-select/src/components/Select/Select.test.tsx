import * as React from 'react';
import { render } from '@testing-library/react';
import { Select } from './Select';
import { isConformant } from '../../common/isConformant';

describe('Select', () => {
  isConformant({
    Component: Select,
    displayName: 'Select',
    primarySlot: 'select',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders the default state', () => {
    const result = render(<Select />);
    expect(result.container).toMatchSnapshot();
  });
});
