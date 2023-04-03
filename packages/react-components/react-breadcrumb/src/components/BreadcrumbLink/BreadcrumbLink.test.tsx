import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbLink } from './BreadcrumbLink';
import { isConformant } from '../../testing/isConformant';

describe('BreadcrumbLink', () => {
  isConformant({
    Component: BreadcrumbLink,
    displayName: 'BreadcrumbLink',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BreadcrumbLink>Default BreadcrumbLink</BreadcrumbLink>);
    expect(result.container).toMatchSnapshot();
  });
});
