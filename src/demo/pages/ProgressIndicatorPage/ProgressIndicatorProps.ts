const ProgressIndicatorProps = [
  { name: 'title', type: 'string', defaultValue: '', description: 'Title of the operation.' },
  { name: 'description', type: 'string', defaultValue: '', description: 'Text describing or supplementing the operation.' },
  { name: 'percentComplete', type: 'number', defaultValue: '0', description: 'Percentage of the operation\'s completeness.' }
];

export default ProgressIndicatorProps;
