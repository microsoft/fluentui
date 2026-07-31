import { createPresenceComponent, Field, motionTokens, Switch } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement, PresenceComponentProps } from '@fluentui/react-components';

import styles from './CreatePresenceComponentDefault.module.css';

const useClasses = () => styles;

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentDefault = (props: PresenceComponentProps): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Fade visible={visible}>
          <div className={classes.item} />
        </Fade>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>
    </div>
  );
};
