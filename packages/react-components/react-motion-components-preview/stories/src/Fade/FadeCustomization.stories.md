Create a fade variant with `createPresenceComponentVariant(Fade, ...)`, passing parameters to override the `Fade` defaults:

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';
import { Fade } from '@fluentui/react-motion-components-preview';

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
