import { isConformant } from 'test/specs/commonTests';

import { TooltipContent } from 'src/components/Tooltip/TooltipContent';

describe('TooltipContent', () => {
  isConformant(TooltipContent, {
    constructorName: 'TooltipContent',
  });
});
