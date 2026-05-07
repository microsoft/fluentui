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
    const { getByRole } = render(<Spinner>Default Spinner</Spinner>);
    const spinner = getByRole('progressbar');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('data-label-position', 'after');
  });

  it('renders with label position "before"', () => {
    const { getByRole } = render(<Spinner labelPosition="before">Loading</Spinner>);
    const spinner = getByRole('progressbar');

    expect(spinner).toHaveAttribute('data-label-position', 'before');
  });
});
