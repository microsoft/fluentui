import * as React from 'react';

import { AccordionContent } from 'src/components/Accordion/AccordionContent';
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent, sharedIsConformant } from 'test/utils';

describe('AccordionContent', () => {
  isConformant(AccordionContent, { constructorName: 'AccordionContent' });

  sharedIsConformant(
    {
      Component: AccordionContent,
      displayName: 'AccordionContent',
    },
    __filename,
  );

  describe('accessiblity', () => {
    handlesAccessibility(AccordionContent);

    describe('aria-labelledby', () => {
      test('takes the value of the titleId prop', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          AccordionContent,
          <AccordionContent accordionTitleId={'nice-titleId'} />,
        );
        expect(getRenderedAttribute(renderedComponent, 'aria-labelledby', '')).toBe('nice-titleId');
      });
    });
  });
});
