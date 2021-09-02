import * as React from 'react';
// Need to disable compilation for aliases: https://github.com/microsoft/fluentui/pull/16976/files#r575447074
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button as ReactButton, ButtonProps } from '@fluentui/react-button';

export const ExampleContent = () => {
  return (
    <div>
      <h3>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => <ReactButton {...props} ref={ref} />);
