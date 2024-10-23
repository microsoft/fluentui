- A fade variant can be created with the factory function `createFadePresence()`, then converting the result to a React component using `createPresenceComponent()`:

```tsx
import { motionTokens } from '@fluentui/react-components';

const CustomFadeVariant = createPresenceComponent(
  createFadePresence({
    enterDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveEasyEaseMax,
    exitDuration: motionTokens.durationNormal,
  }),
);

const CustomFade = ({ visible }) => (
  <CustomFadeVariant unmountOnExit visible={visible}>
    {/* Content */}
  </CustomFadeVariant>
);
```
