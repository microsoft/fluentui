import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Card, CardHeader, Field, makeStyles, tokens, Switch, Text } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '20px',
    maxHeight: '300px',
    overflow: 'hidden',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
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

export const Default = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <Blur visible={visible}>
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
      </Blur>
    </div>
  );
};
