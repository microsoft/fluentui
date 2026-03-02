import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Fade, FadeSnappy, FadeRelaxed } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginTop: '24px',
    marginBottom: '24px',

    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  title: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
  },
  duration: {
    margin: 0,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyMonospace,
  },
  demoArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '60px',
  },
  demoBox: {
    width: '80px',
    height: '50px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  button: {
    minWidth: 'auto',
    padding: '4px 12px',
    fontSize: tokens.fontSizeBase200,
  },
});

export const VariantsDemo: React.FC = () => {
  const classes = useClasses();
  const [visibleSnappy, setVisibleSnappy] = React.useState(true);
  const [visibleDefault, setVisibleDefault] = React.useState(true);
  const [visibleRelaxed, setVisibleRelaxed] = React.useState(true);

  const toggleAll = () => {
    setVisibleSnappy(v => !v);
    setVisibleDefault(v => !v);
    setVisibleRelaxed(v => !v);
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
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
          <Button className={classes.button} size="small" onClick={() => setVisibleSnappy(v => !v)}>
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
          <Button className={classes.button} size="small" onClick={() => setVisibleDefault(v => !v)}>
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
          <Button className={classes.button} size="small" onClick={() => setVisibleRelaxed(v => !v)}>
            {visibleRelaxed ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </>
  );
};
