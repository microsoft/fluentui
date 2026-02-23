# Components/Spinner

A spinner alerts a user that content is being loaded or processed and they should wait for the activity to complete.

## Best practices

### Do

- If your Spinner is the only element on the page, set tabIndex={0} on it to allow it to be picked up by screen readers.
- Use a Spinner when a task is not immediate.
- Use one Spinner at a time.
- Descriptive verbs are appropriate under a Spinner to help the user understand what's happening. Ie: Saving, processing, updating.
- Use a Spinner when confirming a change has been made or a task is being processed.
- Add a description to a Spinner when reduced-motion is active

### Don't

- Don’t use a Spinner when performing immediate tasks.
- Don't show multiple Spinners at the same time.
- Don't include more than a few words when paired with a Spinner.

## Props

| Name            | Type                                                                                                                                                     | Required                                                        | Default   | Description                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------- | --------------------------------------------------------------------- | ------------------------------------- | ----------------------------- | -------------- | ----------------- | --- | --- | ---------------------------------- |
| `label`         | `WithSlotShorthandValue<Omit<ComponentProps<LabelSlots>, "required"> & { disabled?: boolean; required?: boolean                                          | WithSlotShorthandValue<{ as?: "span"; } & Omit<...> & { ...; }> | null      | undefined; size?: "small"                                             | ... 2 more ...                        | undefined; weight?: "regular" | ... 1 more ... | undefined; } ...` | No  |     | An optional label for the Spinner. |
| `as`            | `"div" "span"`                                                                                                                                           | No                                                              |           |                                                                       |
| `spinner`       | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>             | null`                                                           | No        |                                                                       | The animated spinning ring.           |
| `spinnerTail`   | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null>`                                                          | No        |                                                                       | The part of the spinner that rotates. |
| `appearance`    | `"primary" "inverted"`                                                                                                                                   | No                                                              | 'primary' | The appearance of the Spinner.                                        |
| `delay`         | `number`                                                                                                                                                 | No                                                              | 0         | Time in milliseconds after component mount before spinner is visible. |
| `labelPosition` | `"before" "after" "above" "below"`                                                                                                                       | No                                                              | 'after'   | Where the label is positioned relative to the Spinner                 |
| `size`          | `"small" "medium" "large" "tiny" "extra-small" "extra-large" "huge" "extra-tiny"`                                                                        | No                                                              | 'medium'  | The size of the spinner.                                              |
| `ref`           | `Ref<HTMLSpanElement>`                                                                                                                                   | No                                                              |           |                                                                       |

## Examples

### Appearance

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Spinner, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    '> div': { padding: '20px' },
  },

  // Inverted Spinners are meant as overlays (e.g., over an image or similar)
  // so give it a solid, dark background so it is visible in all themes.
  invertedWrapper: {
    backgroundColor: tokens.colorBrandBackgroundStatic,
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Spinner appearance="primary" label="Primary Spinner" />

      <div className={styles.invertedWrapper}>
        <Spinner appearance="inverted" label="Inverted Spinner" />
      </div>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-components';
import type { SpinnerProps } from '@fluentui/react-components';

export const Default = (props: Partial<SpinnerProps>): JSXElement => <Spinner {...props} />;
```

### Labels

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Spinner } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    '> div': { padding: '20px' },
  },
});

export const Labels = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Spinner labelPosition="before" label="Label Position Before..." />

      <Spinner labelPosition="after" label="Label Position After..." />

      <Spinner labelPosition="above" label="Label Position Above..." />

      <Spinner labelPosition="below" label="Label Position Below..." />
    </div>
  );
};
```

### Size

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Spinner } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    '> div': { padding: '20px' },
  },
});

export const Size = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Spinner size="extra-tiny" label="Extra Tiny Spinner" />

      <Spinner size="tiny" label="Tiny Spinner" />

      <Spinner size="extra-small" label="Extra Small Spinner" />

      <Spinner size="small" label="Small Spinner" />

      <Spinner size="medium" label="Medium Spinner" />

      <Spinner size="large" label="Large Spinner" />

      <Spinner size="extra-large" label="Extra Large Spinner" />

      <Spinner size="huge" label="Huge Spinner" />
    </div>
  );
};
```
