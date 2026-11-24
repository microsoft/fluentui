import * as React from 'react';
import StaggerExpandableContainerDescription from './StaggerExpandableContainer.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  tokens,
  Button,
  motionTokens,
  Persona,
  Slider,
  Label,
  type PersonaProps,
} from '@fluentui/react-components';
import {
  createChoreographyPresenceComponent,
  fadeIn,
  fadeOut,
  layer,
  sequence,
  slideIn,
  slideOut,
  stagger,
} from '@fluentui/react-motion-components-preview';

// Timing constants for coordinated container expansion + staggered items choreography:
const COLLAPSE_EXPAND_DELAY = 200;
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

const ExpandableListChoreography = createChoreographyPresenceComponent<{ startInterval?: number }>(
  ({ element, startInterval = STAGGER_ITEM_DELAY }) => {
    const fullHeight = `${element.scrollHeight}px`;

    return {
      enter: [
        {
          keyframes: [
            { maxHeight: COLLAPSED_HEIGHT, overflowY: 'hidden' },
            { maxHeight: fullHeight, offset: 0.9999, overflowY: 'hidden' },
            { maxHeight: 'unset', overflowY: 'unset' },
          ],
          duration: COLLAPSE_DURATION,
          easing: motionTokens.curveEasyEase,
          fill: 'both',
        },
        stagger(
          [
            layer(
              '[data-stagger-item]',
              [
                fadeIn({ duration: motionTokens.durationNormal, easing: motionTokens.curveDecelerateMid }),
                slideIn({
                  from: { y: '20px' },
                  duration: motionTokens.durationNormal,
                  easing: motionTokens.curveDecelerateMid,
                }),
              ],
              { delay: COLLAPSE_EXPAND_DELAY },
            ),
          ],
          { startInterval },
        ),
      ],
      exit: sequence([
        stagger(
          [
            layer('[data-stagger-item]', [
              fadeOut({ duration: motionTokens.durationFast, easing: motionTokens.curveAccelerateMid }),
              slideOut({
                to: { y: '20px' },
                duration: motionTokens.durationFast,
                easing: motionTokens.curveAccelerateMid,
              }),
            ]),
          ],
          { startInterval, order: 'reverse' },
        ),
        {
          keyframes: [
            { maxHeight: fullHeight, overflowY: 'hidden' },
            { maxHeight: COLLAPSED_HEIGHT, overflowY: 'hidden' },
          ],
          duration: COLLAPSE_DURATION,
          easing: motionTokens.curveEasyEase,
          fill: 'both',
          reducedMotion: { duration: 1, delay: 0 },
        },
      ]),
    };
  },
);

export const ExpandableContainer = (): JSXElement => {
  const classes = useClasses();
  const [expanded, setExpanded] = React.useState(false);
  const [totalItems, setTotalItems] = React.useState(8);

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
        />
      </div>

      {/* One choreography presence component coordinates both container height and staggered extra items */}
      <ExpandableListChoreography visible={expanded} startInterval={STAGGER_ITEM_DELAY}>
        <div className={classes.listContainer}>
          <div className={classes.list}>
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

            {staggerItems.map(item => (
              <div key={item.id} className={classes.item} data-stagger-item="">
                <Persona
                  name={item.name}
                  secondaryText={item.secondaryText}
                  presence={{ status: item.status }}
                  avatar={avatarFor(item.useImage, item.image)}
                />
              </div>
            ))}
          </div>
        </div>
      </ExpandableListChoreography>

      <div className={classes.controls}>
        <Button onClick={() => setExpanded(v => !v)} appearance="primary">
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
