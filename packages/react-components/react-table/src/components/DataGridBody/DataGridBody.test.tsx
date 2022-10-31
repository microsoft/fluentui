import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridBody } from './DataGridBody';
import { isConformant } from '../../testing/isConformant';
import { DataGridBodyProps } from './DataGridBody.types';

describe('DataGridBody', () => {
  isConformant<DataGridBodyProps>({
    Component: DataGridBody,
    displayName: 'DataGridBody',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DataGridBody>Default DataGridBody</DataGridBody>);
    expect(result.container).toMatchSnapshot();
  });
});
