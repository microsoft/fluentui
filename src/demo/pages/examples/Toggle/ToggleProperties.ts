const ToggleProperties = [
  { name: 'label', type: 'string', defaultValue: '', description: 'Label text to display above the toggle.' },
  { name: 'isToggled', type: 'boolean', defaultValue: '', description: 'Initial state of the toggle switch.' },
  { name: 'onText', type: 'string', defaultValue: '', description: 'Text to display next to the toggle when its on.' },
  { name: 'offText', type: 'string', defaultValue: '', description: 'Text to display next to the toggle when its off.' },
  { name: 'onChanged', type: 'function(isChanged: boolean)', defaultValue: '', description: 'Callback which fires when the toggle state is changed.' }
];

export default ToggleProperties;