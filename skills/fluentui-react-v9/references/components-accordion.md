# Components/Accordion

An accordion allows users to toggle the display of content by expanding or collapsing sections.

## Props

| Name               | Type                                   | Required | Default | Description                                                                                                                                                                                                                                 |
| ------------------ | -------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`               | `"div"`                                | No       |         |                                                                                                                                                                                                                                             |
| `defaultOpenItems` | `unknown`                              | No       |         | Default value for the uncontrolled state of the panel.                                                                                                                                                                                      |
| `collapsible`      | `boolean`                              | No       |         | Indicates if Accordion support multiple Panels closed at the same time.                                                                                                                                                                     |
| `multiple`         | `boolean`                              | No       |         | Indicates if Accordion support multiple Panels opened at the same time.                                                                                                                                                                     |
| `navigation`       | `"circular" "linear"`                  | No       |         | @deprecated Arrow keyboard navigation is not recommended for accordions. Consider using Tree if arrow navigation is a hard requirement. Indicates if keyboard navigation is available and gives two options, linear or circular navigation. |
| `onToggle`         | `AccordionToggleEventHandler<unknown>` | No       |         | Callback to be called when the opened items change.                                                                                                                                                                                         |
| `openItems`        | `unknown`                              | No       |         | Controls the state of the panel.                                                                                                                                                                                                            |
| `ref`              | `Ref<HTMLDivElement>`                  | No       |         |                                                                                                                                                                                                                                             |

## Subcomponents

### AccordionItem

Define a styled AccordionItem, using the `useAccordionItem_unstable` and `useAccordionItemStyles_unstable` hooks.

#### Props

| Name       | Type                  | Required | Default | Description                                                             |
| ---------- | --------------------- | -------- | ------- | ----------------------------------------------------------------------- |
| `as`       | `"div"`               | No       |         |                                                                         |
| `disabled` | `boolean`             | No       |         | Disables opening/closing of panel.                                      |
| `value`    | `unknown`             | Yes      |         | Required value that identifies this item inside an Accordion component. |
| `ref`      | `Ref<HTMLDivElement>` | No       |         |                                                                         |

### AccordionHeader

Define a styled AccordionHeader, using the `useAccordionHeader_unstable` and `useAccordionHeaderStyles_unstable`
hooks.

#### Props

| Name                 | Type                                                                                                                                         | Required | Default | Description                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| `button`             | `NonNullable<WithSlotShorthandValue<ARIAButtonSlotProps<"a">>                                                                                | null>`   | No      |                                                             | The component to be used as button in heading                            |
| `icon`               | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>    | null`    | No      |                                                             | Expand icon slot rendered before (or after) children content in heading. |
| `expandIcon`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                             | Expand icon slot rendered before (or after) children content in heading. |
| `as`                 | `"div" "h1" "h2" "h3" "h4" "h5" "h6"`                                                                                                        | No       |         |                                                             |
| `expandIconPosition` | `"start" "end"`                                                                                                                              | No       |         | The position of the expand icon slot in heading.            |
| `inline`             | `boolean`                                                                                                                                    | No       |         | Indicates if the AccordionHeader should be rendered inline. |
| `size`               | `"small" "medium" "large" "extra-large"`                                                                                                     | No       |         | Size of spacing in the heading.                             |
| `ref`                | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |                                                             |

### AccordionPanel

Define a styled AccordionPanel, using the `useAccordionPanel_unstable` and `useAccordionPanelStyles_unstable` hooks.

#### Props

| Name             | Type                     | Required | Default | Description |
| ---------------- | ------------------------ | -------- | ------- | ----------- | --- |
| `collapseMotion` | `PresenceMotionSlotProps | null`    | No      |             |     |
| `as`             | `"div"`                  | No       |         |             |
| `ref`            | `Ref<HTMLDivElement>`    | No       |         |             |

## Examples

### Collapsible

An accordion can have multiple panels collapsed at the same time.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Collapsible = (): JSXElement => (
  <Accordion collapsible>
    <AccordionItem value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```

### Controlled

An accordion can be controlled, to ensure `multiple` and `collapsible` you should use `openItems` provided through `onToggle` callback.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
} from '@fluentui/react-components';

export const Controlled = (): JSXElement => {
  const [openItems, setOpenItems] = React.useState(['1']);
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };
  return (
    <Accordion openItems={openItems} onToggle={handleToggle} multiple collapsible>
      <AccordionItem value="1">
        <AccordionHeader>Accordion Header 1</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionHeader>Accordion Header 2</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 2</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionHeader>Accordion Header 3</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 3</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Default = (): JSXElement => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```

### Disabled

An accordion item can be `disabled`

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <Accordion>
    <AccordionItem disabled value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem disabled value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem disabled value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```

### Expand Icon

An accordion item can have a custom expand icon.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Add20Filled, Subtract20Filled } from '@fluentui/react-icons';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
} from '@fluentui/react-components';

export const ExpandIcon = (): JSXElement => {
  const [openItem, setOpenItems] = React.useState(0);
  const handleToggle = React.useCallback<AccordionToggleEventHandler>((_, data) => {
    setOpenItems(data.value as number);
  }, []);
  return (
    <Accordion onToggle={handleToggle} openItems={openItem}>
      <AccordionItem value={1}>
        <AccordionHeader expandIcon={openItem === 1 ? <Subtract20Filled /> : <Add20Filled />}>
          Accordion Header 1
        </AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 1</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value={2}>
        <AccordionHeader expandIcon={openItem === 2 ? <Subtract20Filled /> : <Add20Filled />}>
          Accordion Header 2
        </AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 2</div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value={3}>
        <AccordionHeader expandIcon={openItem === 3 ? <Subtract20Filled /> : <Add20Filled />}>
          Accordion Header 3
        </AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel 3</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
```

### Expand Icon Position

The expand icon can be placed at the `start` or `end` of the accordian header.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const ExpandIconPosition = (): JSXElement => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader expandIconPosition="end">Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader expandIconPosition="start">Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```

### Heading Levels

An accordion header is a `<div>` by default, but according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties), we recommend using a proper heading of any level in markup.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const HeadingLevels = (): JSXElement => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader as="h1">Accordion Header as h1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader as="h2">Accordion Header as h2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader as="h3">Accordion Header as h3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="4">
      <AccordionHeader as="h4">Accordion Header as h4</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 4</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```

### Inline

An accordion header can be set to `inline`

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Inline = (): JSXElement => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader inline>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader inline>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader inline>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```

### Multiple

An accordion supports multiple panels expanded simultaneously. Since it's not simple to determine which panel will be opened by default, `multiple` will also be collapsed by default on the first render

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Multiple = (): JSXElement => (
  <Accordion multiple>
    <AccordionItem value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```

### Open Items

An accordion can have defined open items. If no open item is present, all panels will be closed by default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const OpenItems = (): JSXElement => (
  <Accordion defaultOpenItems="1">
    <AccordionItem value="1">
      <AccordionHeader>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```

### Sizes

AccordionHeader supports `small`, `medium`, `large` and `extra-large` sizes.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const Sizes = (): JSXElement => (
  <>
    <Accordion collapsible>
      <AccordionItem value="1">
        <AccordionHeader size="small">Small Header</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion collapsible>
      <AccordionItem value="1">
        <AccordionHeader size="medium">Medium Header</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion collapsible>
      <AccordionItem value="1">
        <AccordionHeader size="large">Large Header</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Accordion collapsible>
      <AccordionItem value="1">
        <AccordionHeader size="extra-large">Extra-Large Header</AccordionHeader>
        <AccordionPanel>
          <div>Accordion Panel</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </>
);
```

### With Icon

An accordion header can contain an icon.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RocketRegular } from '@fluentui/react-icons';

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const WithIcon = (): JSXElement => (
  <Accordion>
    <AccordionItem value="1">
      <AccordionHeader icon={<RocketRegular />}>Accordion Header 1</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 1</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="2">
      <AccordionHeader icon={<RocketRegular />}>Accordion Header 2</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 2</div>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="3">
      <AccordionHeader icon={<RocketRegular />}>Accordion Header 3</AccordionHeader>
      <AccordionPanel>
        <div>Accordion Panel 3</div>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
```
