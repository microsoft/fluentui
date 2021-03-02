import { isConformant } from 'test/specs/commonTests';

import { Video } from 'src/components/Video/Video';

describe('Video', () => {
  isConformant(Video, { testPath: __filename, constructorName: 'Video' });
});
