import * as React from 'react';
import StaggerTextDescription from './StaggerText.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Button, motionTokens } from '@fluentui/react-components';
import { Stagger, Scale } from '@fluentui/react-motion-components-preview';

import styles from './StaggerText.module.css';

const useClasses = () => styles;

export const Text = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const outScale = visible ? 3 : 0;

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
        <Stagger visible={visible} itemDelay={100}>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 4 }, (_, i) => (
            <Scale
              outScale={outScale}
              duration={1200}
              exitDuration={1200}
              easing={motionTokens.curveDecelerateMax}
              exitEasing={motionTokens.curveAccelerateMid}
              key={`stagger-item-${i}`}
              unmountOnExit
              appear
            >
              <div className={classes.item}>STAGGER</div>
            </Scale>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

Text.parameters = {
  docs: {
    description: {
      story: StaggerTextDescription,
    },
  },
};
