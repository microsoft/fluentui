import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { Spinner } from '@fluentui/react-menu';
const meta = {
  title: 'Button',
  component: Button,
};
export default meta;

// A module-scoped standard React component, used by the `Group` story only.
const ButtonRow = () =>
  /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(Button, null, 'One'),
    /*#__PURE__*/ React.createElement(Button, null, 'Two'),
  );

// Function-form story using imported `Button` only — `meta.component` (Button)
// must not leak `Spinner` into other slices.
export const Primary = () => {
  return /*#__PURE__*/ React.createElement(
    Button,
    {
      appearance: 'primary',
    },
    'Primary',
  );
};

// Function-form story using imported `Spinner` only — must NOT include `Button`/`ButtonRow`.
export const Loading = () => {
  return /*#__PURE__*/ React.createElement(Spinner, {
    label: 'Loading',
  });
};

// Function-form story using the module-scoped `ButtonRow` component — must NOT include `Spinner`.
export const Group = () => {
  return /*#__PURE__*/ React.createElement(ButtonRow, null);
};
Primary.parameters = {};
Primary.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\n\n// Function-form story using imported `Button` only \u2014 `meta.component` (Button)\n// must not leak `Spinner` into other slices.\nexport const Primary = () => {\n  return <Button appearance="primary">Primary</Button>;\n};\n';
Loading.parameters = {};
Loading.parameters.fullSource =
  'import { Spinner } from "@fluentui/react-components";\nimport * as React from "react";\n\n// Function-form story using imported `Spinner` only \u2014 must NOT include `Button`/`ButtonRow`.\nexport const Loading = () => {\n  return <Spinner label="Loading" />;\n};\n';
Group.parameters = {};
Group.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport * as React from "react";\n\n// A module-scoped standard React component, used by the `Group` story only.\nconst ButtonRow = () => (\n  <>\n    <Button>One</Button>\n    <Button>Two</Button>\n  </>\n);\n\n// Function-form story using the module-scoped `ButtonRow` component \u2014 must NOT include `Spinner`.\nexport const Group = () => {\n  return <ButtonRow />;\n};\n';
