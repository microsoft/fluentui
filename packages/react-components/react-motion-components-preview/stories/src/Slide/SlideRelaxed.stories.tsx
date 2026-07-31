import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Card, CardHeader, Field, Switch, Text } from '@fluentui/react-components';
import { SlideRelaxed } from '@fluentui/react-motion-components-preview';

import description from './SlideRelaxed.stories.md';

import styles from './SlideRelaxed.module.css';

const useClasses = () => styles;

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Relaxed = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <SlideRelaxed visible={visible} outY="20px">
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
      </SlideRelaxed>
    </div>
  );
};

Relaxed.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
