import { isConformant } from 'test/specs/commonTests';

import { DialogFooter } from 'src/components/Dialog/DialogFooter';

describe('DialogFooter', () => {
  isConformant(DialogFooter, { testPath: __filename, constructorName: 'DialogFooter' });
});
