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
