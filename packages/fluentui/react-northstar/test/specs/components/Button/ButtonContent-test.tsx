import { isConformant } from 'test/specs/commonTests';
import { ButtonContent } from 'src/components/Button/ButtonContent';

describe('ButtonContent', () => {
  isConformant(ButtonContent, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'ButtonContent',
    hasAccessibilityProp: false,
  });
});
