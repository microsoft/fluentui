import * as React from 'react';
import { Button } from '@fluentui/react-button';
import type { ButtonProps } from '@fluentui/react-button';
const meta = {
  title: 'Card',
  component: Button,
};
export default meta;

// --- Custom components with TypeScript types ---

type CardProps = {
  title: string;
  children: React.ReactNode;
};
const Card: React.FC<CardProps> = ({ title, children }) =>
  /*#__PURE__*/ React.createElement('section', null, /*#__PURE__*/ React.createElement('h3', null, title), children);
interface ActionProps {
  label: string;
  appearance?: ButtonProps['appearance'];
}
const Action: React.FC<ActionProps> = ({ label, appearance }) =>
  /*#__PURE__*/ React.createElement(
    Button,
    {
      appearance: appearance,
    },
    label,
  );

// Uses `Card` (+ `CardProps`) only — must NOT include `Action`/`ActionProps`/`ButtonProps`.
export const Simple = {
  render: () =>
    /*#__PURE__*/ React.createElement(
      Card,
      {
        title: 'Simple',
      },
      /*#__PURE__*/ React.createElement('p', null, 'Content'),
    ),
};

// Uses `Action` (+ `ActionProps` + `ButtonProps` type import) — must NOT include `Card`/`CardProps`.
export const WithAction = {
  render: () =>
    /*#__PURE__*/ React.createElement(Action, {
      label: 'Go',
      appearance: 'primary',
    }),
};
Simple.parameters = {};
Simple.parameters.fullSource =
  'import * as React from "react";\n\n// --- Custom components with TypeScript types ---\n\ntype CardProps = {\n  title: string;\n  children: React.ReactNode;\n};\n\nconst Card: React.FC<CardProps> = ({ title, children }) => (\n  <section>\n    <h3>{title}</h3>\n    {children}\n  </section>\n);\n\n// Uses `Card` (+ `CardProps`) only \u2014 must NOT include `Action`/`ActionProps`/`ButtonProps`.\nexport const Simple = () => (\n  <Card title="Simple">\n    <p>Content</p>\n  </Card>\n);\n';
WithAction.parameters = {};
WithAction.parameters.fullSource =
  'import { Button } from "@fluentui/react-components";\nimport type { ButtonProps } from "@fluentui/react-components";\nimport * as React from "react";\n\ninterface ActionProps {\n  label: string;\n  appearance?: ButtonProps["appearance"];\n}\n\nconst Action: React.FC<ActionProps> = ({ label, appearance }) => (\n  <Button appearance={appearance}>{label}</Button>\n);\n\n// Uses `Action` (+ `ActionProps` + `ButtonProps` type import) \u2014 must NOT include `Card`/`CardProps`.\nexport const WithAction = () => <Action label="Go" appearance="primary" />;\n';
