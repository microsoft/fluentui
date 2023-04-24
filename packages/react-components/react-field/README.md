# @fluentui/react-field

**React Field component for [Fluent UI React](https://react.fluentui.dev/)**

## Description

Field adds a label, validation message, and hint text to a control. Any single form control can be used as the child of the Field.

## Usage

To import Field:

```js
import { Field } from '@fluentui/react-components';
```

### Examples

Works with many form controls, for example:

```jsx
<>
  <Field label="Name">
    <Input />
  </Field>
  <Field label="Description">
    <Textarea />
  </Field>
  <Field label="Size">
    <RadioGroup>
      <Radio label="Small" />
      <Radio label="Medium" />
      <Radio label="Large" />
    </RadioGroup>
  </Field>
</>
```

Display hint text:

```jsx
<Field label="Password" hint="Must be at least 8 characters long.">
  <Input type="password" />
</Field>
```

Display an error message:

```jsx
<Field label="Re-enter password" validationMessage="Passwords do not match.">
  <Input type="password" />
</Field>
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-field` from the list.

### Specification

See [SPEC.md](./SPEC.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating the Field component.
