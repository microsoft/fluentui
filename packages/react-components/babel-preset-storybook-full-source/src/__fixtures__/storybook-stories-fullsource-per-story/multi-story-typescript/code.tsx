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

const Card: React.FC<CardProps> = ({ title, children }) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
);

interface ActionProps {
  label: string;
  appearance?: ButtonProps['appearance'];
}

const Action: React.FC<ActionProps> = ({ label, appearance }) => <Button appearance={appearance}>{label}</Button>;

// Uses `Card` (+ `CardProps`) only — must NOT include `Action`/`ActionProps`/`ButtonProps`.
export const Simple = {
  render: () => (
    <Card title="Simple">
      <p>Content</p>
    </Card>
  ),
};

// Uses `Action` (+ `ActionProps` + `ButtonProps` type import) — must NOT include `Card`/`CardProps`.
export const WithAction = {
  render: () => <Action label="Go" appearance="primary" />,
};
