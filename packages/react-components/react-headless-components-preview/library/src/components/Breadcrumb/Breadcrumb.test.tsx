import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  isConformant({
    Component: Breadcrumb,
    displayName: 'Breadcrumb',
  });

  it('renders a default state', () => {
    const result = render(<Breadcrumb>Default Breadcrumb</Breadcrumb>);
    expect(result.container).toMatchSnapshot();
  });
});
