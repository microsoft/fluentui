import * as React from 'react';
export const Virtualization = () => {
  return (
    <iframe
      style={{ width: '100%', height: 500, border: 'none' }}
      src="https://microsoft.github.io/fluentui-contrib/react-data-grid-react-window/iframe.html?id=datagrid--virtualized-data-grid&viewMode=story"
    />
  );
};

Virtualization.parameters = {
  docs: {
    description: {
      story: [
        'Virtualizating the DataGrid component involves recomposing components to use a virtualized container.',
        'This is already done in the extension package `@fluentui-contrib/react-data-grid-react-window` which provides',
        'extended DataGrid components that are powered',
        'by [react-window](https://react-window.vercel.app/#/examples/list/fixed-size).',
        '',
        'The example below shows how to use this extension package to virtualize the DataGrid component.',
        '',
        'Here some useful links for the package:',
        '- [Storybook documentation](https://microsoft.github.io/fluentui-contrib/react-data-grid-react-window/?path=/story/datagrid--virtualized-data-grid)',
        '- [NPM page](https://www.npmjs.com/package/@fluentui-contrib/react-data-grid-react-window)',
        '- [README](https://github.com/microsoft/fluentui-contrib/blob/main/packages/react-data-grid-react-window/README.md)',
        '',
        '> ⚠️ Make sure to memoize the row render function to avoid excessive unmouting/mounting of components.',
        'react-window will [create components based on this renderer](https://react-window.vercel.app/#/api/FixedSizeList)',
      ].join('\n'),
    },
  },
};
