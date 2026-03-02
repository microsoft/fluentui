import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Fade, Scale, Collapse, Slide, Blur, Rotate } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginTop: '24px',
    marginBottom: '24px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  name: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
  },
  demoArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '60px',
  },
  demoBox: {
    width: '50px',
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

interface ComponentCardProps {
  name: string;
  children: (visible: boolean) => React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ name, children }) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.card}>
      <h4 className={classes.name}>{name}</h4>
      <div className={classes.demoArea}>{children(visible)}</div>
      <Button className={classes.button} size="small" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};

export const ComponentsGrid: React.FC = () => {
  const classes = useClasses();

  return (
    <div className={classes.grid}>
      <ComponentCard name="Fade">
        {visible => (
          <Fade visible={visible}>
            <div className={classes.demoBox}>Fade</div>
          </Fade>
        )}
      </ComponentCard>

      <ComponentCard name="Scale">
        {visible => (
          <Scale visible={visible}>
            <div className={classes.demoBox}>Scale</div>
          </Scale>
        )}
      </ComponentCard>

      <ComponentCard name="Collapse">
        {visible => (
          <Collapse visible={visible}>
            <div className={classes.demoBox}>Collapse</div>
          </Collapse>
        )}
      </ComponentCard>

      <ComponentCard name="Slide">
        {visible => (
          <Slide visible={visible}>
            <div className={classes.demoBox}>Slide</div>
          </Slide>
        )}
      </ComponentCard>

      <ComponentCard name="Blur">
        {visible => (
          <Blur visible={visible}>
            <div className={classes.demoBox}>Blur</div>
          </Blur>
        )}
      </ComponentCard>

      <ComponentCard name="Rotate">
        {visible => (
          <Rotate visible={visible} outAngle={-90} inAngle={0} axis="y">
            <div className={classes.demoBox}>Rotate</div>
          </Rotate>
        )}
      </ComponentCard>
    </div>
  );
};
