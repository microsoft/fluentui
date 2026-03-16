- A fade variant can be created with the factory function `createFadePresence()`, then converting the result to a React component using `createPresenceComponent()`:

```tsx
import { motionTokens } from '@fluentui/react-components';

const CustomFadeVariant = createPresenceComponentVariant(Fade, {
  duration: motionTokens.durationSlower,
  exitDuration: motionTokens.durationFast,
});

const CustomFade = ({ visible }) => (
  <CustomFadeVariant unmountOnExit visible={visible}>
    {/* Content */}
  </CustomFadeVariant>
);
```
