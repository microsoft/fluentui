import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Button } from './Button';

describe('Button', () => {
  isConformant({
    Component: Button,
    displayName: 'Button',
    requiredProps: { children: 'Button' },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Button>Default Button</Button>);
    expect(result.container).toMatchSnapshot();
  });
});
