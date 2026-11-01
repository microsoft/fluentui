import { treeItemLayoutClassNames } from '../components/TreeItemLayout/useTreeItemLayoutStyles.styles';

/**
 * Actions elements rendered by a tree item layout. Registering the elements, instead of matching
 * them by an overridable attribute such as `role`, keeps the lookup stable for any slot props.
 */
const treeItemActionsElements = new WeakSet<HTMLElement>();

/**
 * Ref callback that registers the actions element of a tree item layout.
 *
 * @internal
 */
export const registerTreeItemActions = (element: HTMLElement | null): void => {
  if (element) {
    treeItemActionsElements.add(element);
  }
};

/**
 * Finds the actions of a tree item, either registered by a tree item layout or matched by the
 * static class names of the styled layout.
 *
 * @internal
 */
export const queryTreeItemActions = (target: HTMLElement): HTMLElement | null => {
  for (const layout of Array.from(target.children)) {
    for (const child of Array.from(layout.children)) {
      if (treeItemActionsElements.has(child as HTMLElement)) {
        return child as HTMLElement;
      }
    }
  }
  return target.querySelector<HTMLElement>(
    `:scope > .${treeItemLayoutClassNames.root} > .${treeItemLayoutClassNames.actions}`,
  );
};
