- The predefined fade transition can be disabled by setting `animateOpacity` to `false`.
- The `unmountOnExit` prop can be used to unmount the content when its `exit` transition is finished.
- A collapse variant can be created with the factory function `createCollapsePresence()`, then converting the result to a React component using `createPresenceComponent()`:

```tsx
import { motionTokens, createPresenceComponent } from '@fluentui/react-components';
import { createCollapsePresence } from '@fluentui/react-motion-components-preview';

const CustomCollapseVariant = createPresenceComponent(
  createCollapsePresence({
    enterDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveEasyEaseMax,
    exitDuration: motionTokens.durationNormal,
    exitEasing: motionTokens.curveEasyEaseMax,
  }),
);

const CustomCollapse = ({ visible }) => (
  <CustomCollapseVariant animateOpacity={false} unmountOnExit visible={visible}>
    {/* Content */}
  </CustomCollapseVariant>
);
```
