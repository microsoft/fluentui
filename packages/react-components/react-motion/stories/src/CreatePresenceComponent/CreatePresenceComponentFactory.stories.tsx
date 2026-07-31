import { createPresenceComponent, Field, type MotionImperativeRef, Switch } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreatePresenceComponentFactory.stories.md';

import styles from './CreatePresenceComponentFactory.module.css';

const useClasses = () => styles;

const DropIn = createPresenceComponent({
  enter: {
    keyframes: [
      { transform: 'rotate(-30deg) translateY(-100%)', opacity: 0 },
      { transform: 'rotate(0deg) translateY(0%)', opacity: 1 },
    ],
    duration: 2000,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 1000,
  },
});

export const CreatePresenceComponentFactory = (): JSXElement => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <DropIn imperativeRef={motionRef} visible={visible}>
          <div className={classes.item} />
        </DropIn>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>
    </div>
  );
};

CreatePresenceComponentFactory.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
