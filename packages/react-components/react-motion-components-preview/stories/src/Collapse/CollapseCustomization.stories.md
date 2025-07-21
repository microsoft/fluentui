- The predefined fade transition can be disabled by setting `animateOpacity` to `false`.
- The `unmountOnExit` prop can be used to unmount the content when its `exit` transition is finished.
- A collapse variant can be created with the `createPresenceComponentVariant()` function:

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';

const CustomCollapseVariant = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlow,
  easing: motionTokens.curveEasyEaseMax,
  exitDuration: motionTokens.durationNormal,
  exitEasing: motionTokens.curveEasyEaseMax,
});

const CustomCollapse = ({ visible }) => (
  <CustomCollapseVariant animateOpacity={false} unmountOnExit visible={visible}>
    {/* Content */}
  </CustomCollapseVariant>
);
```
