import { Button, Card, makeStyles, Text, tokens } from '@fluentui/react-components';
import { Scale } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreateMotionComponentReplayKey.stories.md';

const useClasses = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateAreas: `"labelBefore labelAfter" "cardBefore cardAfter" "exampleBelowBefore exampleBelowAfter" "controls controls"`,
    gap: '12px 20px',
  },

  label: {
    textAlign: 'center',
  },

  example: {
    textAlign: 'center',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
  },

  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '160px',
  },

  controls: {
    gridArea: 'controls',
    display: 'flex',
    justifyContent: 'center',
  },

  counter: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightBold,
    lineHeight: '1',
  },
});

export const CreateMotionComponentReplayKey = (): JSXElement => {
  const classes = useClasses();
  const [count, setCount] = React.useState(0);

  return (
    <div className={classes.root}>
      <Text className={classes.label}>
        <b>Without replayKey</b>
        <br />
        no animation on change
      </Text>
      <Text className={classes.label}>
        <b>With replayKey</b>
        <br />
        animates on change
      </Text>

      <Text className={classes.example} size={300} style={{ gridArea: 'exampleBelowBefore' }}>
        {'<Scale.In>'}
      </Text>
      <Text className={classes.example} size={300} style={{ gridArea: 'exampleBelowAfter' }}>
        <span>{`<Scale.In `}</span>
        <b>{`replayKey={${count}}>`}</b>
      </Text>

      <Card className={classes.card} style={{ gridArea: 'cardBefore' }}>
        <Scale.In duration={2000} outScale={1.5} animateOpacity={false}>
          <span className={classes.counter}>{count}</span>
        </Scale.In>
      </Card>
      <Card className={classes.card} style={{ gridArea: 'cardAfter' }}>
        <Scale.In duration={2000} outScale={1.5} animateOpacity={false} replayKey={count}>
          <span className={classes.counter}>{count}</span>
        </Scale.In>
      </Card>

      <div className={classes.controls}>
        <Button appearance="primary" onClick={() => setCount(n => n + 1)}>
          Increment
        </Button>
      </div>
    </div>
  );
};

CreateMotionComponentReplayKey.parameters = {
  docs: { description: { story: description } },
};
