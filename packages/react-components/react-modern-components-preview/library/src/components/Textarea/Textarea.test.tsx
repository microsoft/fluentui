import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Textarea } from './Textarea';
import { textareaClassNames } from './useTextareaStyles.styles';

expect.extend(toHaveNoViolations);

describe('Textarea', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<Textarea aria-label="Textarea" />);

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders default visual state and modern class names', () => {
    const { getByRole } = render(<Textarea aria-label="Textarea" />);
    const textarea = getByRole('textbox');
    const root = textarea.parentElement;

    expect(root).toHaveAttribute('data-appearance', 'outline');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveAttribute('data-resize', 'none');
    expect(root).toHaveClass(textareaClassNames.root);
    expect(textarea).toHaveClass(textareaClassNames.textarea);
  });

  it('maps visual props to data attributes', () => {
    const { getByRole } = render(
      <Textarea aria-label="Textarea" appearance="filled-lighter-shadow" resize="vertical" size="large" />,
    );
    const root = getByRole('textbox').parentElement;

    expect(root).toHaveAttribute('data-appearance', 'filled-lighter-shadow');
    expect(root).toHaveAttribute('data-size', 'large');
    expect(root).toHaveAttribute('data-resize', 'vertical');
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(
      <Textarea aria-label="Textarea" className="custom-root" textarea={{ className: 'custom-textarea' }} />,
    );
    const textarea = getByRole('textbox');

    expect(textarea.parentElement).toHaveClass('custom-root');
    expect(textarea).toHaveClass('custom-textarea');
  });
});
