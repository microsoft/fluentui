- `duration` and `easing` can be customized for each transition separately using `createPresenceComponentVariant()`.

```tsx
import { motionTokens, createPresenceComponent } from '@fluentui/react-components';
import { createFadePresence } from '@fluentui/react-motion-components-preview';

const CustomFadeVariant = createPresenceComponent(
  createFadePresence({
    enterDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveEasyEaseMax,
    exitDuration: motionTokens.durationNormal,
    exitEasing: motionTokens.curveEasyEaseMax,
  }),
);

const CustomFade = ({ visible }) => (
  <CustomFadeVariant unmountOnExit visible={visible}>
    {/* Content */}
  </CustomFadeVariant>
);
```
