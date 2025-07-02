import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    position: 'relative',
    width: '100%',
    height: '500px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    zIndex: 1,
  },
  card: {
    position: 'absolute',
    padding: '20px',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    minWidth: '120px',
    textAlign: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  cardCenter: {
    backgroundColor: tokens.colorBrandBackground,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  cardTop: {
    backgroundColor: tokens.colorPaletteBlueBackground3,
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  cardBottom: {
    backgroundColor: tokens.colorPaletteGreenBackground3,
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  cardLeft: {
    backgroundColor: tokens.colorPaletteRedBackground3,
    left: '50px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  cardRight: {
    backgroundColor: tokens.colorPalettePurpleBackground3,
    right: '50px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  cardTopLeft: {
    backgroundColor: tokens.colorPaletteYellowBackground3,
    top: '50px',
    left: '50px',
  },
  cardTopRight: {
    backgroundColor: tokens.colorPaletteOrangeBackground3,
    top: '50px',
    right: '50px',
  },
  cardBottomLeft: {
    backgroundColor: tokens.colorPaletteLightGreenBackground3,
    bottom: '50px',
    left: '50px',
  },
  cardBottomRight: {
    backgroundColor: tokens.colorPalettePinkBackground3,
    bottom: '50px',
    right: '50px',
  },
});

const slideConfigs = [
  { name: 'Center', className: 'cardCenter', fromX: '0px', fromY: '-20px', label: 'From Top' },
  { name: 'Top', className: 'cardTop', fromX: '0px', fromY: '-80px', label: 'From Above' },
  { name: 'Bottom', className: 'cardBottom', fromX: '0px', fromY: '80px', label: 'From Below' },
  { name: 'Left', className: 'cardLeft', fromX: '-80px', fromY: '0px', label: 'From Left' },
  { name: 'Right', className: 'cardRight', fromX: '80px', fromY: '0px', label: 'From Right' },
  { name: 'TopLeft', className: 'cardTopLeft', fromX: '-60px', fromY: '-60px', label: 'Top-Left' },
  { name: 'TopRight', className: 'cardTopRight', fromX: '60px', fromY: '-60px', label: 'Top-Right' },
  { name: 'BottomLeft', className: 'cardBottomLeft', fromX: '-60px', fromY: '60px', label: 'Bottom-Left' },
  { name: 'BottomRight', className: 'cardBottomRight', fromX: '60px', fromY: '60px', label: 'Bottom-Right' },
];

export const Showcase = () => {
  const classes = useClasses();
  const [visibleStates, setVisibleStates] = React.useState<Record<string, boolean>>({});

  const toggleCard = (name: string) => {
    setVisibleStates(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const showAll = () => {
    const newStates: Record<string, boolean> = {};
    slideConfigs.forEach(config => {
      newStates[config.name] = true;
    });
    setVisibleStates(newStates);
  };

  const hideAll = () => {
    setVisibleStates({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button size="small" onClick={showAll}>
          Show All
        </Button>
        <Button size="small" onClick={hideAll}>
          Hide All
        </Button>
        {slideConfigs.map(config => (
          <Button
            key={config.name}
            size="small"
            appearance={visibleStates[config.name] ? 'primary' : 'secondary'}
            onClick={() => toggleCard(config.name)}
          >
            {config.label}
          </Button>
        ))}
      </div>

      {slideConfigs.map(config => (
        <Slide
          key={config.name}
          visible={visibleStates[config.name]}
          fromX={config.fromX}
          fromY={config.fromY}
          duration={300}
          exitDuration={200}
        >
          <div className={`${classes.card} ${classes[config.className as keyof typeof classes]}`}>
            <div>{config.label}</div>
            <div style={{ fontSize: tokens.fontSizeBase200, marginTop: '5px' }}>
              ({config.fromX}, {config.fromY})
            </div>
          </div>
        </Slide>
      ))}
    </div>
  );
};