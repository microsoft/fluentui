The `hideMode` prop controls how `Stagger` manages the visibility of its children during animations.

`Stagger` automatically detects the best `hideMode` for your content, but you can override this when needed for specific behaviors or performance requirements.

## Hide Mode Options

### `visibleProp` (Auto-detected for presence components)

Children are motion components that support a `visible` prop. This is the most performant option for presence components.

**When auto-detected:**

- All children are presence components like `Fade`, `Scale`, `Slide`
- Components have built-in `visible` prop support

**Behavior:**

- Components remain mounted in the DOM at all times
- Visibility is controlled via the component's `visible` prop
- Layout space is preserved during animations
- Uses the component's built-in show/hide animations

### `visibilityStyle` (Auto-detected for DOM elements)

Children remain in the DOM with CSS `visibility: hidden/visible` applied as an inline style.

**When auto-detected:**

- Children are plain DOM elements or components without `visible` prop support
- Used as fallback for bidirectional staggers (`<Stagger visible={...}>`)

**Behavior:**

- Elements remain mounted in the DOM
- Layout space is preserved (elements are hidden but still take up space)
- Instant show/hide without custom animations
- Good for maintaining stable layouts

### `unmount` (Auto-detected for one-way staggers)

Children are completely added to or removed from the DOM based on visibility.

**When auto-detected:**

- One-way staggers like `<Stagger.In>` or `<Stagger.Out>`
- When you want layout reflow as items appear/disappear

**Behavior:**

- Elements are mounted/unmounted from the DOM
- Layout reflows as items are added/removed
- Can trigger CSS animations on mount/unmount
- Most dramatic visual effect

## When to Override Auto-Detection

### Force `unmount` for layout reflow

```tsx
// Make items affect layout as they appear, even in bidirectional stagger
<Stagger visible={isVisible} hideMode="unmount">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Stagger>
```

### Force `visibilityStyle` for stable layout

```tsx
// Prevent layout shift in one-way staggers
<Stagger.In hideMode="visibilityStyle">
  <MenuItem>Item 1</MenuItem>
  <MenuItem>Item 2</MenuItem>
</Stagger.In>
```

### Force `visibleProp` for custom components

```tsx
// Use visible prop on custom components that support it
<Stagger visible={isVisible} hideMode="visibleProp">
  <CustomPresenceComponent>Item 1</CustomPresenceComponent>
  <CustomPresenceComponent>Item 2</CustomPresenceComponent>
</Stagger>
```
