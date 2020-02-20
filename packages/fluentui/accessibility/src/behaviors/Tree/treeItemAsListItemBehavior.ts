import * as _ from 'lodash'
import { Accessibility } from '../../types'
import treeItemBehavior from './treeItemBehavior'
import treeTitleAsListItemTitleBehavior from './treeTitleAsListItemTitleBehavior'

/**
 * @description
 * Adds role 'listitem' to a non-leaf item and 'none' to a leaf item.
 */
const treeItemAsListItemBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  const behavior = treeItemBehavior(props)
  return _.merge(behavior, {
    attributes: {
      root: {
        ...(props.hasSubtree && {
          role: 'listitem',
        }),
      },
    },
    childBehaviors: {
      title: treeTitleAsListItemTitleBehavior,
    },
  })
}

export type TreeItemBehaviorProps = {
  /** Indicates whether `TreeTitle` has a subtree. */
  hasSubtree?: boolean
}

export default treeItemAsListItemBehavior
