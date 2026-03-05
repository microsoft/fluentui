# Components/Tooltip

A tooltip displays additional information about another component.
The information is displayed above and near the target component.
<br />
Tooltip is not expected to handle interactive content.
If this is necessary behavior, an expand/collapse button + popover should be used instead.
<br />
Hover or focus the buttons in the examples to see their tooltips.

## Accessibility

Tooltips should always wrap interactive controls like buttons, links, form fields, gridcells, etc. For tooltips that should be triggered by static icons, the `InfoLabel` control is available as an accessible tooltip-like pattern.

Tooltips should not be used to provide a full-text alternative to truncated content. For more infomation on the accessibility of truncated content, see our [truncation docs](https://react.fluentui.dev/?path=/docs/concepts-developer-accessibility-truncation--docs).

## Examples

### Controlled

The visibility of the tooltip can be controlled using the `visible` and `onVisibleChange` props.
<br />
In this example, the tooltip will show on hover or focus _only if_ the checkbox is checked.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox, Tooltip } from '@fluentui/react-components';

export const Controlled = (): JSXElement => {
  const [visible, setVisible] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  return (
    <Tooltip
      content="The checkbox controls whether the tooltip can show on hover or focus"
      relationship="description"
      visible={visible && enabled}
      onVisibleChange={(_ev, data) => setVisible(data.visible)}
    >
      <Checkbox label="Enable the tooltip" onChange={(_ev, { checked }) => setEnabled(!!checked)} />
    </Tooltip>
  );
};
```

### Custom Mount

Tooltips are rendered in a React Portal. By default that Portal is the outermost div.
A custom `mountNode` can be provided in the case that the tooltip needs to be rendered elsewhere.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Button, Tooltip } from '@fluentui/react-components';
import { SlideTextRegular } from '@fluentui/react-icons';
import type { TooltipProps } from '@fluentui/react-components';

export const CustomMount = (props: Partial<TooltipProps>): JSXElement => {
  const [ref, setRef] = React.useState<HTMLElement | null>();

  return (
    <>
      <Tooltip mountNode={ref} content="Example tooltip" relationship="label" {...props}>
        <Button icon={<SlideTextRegular />} size="large" />
      </Tooltip>
      <div ref={setRef} />
    </>
  );
};
```

### Default

By default, Tooltip appears above its target element, when it is focused or hovered.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Button, Tooltip } from '@fluentui/react-components';
import { SlideTextRegular } from '@fluentui/react-icons';
import type { TooltipProps } from '@fluentui/react-components';

export const Default = (props: Partial<TooltipProps>): JSXElement => (
  <Tooltip content="Example tooltip" relationship="label" {...props}>
    <Button icon={<SlideTextRegular />} size="large" />
  </Tooltip>
);
```

### Icon

When tooltips are attached to icons, they should use the InfoLabel control to be accessible. Tooltips should not be attached directly to static elements like icons, and nor should static elements be given a tabindex.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InfoLabel, Link } from '@fluentui/react-components';
import type { InfoLabelProps } from '@fluentui/react-components';

export const Icon = (props: Partial<InfoLabelProps>): JSXElement => {
  return (
    <InfoLabel
      info={
        <>
          This is example information for an InfoLabel. <Link href="https://react.fluentui.dev">Learn more</Link>
        </>
      }
      {...props}
    >
      This is an icon with an InfoLabel to show extra information
    </InfoLabel>
  );
};
```

### Appearance: inverted

The `appearance` prop can be set to `inverted` to use the theme's inverted colors.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { SlideTextFilled } from '@fluentui/react-icons';

export const Inverted = (): JSXElement => (
  <Tooltip appearance="inverted" content="Example inverted tooltip" relationship="label">
    <Button icon={<SlideTextFilled />} size="large" />
  </Tooltip>
);
```

### Positioning

The positioning attribute can be used to change the relative placement of the tooltip to its anchor.
<br />
Hover or focus the buttons in the example to see the tooltip's placement.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { ArrowStepOutRegular, ArrowStepOverRegular } from '@fluentui/react-icons';

export const Positioning = (): JSXElement => {
  /* eslint-disable react/jsx-key */
  const positions = [
    ['above-start', <ArrowStepOverRegular transform="rotate(-90)" />],
    ['above', <ArrowStepOutRegular />],
    ['above-end', <ArrowStepOverRegular transform="rotate(90) scale(-1 1)" />],

    ['before-top', <ArrowStepOverRegular transform="scale(-1 1)" />],
    ['before', <ArrowStepOutRegular transform="rotate(-90)" />],
    ['before-bottom', <ArrowStepOverRegular transform="rotate(180)" />],

    ['after-top', <ArrowStepOverRegular />],
    ['after', <ArrowStepOutRegular transform="rotate(90)" />],
    ['after-bottom', <ArrowStepOverRegular transform="rotate(180) scale(-1 1)" />],

    ['below-start', <ArrowStepOverRegular transform="rotate(-90) scale(-1 1)" />],
    ['below', <ArrowStepOutRegular transform="rotate(180)" />],
    ['below-end', <ArrowStepOverRegular transform="rotate(90)" />],
  ] as const;

  return (
    <div
      style={{
        display: 'grid',
        margin: '24px 128px',
        gap: '4px',
        gridTemplateAreas:
          '".             above-start   above         above-end     .            "' +
          '"before-top    .             .             .             after-top    "' +
          '"before        .             .             .             after        "' +
          '"before-bottom .             .             .             after-bottom "' +
          '".             below-start   below         below-end     .            "',
      }}
    >
      {positions.map(([position, icon]) => (
        <Tooltip key={position} withArrow positioning={position} content={position} relationship="label">
          <Button icon={icon} size="large" style={{ gridArea: position, minWidth: '64px', height: '64px' }} />
        </Tooltip>
      ))}
    </div>
  );
};
```

### Relationship: description

A tooltip can be used as the description of its trigger. For example, this is used for controls that have
a visible label, but the tooltip provides additional descriptive information.
<br />
The tooltip sets itself as the trigger's `aria-describedby`, so the tooltip is accessible to screen readers
and other assistive technology.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';

export const RelationshipDescription = (): JSXElement => (
  <Tooltip content="This is the description of the button" relationship="description">
    <Button>Button</Button>
  </Tooltip>
);
```

### Relationship: label

A tooltip can be used as the label of its trigger. For example, a label tooltip can be used for buttons
that have only an icon and no visible label text.
<br />
The tooltip sets its `content` as the trigger's `aria-label`, so the tooltip is accessible to screen
readers and other assistive technology.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { TextBoldRegular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons';
import { Button, Tooltip } from '@fluentui/react-components';

export const RelationshipLabel = (): JSXElement => (
  <>
    <Tooltip content="Bold" relationship="label">
      <Button icon={<TextBoldRegular />} />
    </Tooltip>
    <Tooltip content="Italic" relationship="label">
      <Button icon={<TextItalicRegular />} />
    </Tooltip>
    <Tooltip content="Underline" relationship="label">
      <Button icon={<TextUnderlineRegular />} />
    </Tooltip>
  </>
);
```

### Styled

To style a tooltip, classNames must be passed through the content slot.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { makeStyles, tokens, Button, Tooltip } from '@fluentui/react-components';
import { SlideTextRegular } from '@fluentui/react-icons';
import type { TooltipProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
  },
});

export const Styled = (props: Partial<TooltipProps>): JSXElement => {
  const styles = useStyles();
  return (
    <Tooltip
      withArrow
      content={{ children: 'Example tooltip', className: styles.tooltip }}
      relationship="label"
      {...props}
    >
      <Button icon={<SlideTextRegular />} size="large" />
    </Tooltip>
  );
};
```

### Target

The tooltip can be placed relative to a custom element using `positioning.target`. In this example, the
tooltip points to the icon inside the button, but it could point to any element.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { ArrowRoutingRegular } from '@fluentui/react-icons';

export const Target = (): JSXElement => {
  const [iconRef, setIconRef] = React.useState<HTMLSpanElement | null>(null);
  return (
    <Tooltip
      positioning={{ target: iconRef }}
      withArrow
      content="This tooltip points to the icon"
      relationship="description"
    >
      <Button icon={{ ref: setIconRef, children: <ArrowRoutingRegular /> }}>Button with icon</Button>
    </Tooltip>
  );
};
```

### With Arrow

The `withArrow` prop causes the tooltip to have an arrow pointing to its target.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { ArrowStepInRegular } from '@fluentui/react-icons';

export const WithArrow = (): JSXElement => (
  <Tooltip withArrow content="Example tooltip with an arrow" relationship="label">
    <Button icon={<ArrowStepInRegular />} size="large" />
  </Tooltip>
);
```
