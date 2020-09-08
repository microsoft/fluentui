import { isConformant } from 'test/specs/commonTests';
import { Breadcrumb } from 'src/components/Breadcrumb/Breadcrumb';

describe('Breadcrumb', () => {
  isConformant(Breadcrumb, {
    constructorName: 'Breadcrumb',
  });
});
