# Motion/Components (preview)/Rotate

The Rotate component provides 3D rotation animations with independent X, Y, and Z axis control.

> **⚠️ Preview components are considered unstable**

```tsx
import { Rotate } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Rotate visible={visible} axis="x" angle={45}>
      <div>Content</div>
    </Rotate>
  );
}
```

## Examples

### Card Flip

Each card rotates around a specific axis (X, Y, or Z) with different easing and durations for the enter and exit transitions.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button, CompoundButton, motionTokens } from '@fluentui/react-components';
import { Rotate, type RotateParams } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL, // 20px
    padding: tokens.spacingVerticalXL, // 20px
    maxWidth: '1000px',
  },
  controls: {
    display: 'flex',
    gap: tokens.spacingHorizontalMNudge, // 10px
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: tokens.spacingVerticalXL, // 20px
  },
  patternsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: tokens.spacingVerticalXL, // 20px
  },
  cardWrapper: {
    perspective: '500px',
    perspectiveOrigin: 'center center',
    height: '140px',
    cursor: 'pointer',
    borderRadius: tokens.borderRadiusMedium,
    transition: `scale ${motionTokens.durationSlow}ms ${motionTokens.curveDecelerateMid}`,
    '&:hover': {
      scale: '105%',
    },
  },
  patternCard: {
    height: '100%',
    width: '100%',
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1, // Override transparent background from outline appearance
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover, // Override transparent hover background
    },
  },
  demoIcon: {
    width: '48px',
    height: '48px',
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

const curveSpringRelaxed = `linear(0.0000 0.00%, 0.9935 36.00%, 1.042 38.00%, 1.072 40.00%, 1.084 42.00%, 1.080 44.00%, 1.055 47.00%, 0.9933 53.00%, 0.9746 57.00%, 0.9797 62.00%, 1.002 69.00%, 1.008 73.00%, 1.008 76.00%, 0.9980 87.00%, 1.000 100.00%)`;
const curveAnticipation = `linear(0, -0.01210 6%, -0.07124 19%, -0.08333 25%, -0.07200 30%, -0.04316 34%, 0.007701 38%, 0.06276 41%, 0.1342 44%, 0.2238 47%, 0.4463 53%, 0.5760 57%, 0.6836 61%, 0.7713 65%, 0.8411 69%, 0.9063 74%, 0.9506 79%, 0.9820 85%, 0.9982 93%, 1)`;

type RequiredRotateParams = Required<
  Pick<RotateParams, 'axis' | 'outAngle' | 'duration' | 'easing' | 'exitEasing' | 'exitDuration'>
>;

type RotatePattern = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
} & RequiredRotateParams;

const patterns: RotatePattern[] = [
  {
    id: 'flip-horizontal',
    name: 'Horizontal Flip',
    description: 'Y-axis rotation',
    icon: '↔️',
    color: tokens.colorPaletteBlueForeground2,
    axis: 'y',
    outAngle: 180,
    easing: curveSpringRelaxed,
    exitEasing: curveAnticipation,
    duration: motionTokens.durationUltraSlow * 4, // 2000ms = 500ms * 4
    exitDuration: motionTokens.durationUltraSlow * 2,
  },
  {
    id: 'flip-vertical',
    name: 'Vertical Flip',
    description: 'X-axis rotation',
    icon: '↕️',
    color: tokens.colorPaletteGreenForeground2,
    axis: 'x',
    outAngle: 180,
    easing: curveSpringRelaxed,
    exitEasing: curveAnticipation,
    duration: motionTokens.durationUltraSlow * 4, // 2000ms = 500ms * 4
    exitDuration: motionTokens.durationUltraSlow * 2,
  },
  {
    id: 'spin',
    name: 'Spin',
    description: 'Z-axis rotation',
    icon: '🔄',
    color: tokens.colorPaletteRedForeground2,
    axis: 'z',
    outAngle: 180,
    easing: curveSpringRelaxed,
    exitEasing: curveAnticipation,
    duration: motionTokens.durationUltraSlow * 4, // 2000ms = 500ms * 4
    exitDuration: motionTokens.durationUltraSlow * 2,
  },
];

export const CardFlip = (): JSXElement => {
  const classes = useClasses();
  const [activePatterns, setActivePatterns] = React.useState<Set<string>>(new Set(patterns.map(p => p.id)));

  const togglePattern = (patternId: string) => {
    setActivePatterns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(patternId)) {
        newSet.delete(patternId);
      } else {
        newSet.add(patternId);
      }
      return newSet;
    });
  };

  const toggleAllPatterns = () => {
    if (activePatterns.size === patterns.length) {
      // All are showing, so hide all
      setActivePatterns(new Set());
    } else {
      // Some or none are showing, so show all
      setActivePatterns(new Set(patterns.map(p => p.id)));
    }
  };

  const getToggleButtonText = () => {
    return activePatterns.size === patterns.length ? 'Flip to Back' : 'Flip to Front';
  };

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={toggleAllPatterns} aria-label="Toggle all rotation patterns">
          {getToggleButtonText()}
        </Button>
      </div>

      <div className={classes.patternsGrid}>
        {patterns.map(pattern => (
          <div key={pattern.id} className={classes.cardWrapper}>
            <Rotate
              visible={activePatterns.has(pattern.id)}
              axis={pattern.axis}
              outAngle={pattern.outAngle}
              duration={pattern.duration}
              easing={pattern.easing}
              exitEasing={pattern.exitEasing}
              exitDuration={pattern.exitDuration}
              animateOpacity={false}
            >
              <CompoundButton
                appearance="outline"
                aria-label={`Toggle ${pattern.name} rotation`}
                aria-pressed={activePatterns.has(pattern.id)}
                className={classes.patternCard}
                icon={
                  <div className={classes.demoIcon} style={{ backgroundColor: pattern.color }}>
                    {pattern.icon}
                  </div>
                }
                onClick={() => togglePattern(pattern.id)}
                secondaryContent={pattern.description}
              >
                {pattern.name}
              </CompoundButton>
            </Rotate>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Field,
  makeStyles,
  tokens,
  useId,
  Label,
  Slider,
  RadioGroup,
  Radio,
  motionTokens,
  Button,
} from '@fluentui/react-components';
import { Rotate, type RotateParams } from '@fluentui/react-motion-components-preview';

type Axis3D = NonNullable<RotateParams['axis']>;

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalMNudge}`,
    overflow: 'clip',
  },
  card: {
    gridArea: 'card',
    padding: tokens.spacingHorizontalMNudge,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: tokens.spacingHorizontalL,
    gap: tokens.spacingVerticalL,
  },
  controlSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionHeader: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: tokens.spacingVerticalXS,
  },
  toggleGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalM,
  },
  ctaButton: {
    flex: 1,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  sliderField: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  sliderLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  valueDisplay: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyMonospace,
  },
  sliderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Default = (props: React.ComponentProps<typeof Rotate>): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [perspective, setPerspective] = React.useState<string>('1000px');
  const [duration, setDuration] = React.useState<number>(motionTokens.durationUltraSlow); // 500ms
  const [axis, setAxis] = React.useState<Axis3D>('z');
  const [outAngle, setOutAngle] = React.useState<number>(-90);

  const perspectiveSliderId = useId();
  const durationSliderId = useId();
  const outAngleSliderId = useId();

  const perspectiveMin = 200;
  const perspectiveMax = 2000;
  const durationMin = motionTokens.durationUltraFast; // 50ms
  const durationMax = motionTokens.durationUltraSlow * 2; // 1000ms
  const angleMin = -180;
  const angleMax = 180;

  return (
    <div className={classes.container} style={{ perspective }}>
      <div className={classes.controls}>
        {/* Animation Controls Section */}
        <div className={classes.controlSection}>
          <div className={classes.toggleGroup}>
            <Button className={classes.ctaButton} appearance="primary" size="large" onClick={() => setVisible(v => !v)}>
              {visible ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>

        {/* Rotation Settings Section */}
        <div className={classes.controlSection}>
          <Field className={classes.field}>
            <RadioGroup value={axis} onChange={(_, data) => setAxis(data.value as Axis3D)} layout="horizontal">
              <Radio value="x" label="X-axis" />
              <Radio value="y" label="Y-axis" />
              <Radio value="z" label="Z-axis" />
            </RadioGroup>
          </Field>

          <Field className={classes.sliderField}>
            <div className={classes.sliderHeader}>
              <Label htmlFor={outAngleSliderId} className={classes.sliderLabel}>
                Out Angle
              </Label>
              <span className={classes.valueDisplay}>{outAngle}°</span>
            </div>
            <Slider
              min={angleMin}
              max={angleMax}
              defaultValue={outAngle}
              id={outAngleSliderId}
              onChange={(_, data) => {
                setOutAngle(data.value);
              }}
            />
          </Field>
        </div>

        {/* Timing & Perspective Section */}
        <div className={classes.controlSection}>
          <Field className={classes.sliderField}>
            <div className={classes.sliderHeader}>
              <Label htmlFor={durationSliderId} className={classes.sliderLabel}>
                Duration
              </Label>
              <span className={classes.valueDisplay}>{duration}ms</span>
            </div>
            <Slider
              min={durationMin}
              max={durationMax}
              defaultValue={motionTokens.durationUltraSlow}
              id={durationSliderId}
              onChange={(_, data) => {
                setDuration(data.value);
              }}
            />
          </Field>

          <Field className={classes.sliderField}>
            <div className={classes.sliderHeader}>
              <Label htmlFor={perspectiveSliderId} className={classes.sliderLabel}>
                Perspective
              </Label>
              <span className={classes.valueDisplay}>{perspective}</span>
            </div>
            <Slider
              min={perspectiveMin}
              max={perspectiveMax}
              defaultValue={1000}
              id={perspectiveSliderId}
              onChange={(_, data) => {
                setPerspective(`${data.value}px`);
              }}
            />
          </Field>
        </div>
      </div>

      <Rotate visible={visible} axis={axis} outAngle={outAngle} duration={duration}>
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </Rotate>
    </div>
  );
};
```
