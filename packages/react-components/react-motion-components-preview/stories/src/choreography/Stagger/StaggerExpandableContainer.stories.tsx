import * as React from 'react';
import StaggerExpandableContainerDescription from './StaggerExpandableContainer.stories.md';
import { makeStyles, tokens, Button, motionTokens, Persona, Slider, Label } from '@fluentui/react-components';
import { Stagger, Slide, Collapse } from '@fluentui/react-motion-components-preview';
const VISIBLE_ITEMS_COUNT = 3;
const COLLAPSE_EXPAND_DELAY = 200;
const STAGGER_EXIT_DELAY = 250;
const COLLAPSE_DURATION = 600;
const COLLAPSED_HEIGHT = '175px';
const ITEM_HEIGHT = '36px';
const STAGGER_ITEM_DELAY = 100;

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
    // padding: tokens.spacingVerticalL,
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
    // marginBottom: tokens.spacingVerticalM,
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
    // padding: tokens.spacingVerticalS,
    // backgroundColor: tokens.colorNeutralBackground2,
    // border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    minHeight: ITEM_HEIGHT,
    justifyContent: 'flex-start',
  },
});

export const ExpandableContainer = () => {
  const classes = useClasses();
  const [expanded, setExpanded] = React.useState(false);
  const [staggerVisible, setStaggerVisible] = React.useState(false);
  const [totalItems, setTotalItems] = React.useState(8);
  // const [isDraggingSlider, setIsDraggingSlider] = React.useState(false); // Commented out to test Option C fix

  const itemData = React.useMemo(
    () =>
      Array.from({ length: totalItems }, (_, index) => ({
        id: index + 1,
        ...personaData[index % personaData.length],
      })),
    [totalItems],
  );

  // Always show first 3 items (2 fully visible + 1 partially visible for affordance), additional items animate via Stagger
  const staticItems = itemData.slice(0, VISIBLE_ITEMS_COUNT);
  const staggerItems = itemData.slice(VISIBLE_ITEMS_COUNT);

  const handleToggle = () => {
    if (!expanded) {
      // "See more": First expand container via Collapse, then show items via Stagger
      setExpanded(true);
      setTimeout(() => {
        setStaggerVisible(true);
      }, COLLAPSE_EXPAND_DELAY); // Wait for Collapse expansion to start
    } else {
      // "See less": First hide extra items via Stagger (reversed), then contract container via Collapse
      setStaggerVisible(false);
      setTimeout(() => {
        setExpanded(false);
        // Don't set staggerVisible to true here since we want them hidden when collapsed
      }, STAGGER_EXIT_DELAY); // Wait for Stagger exit animation
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
          // Commented out dragging detection to test Option C fix
          // onMouseDown={() => setIsDraggingSlider(true)}
          // onMouseUp={() => setIsDraggingSlider(false)}
          // onTouchStart={() => setIsDraggingSlider(true)}
          // onTouchEnd={() => setIsDraggingSlider(false)}
        />
      </div>

      <Collapse
        visible={expanded}
        duration={COLLAPSE_DURATION}
        easing={motionTokens.curveEasyEase}
        fromSize={COLLAPSED_HEIGHT}
        animateOpacity={false}
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
                  avatar={
                    item.useImage
                      ? {
                          image: {
                            src: `https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/${item.image}`,
                          },
                        }
                      : { color: 'colorful' }
                  }
                />
              </div>
            ))}

            {/* Items that animate via Stagger */}
            <Stagger
              visible={staggerVisible}
              itemDelay={STAGGER_ITEM_DELAY} // Using normal delay to test Option C fix
              // itemDelay={isDraggingSlider ? 0 : STAGGER_ITEM_DELAY} // Commented out dragging logic
              reversed={!staggerVisible}
            >
              {staggerItems.map(item => (
                <Slide key={item.id}>
                  <div className={classes.item}>
                    <Persona
                      name={item.name}
                      secondaryText={item.secondaryText}
                      presence={{ status: item.status }}
                      avatar={
                        item.useImage
                          ? {
                              image: {
                                src: `https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/${item.image}`,
                              },
                            }
                          : { color: 'colorful' }
                      }
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
