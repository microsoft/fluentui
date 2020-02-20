import { isConformant } from 'test/specs/commonTests'
import TreeItem from 'src/components/Tree/TreeItem'

describe('TreeItem', () => {
  isConformant(TreeItem, { requiredProps: { id: 'my-id' } })
})
