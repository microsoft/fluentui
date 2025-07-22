import * as React from 'react';
import { makeStyles, tokens, Button, Card, Title3, Body2, Caption1 } from '@fluentui/react-components';
import { Rotate } from '@fluentui/react-motion-components-preview';

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

const patterns = [
  {
    id: 'flip-horizontal',
    name: 'Horizontal Flip',
    description: 'Classic Y-axis rotation',
    icon: '↔️',
    color: tokens.colorPaletteBlueForeground2,
    rotation: { fromY: 180 },
    easing: 'ease-out',
    duration: 600,
  },
  {
    id: 'flip-vertical',
    name: 'Vertical Flip',
    description: 'X-axis rotation',
    icon: '↕️',
    color: tokens.colorPaletteGreenForeground2,
    rotation: { fromX: 180 },
    easing: 'ease-out',
    duration: 600,
  },
  {
    id: 'spin',
    name: 'Spin',
    description: 'Z-axis rotation',
    icon: '🔄',
    color: tokens.colorPaletteRedForeground2,
    rotation: { fromZ: 360 },
    easing: 'ease-in-out',
    duration: 800,
  },
  {
    id: 'tumble',
    name: 'Tumble',
    description: 'Multi-axis rotation',
    icon: '🎲',
    color: tokens.colorPalettePurpleForeground2,
    rotation: { fromX: 180, fromY: 180 },
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    duration: 1000,
  },
  {
    id: 'wobble',
    name: 'Wobble',
    description: 'Gentle X-axis tilt',
    icon: '〰️',
    color: tokens.colorPaletteYellowForeground2,
    rotation: { fromX: 15 },
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    duration: 400,
  },
  {
    id: 'peek',
    name: 'Peek',
    description: 'Slight Y-axis reveal',
    icon: '👀',
    color: tokens.colorPaletteTealForeground2,
    rotation: { fromY: -15 },
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    duration: 400,
  },
  {
    id: 'fold',
    name: 'Fold',
    description: 'Accordion-style fold',
    icon: '📄',
    color: tokens.colorPaletteDarkOrangeForeground2,
    rotation: { fromX: -90 },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: 500,
  },
  {
    id: 'twist',
    name: 'Twist',
    description: 'Diagonal rotation',
    icon: '🌪️',
    color: tokens.colorPalettePinkForeground2,
    rotation: { fromX: 45, fromZ: 45 },
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    duration: 700,
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
              fromX={pattern.rotation.fromX || 0}
              fromY={pattern.rotation.fromY || 0}
              fromZ={pattern.rotation.fromZ || 0}
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
        'A collection of common rotation patterns that you can use as starting points for your own animations. Each pattern demonstrates different combinations of rotation axes and easing curves.',
    },
  },
};
