import * as React from 'react';
import { render } from '@testing-library/react';
import { AccordionItem } from './AccordionItem';
import { accordionItemClassNames } from './useAccordionItemStyles.styles';

describe('AccordionItem', () => {
  it('renders headless state and preserves the consumer class', () => {
    const { container } = render(
      <AccordionItem className="custom-root" disabled value="item">
        Item
      </AccordionItem>,
    );
    const root = container.firstElementChild;

    expect(root).toHaveAttribute('data-disabled');
    expect(root).toHaveClass(accordionItemClassNames.root, 'custom-root');
  });
});
