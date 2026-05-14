import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, type PresenceComponentProps } from '@fluentui/react-components';
import { Slide, type SlideParams } from '@fluentui/react-motion-components-preview';

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

export const DefaultSlide = (props: PresenceComponentProps & SlideParams): JSXElement => {
  const classes = useClasses();
  return (
    <div className={classes.wrapper}>
      <Slide {...props}>
        <LoremIpsum />
      </Slide>
    </div>
  );
};
