import * as React from 'react';
import { Button, makeStyles } from '@fluentui/react-button';
import { Spinner } from '@fluentui/react-menu';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: '8px',
  },
});
const meta = {
  title: 'Button',
  component: Button,
};
export default meta;

// Uses `useStyles` + `Button` — must NOT include `Spinner`.
export const Primary = {
  render: () => {
    const styles = useStyles();
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        className: styles.root,
      },
      /*#__PURE__*/ React.createElement(
        Button,
        {
          appearance: 'primary',
        },
        'Primary',
      ),
    );
  },
};

// Uses `Spinner` only — must NOT include `useStyles`/`makeStyles`/`Button`.
export const Loading = {
  render: () =>
    /*#__PURE__*/ React.createElement(Spinner, {
      label: 'Loading',
    }),
};

// Uses everything — the full slice.
export const Group = {
  render: () => {
    const styles = useStyles();
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        className: styles.root,
      },
      /*#__PURE__*/ React.createElement(Button, null, 'One'),
      /*#__PURE__*/ React.createElement(Spinner, {
        label: 'Loading',
      }),
    );
  },
};
Primary.parameters = {};
Primary.parameters.fullSource =
  'import { Button, makeStyles } from "@fluentui/react-components";\nimport * as React from "react";\n\nconst useStyles = makeStyles({\n  root: {\n    display: "flex",\n    gap: "8px",\n  },\n});\n\n// Uses `useStyles` + `Button` \u2014 must NOT include `Spinner`.\nexport const Primary = () => {\n  const styles = useStyles();\n  return (\n    <div className={styles.root}>\n      <Button appearance="primary">Primary</Button>\n    </div>\n  );\n};\n';
Loading.parameters = {};
Loading.parameters.fullSource =
  'import { Spinner } from "@fluentui/react-components";\nimport * as React from "react";\n\n// Uses `Spinner` only \u2014 must NOT include `useStyles`/`makeStyles`/`Button`.\nexport const Loading = () => <Spinner label="Loading" />;\n';
Group.parameters = {};
Group.parameters.fullSource =
  'import { Button, makeStyles, Spinner } from "@fluentui/react-components";\nimport * as React from "react";\n\nconst useStyles = makeStyles({\n  root: {\n    display: "flex",\n    gap: "8px",\n  },\n});\n\n// Uses everything \u2014 the full slice.\nexport const Group = () => {\n  const styles = useStyles();\n  return (\n    <div className={styles.root}>\n      <Button>One</Button>\n      <Spinner label="Loading" />\n    </div>\n  );\n};\n';
