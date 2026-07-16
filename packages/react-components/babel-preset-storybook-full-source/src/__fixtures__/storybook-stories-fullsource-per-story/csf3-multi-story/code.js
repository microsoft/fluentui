import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { Spinner } from '@fluentui/react-menu';

const meta = {
  title: 'Button',
  component: Button,
};

export default meta;

// A module-scoped standard React component, used by the `Group` story only.
const ButtonRow = () => (
  <>
    <Button>One</Button>
    <Button>Two</Button>
  </>
);

// Function-form story using imported `Button` only — `meta.component` (Button)
// must not leak `Spinner` into other slices.
export const Primary = () => {
  return <Button appearance="primary">Primary</Button>;
};

// Function-form story using imported `Spinner` only — must NOT include `Button`/`ButtonRow`.
export const Loading = () => {
  return <Spinner label="Loading" />;
};

// Function-form story using the module-scoped `ButtonRow` component — must NOT include `Spinner`.
export const Group = () => {
  return <ButtonRow />;
};
