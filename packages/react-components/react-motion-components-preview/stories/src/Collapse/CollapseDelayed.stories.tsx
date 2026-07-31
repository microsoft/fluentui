import { Card, CardHeader, Field, Switch, Text } from '@fluentui/react-components';
import { CollapseDelayed } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CollapseDelayed.stories.md';

import styles from './CollapseDelayed.module.css';

const useClasses = () => styles;

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Delayed = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <CollapseDelayed visible={visible}>
        <Card className={classes.card}>
          <CardHeader
            header={
              <Text as="h3" className={classes.cardHeaderText} weight="semibold">
                Lorem Ipsum
              </Text>
            }
          />
          {/* Wrapper div needed because Collapse controls maxHeight on its child to animate height */}
          <div className={classes.cardContent}>
            <LoremIpsum />
          </div>
        </Card>
      </CollapseDelayed>
    </div>
  );
};

Delayed.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
