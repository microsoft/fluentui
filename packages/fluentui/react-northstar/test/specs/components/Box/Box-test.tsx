import { Box } from 'src/components/Box/Box';
import { isConformant } from 'test/specs/commonTests';

describe('Box', () => {
  isConformant(Box, { testPath: __filename, constructorName: 'Box' });
});
