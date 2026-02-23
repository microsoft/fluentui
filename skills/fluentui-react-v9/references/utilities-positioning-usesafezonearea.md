# Utilities/Positioning/useSafeZoneArea

# useSafeZoneArea

`useSafeZoneArea` is a hook that creates a "safe zone" area to improve user experience with nested popover interfaces like menus with submenus. It calculates and renders a V-shaped SVG polygon that temporarily traps the mouse cursor to prevent accidental dismissal of popovers when moving from a trigger to its associated content.

## How It Works

1. When a user hovers over the trigger element, an SVG with a triangular shape is rendered
2. This triangle creates a "safe zone" path between the trigger and the popover
3. As the user moves the cursor over the trigger, the triangle adjusts dynamically to match the cursor position
4. If the user moves directly from the trigger to the popover container, the safe zone is immediately hidden
5. If the user's cursor remains within the safe zone for longer than the specified timeout, the safe zone is also hidden

## Usage

```tsx
import { useSafeZoneArea } from '@fluentui/react-components';

function MyComponent() {
  const safeZoneArea = useSafeZoneArea({
    debug: false,
    timeout: 300,
    onSafeZoneLeave: () => {
      console.log('Safe zone left');
    },
    onSafeZoneEnter: () => {
      console.log('Safe zone entered');
    },
    onSafeZoneTimeout: () => {
      console.log('Safe zone timeout');
    },
  });

  return (
    <>
      <button ref={safeZoneArea.targetRef}>Open Menu</button>

      <Portal>
        <div ref={safeZoneArea.containerRef} style={{ position: 'absolute', top: 100, left: 100 }}>
          Menu Content
        </div>
        {/* 👇SVG element that renders the safe zone */}
        {safeZoneArea.elementToRender}
      </Portal>
    </>
  );
}
```

## Examples

### Default

```tsx
import {
  Field,
  Portal,
  Radio,
  RadioGroup,
  Switch,
  makeStyles,
  mergeClasses,
  type PositioningShorthandValue,
  resolvePositioningShorthand,
  tokens,
  useMergedRefs,
  usePositioning,
  useSafeZoneArea,
  type UseSafeZoneOptions,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    minHeight: '400px',
  },
  cardAbove: {
    justifyContent: 'end',
  },
  cardBelow: {
    justifyContent: 'start',
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase400,
    width: '300px',
    height: '300px',
    color: tokens.colorPaletteBerryForeground2,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorPaletteBerryBorderActive}`,
    backgroundColor: tokens.colorPaletteBerryBackground2,
  },
  target: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase400,
    width: '300px',
    height: '50px',
    color: tokens.colorPaletteBlueForeground2,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorPaletteBlueBorderActive}`,
    backgroundColor: tokens.colorPaletteBlueBackground2,
  },
  targetSmall: {
    fontSize: tokens.fontSizeBase100,
    width: '100px',
  },
  targetLarge: {
    width: '600px',
  },
});

export const UseSafeZoneAreaDefault = (props: UseSafeZoneOptions): JSXElement => {
  const classes = useClasses();

  const [debug, setDebug] = React.useState(true);
  const [includeOffset, setIncludeOffset] = React.useState(false);
  const [position, setPosition] = React.useState<NonNullable<PositioningShorthandValue>>('above');
  const [targetWidth, setTargetWidth] = React.useState<'small' | 'medium' | 'large'>('large');

  const safeZoneArea = useSafeZoneArea({
    debug: true,
    timeout: 100000,
  });
  const positioning = usePositioning({
    ...resolvePositioningShorthand(position),
    offset: includeOffset ? { mainAxis: 20 } : undefined,
    pinned: true,
  });

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <div>
          <Field>
            <Switch checked={debug} onChange={() => setDebug(!debug)} label="Debug mode" />
          </Field>
          <Field>
            <Switch
              checked={includeOffset}
              onChange={() => setIncludeOffset(!includeOffset)}
              label="Include offset in positioning"
            />
          </Field>

          <Field label="Target width">
            <RadioGroup
              layout="horizontal-stacked"
              value={targetWidth}
              onChange={(_, data) => setTargetWidth(data.value as 'small' | 'medium' | 'large')}
            >
              <Radio value="small" label="Small" />
              <Radio value="medium" label="Medium" />
              <Radio value="large" label="Large" />
            </RadioGroup>
          </Field>
        </div>

        <div>
          <Field label="Container position">
            <RadioGroup
              layout="horizontal-stacked"
              value={position}
              onChange={(_, data) => setPosition(data.value as PositioningShorthandValue)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
              }}
            >
              <Radio value="above-start" label="above-start" />
              <Radio value="above" label="above" />
              <Radio value="above-end" label="above-end" />

              <Radio value="before-top" label="before-top" />
              <div />
              <Radio value="after-top" label="after-top" />

              <Radio value="before" label="before" />
              <div />
              <Radio value="after" label="after" />

              <Radio value="before-bottom" label="before-bottom" />
              <div />
              <Radio value="after-bottom" label="after-bottom" />

              <Radio value="below-start" label="below-start" />
              <Radio value="below" label="below" />
              <Radio value="below-end" label="below-end" />
            </RadioGroup>
          </Field>
        </div>
      </div>

      <div
        className={mergeClasses(
          classes.card,
          (position.startsWith('above') || position.endsWith('bottom')) && classes.cardAbove,
          (position.startsWith('below') || position.endsWith('top')) && classes.cardBelow,
        )}
      >
        <div
          className={mergeClasses(
            classes.target,
            targetWidth === 'small' && classes.targetSmall,
            targetWidth === 'large' && classes.targetLarge,
          )}
          ref={useMergedRefs(safeZoneArea.targetRef, positioning.targetRef)}
        >
          A target element
        </div>
      </div>

      <Portal>
        <div className={classes.container} ref={useMergedRefs(safeZoneArea.containerRef, positioning.containerRef)}>
          A container element
        </div>

        {safeZoneArea.elementToRender}
      </Portal>
    </div>
  );
};
```
