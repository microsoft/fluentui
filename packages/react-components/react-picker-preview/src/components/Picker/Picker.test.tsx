import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Picker } from './Picker';

describe('Picker', () => {
  isConformant({
    Component: Picker,
    displayName: 'Picker',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Picker>Default Picker</Picker>);
    expect(result.container).toMatchSnapshot();
  });
});
