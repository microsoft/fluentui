import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const result = render(<Checkbox defaultChecked label="Default Checkbox" />);
    expect(result.container).toMatchSnapshot();
  });
});
