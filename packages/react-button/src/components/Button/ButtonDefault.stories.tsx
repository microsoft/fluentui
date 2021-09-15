import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
import { Button, ButtonProps } from '@fluentui/react-button';

export const Default = (props: ButtonProps) => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Button {...props}>Button</Button>
  </div>
);
