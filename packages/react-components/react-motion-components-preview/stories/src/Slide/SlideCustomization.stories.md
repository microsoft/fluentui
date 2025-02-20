- The predefined fade transition can be disabled by setting `animateOpacity` to `false`.
- A scale variant can be created with the factory function `createSlidePresence()`, then converting the result to a React component using `createPresenceComponent()`:

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';
import { createSlidePresence } from '@fluentui/react-motion-components-preview';

const CustomSlideVariant = createPresenceComponent(
  createSlidePresence({
    enterDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveEasyEaseMax,
    exitDuration: motionTokens.durationNormal,
    exitEasing: motionTokens.curveEasyEaseMax,
  }),
);

const CustomSlide = ({ visible }) => (
  <CustomSlideVariant animateOpacity={false} unmountOnExit visible={visible}>
    {/* Content */}
  </CustomSlideVariant>
);
```
