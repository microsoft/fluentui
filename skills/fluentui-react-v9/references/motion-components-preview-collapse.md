# Motion/Components (preview)/Collapse

The `Collapse` component manages content [presence](?path=/docs/motion-apis-createpresencecomponent--docs), using a height or width expand/collapse motion.

> **⚠️ Preview components are considered unstable**

```tsx
import { Collapse } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Collapse visible={visible}>
      <div>Content</div>
    </Collapse>
  );
}
```

## Examples

### Customization

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

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  createPresenceComponentVariant,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
});

const CustomCollapseVariant = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlow,
  easing: motionTokens.curveEasyEaseMax,
  exitDuration: motionTokens.durationNormal,
  exitEasing: motionTokens.curveEasyEaseMax,
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Customization = (): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);
  const [unmountOnExit, setUnmountOnExit] = React.useState<boolean>(false);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field className={classes.field}>
          <Switch
            label={<code>animateOpacity</code>}
            checked={animateOpacity}
            onChange={() => setAnimateOpacity(v => !v)}
          />
        </Field>
        <Field className={classes.field}>
          <Switch
            label={<code>unmountOnExit</code>}
            checked={unmountOnExit}
            onChange={() => setUnmountOnExit(v => !v)}
          />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),

            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            className={mergeClasses(classes.field, classes.sliderField)}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>

      <CustomCollapseVariant
        animateOpacity={animateOpacity}
        imperativeRef={motionRef}
        visible={visible}
        unmountOnExit={unmountOnExit}
      >
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </CustomCollapseVariant>
    </div>
  );
};
```

### Default

```tsx
import { Field, makeStyles, tokens, Switch, PresenceComponentProps } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Default = (props: PresenceComponentProps): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <Collapse visible={visible}>
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </Collapse>
    </div>
  );
};
```

### Delayed

The `CollapseDelayed` variant has a delay between the size and opacity animations.

```tsx
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { CollapseDelayed } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Delayed = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <CollapseDelayed visible={visible}>
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </CollapseDelayed>
    </div>
  );
};
```

### Horizontal

For a horizontal `Collapse`, set the `orientation` parameter:

```tsx
<Collapse orientation="horizontal" ...>
```

```tsx
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {},
  sideContent: {
    background: 'lightgrey',
    padding: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    gridArea: 'card',
    padding: '20px',
    width: '300px',
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    justifyContent: 'start',
    gridArea: 'controls',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      3,
    )}
  </>
);

export const Horizontal = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div style={{ display: 'flex' }}>
        <Collapse visible={visible} orientation="horizontal">
          {/* Wrapper div to make the collapse crop the card without reflowing the text. */}
          <div>
            <div className={classes.card}>
              <LoremIpsum />
            </div>
          </div>
        </Collapse>
        <div className={classes.sideContent}>[side content]</div>
      </div>
    </div>
  );
};
```

### Relaxed

The relaxed variant of `Collapse` is available as `CollapseRelaxed` component.

```tsx
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { CollapseRelaxed } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Relaxed = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <CollapseRelaxed visible={visible}>
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </CollapseRelaxed>
    </div>
  );
};
```

### Snappy

The snappy variant of `Collapse` is available as `CollapseSnappy` component.

```tsx
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { CollapseSnappy } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Snappy = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <CollapseSnappy visible={visible}>
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </CollapseSnappy>
    </div>
  );
};
```
