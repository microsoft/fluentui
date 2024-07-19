- `duration` and `easing` can be customized for each transition separately using `createPresenceComponentVariant()`.

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';
import { Fade } from '@fluentui/react-motion-components-preview';

const CustomFadeVariant = createPresenceComponentVariant(Fade, {
  enter: { duration: motionTokens.durationSlow, easing: motionTokens.curveEasyEaseMax },
  exit: { duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEaseMax },
});

const CustomFade = ({ visible }) => (
  <CustomFadeVariant unmountOnExit visible={visible}>
    {/* Content */}
  </CustomFadeVariant>
);
```
