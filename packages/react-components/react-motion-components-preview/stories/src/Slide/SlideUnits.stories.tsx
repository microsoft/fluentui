import * as React from 'react';
import { Field, makeStyles, tokens, Switch, Button, Dropdown, Option } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "demo demo" / 350px 1fr`,
    gap: '20px 10px',
    height: '500px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    gap: '15px',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '15px',
  },
  demo: {
    gridArea: 'demo',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: 'hidden',
  },
  panel: {
    padding: '30px',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    maxWidth: '400px',
    textAlign: 'center',
    width: '100%',
  },
  field: {
    flex: '0 0 auto',
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    marginBottom: '10px',
    color: tokens.colorNeutralForeground2,
  },
  examples: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
});

const slideExamples = {
  'Panel from Left (100%)': { fromX: '-100%', fromY: '0%', description: 'Slides in from completely off-screen left' },
  'Panel from Right (100%)': { fromX: '100%', fromY: '0%', description: 'Slides in from completely off-screen right' },
  'Panel from Top (100%)': { fromX: '0%', fromY: '-100%', description: 'Slides in from completely off-screen top' },
  'Panel from Bottom (100%)': { fromX: '0%', fromY: '100%', description: 'Slides in from completely off-screen bottom' },
  'Partial Left (50%)': { fromX: '-50%', fromY: '0%', description: 'Slides in from half-width to the left' },
  'Partial Top (50%)': { fromX: '0%', fromY: '-50%', description: 'Slides in from half-height above' },
  'Small offset (px)': { fromX: '-30px', fromY: '-20px', description: 'Small pixel-based slide animation' },
  'Large offset (px)': { fromX: '-100px', fromY: '-80px', description: 'Large pixel-based slide animation' },
  'Mixed units': { fromX: '2rem', fromY: '-50%', description: 'Mix of rem and percentage units' },
  'Viewport units': { fromX: '-10vw', fromY: '5vh', description: 'Using viewport width and height units' },
};

export const UnitsAndPercentages = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [selectedExample, setSelectedExample] = React.useState<string>('Panel from Left (100%)');
  const [animateOpacity, setAnimateOpacity] = React.useState<boolean>(true);

  const slideParams = slideExamples[selectedExample as keyof typeof slideExamples];

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <div className={classes.description}>
          Demonstrate different CSS units for slide animations: pixels, percentages, rem, and viewport units.
        </div>
        
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        
        <Field className={classes.field}>
          <Switch 
            label="Animate Opacity" 
            checked={animateOpacity} 
            onChange={() => setAnimateOpacity(v => !v)} 
          />
        </Field>

        <Field className={classes.field} label="Animation Example">
          <Dropdown
            value={selectedExample}
            onOptionSelect={(_, data) => setSelectedExample(data.optionValue as string)}
          >
            {Object.keys(slideExamples).map(example => (
              <Option key={example} value={example}>
                {example}
              </Option>
            ))}
          </Dropdown>
        </Field>

        <Button onClick={() => setVisible(v => !v)}>
          Toggle Animation
        </Button>

        <div className={classes.examples}>
          <strong>Common Use Cases:</strong>
          <div>• 100% for full-screen panels</div>
          <div>• 50% for half-screen slides</div>
          <div>• px for precise positioning</div>
          <div>• rem for font-relative sizing</div>
          <div>• vw/vh for viewport-relative</div>
        </div>
      </div>

      <div className={classes.demo}>
        <Slide
          visible={visible}
          fromX={slideParams.fromX}
          fromY={slideParams.fromY}
          animateOpacity={animateOpacity}
          duration={400}
          exitDuration={300}
        >
          <div className={classes.panel}>
            <h3>Slide with Multiple Units</h3>
            <p><strong>{selectedExample}</strong></p>
            <p>{slideParams.description}</p>
            <div style={{ marginTop: '15px', fontSize: tokens.fontSizeBase200 }}>
              <div>fromX: <code>{slideParams.fromX}</code></div>
              <div>fromY: <code>{slideParams.fromY}</code></div>
              <div>Opacity: {animateOpacity ? 'Animated' : 'Static'}</div>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
};