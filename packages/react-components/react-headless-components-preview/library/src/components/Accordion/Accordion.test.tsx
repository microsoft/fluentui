import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Accordion } from './Accordion';
import { AccordionHeader } from './AccordionHeader/AccordionHeader';
import { AccordionItem } from './AccordionItem/AccordionItem';
import { AccordionPanel } from './AccordionPanel/AccordionPanel';

describe('Accordion', () => {
  isConformant({
    Component: Accordion,
    displayName: 'Accordion',
  });

  const items = [
    {
      id: 'item-1',
      header: 'Item #1 header',
      panel: 'Item #1 Panel',
    },
    {
      id: 'item-2',
      header: 'Item #2 header',
      panel: 'Item #2 Panel',
    },
  ];

  it('renders a default state', () => {
    const { getAllByRole, getByText } = render(
      <Accordion className="accordion" defaultOpenItems={items[0].id}>
        {items.map(item => (
          <AccordionItem className="accordion-item" key={item.id} value={item.id}>
            <AccordionHeader className="accordion-header">{item.header}</AccordionHeader>
            <AccordionPanel className="accordion-panel">{item.panel}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>,
    );

    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(2);

    // First item is open
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(getByText('Item #1 header')).toBeInTheDocument();
    expect(getByText('Item #1 Panel')).toBeInTheDocument();

    // Second item is closed
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    expect(getByText('Item #2 header')).toBeInTheDocument();
    expect(getByText('Item #2 Panel')).toBeInTheDocument();
  });
});
