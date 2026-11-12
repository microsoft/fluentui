import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Field } from './Field';
import { Input } from '../Input';

describe('Field', () => {
  isConformant({
    Component: Field,
    displayName: 'Field',
  });

  it('renders a default state', () => {
    const { getByText, container } = render(<Field>Default Field</Field>);
    const root = container.firstElementChild!;

    expect(getByText('Default Field')).toBeInTheDocument();
    expect(root).toHaveAttribute('data-validation-state', 'none');
    expect(root).not.toHaveAttribute('data-validate-state');
  });

  it('renders with error validation state', () => {
    const { container } = render(<Field validationState="error">Error Field</Field>);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-validation-state', 'error');
  });

  it('renders with success validation state', () => {
    const { container } = render(<Field validationState="success">Success Field</Field>);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-validation-state', 'success');
  });

  it('defaults the existing validation icon slot to decorative', () => {
    const { getByText } = render(
      <Field validationMessage="Invalid" validationMessageIcon="!">
        <Input />
      </Field>,
    );
    expect(getByText('!')).toHaveAttribute('aria-hidden', 'true');
  });
});
