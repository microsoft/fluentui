import { isConformant } from 'test/specs/commonTests';
import { AttachmentIcon } from 'src/components/Attachment/AttachmentIcon';

describe('AttachmentIcon', () => {
  isConformant(AttachmentIcon, { defaultAs: 'span', testPath: __filename, constructorName: 'AttachmentIcon' });
});
