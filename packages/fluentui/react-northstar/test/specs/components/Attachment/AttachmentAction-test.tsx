import { isConformant } from 'test/specs/commonTests';
import { AttachmentAction } from 'src/components/Attachment/AttachmentAction';

describe('AttachmentAction', () => {
  isConformant(AttachmentAction, { defaultAs: 'button', testPath: __filename, constructorName: 'AttachmentAction' });
});
