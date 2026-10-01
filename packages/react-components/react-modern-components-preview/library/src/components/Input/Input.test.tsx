import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from './Input';
import { inputClassNames } from './useInputStyles.styles';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<Input aria-label="Input" />);

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders default visual state and modern class names', () => {
    const { getByRole } = render(<Input aria-label="Input" contentBefore="Before" contentAfter="After" />);
    const input = getByRole('textbox');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-appearance', 'outline');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveClass(inputClassNames.root);
    expect(input).toHaveClass(inputClassNames.input);
    expect(root?.firstElementChild).toHaveClass(inputClassNames.contentBefore);
    expect(root?.lastElementChild).toHaveClass(inputClassNames.contentAfter);
  });

  it('maps visual props to data attributes', () => {
    const { getByRole } = render(<Input aria-label="Input" appearance="filled-darker-shadow" size="large" />);

    expect(getByRole('textbox').parentElement).toHaveAttribute('data-appearance', 'filled-darker-shadow');
    expect(getByRole('textbox').parentElement).toHaveAttribute('data-size', 'large');
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(
      <Input aria-label="Input" className="custom-root" input={{ className: 'custom-input' }} />,
    );
    const input = getByRole('textbox');

    expect(input.parentElement).toHaveClass('custom-root');
    expect(input).toHaveClass('custom-input');
  });
});
