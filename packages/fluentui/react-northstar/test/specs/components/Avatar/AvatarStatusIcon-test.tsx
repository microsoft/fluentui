import { isConformant } from 'test/specs/commonTests';
import { AvatarStatusIcon } from 'src/components/Avatar/AvatarStatusIcon';

describe('AvatarStatusIcon', () => {
  isConformant(AvatarStatusIcon, { testPath: __filename, constructorName: 'AvatarStatusIcon' });
});
