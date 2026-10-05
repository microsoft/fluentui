import * as React from 'react';
import { Button } from '@fluentui/react-button';

const Wrapper = ({ children }) => <div className="wrapper">{children}</div>;

export const Primary = () => (
  <Wrapper>
    <Button appearance="primary">Primary</Button>
  </Wrapper>
);

export const Secondary = () => <Button appearance="secondary">Secondary</Button>;
