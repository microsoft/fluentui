import * as React from 'react';
import { makeStyles, tokens, Button, Card, Title3, Caption1, motionTokens } from '@fluentui/react-components';
import { Rotate } from '@fluentui/react-motion-components-preview';
import { RotateParams } from '../../../library/src/components/Rotate/rotate-types';

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
    transition: 'transform 0.2s ease',
    borderRadius: tokens.borderRadiusMedium,
    '&:hover': {
      transform: 'translateY(-2px)',
      backgroundColor: tokens.colorNeutralBackground1,
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
    backgroundColor: tokens.colorNeutralBackground1,
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

const curveSpringRelaxed = `linear(0.000 0.000%, 0.02760 1.000%, 0.05519 2.000%, 0.08279 3.000%, 0.1104 4.000%, 0.1380 5.000%, 0.1656 6.000%, 0.1932 7.000%, 0.2208 8.000%, 0.2484 9.000%, 0.2760 10.00%, 0.3036 11.00%, 0.3312 12.00%, 0.3587 13.00%, 0.3863 14.00%, 0.4139 15.00%, 0.4415 16.00%, 0.4691 17.00%, 0.4967 18.00%, 0.5243 19.00%, 0.5519 20.00%, 0.5795 21.00%, 0.6071 22.00%, 0.6347 23.00%, 0.6623 24.00%, 0.6899 25.00%, 0.7175 26.00%, 0.7451 27.00%, 0.7727 28.00%, 0.8003 29.00%, 0.8279 30.00%, 0.8555 31.00%, 0.8831 32.00%, 0.9107 33.00%, 0.9383 34.00%, 0.9659 35.00%, 0.9935 36.00%, 1.020 37.00%, 1.042 38.00%, 1.059 39.00%, 1.072 40.00%, 1.080 41.00%, 1.084 42.00%, 1.083 43.00%, 1.080 44.00%, 1.073 45.00%, 1.065 46.00%, 1.055 47.00%, 1.044 48.00%, 1.033 49.00%, 1.022 50.00%, 1.011 51.00%, 1.002 52.00%, 0.9933 53.00%, 0.9864 54.00%, 0.9809 55.00%, 0.9770 56.00%, 0.9746 57.00%, 0.9735 58.00%, 0.9736 59.00%, 0.9748 60.00%, 0.9769 61.00%, 0.9797 62.00%, 0.9829 63.00%, 0.9863 64.00%, 0.9899 65.00%, 0.9934 66.00%, 0.9967 67.00%, 0.9997 68.00%, 1.002 69.00%, 1.004 70.00%, 1.006 71.00%, 1.007 72.00%, 1.008 73.00%, 1.008 74.00%, 1.008 75.00%, 1.008 76.00%, 1.007 77.00%, 1.006 78.00%, 1.005 79.00%, 1.004 80.00%, 1.003 81.00%, 1.002 82.00%, 1.001 83.00%, 1.000 84.00%, 0.9992 85.00%, 0.9986 86.00%, 0.9980 87.00%, 0.9977 88.00%, 0.9974 89.00%, 0.9973 90.00%, 0.9974 91.00%, 0.9975 92.00%, 0.9977 93.00%, 0.9980 94.00%, 0.9983 95.00%, 0.9987 96.00%, 0.9990 97.00%, 0.9994 98.00%, 0.9997 99.00%, 1.000 100.0%)`;

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
    duration: motionTokens.durationUltraSlow * 4, // 2000ms = 500ms * 4
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
    duration: motionTokens.durationUltraSlow * 4, // 2000ms = 500ms * 4
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
    duration: motionTokens.durationUltraSlow * 4, // 2000ms = 500ms * 4
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
        <Button onClick={toggleAllPatterns} aria-label="Toggle all rotation patterns">
          Flip All
        </Button>
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
              <Card
                className={classes.patternCard}
                onClick={() => togglePattern(pattern.id)}
                appearance="outline"
                role="button"
                tabIndex={0}
                aria-label={`Toggle ${pattern.name} rotation`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePattern(pattern.id);
                  }
                }}
              >
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
