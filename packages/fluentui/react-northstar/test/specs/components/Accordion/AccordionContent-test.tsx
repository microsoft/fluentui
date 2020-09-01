import * as React from 'react';

import { AccordionContent } from 'src/components/Accordion/AccordionContent';
import { handlesAccessibility, getRenderedAttribute, isConformant } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent } from 'test/utils';

describe('AccordionContent', () => {
  isConformant(AccordionContent, {
    testPath: __filename,
    constructorName: 'AccordionContent',
  });

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
