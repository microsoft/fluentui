import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner, spinnerClassNames } from './';

describe('Spinner', () => {
  it('renders with default visual state and accessible label', () => {
    const { container } = render(<Spinner label="Loading" />);

    const root = screen.getByRole('progressbar');
    expect(root).toHaveAttribute('data-appearance', 'primary');
    expect(root).toHaveAttribute('data-label-position', 'after');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveAttribute('aria-labelledby');
    expect(root).toHaveClass(spinnerClassNames.root);
    expect(container.querySelector(`.${spinnerClassNames.spinner}`)).toBeInTheDocument();
    expect(container.querySelector(`.${spinnerClassNames.spinnerTail}`)).toBeInTheDocument();
    expect(screen.getByText('Loading')).toHaveClass(spinnerClassNames.label);
  });

  it('maps visual props and preserves the consumer class name', () => {
    render(
      <Spinner appearance="inverted" className="custom-spinner" label="Loading" labelPosition="above" size="huge" />,
    );

    const root = screen.getByRole('progressbar');
    expect(root).toHaveAttribute('data-appearance', 'inverted');
    expect(root).toHaveAttribute('data-label-position', 'above');
    expect(root).toHaveAttribute('data-size', 'huge');
    expect(root).toHaveClass(spinnerClassNames.root, 'custom-spinner');
  });

  it('does not render spinner slots before a delay elapses', () => {
    const { container } = render(<Spinner delay={1000} label="Delayed loading" />);

    expect(container.querySelector(`.${spinnerClassNames.spinner}`)).not.toBeInTheDocument();
    expect(screen.queryByText('Delayed loading')).not.toBeInTheDocument();
  });

  it('supports rendering a span root', () => {
    render(<Spinner as="span" label="Loading" />);

    expect(screen.getByRole('progressbar').tagName).toBe('SPAN');
  });
});
