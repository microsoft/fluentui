import Box from 'src/components/Box/Box';
import { isConformant } from 'test/specs/commonTests';

describe('Box', () => {
  isConformant(Box, { constructorName: 'Box' });
});
