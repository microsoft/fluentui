import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
  });

  it('renders a default state', () => {
    const result = render(<Spinner>Default Spinner</Spinner>);
    expect(result.container).toMatchSnapshot();
  });
});
