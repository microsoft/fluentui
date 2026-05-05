# Components/Switch

A switch represents a physical switch that allows someone to choose between two mutually exclusive options. For example, "On/Off" and "Show/Hide". Choosing an option should produce an immediate result.

## Best practices

### Layout

- When people need to perform extra steps for changes to take effect, use a check box instead. For example, if they must click a "Submit", "Next", or "OK" button to apply changes, use a check box.

### Content

- Only replace the On/Off labels if there are more specific labels for the setting. For example, you might use Show/Hide if the setting is "Show images".
- Keep descriptive text short and concise—two to four words; preferably nouns. For example, "Focused inbox" or "WiFi".

## Props

| Name             | Type                                                                                                                                                  | Required                                                        | Default  | Description                                                                                                                                                                                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------- | ----------------- | --- | --- | ------------------- |
| `root`           | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`                                                          | No       |                                                                                                                                                                                                                                                                                                      | The root element of the Switch. The root slot receives the `className` and `style` specified directly on the `<Switch>` tag. All other native props will be applied to the primary slot: `input`. |
| `input`          | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                       | No                                                              |          | Hidden input that handles the Switch's functionality. This is the PRIMARY slot: all native properties specified directly on the `<Switch>` tag will be applied to this slot, except `className` and `style`, which remain on the root slot.                                                          |
| `label`          | `WithSlotShorthandValue<Omit<ComponentProps<LabelSlots>, "required"> & { disabled?: boolean; required?: boolean                                       | WithSlotShorthandValue<{ as?: "span"; } & Omit<...> & { ...; }> | null     | undefined; size?: "small"                                                                                                                                                                                                                                                                            | ... 2 more ...                                                                                                                                                                                    | undefined; weight?: "regular" | ... 1 more ... | undefined; } ...` | No  |     | The Switch's label. |
| `as`             | `"input"`                                                                                                                                             | No                                                              |          |                                                                                                                                                                                                                                                                                                      |
| `indicator`      | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`                                                          | No       |                                                                                                                                                                                                                                                                                                      | The track and the thumb sliding over it indicating the on and off status of the Switch.                                                                                                           |
| `checked`        | `boolean`                                                                                                                                             | No                                                              | false    | Defines the controlled checked state of the Switch. If passed, Switch ignores the `defaultChecked` property. This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the correct value based on handling `onChange` events and re-rendering. |
| `defaultChecked` | `boolean`                                                                                                                                             | No                                                              | false    | Defines whether the Switch is initially in a checked state or not when rendered.                                                                                                                                                                                                                     |
| `labelPosition`  | `"before" "after" "above"`                                                                                                                            | No                                                              | after    | The position of the label relative to the Switch.                                                                                                                                                                                                                                                    |
| `size`           | `"small" "medium"`                                                                                                                                    | No                                                              | 'medium' | The size of the Switch.                                                                                                                                                                                                                                                                              |
| `onChange`       | `((ev: ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => void)`                                                                             | No                                                              |          | Callback to be called when the checked state value changes.                                                                                                                                                                                                                                          |
| `ref`            | `Ref<HTMLInputElement>`                                                                                                                               | No                                                              |          |                                                                                                                                                                                                                                                                                                      |

## Examples

### Checked

A Switch can be initially checked by passing a value to the `defaultChecked` property, or have its checked value controlled via the `checked` property.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

export const Checked = (): JSXElement => {
  const [checked, setChecked] = React.useState(true);
  const onChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(ev.currentTarget.checked);
    },
    [setChecked],
  );

  return <Switch checked={checked} onChange={onChange} label={checked ? 'Checked' : 'Unchecked'} />;
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';
import type { SwitchProps } from '@fluentui/react-components';

export const Default = (props: SwitchProps): JSXElement => <Switch label="This is a switch" {...props} />;
```

### Disabled

A Switch can be disabled.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const Disabled = (): JSXElement => (
  <div style={wrapperStyle}>
    <Switch disabled label="Unchecked and disabled" />
    <Switch checked disabled label="Checked and disabled" />
  </div>
);
```

### Label

A label can be provided to the Switch and is positioned above, before or after the component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
};

export const Label = (): JSXElement => {
  const [checked, setChecked] = React.useState(false);
  const onChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(ev.currentTarget.checked);
    },
    [setChecked],
  );
  const [checked2, setChecked2] = React.useState(false);
  const onChange2 = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setChecked2(ev.currentTarget.checked);
    },
    [setChecked2],
  );
  const [checked3, setChecked3] = React.useState(false);
  const onChange3 = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setChecked3(ev.currentTarget.checked);
    },
    [setChecked3],
  );

  const checkedString = checked ? 'checked' : 'unchecked';
  const checkedString2 = checked2 ? 'checked' : 'unchecked';
  const checkedString3 = checked3 ? 'checked' : 'unchecked';

  return (
    <div style={wrapperStyle}>
      <Switch
        checked={checked}
        label={`With label before and ${checkedString}`}
        labelPosition="before"
        onChange={onChange}
      />

      <Switch
        checked={checked2}
        label={`With label above and ${checkedString2}`}
        labelPosition="above"
        onChange={onChange2}
      />

      <Switch
        checked={checked3}
        label={`With label after and ${checkedString3}`}
        labelPosition="after"
        onChange={onChange3}
      />
    </div>
  );
};
```

### Label Wrapping

The label will wrap if it is wider than the available space. The Switch track will stay aligned to the first line of text.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

export const LabelWrapping = (): JSXElement => (
  <Switch
    style={{ maxWidth: '400px' }}
    label="Here is an example of a Switch with a long label and it starts to wrap to a second line."
  />
);
```

### Required

When a Switch is marked as `required`, its label also gets the required styling.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

export const Required = (): JSXElement => <Switch required label="Required" />;
```

### Size

A Switch can have different sizes.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';
import type { SwitchProps } from '@fluentui/react-components';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const Size = (props: SwitchProps): JSXElement => {
  return (
    <div style={wrapperStyle}>
      <Switch label="Small" size="small" {...props} />
      <Switch label="Medium" size="medium" {...props} />
    </div>
  );
};
```
