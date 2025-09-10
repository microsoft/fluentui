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

type RequiredRotateParams = Required<
  Pick<RotateParams, 'axis' | 'angle' | 'duration' | 'easing' | 'exitEasing' | 'exitDuration'>
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
              angle={pattern.angle}
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

CardFlip.parameters = {
  docs: {
    description: {
      story:
        'Each card rotates around a specific axis (X, Y, or Z) with different easing and durations for the enter and exit transitions.',
    },
  },
};
