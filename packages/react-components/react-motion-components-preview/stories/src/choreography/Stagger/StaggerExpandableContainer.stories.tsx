import * as React from 'react';
import StaggerExpandableContainerDescription from './StaggerExpandableContainer.stories.md';
import {
  makeStyles,
  tokens,
  Button,
  motionTokens,
  Persona,
  Slider,
  Label,
  JSXElement,
  type PersonaProps,
} from '@fluentui/react-components';
import { Stagger, Slide, Collapse } from '@fluentui/react-motion-components-preview';

// Timing constants for coordinated Collapse + Stagger choreography:
// Time to wait for container expansion before stagger items appear
const COLLAPSE_EXPAND_DELAY = 200;
// Time to wait for stagger items to exit before container collapses
const STAGGER_EXIT_DELAY = 250;
// Time between each staggered item animation
const STAGGER_ITEM_DELAY = 100;

const VISIBLE_ITEMS_COUNT = 3;
const COLLAPSE_DURATION = 600;
const COLLAPSED_HEIGHT = '175px';
const ITEM_HEIGHT = '36px';

const personaData = [
  {
    name: 'Kevin Sturgis',
    image: 'persona-male.png',
    status: 'available' as const,
    useImage: true,
    secondaryText: 'Available',
  },
  { name: 'Sarah Chen', status: 'busy' as const, useImage: false, secondaryText: 'In a meeting' },
  {
    name: 'Jessica Brown',
    image: 'persona-female.png',
    status: 'busy' as const,
    useImage: true,
    secondaryText: 'Do not disturb',
  },
  { name: 'Emily Johnson', status: 'available' as const, useImage: false, secondaryText: 'Available' },
  { name: 'David Kim', status: 'offline' as const, useImage: false, secondaryText: 'Offline' },
  {
    name: 'Michael Rodriguez',
    image: 'persona-male.png',
    status: 'away' as const,
    useImage: true,
    secondaryText: 'Away',
  },
  { name: 'Alex Thompson', status: 'available' as const, useImage: false, secondaryText: 'Available' },
  {
    name: 'Maria Garcia',
    image: 'persona-female.png',
    status: 'away' as const,
    useImage: true,
    secondaryText: 'Be right back',
  },
];

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    maxWidth: '300px',
  },
  controls: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacingVerticalS,
  },
  sliderLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    minWidth: '90px',
    flexShrink: 0,
  },
  slider: {
    flexGrow: 1,
  },
  listContainer: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: tokens.spacingVerticalL,
    gap: tokens.spacingVerticalL,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: tokens.borderRadiusSmall,
    minHeight: ITEM_HEIGHT,
    justifyContent: 'flex-start',
  },
});

export const ExpandableContainer = (): JSXElement => {
  const classes = useClasses();
  const [expanded, setExpanded] = React.useState(false);
  const [staggerVisible, setStaggerVisible] = React.useState(false);
  const [totalItems, setTotalItems] = React.useState(8);
  const [isDraggingSlider, setIsDraggingSlider] = React.useState(false);

  const itemData = React.useMemo(
    () =>
      Array.from({ length: totalItems }, (_, index) => ({
        id: index + 1,
        ...personaData[index % personaData.length],
      })),
    [totalItems],
  );

  const staticItems = itemData.slice(0, VISIBLE_ITEMS_COUNT);
  const staggerItems = itemData.slice(VISIBLE_ITEMS_COUNT);

  const avatarFor = (useImage?: boolean, image?: string): PersonaProps['avatar'] =>
    useImage
      ? {
          image: {
            src: `https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/${image}`,
          },
        }
      : { color: 'colorful' };

  const handleToggle = () => {
    if (!expanded) {
      // "See more": Expand container via Collapse, with delayed stagger items
      // The Collapse container will expand immediately, then after COLLAPSE_EXPAND_DELAY (200ms),
      // the Stagger items will animate in with staggered timing
      setExpanded(true);
      setStaggerVisible(true);
    } else {
      // "See less": Hide extra items via Stagger (reversed), then contract container via Collapse
      // The Stagger items will animate out immediately, then after STAGGER_EXIT_DELAY (250ms),
      // the Collapse container will contract
      setStaggerVisible(false);
      setExpanded(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sliderContainer}>
        <Label htmlFor="totalItemsSlider" className={classes.sliderLabel}>
          Total items: {totalItems}
        </Label>
        <Slider
          id="totalItemsSlider"
          className={classes.slider}
          min={4}
          max={10}
          step={1}
          value={totalItems}
          onChange={(_, data) => setTotalItems(data.value)}
          onPointerDown={() => setIsDraggingSlider(true)}
          onPointerUp={() => setIsDraggingSlider(false)}
          onPointerCancel={() => setIsDraggingSlider(false)}
        />
      </div>

      {/*
        Collapse handles the container size animation with coordinated timing:
        - On expand: size increases immediately, no opacity animation (animateOpacity={false})
        - On collapse: waits STAGGER_EXIT_DELAY (250ms) for stagger items to exit, then contracts
      */}
      <Collapse
        visible={expanded}
        duration={COLLAPSE_DURATION}
        easing={motionTokens.curveEasyEase}
        outSize={COLLAPSED_HEIGHT}
        animateOpacity={false}
        exitDelay={STAGGER_EXIT_DELAY}
      >
        <div className={classes.listContainer}>
          <div className={classes.list}>
            {/* Always visible items */}
            {staticItems.map(item => (
              <div key={item.id} className={classes.item}>
                <Persona
                  name={item.name}
                  secondaryText={item.secondaryText}
                  presence={{ status: item.status }}
                  avatar={avatarFor(item.useImage, item.image)}
                />
              </div>
            ))}

            {/*
              Stagger manages the choreographed animation of additional items:
              - Each Slide has delay={COLLAPSE_EXPAND_DELAY} to wait for container expansion
              - Items stagger in/out with STAGGER_ITEM_DELAY (100ms) between each
              - On exit, items animate out immediately (no delay on exit)
            */}
            <Stagger
              visible={staggerVisible}
              itemDelay={isDraggingSlider ? 0 : STAGGER_ITEM_DELAY}
              reversed={!staggerVisible}
            >
              {staggerItems.map(item => (
                <Slide key={item.id} delay={COLLAPSE_EXPAND_DELAY}>
                  <div className={classes.item}>
                    <Persona
                      name={item.name}
                      secondaryText={item.secondaryText}
                      presence={{ status: item.status }}
                      avatar={avatarFor(item.useImage, item.image)}
                    />
                  </div>
                </Slide>
              ))}
            </Stagger>
          </div>
        </div>
      </Collapse>

      <div className={classes.controls}>
        <Button onClick={handleToggle} appearance="primary">
          {expanded ? 'See less' : 'See more'}
        </Button>
      </div>
    </div>
  );
};

ExpandableContainer.parameters = {
  docs: {
    description: {
      story: StaggerExpandableContainerDescription,
    },
  },
};
