import * as React from 'react';
import styles from './example.module.css';
export const Default = () =>
  /*#__PURE__*/ React.createElement(
    Button,
    {
      className: styles.root,
    },
    'Click me',
  );
Default.parameters = {};
Default.parameters.fullSource =
  'import * as React from "react";\nimport styles from "./styles/example.module.css";\n\nexport const Default = () => <Button className={styles.root}>Click me</Button>;\n';
Default.parameters.cssModuleSources = Object.assign({}, Default.parameters.cssModuleSources, {
  cssModules: [
    {
      name: 'example.module.css',
      source: '.root {\n  color: var(--text);\n}\n',
    },
  ],
  tokensSource: ':root {\n  --text: #242424;\n  --space-4: 16px;\n}\n',
});
