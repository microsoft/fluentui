import * as React from 'react';
import StaggerPresenceDescription from './StaggerPresence.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Button } from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

import styles from './StaggerPresence.module.css';

const useClasses = () => styles;

export const Presence = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible}>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 8 }, (_, i) => (
            <Slide key={`stagger-item-${i}`} outY="20px">
              {/* Outer div protects the inner div from Slide's opacity animation */}
              <div>
                <div className={classes.item} style={{ opacity: 1 - 0.1 * i }}>
                  {i + 1}
                </div>
              </div>
            </Slide>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

Presence.parameters = {
  docs: {
    description: {
      story: StaggerPresenceDescription,
    },
  },
};
