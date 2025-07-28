import * as React from 'react';
import { makeStyles, tokens, Button, Card, Title3, Caption1, motionTokens } from '@fluentui/react-components';
import { Rotate } from '@fluentui/react-motion-components-preview';
import { RotateParams } from '../../../library/src/components/Rotate/rotate-types';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '1000px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  patternsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  cardWrapper: {
    perspective: '800px',
    perspectiveOrigin: 'center center',
    height: '140px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    borderRadius: tokens.borderRadiusMedium,
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  patternCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingVerticalS,
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
  patternTitle: {
    color: tokens.colorNeutralForeground1,
  },
  patternDescription: {
    color: tokens.colorNeutralForeground2,
    textAlign: 'center',
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

const curveSpringRelaxed = `linear(0.000 0.000%, 0.06073 1.000%, 0.1215 2.000%, 0.1822 3.000%, 0.2429 4.000%, 0.3036 5.000%, 0.3644 6.000%, 0.4251 7.000%, 0.4858 8.000%, 0.5465 9.000%, 0.6073 10.00%, 0.6680 11.00%, 0.7287 12.00%, 0.7895 13.00%, 0.8502 14.00%, 0.9109 15.00%, 0.9716 16.00%, 1.031 17.00%, 1.085 18.00%, 1.131 19.00%, 1.168 20.00%, 1.198 21.00%, 1.220 22.00%, 1.234 23.00%, 1.241 24.00%, 1.242 25.00%, 1.236 26.00%, 1.226 27.00%, 1.211 28.00%, 1.192 29.00%, 1.171 30.00%, 1.148 31.00%, 1.124 32.00%, 1.099 33.00%, 1.074 34.00%, 1.050 35.00%, 1.028 36.00%, 1.007 37.00%, 0.9880 38.00%, 0.9714 39.00%, 0.9572 40.00%, 0.9455 41.00%, 0.9364 42.00%, 0.9298 43.00%, 0.9255 44.00%, 0.9235 45.00%, 0.9236 46.00%, 0.9255 47.00%, 0.9291 48.00%, 0.9339 49.00%, 0.9399 50.00%, 0.9467 51.00%, 0.9541 52.00%, 0.9618 53.00%, 0.9697 54.00%, 0.9774 55.00%, 0.9849 56.00%, 0.9920 57.00%, 0.9986 58.00%, 1.004 59.00%, 1.010 60.00%, 1.014 61.00%, 1.018 62.00%, 1.020 63.00%, 1.022 64.00%, 1.024 65.00%, 1.024 66.00%, 1.024 67.00%, 1.023 68.00%, 1.022 69.00%, 1.021 70.00%, 1.019 71.00%, 1.017 72.00%, 1.014 73.00%, 1.012 74.00%, 1.009 75.00%, 1.007 76.00%, 1.004 77.00%, 1.002 78.00%, 1.000 79.00%, 0.9984 80.00%, 0.9968 81.00%, 0.9954 82.00%, 0.9943 83.00%, 0.9935 84.00%, 0.9929 85.00%, 0.9925 86.00%, 0.9923 87.00%, 0.9924 88.00%, 0.9926 89.00%, 0.9930 90.00%, 0.9935 91.00%, 0.9941 92.00%, 0.9948 93.00%, 0.9956 94.00%, 0.9964 95.00%, 0.9972 96.00%, 0.9979 97.00%, 0.9987 98.00%, 0.9994 99.00%, 1.000 100.0%)`;

type RotatePattern = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  axis: Required<RotateParams['axis']>;
  angle: Required<RotateParams['angle']>;
  duration: Required<RotateParams['duration']>;
  easing: Required<RotateParams['easing']>;
  exitEasing: Required<RotateParams['easing']>;
  exitDuration: Required<RotateParams['duration']>;
};

const patterns: RotatePattern[] = [
  {
    id: 'flip-horizontal',
    name: 'Horizontal Flip',
    description: 'Y-axis rotation',
    icon: '↔️',
    color: tokens.colorPaletteBlueForeground2,
    axis: 'y',
    angle: 180,
    easing: curveSpringRelaxed,
    exitEasing: motionTokens.curveDecelerateMid,
    duration: 2000,
    exitDuration: motionTokens.durationUltraSlow,
  },
  {
    id: 'flip-vertical',
    name: 'Vertical Flip',
    description: 'X-axis rotation',
    icon: '↕️',
    color: tokens.colorPaletteGreenForeground2,
    axis: 'x',
    angle: 180,
    easing: curveSpringRelaxed,
    exitEasing: motionTokens.curveDecelerateMid,
    duration: 2000,
    exitDuration: motionTokens.durationUltraSlow,
  },
  {
    id: 'spin',
    name: 'Spin',
    description: 'Z-axis rotation',
    icon: '🔄',
    color: tokens.colorPaletteRedForeground2,
    axis: 'z',
    angle: 180,
    easing: curveSpringRelaxed,
    exitEasing: motionTokens.curveDecelerateMid,
    duration: 2000,
    exitDuration: motionTokens.durationUltraSlow,
  },
];

export const CardFlip = () => {
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

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={toggleAllPatterns}>Flip All</Button>
      </div>

      <div className={classes.patternsGrid}>
        {patterns.map(pattern => (
          <div key={pattern.id} className={classes.cardWrapper}>
            <Rotate
              visible={activePatterns.has(pattern.id)}
              axis={pattern.axis}
              angle={pattern.angle}
              duration={pattern.duration}
              easing={pattern.easing}
              exitEasing={pattern.exitEasing}
              exitDuration={pattern.exitDuration}
              animateOpacity={false}
            >
              <Card className={classes.patternCard} onClick={() => togglePattern(pattern.id)}>
                <div className={classes.demoIcon} style={{ backgroundColor: pattern.color }}>
                  {pattern.icon}
                </div>
                <Title3 className={classes.patternTitle}>{pattern.name}</Title3>
                <Caption1 className={classes.patternDescription}>{pattern.description}</Caption1>
              </Card>
            </Rotate>
          </div>
        ))}
      </div>
    </div>
  );
};

CardFlip.parameters = {
  docs: {
    description: {
      story:
        'Each card rotates around a specific axis (X, Y, or Z) with different easing and durations for the enter and exit transitions.',
    },
  },
};
