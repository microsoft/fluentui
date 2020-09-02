import { isConformant } from 'test/specs/commonTests';
import { AttachmentHeader } from 'src/components/Attachment/AttachmentHeader';

describe('AttachmentHeader', () => {
  isConformant(AttachmentHeader, { constructorName: 'AttachmentHeader' });
});
