import * as React from 'react';
import StaggerItemDelayDescription from './StaggerItemDelay.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Button, Label, Slider } from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

import styles from './StaggerItemDelay.module.css';

const useClasses = () => styles;

export const ItemDelay = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [itemDelay, setItemDelay] = React.useState<number>(25);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>

        <div className={classes.sliderField}>
          <Label weight="semibold">Item Delay: {itemDelay}ms</Label>
          <Slider min={0} max={200} step={25} value={itemDelay} onChange={(_, data) => setItemDelay(data.value)} />
        </div>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible} itemDelay={itemDelay}>
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

ItemDelay.parameters = {
  docs: {
    description: {
      story: StaggerItemDelayDescription,
    },
  },
};
