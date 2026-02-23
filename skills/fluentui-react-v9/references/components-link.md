# Components/Link

Links allow users to navigate between different locations. They can be used as standalone controls or inline with text.

## Accessibility

A Link can be rendered with or without an underline, controlled by the `inline` prop. This has notable [accessibility implications](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), since Link relies on either an underline or contextual clues to differentiate itself from static text. It is the responsibility of the authoring team to choose the underline or no-underline variant based on their use case.

Links _must_ use underlines to be accessible except for the following use cases:

- The link exists in a visually discrete area with only other links (e.g. a navigation region, a drop-down nav menu, a footer nav section, etc.)
- The link exists in a visually discrete area with only other interactive elements (e.g. a toolbar, the footer of a dialog that contains only other buttons and links, etc.)
- All links have an icon to indicate that they are links (such as a caret, or the open-in-new-window icon)
- There is some other part of the surrounding visual context that makes it clear the link is an interactive control

Note: links do not need to be visually differentiated from buttons and other interactive controls to meet accessibility requirements.

## Props

| Name                | Type                   | Required | Default   | Description                                                                                                                                                                                    |
| ------------------- | ---------------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                | `"a" "button" "span"`  | No       |           |                                                                                                                                                                                                |
| `appearance`        | `"subtle" "default"`   | No       | 'default' | A link can appear either with its default style or subtle. If not specified, the link appears with its default styling.                                                                        |
| `disabled`          | `boolean`              | No       | false     | Whether the link is disabled.                                                                                                                                                                  |
| `disabledFocusable` | `boolean`              | No       | false     | When set, allows the link to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. |
| `inline`            | `boolean`              | No       | false     | If true, changes styling when the link is being used alongside other text content.                                                                                                             |
| `ref`               | `Ref<HTMLSpanElement>` | No       |           |                                                                                                                                                                                                |

## Examples

### Appearance

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const Appearance = (): JSXElement => (
  <Link appearance="subtle" href="https://www.bing.com">
    Subtle link
  </Link>
);
```

### As Button

When the `href` property is not provided, the component is rendered as an html `<button>`

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const AsButton = (): JSXElement => <Link>Render as a button</Link>;
```

### As Span

A Link can be rendered as an html `<span>`, in which case it will have `role="button"` set.
Links that render as a span wrap correctly between lines, behaving as inline elements as opposed to links rendered as buttons, which always behave as inline-block elements that do not wrap correctly.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link, makeResetStyles } from '@fluentui/react-components';

const useDivWithWidthClassName = makeResetStyles({
  width: '200px',
});

export const AsSpan = (): JSXElement => (
  <div className={useDivWithWidthClassName()}>
    The following link renders as a span.{' '}
    <Link as="span" inline onClick={() => alert('Link rendered as span')}>
      Links that render as a span wrap correctly between lines when their content is very long
    </Link>
    . This is because they behave as regular inline elements.
  </div>
);
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';
import type { LinkProps } from '@fluentui/react-components';

export const Default = (props: LinkProps & { as?: 'a' }): JSXElement => (
  <Link href="https://www.bing.com" {...props}>
    This is a link
  </Link>
);
```

### Disabled

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <Link disabled href="https://www.bing.com">
    Disabled link
  </Link>
);
```

### Disabled Focusable

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const DisabledFocusable = (): JSXElement => (
  <Link inline disabled disabledFocusable href="https://www.bing.com">
    Disabled but still focusable
  </Link>
);
```

### Inline

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Link } from '@fluentui/react-components';

export const Inline = (): JSXElement => (
  <div>
    This is an{' '}
    <Link href="https://www.bing.com" inline>
      inline link
    </Link>{' '}
    used alongside other text
  </div>
);
```
