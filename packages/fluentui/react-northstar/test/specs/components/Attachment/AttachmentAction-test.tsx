import { isConformant } from 'test/specs/commonTests';
import { AttachmentAction } from 'src/components/Attachment/AttachmentAction';

describe('AttachmentAction', () => {
  isConformant(AttachmentAction, { constructorName: 'AttachmentAction' });
});
