The `delayMode` prop controls how `Stagger` implements the timing of staggered animations.

`Stagger` automatically detects the best `delayMode` for your content, choosing the most performant option when possible.

## Delay Mode Options

### `delayProp` (Auto-detected for motion components)

Passes `delay` and `exitDelay` props directly to motion components, letting them use their native Web Animations API delays.

**When auto-detected:**

- All children are motion components that support delay props
- Presence components like `Fade`, `Scale`, `Slide`
- Custom motion components built with `createMotionComponent`

**Benefits:**

- **Best performance** - Uses native Web Animations API
- **Smooth animations** - Browser-optimized timing
- **Better synchronization** - All delays managed by the browser
- **Lower CPU usage** - No JavaScript timing loops

**Behavior:**

- `delay` prop set for enter animations
- `exitDelay` prop set for exit animations
- Motion components handle their own timing
- More reliable timing, especially on slower devices

### `timing` (Auto-detected fallback)

JavaScript-based timing control that manages visibility over time using `setTimeout` and intervals.

**When auto-detected:**

- Children are DOM elements without delay prop support
- Mixed content where some components don't support delay props
- Custom components that don't implement delay props

**Benefits:**

- **Universal compatibility** - Works with any content
- **Flexible control** - Can work with any visibility strategy
- **Predictable fallback** - Always works regardless of component capabilities

**Behavior:**

- JavaScript manages the timing of each item's visibility
- Uses `itemDelay` and `itemDuration` props for calculations
- Falls back to visibility management (hideMode) for show/hide

## Performance Comparison

```tsx
// BEST: Auto-detected delayProp mode (60fps, native timing)
<Stagger visible={isVisible} itemDelay={100}>
  <Fade><div>Item 1</div></Fade>
  <Scale><div>Item 2</div></Scale>
  <Slide><div>Item 3</div></Slide>
</Stagger>

// GOOD: Auto-detected timing mode (JavaScript timing)
<Stagger visible={isVisible} itemDelay={100}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stagger>
```

## When to Override Auto-Detection

### Force `timing` for mixed content

```tsx
// Ensure consistent behavior when mixing motion components and DOM elements
<Stagger visible={isVisible} delayMode="timing">
  <Fade>
    <div>Motion component</div>
  </Fade>
  <div>Plain element</div>
  <CustomComponent>Custom component</CustomComponent>
</Stagger>
```

### Force `delayProp` for custom components

```tsx
// Use delayProp mode if your custom components support delay props
<Stagger visible={isVisible} delayMode="delayProp">
  <CustomMotionComponent>Item 1</CustomMotionComponent>
  <CustomMotionComponent>Item 2</CustomMotionComponent>
</Stagger>
```

## Making Custom Components Support Delay Props

To make your custom motion components work with `delayProp` mode:

```tsx
// Custom component that supports delay props
const CustomMotionComponent = ({ delay, exitDelay, children, ...props }) => {
  return (
    <YourMotionLibraryComponent delay={delay} exitDelay={exitDelay} {...props}>
      {children}
    </YourMotionLibraryComponent>
  );
};

// Now Stagger can auto-detect delayProp mode
<Stagger visible={isVisible}>
  <CustomMotionComponent>Item 1</CustomMotionComponent>
  <CustomMotionComponent>Item 2</CustomMotionComponent>
</Stagger>;
```
