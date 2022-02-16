import * as React from 'react';
import { render } from '@testing-library/react';
import { Combobox } from './Combobox';
import { isConformant } from '../../common/isConformant';

describe('Combobox', () => {
  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Combobox>Default Combobox</Combobox>);
    expect(result.container).toMatchSnapshot();
  });
});
