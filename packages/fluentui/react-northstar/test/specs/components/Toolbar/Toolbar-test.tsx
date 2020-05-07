import Toolbar from 'src/components/Toolbar/Toolbar';
import { isConformant } from 'test/specs/commonTests';

describe('Toolbar', () => {
  isConformant(Toolbar, { constructorName: 'Toolbar' });
  isConformant(Toolbar, {
    constructorName: 'Toolbar',
    requiredProps: { overflow: true },
  });
});
