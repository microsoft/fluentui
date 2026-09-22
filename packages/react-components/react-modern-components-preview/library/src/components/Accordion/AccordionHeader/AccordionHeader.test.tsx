import * as React from 'react';
import { render } from '@testing-library/react';
import { AccordionHeader } from './AccordionHeader';
import { accordionHeaderClassNames } from './useAccordionHeaderStyles.styles';

describe('AccordionHeader', () => {
  it('renders stable visual defaults and the default expand icon', () => {
    const { getByRole } = render(<AccordionHeader>Header</AccordionHeader>);
    const button = getByRole('button');
    const root = button.parentElement;

    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).not.toHaveAttribute('data-inline');
    expect(root).toHaveClass(accordionHeaderClassNames.root);
    expect(button).toHaveClass(accordionHeaderClassNames.button);
    expect(root?.querySelector('[data-default-icon]')).toBeInTheDocument();
  });

  it('maps visual props and preserves consumer classes', () => {
    const { getByRole } = render(
      <AccordionHeader
        className="custom-root"
        button={{ className: 'custom-button' }}
        expandIconPosition="end"
        inline
        size="large"
      >
        Header
      </AccordionHeader>,
    );
    const button = getByRole('button');
    const root = button.parentElement;

    expect(root).toHaveAttribute('data-expand-icon-position', 'end');
    expect(root).toHaveAttribute('data-inline');
    expect(root).toHaveAttribute('data-size', 'large');
    expect(root).toHaveClass('custom-root');
    expect(button).toHaveClass('custom-button');
  });

  it('does not render an expand icon when the slot is null', () => {
    const { getByRole } = render(<AccordionHeader expandIcon={null}>Header</AccordionHeader>);

    expect(getByRole('button').querySelector('[data-default-icon]')).not.toBeInTheDocument();
  });
});
