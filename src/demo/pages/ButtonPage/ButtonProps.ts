const ButtonProps = [
  { name: 'children', type: 'node', defaultValue: '', description: 'Children to be rendered within the button.' },
  { name: 'type', type: 'ButtonType', defaultValue: 'ButtonType.normal', description: 'The type of the button to render. { normal, primary, hero, compound, command }' },
  { name: 'icon', type: 'string', defaultValue: 'plus', description: 'The button icon shown in command or hero type.' },
  { name: 'description', type: 'string', defaultValue: '', description: 'Description of the action this button takes.' },
  { name: 'onClick', type: 'function', defaultValue: '', description: 'Function to call when the button is clicked.' }
];

export default ButtonProps;
