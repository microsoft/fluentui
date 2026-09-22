import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Accordion } from './Accordion';
import { AccordionHeader } from '../AccordionHeader';
import { AccordionItem } from '../AccordionItem';
import { AccordionPanel } from '../AccordionPanel';
import { accordionClassNames } from './useAccordionStyles.styles';

describe('Accordion', () => {
  it('composes headless disclosure behavior', () => {
    const { getByRole, getByText } = render(
      <Accordion collapsible>
        <AccordionItem value="item">
          <AccordionHeader>Header</AccordionHeader>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );

    const accordion = getByRole('button').closest(`.${accordionClassNames.root}`);
    const button = getByRole('button');

    expect(accordion).toHaveAttribute('data-collapsible');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(getByText('Panel')).toBeVisible();
  });
});
