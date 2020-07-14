import { isConformant } from 'test/specs/commonTests';
import { AlertDismissAction } from 'src/components/Alert/AlertDismissAction';

describe('AlertDismissAction', () => {
  isConformant(AlertDismissAction, {
    constructorName: 'AlertDismissAction',
  });
});
