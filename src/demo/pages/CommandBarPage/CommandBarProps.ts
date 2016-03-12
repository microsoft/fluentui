export const CommandBarProps = [
  { name: 'isSearchBoxVisible', type: 'boolean', defaultValue: 'false', description: 'Whether or not the search box is visible.' },
  { name: 'searchPlaceholderText', type: 'string', defaultValue: '', description: 'Placeholder text to display in the search box.' },
  { name: 'items', type: 'ICommandBarItem[]', defaultValue: '', description: 'Items to render.' },
  { name: 'overflowItems', type: 'ICommandBarItem[]', defaultValue: '', description: 'Default items to have in the overflow menu.' },
  { name: 'farItems', type: 'ICommandBarItem[]', defaultValue: '', description: 'Items to render on the right side (or left, in RTL.)' }
];

export const ICommandBarItemProps = [
  { name: 'key', type: 'string', defaultValue: '', description: 'Unique key.' },
  { name: 'name', type: 'string', defaultValue: '', description: 'Name to display.' },
  { name: 'icon', type: 'string', defaultValue: '', description: 'Fabric icon to render.' },
  { name: 'onClick', type: 'function', defaultValue: '', description: 'Function callback when the user executes the command.' },
  { name: 'items', type: 'ICommandBarItem[]', defaultValue: '', description: 'Child menu items.' }
];
