- `duration` and `easing` can be customized for each transition separately using `createPresenceComponentVariant()`.

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
