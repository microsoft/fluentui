import { DividerContent } from 'src/components/Divider/DividerContent';
import { isConformant } from 'test/specs/commonTests';

describe('DividerContent', () => {
  isConformant(DividerContent, { testPath: __filename, constructorName: 'DividerContent' });
});
