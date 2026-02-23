# Components/Badge/PresenceBadge

A presence badge is a badge that displays a status indicator such as available, away, or busy.

## Props

| Name          | Type                                                                                                                                         | Required | Default   | Description                                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `as`          | `"div"`                                                                                                                                      | No       |           |                                                                                                                                                          |
| `icon`        | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No        |                                                                                                                                                          |     |
| `size`        | `"small" "medium" "large" "tiny" "extra-small" "extra-large"`                                                                                | No       |           | A Badge can be on of several preset sizes. @defaultvalue medium                                                                                          |
| `status`      | `"busy" "out-of-office" "away" "available" "offline" "do-not-disturb" "unknown" "blocked"`                                                   | No       | available | Represents several status                                                                                                                                |
| `outOfOffice` | `boolean`                                                                                                                                    | No       | false     | Modifies the display to indicate that the user is out of office. This can be combined with any status to display an out-of-office version of that status |
| `ref`         | `Ref<HTMLDivElement>`                                                                                                                        | No       |           |                                                                                                                                                          |

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { PresenceBadge } from '@fluentui/react-components';

export const Default = (): JSXElement => <PresenceBadge />;
```

### Out Of Office

A presence badge supports `available`, `away`, `busy`, `do-not-disturb`, `offline`, `out-of-office`, `blocked` and `unknown` status when `outOfOffice` is set.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { PresenceBadge } from '@fluentui/react-components';

export const OutOfOffice = (): JSXElement => {
  return (
    <>
      <PresenceBadge outOfOffice status="available" />
      <PresenceBadge outOfOffice status="away" />
      <PresenceBadge outOfOffice status="busy" />
      <PresenceBadge outOfOffice status="do-not-disturb" />
      <PresenceBadge outOfOffice status="offline" />
      <PresenceBadge outOfOffice status="out-of-office" />
      <PresenceBadge outOfOffice status="blocked" />
      <PresenceBadge outOfOffice status="unknown" />
    </>
  );
};
```

### Sizes

A presence badge supports `tiny`, `extra-small`, `small`, `medium`, and `extra-large` sizes. The default is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { PresenceBadge } from '@fluentui/react-components';

export const Sizes = (): JSXElement => {
  return (
    <>
      <PresenceBadge size="tiny" />
      <PresenceBadge size="extra-small" />
      <PresenceBadge size="small" />
      <PresenceBadge size="medium" />
      <PresenceBadge size="large" />
      <PresenceBadge size="extra-large" />
    </>
  );
};
```

### Status

A presence badge supports `available`, `away`, `busy`, `do-not-disturb`, `offline`, `out-of-office`, `blocked` and `unknown` status. The default is `available`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { PresenceBadge } from '@fluentui/react-components';

export const Status = (): JSXElement => {
  return (
    <>
      <PresenceBadge status="available" />
      <PresenceBadge status="away" />
      <PresenceBadge status="busy" />
      <PresenceBadge status="do-not-disturb" />
      <PresenceBadge status="offline" />
      <PresenceBadge status="out-of-office" />
      <PresenceBadge status="blocked" />
      <PresenceBadge status="unknown" />
    </>
  );
};
```
