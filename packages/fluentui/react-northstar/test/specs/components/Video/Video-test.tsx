import { isConformant } from 'test/specs/commonTests';

import { Video } from 'src/components/Video/Video';

describe('Video', () => {
  isConformant(Video, { defaultAs: 'span', testPath: __filename, constructorName: 'Video' });
});
