import { Button, Card, Text } from '@fluentui/react-components';
import { Scale } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreateMotionComponentReplayKey.stories.md';

import styles from './CreateMotionComponentReplayKey.module.css';

const useClasses = () => styles;

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
