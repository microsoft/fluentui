- The predefined fade transition can be disabled by setting `animateOpacity` to `false`.
- A scale variant can be created with the factory function `createScalePresence()`, then converting the result to a React component using `createPresenceComponent()`:

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';
import { createScalePresence } from '@fluentui/react-motion-components-preview';

const CustomScaleVariant = createPresenceComponent(
  createScalePresence({
    enterDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveEasyEaseMax,
    exitDuration: motionTokens.durationNormal,
    exitEasing: motionTokens.curveEasyEaseMax,
  }),
);

const CustomScale = ({ visible }) => (
  <CustomScaleVariant animateOpacity={false} unmountOnExit visible={visible}>
    {/* Content */}
  </CustomScaleVariant>
);
```
