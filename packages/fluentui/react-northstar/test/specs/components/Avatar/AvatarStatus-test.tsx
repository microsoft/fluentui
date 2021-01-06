import { isConformant } from 'test/specs/commonTests';
import { AvatarStatus } from 'src/components/Avatar/AvatarStatus';

describe('AvatarStatus', () => {
  isConformant(AvatarStatus, { testPath: __filename, constructorName: 'AvatarStatus' });
});
