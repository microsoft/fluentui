import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Field } from './Field';

describe('Field', () => {
  isConformant({
    Component: Field,
    displayName: 'Field',
  });

  it('renders a default state', () => {
    const { getByText, container } = render(<Field>Default Field</Field>);
    const root = container.firstElementChild!;

    expect(getByText('Default Field')).toBeInTheDocument();
    expect(root).toHaveAttribute('data-validate-state', 'none');
  });

  it('renders with error validation state', () => {
    const { container } = render(<Field validationState="error">Error Field</Field>);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-validate-state', 'error');
  });

  it('renders with success validation state', () => {
    const { container } = render(<Field validationState="success">Success Field</Field>);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-validate-state', 'success');
  });
});
