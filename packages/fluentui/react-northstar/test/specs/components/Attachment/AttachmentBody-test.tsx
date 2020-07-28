import { isConformant } from 'test/specs/commonTests';
import { AttachmentBody } from 'src/components/Attachment/AttachmentBody';

describe('AttachmentBody', () => {
  isConformant(AttachmentBody, { constructorName: 'AttachmentBody' });
});
