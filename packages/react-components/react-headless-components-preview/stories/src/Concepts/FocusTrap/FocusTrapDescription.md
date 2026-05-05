`useFocusTrap` keeps keyboard focus inside a single element while the trap is active.

When the trap activates, focus moves to the first descendant matching `[data-autofocus]`, falling back to the first tabbable descendant, then any focusable descendant, and finally the trap node itself. While active, **Tab** and **Shift+Tab** cycle focus between the first and last tabbable descendants — the user cannot Tab out.

```tsx
import { useFocusTrap } from '@fluentui/react-headless-components-preview/focus';

const Panel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const ref = useFocusTrap(open);
  if (!open) return null;
  return (
    <div ref={ref} role="dialog">
      <button>Action</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

The example below opens an inline panel and traps focus inside it. Open the panel, then press **Tab** repeatedly: focus stays in the panel, cycling between the buttons. Press **Shift+Tab** from the first button to wrap to the last. Click **Close** to release the trap.
