import * as React from 'react';
import { render } from '@testing-library/react';
import { Alert } from './Alert';
import { isConformant } from '../../common/isConformant';

describe('Alert', () => {
  isConformant({
    Component: Alert,
    displayName: 'Alert',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Alert>Default Alert</Alert>);
    expect(result.container).toMatchSnapshot();
  });
});
