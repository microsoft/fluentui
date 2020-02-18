import * as _ from 'lodash'
import { TreeItemProps } from '../TreeItem'
import { ShorthandValue } from '../../../types'

const hasSubtree = (item: TreeItemProps | ShorthandValue<TreeItemProps>): boolean => {
  return !_.isNil(item['items']) && item['items'].length > 0
}

const removeItemAtIndex = (items: any[], itemIndex: number): any[] => {
  return [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)]
}

export { hasSubtree, removeItemAtIndex }
