import * as React from 'react';
import { makeStyles, tokens, Button, Card, Title3, Body2, Caption1 } from '@fluentui/react-components';
import { Rotate } from '@fluentui/react-motion-components-preview';
import { RotateParams } from '../../../library/src/components/Rotate/rotate-types';

type RotatePattern = {
  /** Unique identifier for the pattern */
  id: string;
  /** Display name of the pattern */
  name: string;
  /** Description of what the pattern does */
  description: string;
  /** Emoji icon for visual representation */
  icon: string;
  /** Background color for the demo card */
  color: string;
  /** The axis of rotation: 'x', 'y', or 'z' - matches Rotate component */
  axis: Required<RotateParams['axis']>;
  /** The starting rotation angle in degrees - matches Rotate component */
  angle: Required<RotateParams['angle']>;
  /** Time (ms) for the animation - matches Rotate component */
  duration: Required<RotateParams['duration']>;
  /** Easing curve for the animation - matches Rotate component */
  easing: Required<RotateParams['easing']>;
};

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
    perspective: '800px',
  },
  patternCard: {
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingVerticalS,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow16,
    },
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

const patterns: RotatePattern[] = [
  {
    id: 'flip-horizontal',
    name: 'Horizontal Flip',
    description: 'Classic Y-axis rotation',
    icon: '↔️',
    color: tokens.colorPaletteBlueForeground2,
    axis: 'y',
    angle: 90,
    easing: curveSpringRelaxed,
    duration: 2000,
  },
  {
    id: 'flip-vertical',
    name: 'Vertical Flip',
    description: 'X-axis rotation',
    icon: '↕️',
    color: tokens.colorPaletteGreenForeground2,
    axis: 'x',
    angle: 90,
    easing: curveSpringRelaxed,
    duration: 2000,
  },
  {
    id: 'spin',
    name: 'Spin',
    description: 'Z-axis rotation',
    icon: '🔄',
    color: tokens.colorPaletteRedForeground2,
    axis: 'z',
    angle: 90,
    easing: curveSpringRelaxed,
    duration: 2000,
  },
];

export const CommonPatterns = () => {
  const classes = useClasses();
  const [activePatterns, setActivePatterns] = React.useState<Set<string>>(new Set());

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

  const demonstrateAll = () => {
    setActivePatterns(new Set());

    patterns.forEach((pattern, index) => {
      setTimeout(() => {
        setActivePatterns(prev => new Set([...prev, pattern.id]));
        setTimeout(() => {
          setActivePatterns(prev => {
            const newSet = new Set(prev);
            newSet.delete(pattern.id);
            return newSet;
          });
        }, pattern.duration + 200);
      }, index * 300);
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

  const allPatternsVisible = activePatterns.size === patterns.length;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button appearance="primary" onClick={demonstrateAll}>
          Demonstrate All Patterns
        </Button>
        <Button onClick={toggleAllPatterns}>{allPatternsVisible ? 'Hide All' : 'Show All'}</Button>
      </div>

      <div className={classes.patternsGrid}>
        {patterns.map(pattern => (
          <div key={pattern.id}>
            <Rotate
              visible={activePatterns.has(pattern.id)}
              axis={pattern.axis}
              angle={pattern.angle}
              duration={pattern.duration}
              easing={pattern.easing}
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

      <Body2 style={{ textAlign: 'center', color: tokens.colorNeutralForeground2, marginTop: '20px' }}>
        Click any pattern to see its rotation effect, or use the controls above to see them all in sequence
      </Body2>
    </div>
  );
};

CommonPatterns.parameters = {
  docs: {
    description: {
      story:
        'A collection of common single-axis rotation patterns that you can use as starting points for your own animations. Each pattern demonstrates rotation around a specific axis (X, Y, or Z) with spring-relaxed easing.',
    },
  },
};
