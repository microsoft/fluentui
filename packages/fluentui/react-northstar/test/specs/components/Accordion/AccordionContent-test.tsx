import * as React from 'react';

import { AccordionContent } from 'src/components/Accordion/AccordionContent';
import { isConformant as isConformantBase, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent, isConformant } from 'test/utils';

describe('AccordionContent', () => {
  // isConformantBase(AccordionContent, { constructorName: 'AccordionContent' });

  isConformant(
    {
      Component: AccordionContent,
      displayName: 'AccordionContent',
    },
    __filename,
    AccordionContent,
    { constructorName: 'AccordionContent' },
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
