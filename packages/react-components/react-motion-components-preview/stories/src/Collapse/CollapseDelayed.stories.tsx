import { Card, CardHeader, Field, makeStyles, tokens, Switch, Text } from '@fluentui/react-components';
import { CollapseDelayed } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CollapseDelayed.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalMNudge}`,
  },
  card: {
    gridArea: 'card',
    padding: tokens.spacingVerticalXL,
  },
  cardContent: {
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
    padding: tokens.spacingVerticalMNudge,
  },
  field: {
    flex: 1,
  },
  cardHeaderText: {
    margin: 0,
  },
});

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
