import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Card, CardHeader, Field, Switch, Text } from '@fluentui/react-components';
import { FadeSnappy } from '@fluentui/react-motion-components-preview';

import description from './FadeSnappy.stories.md';

import styles from './FadeSnappy.module.css';

const useClasses = () => styles;

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Snappy = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <FadeSnappy visible={visible}>
        <Card className={classes.card}>
          <CardHeader
            header={
              <Text as="h3" className={classes.cardHeaderText} weight="semibold">
                Lorem Ipsum
              </Text>
            }
          />
          <LoremIpsum />
        </Card>
      </FadeSnappy>
    </div>
  );
};

Snappy.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
