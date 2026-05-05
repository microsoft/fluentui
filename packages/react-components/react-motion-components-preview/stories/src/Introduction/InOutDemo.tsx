'use client';

import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Fade } from '@fluentui/react-motion-components-preview';
import { useClasses } from './InOutDemo.styles';

export const InOutDemo: React.FC = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);
  const [inKey, setInKey] = React.useState(0);
  const [outKey, setOutKey] = React.useState(0);

  const replayIn = React.useCallback(() => setInKey(k => k + 1), []);
  const toggleVisible = React.useCallback(() => setVisible(v => !v), []);
  const replayOut = React.useCallback(() => setOutKey(k => k + 1), []);

  return (
    <div className={classes.container}>
      <div className={classes.panel}>
        <h4 className={classes.title}>Fade.In</h4>
        <span className={classes.code}>&lt;Fade.In&gt;</span>
        <p className={classes.subtitle}>One-way enter</p>
        <div className={classes.demoArea}>
          <Fade.In key={inKey}>
            <div className={classes.demoBox}>Enter</div>
          </Fade.In>
        </div>
        <Button className={classes.button} size="small" onClick={replayIn}>
          Replay
        </Button>
      </div>

      <div className={classes.panel}>
        <h4 className={classes.title}>Fade</h4>
        <span className={classes.code}>&lt;Fade visible&gt;</span>
        <p className={classes.subtitle}>Two-way presence</p>
        <div className={classes.demoArea}>
          <Fade visible={visible}>
            <div className={classes.demoBox}>Toggle</div>
          </Fade>
        </div>
        <Button className={classes.button} size="small" onClick={toggleVisible}>
          {visible ? 'Hide' : 'Show'}
        </Button>
      </div>

      <div className={classes.panel}>
        <h4 className={classes.title}>Fade.Out</h4>
        <span className={classes.code}>&lt;Fade.Out&gt;</span>
        <p className={classes.subtitle}>One-way exit</p>
        <div className={classes.demoArea}>
          <Fade.Out key={outKey}>
            <div className={classes.demoBox}>Exit</div>
          </Fade.Out>
        </div>
        <Button className={classes.button} size="small" onClick={replayOut}>
          Replay
        </Button>
      </div>
    </div>
  );
};
