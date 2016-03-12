const DropdownProps = [
  { name: 'label', type: 'string', defaultValue: '', description: 'The label for the dropdown.' },
  { name: 'options', type: 'IDropdownOption[]', defaultValue: '', description: 'An array of IDropdownOption objects, where each has a key (string), text (string), and isSelected (optional boolean).' },
  { name: 'onChanged', type: 'function', defaultValue: '', description: 'Function to call when the selected value of the dropdown is set.' },
  { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Whether or not the dropdown is disabled.' }
];

export default DropdownProps;