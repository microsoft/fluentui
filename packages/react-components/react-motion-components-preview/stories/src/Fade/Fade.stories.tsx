import * as React from 'react';
import { PresenceComponentProps } from '@fluentui/react-components';
import { Fade } from '@fluentui/react-motion-components-preview';

const LoremIpsum = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props}>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </div>
));

export const DefaultFade = (props: PresenceComponentProps) => {
  return (
    <Fade {...props}>
      <LoremIpsum />
    </Fade>
  );
};
