import * as React from 'react';
import StaggerPlainElementsDescription from './StaggerPlainElements.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Button } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

import styles from './StaggerPlainElements.module.css';

const useClasses = () => styles;

export const PlainElements = (): JSXElement => {
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
          {/* Create a list of plain divs */}
          {Array.from({ length: 8 }, (_, i) => (
            <div className={classes.item} style={{ opacity: 1 - 0.1 * i }} key={`stagger-item-${i}`}>
              {i + 1}
            </div>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

PlainElements.parameters = {
  docs: {
    description: {
      story: StaggerPlainElementsDescription,
    },
  },
};
