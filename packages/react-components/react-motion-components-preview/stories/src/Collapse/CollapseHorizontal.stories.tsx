import { Field, Switch } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CollapseHorizontal.stories.md';

import styles from './CollapseHorizontal.module.css';

const useClasses = () => styles;

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      3,
    )}
  </>
);

export const Horizontal = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div style={{ display: 'flex' }}>
        <Collapse visible={visible} orientation="horizontal">
          {/* Wrapper div to make the collapse crop the card without reflowing the text. */}
          <div>
            <div className={classes.card}>
              <LoremIpsum />
            </div>
          </div>
        </Collapse>
        <div className={classes.sideContent}>[side content]</div>
      </div>
    </div>
  );
};

Horizontal.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
