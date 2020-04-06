import Toolbar from 'src/components/Toolbar/Toolbar';
import { isConformant } from 'test/specs/commonTests';

describe('Toolbar', () => {
  isConformant(Toolbar);
  isConformant(Toolbar, {
    requiredProps: { overflow: true },
  });
});
