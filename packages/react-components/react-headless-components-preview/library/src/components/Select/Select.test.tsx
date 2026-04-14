import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Select } from './Select';

describe('Select', () => {
  isConformant({
    Component: Select,
    displayName: 'Select',
    primarySlot: 'select',
  });

  it('renders a default state', () => {
    const result = render(
      <Select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
