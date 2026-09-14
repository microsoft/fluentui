const meta = {
  title: 'Example',
};
export default meta;
export const Default = {
  render: () => /*#__PURE__*/ React.createElement('div', null, 'Example'),
  parameters: {
    docs: {
      description: {
        story: 'Description',
      },
    },
  },
};
export const Satisfies = {
  render: () => /*#__PURE__*/ React.createElement('div', null, 'Example'),
  parameters: {
    docs: {
      description: {
        story: 'Description',
      },
    },
  },
};
export const As = {
  render: () => /*#__PURE__*/ React.createElement('div', null, 'Example'),
  parameters: {
    docs: {
      description: {
        story: 'Description',
      },
    },
  },
};
Default.parameters.fullSource = 'export const Default = () => <div>Example</div>;\n';
Satisfies.parameters.fullSource = 'export const Satisfies = () => <div>Example</div>;\n';
As.parameters.fullSource = 'export const As = () => <div>Example</div>;\n';
