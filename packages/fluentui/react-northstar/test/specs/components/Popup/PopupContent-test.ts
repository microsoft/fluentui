import { isConformant } from 'test/specs/commonTests';
import { PopupContent } from 'src/components/Popup/PopupContent';

describe('PopupContent', () => {
  isConformant(PopupContent, { testPath: __filename, constructorName: 'PopupContent' });
});
