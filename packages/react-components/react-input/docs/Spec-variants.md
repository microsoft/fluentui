# Input Variants

Input has many variants and additional features. We don't plan to implement any of these immediately, but adding notes here for future reference.

## Bookends

"Bookends" (the naming comes from the design spec) are bits of text on the left or right outside of the field, surrounded by a border or background color.

Initially, bookends were planned to be included in the main component (as `bookendBefore`/`bookendAfter` slots) but we decided they're not essential and should be split out to simplify the DOM structure and defer some of the related open questions until later.

If/when a partner needs this feature, it will likely go in some kind of wrapper component.

Visual variants for the bookends are as follows (note that specific colors are just examples based on the default theme):

- `filled` (default): bookends have a gray background, black text, and no border
- `brand`: bookends have a brand color (such as blue or purple) background, white text, and no border
- `transparent`: bookends have a transparent background, black text, and only a thin inside border to distinguish them from the field

## Multi-line (`textarea`)

This will tentatively be a separate component, likely sharing some internals with the basic `Input` using hooks (scheduling TBD).

| Prop/concept       | v8                           | v0  | Proposal                                                 |
| ------------------ | ---------------------------- | --- | -------------------------------------------------------- |
| resizable          | `resizable?: boolean`        |     | via native props                                         |
| auto-adjust height | `autoAdjustHeight?: boolean` |     | TBD (common request but has nasty implementation issues) |

Similar to both v8 and v0, passing other `textarea` native props as top-level component props will be supported.

### Possibility: `useTextInput`

We might want to make a hook and some types to share props and behavior between `Input` and the potential future `TextArea` (which would depend on `react-input` but with some different props and behaviors).

```ts
type TextInputSlots<
  TInput extends HTMLInputElement | HTMLTextAreaElement,
  TInputAttributes = TInput extends HTMLInputElement
    ? React.InputHTMLAttributes<TInput>
    : React.TextAreaHTMLAttributes<TInput>,
> = {
  root: ComponentSlotProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  input: ComponentSlotProps<TInputAttributes, TInput>;
};
```

## Validation

Validation features and error messages will not be built into the new `Input`. Possible approaches:

- Hooks and/or a `Field` component to provide visual consistency and proper accessibility behavior across different types of inputs.
- A `Form` component for more complex scenarios involving validation across multiple fields.

### In v8

```ts
// relevant props only
interface ITextFieldProps {
  // static error message
  errorMessage?: string | JSX.Element;
  // called to determine whether input is valid and show error if not
  // (on all changes by default; modified by validateOnFocusIn/Out)
  onGetErrorMessage?: (value: string) => string | JSX.Element | PromiseLike<string | JSX.Element> | undefined;
  // whether to validate when focus moves into input (NOT on change)
  validateOnFocusIn?: boolean;
  // whether to validate when focus moves out of input (NOT on change)
  validateOnFocusOut?: boolean;
  // whether to validate when input is initially rendered
  validiateOnLoad?: boolean;
  // wait to validate until user stops typing by this ms
  deferredValidationTime?: number;
  // called after validation completes
  onNotifyValidationResult?: (errorMessage: string | JSX.Element, value: string | undefined) => void;
  // ...
}
```

### In v0

TBD

## Password

v8 supports a password field with a custom reveal password button:

```tsx
<TextField type="password" canRevealPassword revealPasswordAriaLabel="Show password" />
```

v0 does not appear to have a similar feature.

TBD if/how we want to handle this in converged.

## Masking

"Masking" refers to a text input with some pre-specified format that gets filled in as the user types, like `(___) ___-____`.

In v8 it's handled by `MaskedTextField`.

Masking is tricky to implement properly and bad for accessibility, so we don't plan to implement it in converged unless there's a compelling product requirement. At that point we'll also evaluate whether there are any suitable 3rd-party libraries which could handle it.
