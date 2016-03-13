const ContextualMenuProps = [
  { name: 'items', type: 'IContextualMenuItem[]', defaultValue: '', description: 'Array holds ContextualMenu items.' },
  { name: 'targetElement', type: 'HTMLElement', defaultValue: '', description: 'Target element for submenu position calculation.' },
  { name: 'menuKey', type: 'string', defaultValue: '', description: 'The key of menu.' },
  { name: 'horizontalAlignmentHint', type: 'DirectionalHint', defaultValue: 'DirectionalHint.right', description: 'The horizontal direction for the submenu.' },
  { name: 'verticalAlignmentHint', type: 'DirectionalHint', defaultValue: 'DirectionalHint.top', description: 'The vertical direction for the submenu.' },
  { name: 'labelElementId', type: 'string', defaultValue: '', description: 'TODO' },
  { name: 'shouldFocusOnMount', type: 'boolean', defaultValue: 'true', description: 'TODO' },
  { name: 'isBeakVisible', type: 'boolean', defaultValue: 'false', description: 'A flag to decide if the ContextualMenu should has beak.' },
  { name: 'onDismiss', type: 'function', defaultValue: '', description: 'TODO' },
  { name: 'description', type: 'string', defaultValue: '', description: 'TODO' },
  { name: 'className', type: 'string', defaultValue: '', description: 'TODO' }
];

export default ContextualMenuProps;
