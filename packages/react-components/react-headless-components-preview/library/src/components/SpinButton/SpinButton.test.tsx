import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SpinButton } from './SpinButton';

describe('SpinButton', () => {
  isConformant({
    Component: SpinButton,
    displayName: 'SpinButton',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const result = render(<SpinButton defaultValue={1} min={0} max={10} />);
    expect(result.container).toMatchSnapshot();
  });
});
