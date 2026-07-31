import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Button, Portal, toMountNodeProps } from '@fluentui/react-components';
import type { PortalProps } from '@fluentui/react-components';

import styles from './Default.module.css';

const useClasses = () => styles;

const CustomMessage: React.FC<{ children: React.ReactNode } & Pick<PortalProps, 'mountNode'>> = props => {
  const classes = useClasses();

  const mountNodeProps = toMountNodeProps(props.mountNode);
  mountNodeProps.className = `${classes.portal} ${mountNodeProps.className}`;

  return (
    <Portal mountNode={mountNodeProps}>
      <div className={classes.message}>{props.children}</div>
    </Portal>
  );
};

export const Default = (): JSXElement => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(v => !v)}>Toggle message</Button>
      {open && <CustomMessage>This message is rendered in a custom mount node</CustomMessage>}
    </>
  );
};
