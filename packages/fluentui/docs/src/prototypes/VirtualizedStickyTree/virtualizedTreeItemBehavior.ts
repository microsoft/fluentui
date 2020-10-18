import { Accessibility, TreeItemBehaviorProps } from '@fluentui/accessibility';

export const removeFocusFirstChild = (
  accessibility: Accessibility<TreeItemBehaviorProps>,
): Accessibility<TreeItemBehaviorProps> => {
  const newA11yBehavior: Accessibility<TreeItemBehaviorProps> = props => {
    const definition = accessibility(props);
    delete definition.keyActions.root.focusFirstChild;
    return definition;
  };
  return newA11yBehavior;
};
