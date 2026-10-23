import { treeItemLayoutClassNames } from '../components/TreeItemLayout/useTreeItemLayoutStyles.styles';

/**
 * Finds the actions of a tree item. The styled layout is matched by its static class names, while
 * an unstyled layout is matched by the `toolbar` role its actions slot always renders with.
 *
 * @internal
 */
export const queryTreeItemActions = (target: HTMLElement): HTMLElement | null =>
  target.querySelector<HTMLElement>(
    `:scope > .${treeItemLayoutClassNames.root} > .${treeItemLayoutClassNames.actions}`,
  ) ?? target.querySelector<HTMLElement>(':scope > * > [role="toolbar"]');
