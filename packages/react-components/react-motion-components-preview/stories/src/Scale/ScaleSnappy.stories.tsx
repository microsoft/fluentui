import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Card, CardHeader, Field, makeStyles, Switch, Text } from '@fluentui/react-components';
import { ScaleSnappy } from '@fluentui/react-motion-components-preview';

import description from './ScaleSnappy.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '20px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

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
      <Card className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </Card>

      <ScaleSnappy visible={visible}>
        <Card className={classes.card}>
          <CardHeader
            header={
              <Text as="h3" style={{ margin: 0 }} weight="semibold">
                Lorem Ipsum
              </Text>
            }
          />
          <LoremIpsum />
        </Card>
      </ScaleSnappy>
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
