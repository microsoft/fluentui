import { isConformant } from 'test/specs/commonTests';
import { ButtonContent } from 'src/components/Button/ButtonContent';

describe('ButtonContent', () => {
  isConformant(ButtonContent, {
    constructorName: 'ButtonContent',
    hasAccessibilityProp: false,
  });
});
