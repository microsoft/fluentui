import * as React from 'react';
import { Button } from '@fluentui/react-button';
const Wrapper = ({ children }) =>
  /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'wrapper',
    },
    children,
  );
export const Primary = () =>
  /*#__PURE__*/ React.createElement(
    Wrapper,
    null,
    /*#__PURE__*/ React.createElement(
      Button,
      {
        appearance: 'primary',
      },
      'Primary',
    ),
  );
export const Secondary = () =>
  /*#__PURE__*/ React.createElement(
    Button,
    {
      appearance: 'secondary',
    },
    'Secondary',
  );
Primary.parameters = {};
Primary.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\n\nconst Wrapper = ({ children }) => <div className="wrapper">{children}</div>;\n\nexport const Primary = () => (\n  <Wrapper>\n    <Button appearance="primary">Primary</Button>\n  </Wrapper>\n);\n';
Secondary.parameters = {};
Secondary.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\n\nexport const Secondary = () => (\n  <Button appearance="secondary">Secondary</Button>\n);\n';
