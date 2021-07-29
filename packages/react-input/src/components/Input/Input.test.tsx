import * as React from 'react';
import { render } from '@testing-library/react';
import { Input } from './Input';
import { isConformant } from '../../common/isConformant';

describe('Input', () => {
  isConformant({
    Component: Input,
    displayName: 'Input',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Input />);
    expect(result.container).toMatchSnapshot();
  });
});
