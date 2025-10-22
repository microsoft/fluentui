import { isConformant } from 'test/specs/commonTests';
import { SplitButtonToggle } from 'src/components/SplitButton/SplitButtonToggle';

describe('SplitButtonToggle', () => {
  isConformant(SplitButtonToggle, {
    defaultAs: 'button',
    testPath: __filename,
    constructorName: 'SplitButtonToggle',
  });
});
