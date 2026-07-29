import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, type PresenceComponentProps } from '@fluentui/react-components';
import { Fade, type FadeParams } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  wrapper: {
    padding: tokens.spacingVerticalXL,
  },
});

const LoremIpsum = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props}>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </div>
));

export const DefaultFade = (props: PresenceComponentProps & FadeParams): JSXElement => {
  const classes = useClasses();
  return (
    <div className={classes.wrapper}>
      <Fade {...props}>
        <LoremIpsum />
      </Fade>
    </div>
  );
};
