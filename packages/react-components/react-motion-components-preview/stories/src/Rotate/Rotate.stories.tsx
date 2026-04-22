import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import type { PresenceComponentProps } from '@fluentui/react-components';
import { Rotate, type RotateParams } from '@fluentui/react-motion-components-preview';

const LoremIpsum = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props}>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </div>
));

export const DefaultRotate = (props: PresenceComponentProps & RotateParams): JSXElement => {
  return (
    <Rotate {...props}>
      <LoremIpsum />
    </Rotate>
  );
};
