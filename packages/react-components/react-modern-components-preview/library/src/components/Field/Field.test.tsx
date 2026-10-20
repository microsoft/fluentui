import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { fieldClassNames, Field } from './';

expect.extend(toHaveNoViolations);

describe('Field', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<Field label="Name">{controlProps => <input {...controlProps} />}</Field>);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders the default visual and headless state', () => {
    const { container } = render(
      <Field label="Name">
        <input />
      </Field>,
    );
    const root = container.firstElementChild;

    expect(root).toHaveAttribute('data-orientation', 'vertical');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveAttribute('data-validate-state', 'none');
    expect(root).toHaveClass(fieldClassNames.root);
    expect(screen.getByText('Name')).toHaveClass(fieldClassNames.label);
  });

  it('maps visual props and styles validation slots', () => {
    const { container } = render(
      <Field
        className="custom-field"
        label="Status"
        orientation="horizontal"
        size="large"
        validationMessage="Invalid value"
        validationMessageIcon={{ children: '!' }}
      >
        <input />
      </Field>,
    );
    const root = container.firstElementChild;

    expect(root).toHaveAttribute('data-orientation', 'horizontal');
    expect(root).toHaveAttribute('data-size', 'large');
    expect(root).toHaveAttribute('data-validate-state', 'error');
    expect(root).toHaveClass(fieldClassNames.root, 'custom-field');
    expect(screen.getByText('Invalid value')).toHaveClass(fieldClassNames.validationMessage);
    expect(screen.getByText('!')).toHaveClass(fieldClassNames.validationMessageIcon);
  });

  it('renders a visual icon by default for semantic validation states', () => {
    const { container } = render(
      <Field validationMessage="Saved" validationState="success">
        <input />
      </Field>,
    );

    expect(container.querySelector(`.${fieldClassNames.validationMessageIcon} svg`)).toBeTruthy();
  });
});
