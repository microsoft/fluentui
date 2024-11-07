import * as React from 'react';
export const ButtonAppearance = () =>
  /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(Button, null, 'Default button'),
    /*#__PURE__*/ React.createElement(
      Button,
      {
        appearance: 'primary',
      },
      'Primary button',
    ),
    /*#__PURE__*/ React.createElement(
      Button,
      {
        appearance: 'outline',
      },
      'Outline button',
    ),
    /*#__PURE__*/ React.createElement(
      Button,
      {
        appearance: 'subtle',
      },
      'Subtle button',
    ),
    /*#__PURE__*/ React.createElement(
      Button,
      {
        appearance: 'transparent',
      },
      'Transparent button',
    ),
  );
ButtonAppearance.parameters = {};
ButtonAppearance.parameters.fullSource =
  'import * as React from "react";\n\nexport const ButtonAppearance = () => (\n  <>\n    <Button>Default button</Button>\n    <Button appearance="primary">Primary button</Button>\n    <Button appearance="outline">Outline button</Button>\n    <Button appearance="subtle">Subtle button</Button>\n    <Button appearance="transparent">Transparent button</Button>\n  </>\n);\n';
