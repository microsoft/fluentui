import * as React from 'react';
import { render } from '@testing-library/react';
import { Radio } from './Radio';
import { isConformant } from '../../common/isConformant';

describe('Radio', () => {
  isConformant({
    Component: Radio,
    displayName: 'Radio',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Radio>Default Radio</Radio>);
    expect(result.container).toMatchSnapshot();
  });
});
