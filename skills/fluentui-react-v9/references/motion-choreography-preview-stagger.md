# Motion/Choreography (preview)/Stagger

> **⚠️ Preview components are considered unstable**

`Stagger` wraps child elements to create a ripple of enter or exit transitions.

- With presence motion components like `Fade` and `Slide`, `Stagger` triggers their animations.
- With plain HTML elements, `Stagger` does a simple show and hide in sequence.

## Examples

### Bouncing Dots

A waiting animation using `Stagger.In` on dots, with control over bounce duration and delay between dots.

```tsx
import * as React from 'react';

import {
  makeStyles,
  tokens,
  motionTokens,
  createMotionComponent,
  Slider,
  Label,
  JSXElement,
} from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  controlsRow: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    minWidth: '200px',
  },
  spinnerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  spinnerTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '120px',
    padding: tokens.spacingHorizontalL,
  },
  bouncingDotsSpinner: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'center',
  },
  bouncingDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandBackground,
  },
});

const BounceMotion = createMotionComponent<{
  delay?: number;
  duration?: number;
}>(({ delay = 0, duration = 2000 }) => ({
  keyframes: [
    { transform: 'translateY(0px)', easing: motionTokens.curveEasyEase },
    {
      offset: 0.1,
      transform: 'translateY(10px)',
      easing: motionTokens.curveEasyEaseMax,
    },
    {
      offset: 0.4,
      transform: 'translateY(-30px)',
      easing: motionTokens.curveAccelerateMid,
    },
    {
      offset: 0.6,
      transform: 'translateY(0px)',
      easing: motionTokens.curveDecelerateMid,
    },
    {
      offset: 0.61,
      transform: 'translateY(-10px)',
      easing: motionTokens.curveAccelerateMid,
    },
    {
      offset: 0.62,
      transform: 'translateY(0px)',
      easing: motionTokens.curveDecelerateMid,
    },
    {
      offset: 0.63,
      transform: 'translateY(-5px)',
      easing: motionTokens.curveAccelerateMid,
    },
    { offset: 0.64, transform: 'translateY(0px)' },
    { transform: 'translateY(0px)' },
  ],

  duration,
  delay,
  iterations: Infinity,
}));

export const BouncingDots = (): JSXElement => {
  const classes = useClasses();
  const [animationKey, setAnimationKey] = React.useState<number>(0);

  // Bouncing Dots controls
  const [bounceDuration, setBounceDuration] = React.useState<number>(2000);
  const [bounceItemDelay, setBounceItemDelay] = React.useState<number>(100);

  // Automatically restart animation when slider values change
  React.useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [bounceDuration, bounceItemDelay]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <div className={classes.controlsRow}>
          <div className={classes.controlGroup}>
            <Label>Bounce Duration: {bounceDuration}ms</Label>
            <Slider
              min={1000}
              max={5000}
              step={500}
              value={bounceDuration}
              onChange={(_ev, data) => setBounceDuration(data.value)}
            />
          </div>

          <div className={classes.controlGroup}>
            <Label>Item Delay: {bounceItemDelay}ms</Label>
            <Slider
              min={10}
              max={200}
              step={10}
              value={bounceItemDelay}
              onChange={(_ev, data) => setBounceItemDelay(data.value)}
            />
          </div>
        </div>
      </div>

      {/* Bouncing Dots Spinner */}
      <div className={classes.spinnerSection}>
        <h3 className={classes.spinnerTitle}>Bouncing Dots Spinner</h3>
        <div className={classes.spinnerContainer}>
          <div className={classes.bouncingDotsSpinner}>
            <Stagger.In itemDelay={bounceItemDelay} key={`bounce-${animationKey}`}>
              {Array.from({ length: 5 }, (_, i) => (
                <BounceMotion key={i} duration={bounceDuration}>
                  <div className={classes.bouncingDot} />
                </BounceMotion>
              ))}
            </Stagger.In>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Delay Mode

delayMode — how Stagger schedules per-item timing. Stagger picks a reasonable default; only override to change performance or compatibility.

Quick summary

- delayProp: Best when children are motion components that accept `delay`/`exitDelay` (native/browser timing, best performance).
- timing: JS-driven timing (setTimeout-based). Works for plain DOM or mixed content but is less performant.

When to override

- Use `delayProp` when all children support native delay props for smoother, browser-driven timing.
- Use `timing` when children are plain DOM nodes or you mix components that don't accept delay props.

Examples

```tsx
// best performance when using motion components
<Stagger visible={isVisible} itemDelay={80} delayMode="delayProp">...</Stagger>

// fallback for plain elements or mixed content
<Stagger visible={isVisible} itemDelay={80} delayMode="timing">...</Stagger>
```

```tsx
import * as React from 'react';

import { makeStyles, tokens, Button, Avatar, Checkbox, motionTokens, JSXElement } from '@fluentui/react-components';
import { Scale, Stagger } from '@fluentui/react-motion-components-preview';

const avatarData = [
  { initials: 'DR', color: 'dark-red', name: 'darkRed avatar' },
  { initials: 'CR', color: 'cranberry', name: 'cranberry avatar' },
  { initials: 'RE', color: 'red', name: 'red avatar' },
  { initials: 'PU', color: 'pumpkin', name: 'pumpkin avatar' },
  { initials: 'PE', color: 'peach', name: 'peach avatar' },
  { initials: 'MA', color: 'marigold', name: 'marigold avatar' },
] as const;

// Overshoots the end point, then settles back to it.
const curveOvershootFirmOut =
  'linear(0, 0.453 7.8%, 0.803 16.1%, 1.048 24.9%, 1.132 29.5%, 1.194 34.4%, 1.227 38.4%, 1.245 42.5%, 1.25 46.9%, 1.242 51.7%, 1.2 60.5%, 1.038 84.9%, 1.009 92.5%, 1)';

const renderAvatarsWithTransition = () => {
  return avatarData.map(avatar => (
    <Scale
      outScale={0}
      duration={600}
      exitDuration={300}
      easing={curveOvershootFirmOut}
      exitEasing={motionTokens.curveAccelerateMid}
      key={avatar.name}
    >
      <Avatar initials={avatar.initials} color={avatar.color} name={avatar.name} />
    </Scale>
  ));
};

const renderPlainAvatars = () => {
  return avatarData.map(avatar => (
    <div key={avatar.name} style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar initials={avatar.initials} color={avatar.color} name={avatar.name} />
    </div>
  ));
};

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
  },
  controls: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  comparison: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalXL,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  modeHeader: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalS,
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    minHeight: '80px',
    position: 'relative',
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  badge: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    borderRadius: tokens.borderRadiusSmall,
    position: 'absolute',
    top: tokens.spacingVerticalXS,
    right: tokens.spacingHorizontalXS,
  },
  // performanceBadge removed — keep layout simple and avoid collisions
});

export const DelayMode = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);
  const [reversed, setReversed] = React.useState(false);
  const itemDelay = 100;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={() => setVisible(!visible)} appearance="primary">
          {visible ? 'Hide' : 'Show'} Avatars
        </Button>
        <Checkbox checked={reversed} onChange={(_, data) => setReversed(data.checked === true)} label="Reversed" />
      </div>

      <div className={classes.comparison}>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>delayProp (Motion Components)</div>
          <div className={classes.items}>
            <Stagger visible={visible} delayMode="delayProp" itemDelay={itemDelay} reversed={reversed}>
              {renderAvatarsWithTransition()}
            </Stagger>
          </div>
          <div className={classes.description}>
            Native component delay props — browser-driven timing (best performance).
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>timing (JavaScript Control)</div>
          <div className={classes.items}>
            <div className={classes.badge}>Auto-detected</div>
            <Stagger visible={visible} delayMode="timing" itemDelay={itemDelay} reversed={reversed}>
              {renderPlainAvatars()}
            </Stagger>
          </div>
          <div className={classes.description}>JavaScript-managed timing (works for plain DOM or mixed content).</div>
        </div>
      </div>
    </div>
  );
};
```

### Expandable Container

A list expands and collapses with a Stagger as the container height changes.

```tsx
import * as React from 'react';

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
  {
    name: 'Sarah Chen',
    status: 'busy' as const,
    useImage: false,
    secondaryText: 'In a meeting',
  },
  {
    name: 'Jessica Brown',
    image: 'persona-female.png',
    status: 'busy' as const,
    useImage: true,
    secondaryText: 'Do not disturb',
  },
  {
    name: 'Emily Johnson',
    status: 'available' as const,
    useImage: false,
    secondaryText: 'Available',
  },
  {
    name: 'David Kim',
    status: 'offline' as const,
    useImage: false,
    secondaryText: 'Offline',
  },
  {
    name: 'Michael Rodriguez',
    image: 'persona-male.png',
    status: 'away' as const,
    useImage: true,
    secondaryText: 'Away',
  },
  {
    name: 'Alex Thompson',
    status: 'available' as const,
    useImage: false,
    secondaryText: 'Available',
  },
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
                <Slide key={item.id} delay={COLLAPSE_EXPAND_DELAY} outY="20px">
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
```

### Hide Mode

hideMode — how Stagger shows/hides children. Stagger auto-selects a sensible default; override only when you need different layout or animation behavior.

Quick summary

- visibleProp: Best for motion components that accept a visible prop (preserves mount + layout, uses component animations).
- visibilityStyle: Keeps elements mounted but toggles CSS visibility (preserves layout, minimal visual change).
- unmount: Mounts/unmounts children (causes layout reflow, useful for one-way lists).

When to override

- Choose `unmount` when items must affect layout on enter/exit.
- Choose `visibilityStyle` when you need stable layout without remounts.
- Choose `visibleProp` for custom motion components that can animate via a visible prop.

Examples

```tsx
// layout reflow
<Stagger visible={isVisible} hideMode="unmount">...</Stagger>

// stable layout
<Stagger.In hideMode="visibilityStyle">...</Stagger.In>

// use component-level visibility
<Stagger hideMode="visibleProp">...</Stagger>
```

```tsx
import * as React from 'react';

import { makeStyles, tokens, Button, Avatar, Checkbox, motionTokens, JSXElement } from '@fluentui/react-components';
import { Scale, Stagger } from '@fluentui/react-motion-components-preview';

const avatarData = [
  { initials: 'DR', color: 'dark-red', name: 'darkRed avatar' },
  { initials: 'CR', color: 'cranberry', name: 'cranberry avatar' },
  { initials: 'RE', color: 'red', name: 'red avatar' },
  { initials: 'PU', color: 'pumpkin', name: 'pumpkin avatar' },
  { initials: 'PE', color: 'peach', name: 'peach avatar' },
  { initials: 'MA', color: 'marigold', name: 'marigold avatar' },
] as const;

const renderAvatarsWithTransition = () => {
  return avatarData.map(avatar => (
    <Scale
      outScale={0}
      duration={600}
      exitDuration={300}
      easing={curveOvershootFirmOut}
      exitEasing={motionTokens.curveAccelerateMid}
      key={avatar.name}
    >
      <Avatar initials={avatar.initials} color={avatar.color} name={avatar.name} />
    </Scale>
  ));
};

const renderPlainAvatars = () => {
  return avatarData.map(avatar => (
    <div key={avatar.name} style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar initials={avatar.initials} color={avatar.color} name={avatar.name} />
    </div>
  ));
};

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
  },
  controls: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  comparison: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalXL,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    minHeight: '80px',
    position: 'relative',
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  badge: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    borderRadius: tokens.borderRadiusSmall,
    position: 'absolute',
    top: tokens.spacingVerticalXS,
    right: tokens.spacingHorizontalXS,
  },
});

// Overshoots the end point, then settles back to it.
const curveOvershootFirmOut =
  'linear(0, 0.453 7.8%, 0.803 16.1%, 1.048 24.9%, 1.132 29.5%, 1.194 34.4%, 1.227 38.4%, 1.245 42.5%, 1.25 46.9%, 1.242 51.7%, 1.2 60.5%, 1.038 84.9%, 1.009 92.5%, 1)';

export const HideMode = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);
  const [reversed, setReversed] = React.useState(false);
  const itemDelay = 100;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={() => setVisible(!visible)} appearance="primary">
          {visible ? 'Hide' : 'Show'} Avatars
        </Button>
        <Checkbox checked={reversed} onChange={(_, data) => setReversed(data.checked === true)} label="Reversed" />
      </div>

      <div className={classes.comparison}>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>visibleProp</div>
          <div className={classes.items}>
            <div className={classes.badge}>Auto-detected</div>
            <Stagger visible={visible} hideMode="visibleProp" itemDelay={itemDelay} reversed={reversed}>
              {renderAvatarsWithTransition()}
            </Stagger>
          </div>
          <div className={classes.description}>Preserves mount & layout; uses component-level animations.</div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>visibilityStyle</div>
          <div className={classes.items}>
            <div className={classes.badge}>Override</div>
            <Stagger visible={visible} hideMode="visibilityStyle" itemDelay={itemDelay} reversed={reversed}>
              {renderPlainAvatars()}
            </Stagger>
          </div>
          <div className={classes.description}>
            Keeps elements mounted and toggles CSS visibility to preserve layout.
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>unmount</div>
          <div className={classes.items}>
            <div className={classes.badge}>Override</div>
            <Stagger visible={visible} hideMode="unmount" itemDelay={itemDelay} reversed={reversed}>
              {renderPlainAvatars()}
            </Stagger>
          </div>
          <div className={classes.description}>Mounts/unmounts children so items affect layout on enter/exit.</div>
        </div>
      </div>
    </div>
  );
};
```

### Item Delay

The `itemDelay` prop controls the timing between each item's animation start.

```tsx
import * as React from 'react';

import { Field, makeStyles, tokens, Button, Label, Slider, JSXElement } from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    gap: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    minWidth: '300px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundInverted,
    width: '40px',
    height: '100px',
    margin: tokens.spacingHorizontalXXS,
  },
});

export const ItemDelay = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [itemDelay, setItemDelay] = React.useState<number>(25);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>

        <div className={classes.sliderField}>
          <Label weight="semibold">Item Delay: {itemDelay}ms</Label>
          <Slider min={0} max={200} step={25} value={itemDelay} onChange={(_, data) => setItemDelay(data.value)} />
        </div>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible} itemDelay={itemDelay}>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 8 }, (_, i) => (
            <Slide key={`stagger-item-${i}`} outY="20px">
              {/* Outer div protects the inner div from Slide's opacity animation */}
              <div>
                <div className={classes.item} style={{ opacity: 1 - 0.1 * i }}>
                  {i + 1}
                </div>
              </div>
            </Slide>
          ))}
        </Stagger>
      </div>
    </div>
  );
};
```

### Plain Elements

By default, `Stagger` will hide regular elements using a `visibility: hidden` style, to preserve their layout.

```tsx
<Stagger visible={isVisible}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Stagger>
```

```tsx
import * as React from 'react';

import { Field, makeStyles, tokens, Button, JSXElement } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundInverted,
    width: '40px',
    height: '100px',
    margin: tokens.spacingHorizontalXXS,
  },
});

export const PlainElements = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible}>
          {/* Create a list of plain divs */}
          {Array.from({ length: 8 }, (_, i) => (
            <div className={classes.item} style={{ opacity: 1 - 0.1 * i }} key={`stagger-item-${i}`}>
              {i + 1}
            </div>
          ))}
        </Stagger>
      </div>
    </div>
  );
};
```

### Presence

When `Stagger` wraps presence motion components, it triggers their animations in sequence.
It has a `visible` prop to toggle between enter and exit transitions, so `Stagger` behaves like a presence component itself.

```tsx
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

<Stagger visible={isVisible}>
  <Slide>{/* item 1 */}</Slide>
  <Slide>{/* item 2 */}</Slide>
  <Slide>{/* item 3 */}</Slide>
  // etc.
</Stagger>;
```

```tsx
import * as React from 'react';

import { Field, makeStyles, tokens, Button, JSXElement } from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundInverted,
    width: '40px',
    height: '100px',
    margin: tokens.spacingHorizontalXXS,
  },
});

export const Presence = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible}>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 8 }, (_, i) => (
            <Slide key={`stagger-item-${i}`} outY="20px">
              {/* Outer div protects the inner div from Slide's opacity animation */}
              <div>
                <div className={classes.item} style={{ opacity: 1 - 0.1 * i }}>
                  {i + 1}
                </div>
              </div>
            </Slide>
          ))}
        </Stagger>
      </div>
    </div>
  );
};
```

### Reversed

The `reversed` prop animates the stagger from the last item to the first.

```tsx
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

<Stagger visible={isVisible} reversed>
  <Slide>{/* item 1 */}</Slide>
  <Slide>{/* item 2 */}</Slide>
  <Slide>{/* item 3 */}</Slide>
  // etc.
</Stagger>;
```

```tsx
import * as React from 'react';

import { Field, makeStyles, tokens, Button, JSXElement } from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundInverted,
    width: '40px',
    height: '100px',
    margin: tokens.spacingHorizontalXXS,
  },
});

export const Reversed = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible} reversed>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 8 }, (_, i) => (
            <Slide key={`stagger-item-${i}`} outY="20px">
              {/* Outer div protects the inner div from Slide's opacity animation */}
              <div>
                <div className={classes.item} style={{ opacity: 1 - 0.1 * i }}>
                  {i + 1}
                </div>
              </div>
            </Slide>
          ))}
        </Stagger>
      </div>
    </div>
  );
};
```

### Stagger In

Use `Stagger.In` to animate a one-way enter transition.

```tsx
import { Stagger, Collapse } from '@fluentui/react-motion-components-preview';

<Stagger.In>
  <Collapse.In>{/* item 1 */}</Collapse.In>
  <Collapse.In>{/* item 2 */}</Collapse.In>
  // etc.
</Stagger.In>;
```

```tsx
import * as React from 'react';

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  PresenceBadgeStatus,
  Text,
  makeStyles,
  motionTokens,
  tokens,
  JSXElement,
} from '@fluentui/react-components';
import { Stagger, CollapseRelaxed } from '@fluentui/react-motion-components-preview';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '600px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  userCard: {
    width: '100%',
    marginBottom: '4px',
  },
  cardHeader: {
    paddingBottom: '8px',
  },
  cardContent: {
    padding: '0 16px 16px 16px',
  },
  ctaButton: {
    minWidth: '120px',
  },
});

// Sample user data
const users = [
  {
    name: 'Sarah Chen',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
    status: 'available',
    post: "Just finished redesigning our mobile app! Really excited about the new user experience we've created. The research phase took months but it was so worth it.",
    time: '2 hours ago',
  },
  {
    name: 'Marcus Johnson',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
    status: 'busy',
    post: "Working on some exciting new features for our component library. Can't wait to share more details soon! 🚀",
    time: '4 hours ago',
  },
  {
    name: 'Emily Rodriguez',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg',
    status: 'away',
    post: "Great team meeting today! We're making excellent progress on the Q4 roadmap. Special thanks to everyone who contributed ideas.",
    time: '6 hours ago',
  },
  {
    name: 'David Park',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    status: 'available',
    post: 'Fascinating findings from our latest user research study. Users are definitely trending towards more personalized experiences.',
    time: '8 hours ago',
  },
];

export const StaggerIn = (): JSXElement => {
  const classes = useClasses();
  const [animationKey, setAnimationKey] = React.useState<number>(0);

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button className={classes.ctaButton} appearance="primary" size="large" onClick={replayAnimation}>
          Replay Animation
        </Button>
      </div>

      <Stagger.In itemDelay={motionTokens.durationFast} key={animationKey}>
        {users.map((user, index) => (
          <CollapseRelaxed.In easing={motionTokens.curveDecelerateMin} key={index}>
            <Card className={classes.userCard}>
              <CardHeader
                className={classes.cardHeader}
                image={
                  <Avatar
                    name={user.name}
                    image={{ src: user.avatar }}
                    badge={{ status: user.status as PresenceBadgeStatus }}
                  />
                }
                header={
                  <div>
                    <Text weight="semibold">{user.name}</Text>
                    <Text
                      size={200}
                      style={{
                        color: tokens.colorNeutralForeground3,
                        marginLeft: tokens.spacingHorizontalS,
                      }}
                    >
                      {user.time}
                    </Text>
                  </div>
                }
                action={<Button appearance="subtle" icon={<MoreHorizontal20Regular />} size="small" />}
              />

              <div className={classes.cardContent}>
                <Text>{user.post}</Text>
              </div>
            </Card>
          </CollapseRelaxed.In>
        ))}
      </Stagger.In>
    </div>
  );
};
```

### Stagger Out

Use `Stagger.Out` to animate a one-way exit transition.

```tsx
import { Stagger, Collapse } from '@fluentui/react-motion-components-preview';

<Stagger.Out>
  <Collapse.Out>{/* item 1 */}</Collapse.Out>
  <Collapse.Out>{/* item 2 */}</Collapse.Out>
  // etc.
</Stagger.Out>;
```

```tsx
import * as React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  PresenceBadgeStatus,
  Text,
  makeStyles,
  motionTokens,
  tokens,
  JSXElement,
} from '@fluentui/react-components';
import { Stagger, Collapse } from '@fluentui/react-motion-components-preview';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '600px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  userCard: {
    width: '100%',
    marginBottom: '4px',
  },
  cardHeader: {
    paddingBottom: '8px',
  },
  cardContent: {
    padding: '0 16px 16px 16px',
  },
  ctaButton: {
    minWidth: '120px',
  },
});

// Reuse sample users from the In story file by duplicating data here to keep stories self-contained.
const users = [
  {
    name: 'Sarah Chen',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
    status: 'available',
    post: "Just finished redesigning our mobile app! Really excited about the new user experience we've created. The research phase took months but it was so worth it.",
    time: '2 hours ago',
  },
  {
    name: 'Marcus Johnson',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
    status: 'busy',
    post: "Working on some exciting new features for our component library. Can't wait to share more details soon! 🚀",
    time: '4 hours ago',
  },
  {
    name: 'Emily Rodriguez',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg',
    status: 'away',
    post: "Great team meeting today! We're making excellent progress on the Q4 roadmap. Special thanks to everyone who contributed ideas.",
    time: '6 hours ago',
  },
  {
    name: 'David Park',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    status: 'available',
    post: 'Fascinating findings from our latest user research study. Users are definitely trending towards more personalized experiences.',
    time: '8 hours ago',
  },
];

// Basic Out: items animate out when removed from the list
export const StaggerOut = (): JSXElement => {
  const classes = useClasses();
  const [items] = React.useState(users);
  const [animationKey, setAnimationKey] = React.useState<number>(0);

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button className={classes.ctaButton} appearance="primary" size="large" onClick={replayAnimation}>
          Replay Animation
        </Button>
      </div>

      <Stagger.Out key={animationKey} itemDelay={motionTokens.durationFast} reversed>
        {items.map((user, index) => (
          <Collapse.Out key={index} duration={motionTokens.durationUltraSlow} easing={motionTokens.curveDecelerateMin}>
            <Card className={classes.userCard}>
              <CardHeader
                className={classes.cardHeader}
                image={
                  <Avatar
                    name={user.name}
                    image={{ src: user.avatar }}
                    badge={{ status: user.status as PresenceBadgeStatus }}
                  />
                }
                header={
                  <div>
                    <Text weight="semibold">{user.name}</Text>
                    <Text
                      size={200}
                      style={{
                        color: tokens.colorNeutralForeground3,
                        marginLeft: tokens.spacingHorizontalS,
                      }}
                    >
                      {user.time}
                    </Text>
                  </div>
                }
                action={<Button appearance="subtle" icon={<MoreHorizontal20Regular />} size="small" />}
              />

              <div className={classes.cardContent}>
                <Text>{user.post}</Text>
              </div>
            </Card>
          </Collapse.Out>
        ))}
      </Stagger.Out>
    </div>
  );
};
```

### Stagger Spinners

```tsx
import * as React from 'react';
import { makeStyles, tokens, motionTokens, createMotionComponent, JSXElement } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  spinnerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  spinnerTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '120px',
    padding: tokens.spacingHorizontalL,
  },

  // Grid to arrange spinner sections responsively
  // Use 1 column by default and switch to 2 columns at a reasonable breakpoint
  spinnerGrid: {
    display: 'grid',
    gap: tokens.spacingHorizontalL,
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    '@media (min-width: 640px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },

  // Circular spinners
  arcSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '80px',
    height: '80px',
  },
  arc: {
    position: 'absolute',
    borderRadius: '50%',
    borderTopColor: tokens.colorBrandBackground,
    borderBottomColor: tokens.colorBrandBackground,
  },
  arc1: {
    width: '60px',
    height: '60px',
    border: '4px solid transparent',
  },
  arc2: {
    width: '45px',
    height: '45px',
    border: '4px solid transparent',
    borderTopColor: tokens.colorBrandBackground,
  },
  arc3: {
    width: '30px',
    height: '30px',
    border: '4px solid transparent',
    borderTopColor: tokens.colorBrandBackground,
  },

  dotOrbitSpinner: {
    position: 'relative',
    width: '120px', // adjusted to be consistent with other spinners
    height: '120px',
    display: 'inline-block',
  },
  orbitDot: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandBackground,
    // place dot at center then push it outwards on the X axis to set orbit radius
    // translate(-50%, -50%) keeps the dot centered on its own center
    transform: 'translate(-50%, -50%) translateY(-22px)',
    transformOrigin: 'center center',
    willChange: 'transform',
  },

  // Linear spinners
  growingBarsSpinner: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'end',
    height: '40px',
  },
  growingBar: {
    width: '6px',
    height: '100%',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
  },

  slidingBlocksSpinner: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    alignItems: 'center',
  },
  slidingBlock: {
    width: '16px',
    height: '16px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
  },
});

// Motion components for stagger spinners
// NOTE: the delay prop needs to be explicitly defined for each custom motion component

const OrbitRotateMotion = createMotionComponent<{
  duration?: number;
  easing?: string;
  delay?: number;
}>(({ duration = motionTokens.durationUltraSlow * 8, easing = motionTokens.curveEasyEase, delay = 0 }) => {
  const finalOffset = 0.8;
  const finalAngle = '740deg';
  return [
    // rotation atom
    {
      keyframes: [
        { offset: 0, rotate: '0deg', easing },
        { offset: finalOffset, rotate: finalAngle },
        { offset: 1, rotate: finalAngle },
      ],

      duration,
      delay,
      iterations: Infinity,
    },
    // opacity atom
    {
      keyframes: [
        { offset: 0, opacity: 0, easing: motionTokens.curveEasyEase },
        { offset: 0.4, opacity: 1, easing: motionTokens.curveEasyEase },
        { offset: finalOffset, opacity: 0 },
        { offset: 1, opacity: 0 },
      ],

      duration,
      delay,
      fill: 'both',
      iterations: Infinity,
    },
  ];
});

const BarsScaleMotion = createMotionComponent<{
  duration?: number;
  easing?: string;
  delay?: number;
}>(({ duration = motionTokens.durationUltraSlow * 2, easing = motionTokens.curveEasyEase, delay = 0 }) => [
  {
    keyframes: [{ scale: '1 0.25', easing }, { scale: '1 1', easing }, { scale: '1 0.25' }],
    duration,
    delay,
    fill: 'both',
    iterations: Infinity,
  },
  // opacity atom oscillating at a different rate
  {
    keyframes: [
      { offset: 0, opacity: 1, easing: motionTokens.curveAccelerateMin },
      { offset: 0.15, opacity: 0.5 },
      { offset: 0.4, opacity: 0.5, easing: motionTokens.curveDecelerateMin },
      { offset: 0.6, opacity: 1 },
    ],

    duration: duration * 3,
    delay,
    fill: 'both',
    iterations: Infinity,
  },
]);

const ArcsSpinMotion = createMotionComponent<{
  duration?: number;
  spins?: number;
  delay?: number;
}>(({ duration = 4000, spins = 2, delay = 0 }) => [
  {
    keyframes: [
      { offset: 0, easing: motionTokens.curveEasyEase },
      { offset: 0.2, rotate: `-60deg`, easing: motionTokens.curveEasyEase },
      { offset: 0.9, rotate: `${360 * spins}deg` },
      { offset: 1, rotate: `${360 * spins}deg` },
    ],

    duration,
    delay,
    iterations: Infinity,
  },
]);

const BlocksSlideMotion = createMotionComponent<{ delay?: number }>(({ delay = 0 }) => [
  // horizontal slide atom
  {
    keyframes: [
      { offset: 0, translate: '0px', easing: motionTokens.curveEasyEase },
      {
        offset: 0.5,
        translate: '-30px',
        easing: motionTokens.curveEasyEaseMax,
      },
      { offset: 0.85, translate: '0px' },
      { offset: 1, translate: '0px' },
    ],

    duration: 2000,
    delay,
    iterations: Infinity,
  },
  // opacity atom
  {
    keyframes: [
      { offset: 0.5, opacity: 0.5, easing: motionTokens.curveEasyEaseMax },
      { offset: 0.65, opacity: 0.5 },
      { offset: 0.66, opacity: 1 },
    ],

    duration: 2000,
    delay,
    iterations: Infinity,
  },
]);

export const StaggerSpinners = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.spinnerGrid}>
        {/* Orbit Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Orbit</h3>
          <div className={classes.spinnerContainer}>
            <div className={classes.dotOrbitSpinner}>
              <Stagger.In itemDelay={motionTokens.durationFaster}>
                {Array.from({ length: 6 }, (_, i) => (
                  <OrbitRotateMotion key={i}>
                    <div className={classes.orbitDot} data-index={i} />
                  </OrbitRotateMotion>
                ))}
              </Stagger.In>
            </div>
          </div>
        </div>

        {/* Bars Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Bars</h3>
          <div className={classes.spinnerContainer}>
            <div className={classes.growingBarsSpinner}>
              <Stagger.In itemDelay={motionTokens.durationUltraFast * 2}>
                {Array.from({ length: 7 }, (_, i) => (
                  <BarsScaleMotion key={i}>
                    <div className={classes.growingBar} />
                  </BarsScaleMotion>
                ))}
              </Stagger.In>
            </div>
          </div>
        </div>

        {/* Arcs Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Arcs</h3>
          <div className={classes.spinnerContainer}>
            <div className={classes.arcSpinner}>
              <Stagger.In itemDelay={80}>
                <ArcsSpinMotion key="1">
                  <div className={`${classes.arc} ${classes.arc3}`} />
                </ArcsSpinMotion>
                <ArcsSpinMotion key="2">
                  <div className={`${classes.arc} ${classes.arc2}`} />
                </ArcsSpinMotion>
                <ArcsSpinMotion key="3">
                  <div className={`${classes.arc} ${classes.arc1}`} />
                </ArcsSpinMotion>
              </Stagger.In>
            </div>
          </div>
        </div>

        {/* Blocks Spinner */}
        <div className={classes.spinnerSection}>
          <h3 className={classes.spinnerTitle}>Blocks</h3>
          <div className={classes.spinnerContainer}>
            <div className={classes.slidingBlocksSpinner}>
              <Stagger.In itemDelay={motionTokens.durationFaster}>
                {Array.from({ length: 5 }, (_, i) => (
                  <BlocksSlideMotion key={i}>
                    <div className={classes.slidingBlock} />
                  </BlocksSlideMotion>
                ))}
              </Stagger.In>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Text

Here `Stagger` is used with the `Scale` motion component to mimic the opening titles from Superman (1978).

```tsx
import * as React from 'react';

import { Field, makeStyles, tokens, Button, motionTokens, JSXElement } from '@fluentui/react-components';
import { Stagger, Scale } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
    overflow: 'hidden',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  items: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '50px',
  },
  item: {
    position: 'absolute',

    fontWeight: 'bold',
    fontSize: '100px',
    color: 'transparent',
    margin: tokens.spacingHorizontalXXS,
    // Prefer a CSS variable if available, fallback to the token value.
    // If your theme exposes a CSS var like --tokens-colorBrandStroke2 you can
    // control it there; otherwise the token is used.
    WebkitTextStroke: `4px var(--tokens-colorBrandStroke2, ${tokens.colorBrandStroke2})`,
    WebkitFilter: 'blur(1.2px)',
    filter: 'blur(1.2px)',
  },
});

export const Text = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const outScale = visible ? 3 : 0;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible} itemDelay={100}>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 4 }, (_, i) => (
            <Scale
              outScale={outScale}
              duration={1200}
              exitDuration={1200}
              easing={motionTokens.curveDecelerateMax}
              exitEasing={motionTokens.curveAccelerateMid}
              key={`stagger-item-${i}`}
              unmountOnExit
              appear
            >
              <div className={classes.item}>STAGGER</div>
            </Scale>
          ))}
        </Stagger>
      </div>
    </div>
  );
};
```
