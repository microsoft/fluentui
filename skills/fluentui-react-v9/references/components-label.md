# Components/Label

A label provides a name or title for an input.

## Props

| Name       | Type                       | Required                                                                                                                                    | Default  | Description                                       |
| ---------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `"label"`                  | No                                                                                                                                          |          |                                                   |
| `disabled` | `boolean`                  | No                                                                                                                                          | false    | Renders the label as disabled                     |
| `required` | `boolean                   | WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No                                                | false | Displays an indicator that the label is for a required field. The required prop can be set to true to display an asterisk (\*). Or it can be set to a string or jsx content to display a different indicator. |
| `size`     | `"small" "medium" "large"` | No                                                                                                                                          | 'medium' | A label supports different sizes.                 |
| `weight`   | `"regular" "semibold"`     | No                                                                                                                                          | regular  | A label supports regular and semibold fontweight. |
| `ref`      | `Ref<HTMLLabelElement>`    | No                                                                                                                                          |          |                                                   |

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label } from '@fluentui/react-components';
import type { LabelProps } from '@fluentui/react-components';

export const Default = (props: LabelProps): JSXElement => <Label {...props}>This is a label</Label>;
```

### Disabled

A Label can be disabled.
Since this state does not meet the required accessibility contrast ratio,
it should be used sparingly and make it clear that there's no interaction with the
control associated with it.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <Label disabled required>
    Disabled label
  </Label>
);
```

### Required

A Label can display a required asterisk or a custom required indicator. This custom required indicator canbe a custom string or jsx content.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label } from '@fluentui/react-components';

export const Required = (): JSXElement => (
  <>
    <Label required>Required label</Label>
    <Label required="***">Required label</Label>
  </>
);
```

### Size

A Label supports `small`, `medium`, and `large` sizes.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label } from '@fluentui/react-components';

export const Size = (): JSXElement => {
  return (
    <>
      <Label size="small">Small</Label>
      <Label size="medium">Medium</Label>
      <Label size="large">Large</Label>
    </>
  );
};
```

### Weight

A Label with a semibold font weight.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label } from '@fluentui/react-components';

export const Weight = (): JSXElement => <Label weight="semibold">Strong label</Label>;
```
