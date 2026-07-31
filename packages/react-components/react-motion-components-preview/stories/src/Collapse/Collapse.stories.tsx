import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { type PresenceComponentProps } from '@fluentui/react-components';
import { Collapse, type CollapseParams } from '@fluentui/react-motion-components-preview';

import styles from './Collapse.module.css';

const useClasses = () => styles;

const LoremIpsum = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props}>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </div>
));

export const DefaultCollapse = (props: PresenceComponentProps & CollapseParams): JSXElement => {
  const classes = useClasses();
  return (
    <div className={classes.wrapper}>
      <Collapse {...props}>
        <LoremIpsum />
      </Collapse>
    </div>
  );
};
