import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbButton } from './BreadcrumbButton';
import { isConformant } from '../../testing/isConformant';

describe('BreadcrumbButton', () => {
  isConformant({
    Component: BreadcrumbButton,
    displayName: 'BreadcrumbButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BreadcrumbButton>Default BreadcrumbButton</BreadcrumbButton>);
    expect(result.container).toMatchSnapshot();
  });
});
