import * as React from 'react';
import { Button, ButtonProps } from '../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-alpha

export const Default = (props: ButtonProps) => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Button {...props}>Button</Button>
  </div>
);
