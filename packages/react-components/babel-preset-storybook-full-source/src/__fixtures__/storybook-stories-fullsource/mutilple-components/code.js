import * as React from 'react';

const Child1 = () => (
  <>
    <Button>Default button</Button>
    <Button appearance="primary">Primary button</Button>
    <Button appearance="outline">Outline button</Button>
  </>
);

export const ButtonAppearance = () => (
  <>
    <Child1 />
    <Child2 />
  </>
);

const Child2 = () => (
  <>
    <Button appearance="subtle">Subtle button</Button>
    <Button appearance="transparent">Transparent button</Button>
  </>
);
