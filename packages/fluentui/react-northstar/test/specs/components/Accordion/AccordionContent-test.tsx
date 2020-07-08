import * as React from 'react';

import { AccordionContent } from 'src/components/Accordion/AccordionContent';
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent, mountWithProvider as mount } from 'test/utils';
import { isConformant as newIsConformant } from '@fluentui/react-conformance';

describe('AccordionContent', () => {
  isConformant(AccordionContent, { constructorName: 'AccordionContent' });

  newIsConformant({
    Component: AccordionContent,
    componentPath: __filename.replace(/test[/\\]specs/, 'src').replace('-test.tsx', '.tsx'),
    displayName: 'AccordionContent',
    useDefaultExport: true,
    customMount: mount,
    disabledTests: ['has-docblock', 'has-top-level-file'],
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
