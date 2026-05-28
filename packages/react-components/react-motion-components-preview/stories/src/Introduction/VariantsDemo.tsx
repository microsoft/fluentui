'use client';

import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Fade, FadeSnappy, FadeRelaxed } from '@fluentui/react-motion-components-preview';
import { useClasses } from './VariantsDemo.styles';

export const VariantsDemo: React.FC = () => {
  const classes = useClasses();
  const [visibleSnappy, setVisibleSnappy] = React.useState(true);
  const [visibleDefault, setVisibleDefault] = React.useState(true);
  const [visibleRelaxed, setVisibleRelaxed] = React.useState(true);

  const toggleAll = React.useCallback(() => {
    setVisibleSnappy(v => !v);
    setVisibleDefault(v => !v);
    setVisibleRelaxed(v => !v);
  }, []);
  const toggleSnappy = React.useCallback(() => setVisibleSnappy(v => !v), []);
  const toggleDefault = React.useCallback(() => setVisibleDefault(v => !v), []);
  const toggleRelaxed = React.useCallback(() => setVisibleRelaxed(v => !v), []);

  return (
    <>
      <div className={classes.toolbar}>
        <Button onClick={toggleAll}>Toggle All</Button>
      </div>
      <div className={classes.container}>
        <div className={classes.panel}>
          <h4 className={classes.title}>FadeSnappy</h4>
          <p className={classes.duration}>150ms</p>
          <div className={classes.demoArea}>
            <FadeSnappy visible={visibleSnappy}>
              <div className={classes.demoBox}>Snappy</div>
            </FadeSnappy>
          </div>
          <Button className={classes.button} size="small" onClick={toggleSnappy}>
            {visibleSnappy ? 'Hide' : 'Show'}
          </Button>
        </div>

        <div className={classes.panel}>
          <h4 className={classes.title}>Fade</h4>
          <p className={classes.duration}>200ms</p>
          <div className={classes.demoArea}>
            <Fade visible={visibleDefault}>
              <div className={classes.demoBox}>Default</div>
            </Fade>
          </div>
          <Button className={classes.button} size="small" onClick={toggleDefault}>
            {visibleDefault ? 'Hide' : 'Show'}
          </Button>
        </div>

        <div className={classes.panel}>
          <h4 className={classes.title}>FadeRelaxed</h4>
          <p className={classes.duration}>250ms</p>
          <div className={classes.demoArea}>
            <FadeRelaxed visible={visibleRelaxed}>
              <div className={classes.demoBox}>Relaxed</div>
            </FadeRelaxed>
          </div>
          <Button className={classes.button} size="small" onClick={toggleRelaxed}>
            {visibleRelaxed ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </>
  );
};
