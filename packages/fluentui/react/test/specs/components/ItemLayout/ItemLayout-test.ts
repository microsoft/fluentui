import { isConformant } from 'test/specs/commonTests'

import ItemLayout from 'src/components/ItemLayout/ItemLayout'

describe('ItemLayout', () => {
  isConformant(ItemLayout, { hasAccessibilityProp: false })
})
