import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Input } from './Input';

describe('Input', () => {
  isConformant({
    Component: Input,
    displayName: 'Input',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const result = render(<Input placeholder="Input your text" />);
    expect(result.container).toMatchSnapshot();
  });
});
