import * as React from 'react'
import { isConformant } from 'test/specs/commonTests'

import Animation from 'src/components/Animation/Animation'

describe('Animation', () => {
  isConformant(Animation, {
    hasAccessibilityProp: false,
    requiredProps: { children: <div /> },
    handlesAsProp: false,
  })
})
