import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Fade } from '@fluentui/react-motion-components-preview';

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
  subtitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    backgroundColor: tokens.colorNeutralBackground4,
    padding: '2px 6px',
    borderRadius: '4px',
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

export const InOutDemo: React.FC = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);
  const [inKey, setInKey] = React.useState(0);
  const [outKey, setOutKey] = React.useState(0);

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
        <Button className={classes.button} size="small" onClick={() => setInKey(k => k + 1)}>
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
        <Button className={classes.button} size="small" onClick={() => setVisible(v => !v)}>
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
        <Button className={classes.button} size="small" onClick={() => setOutKey(k => k + 1)}>
          Replay
        </Button>
      </div>
    </div>
  );
};
