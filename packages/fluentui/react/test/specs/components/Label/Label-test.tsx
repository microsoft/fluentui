import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'

import Label from 'src/components/Label/Label'
import Icon from 'src/components/Icon/Icon'
import Image from 'src/components/Image/Image'

const labelImplementsShorthandProp = implementsShorthandProp(Label)

describe('Label', () => {
  isConformant(Label)
  labelImplementsShorthandProp('icon', Icon, {
    mapsValueToProp: 'name',
    requiredShorthandProps: { name: 'at' },
  })
  labelImplementsShorthandProp('image', Image, { mapsValueToProp: 'src' })
})
