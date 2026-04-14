import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Switch } from './Switch';

describe('Switch', () => {
  isConformant({
    Component: Switch,
    displayName: 'Switch',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const result = render(<Switch defaultChecked label="Default Switch" />);
    expect(result.container).toMatchSnapshot();
  });
});
