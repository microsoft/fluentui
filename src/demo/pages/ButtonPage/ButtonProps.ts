const ButtonProps = [
  { name: 'children', type: 'node', defaultValue: '', description: 'Children to be rendered within the button.' },
  { name: 'buttonType', type: 'ButtonType', defaultValue: 'ButtonType.normal', description: 'The type of the button to render. { normal, primary, hero, compound, command }' },
  { name: 'icon', type: 'string', defaultValue: 'plus', description: 'The button icon shown in command or hero type.' },
  { name: 'description', type: 'string', defaultValue: '', description: 'Description of the action this button takes.' }
];

export default ButtonProps;
