import { isConformant } from 'test/specs/commonTests'

import ToolbarMenuItem from 'src/components/Toolbar/ToolbarMenuItem'
import Box from 'src/components/Box/Box'

describe('ToolbarMenuItem', () => {
  isConformant(ToolbarMenuItem, {
    wrapperComponent: Box,
  })
})
