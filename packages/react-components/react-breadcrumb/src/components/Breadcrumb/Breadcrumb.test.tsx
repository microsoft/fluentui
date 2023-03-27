import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';
import { isConformant } from '../../testing/isConformant';

describe('Breadcrumb', () => {
  isConformant({
    Component: Breadcrumb,
    displayName: 'Breadcrumb',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Breadcrumb>Default Breadcrumb</Breadcrumb>);
    expect(result.container).toMatchSnapshot();
  });
});
