Use `createStaggerPresenceComponent` to stagger enter and exit motion atoms across a container's children under a single presence component and `AnimationHandle` — no per-item wrapper components required.

```tsx
import {
  createStaggerPresenceComponent,
  fadeIn,
  fadeOut,
  slideIn,
  slideOut,
} from '@fluentui/react-motion-components-preview';

const StaggeredSlide = createStaggerPresenceComponent({
  enter: [fadeIn({ duration: 200 }), slideIn({ from: { y: '20px' }, duration: 200 })],
  exit: [fadeOut({ duration: 200 }), slideOut({ to: { y: '20px' }, duration: 200 })],
});

<StaggeredSlide visible={isVisible}>
  <div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</StaggeredSlide>;
```
