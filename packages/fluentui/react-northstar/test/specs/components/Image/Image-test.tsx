import * as React from 'react';
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests';

import { Image } from 'src/components/Image/Image';
import { mountWithProviderAndGetComponent } from 'test/utils';

describe('Image', () => {
  isConformant(Image, {
    testPath: __filename,
    constructorName: 'Image',
  });

  describe('accessibility', () => {
    handlesAccessibility(Image, {
      defaultRootRole: undefined,
    });

    describe('aria-hidden', () => {
      test('is set to true, if alt attribute is not defined', () => {
        const renderedComponent = mountWithProviderAndGetComponent(Image, <Image />);
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true');
      });

      test('is not set, if alt attribute is defined', () => {
        const renderedComponent = mountWithProviderAndGetComponent(Image, <Image alt="any alt description" />);
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe(undefined);
      });
    });
  });
});
