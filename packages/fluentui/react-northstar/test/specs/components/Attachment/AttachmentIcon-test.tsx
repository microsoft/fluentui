import { isConformant } from 'test/specs/commonTests';
import { AttachmentIcon } from 'src/components/Attachment/AttachmentIcon';

describe('AttachmentIcon', () => {
  isConformant(AttachmentIcon, { testPath: __filename, constructorName: 'AttachmentIcon' });
});
