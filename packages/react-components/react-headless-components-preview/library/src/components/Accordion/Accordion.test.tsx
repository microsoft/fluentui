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
    const { container } = render(
      <Accordion className="accordion" defaultOpenItems={items[0].id}>
        {items.map(item => (
          <AccordionItem className="accordion-item" key={item.id} value={item.id}>
            <AccordionHeader className="accordion-header">{item.header}</AccordionHeader>
            <AccordionPanel className="accordion-panel">{item.panel}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="accordion"
      >
        <div
          class="accordion-item"
          data-open=""
        >
          <div
            class="accordion-header"
            data-expand-icon-position="start"
            data-open=""
          >
            <button
              aria-disabled="true"
              aria-expanded="true"
              type="button"
            >
              <span
                aria-hidden="true"
              />
              Item #1 header
            </button>
          </div>
          <div
            class="accordion-panel"
            data-open=""
          >
            Item #1 Panel
          </div>
        </div>
        <div
          class="accordion-item"
        >
          <div
            class="accordion-header"
            data-expand-icon-position="start"
          >
            <button
              aria-expanded="false"
              type="button"
            >
              <span
                aria-hidden="true"
              />
              Item #2 header
            </button>
          </div>
          <div
            class="accordion-panel"
          >
            Item #2 Panel
          </div>
        </div>
      </div>
    `);
  });
});
