# SearchBox Migration

## Migrations from v0

| Prop/concept                 | v0                                                          | Proposal                                |
| ---------------------------- | ----------------------------------------------------------- | --------------------------------------- |
| imperative API               | n/a                                                         | n/a                                     |
| supported native props       | `SupportedIntrinsicInputProps` (see below)                  | `React.InputHTMLAttributes`             |
| setting native props on root | ?                                                           | `root` slot                             |
| root element access          | ?                                                           | `ref` on `root` slot                    |
| primary element access       | `ref`                                                       | top-level `ref`                         |
| multiline mode               | separate component (`TextArea`)                             | separate component                      |
| underlined                   |                                                             | `appearance`                            |
| fluid (full width)           | `fluid?: boolean`                                           | default behavior                        |
| inline                       | `inline?: boolean`                                          | `inline?: boolean`                      |
| label                        | `label?: ShorthandValue<InputLabelProps>`,                  | handled by Field                        |
| label position               | `labelPosition?: 'above' \| 'inline' \| 'inside'`           | handled by Field                        |
| description                  | use FormField                                               | handled by Field                        |
| error message                | use FormField                                               | handled by Field                        |
| icon at start of field       | `icon?: ShorthandValue<BoxProps>` + `iconPosition: 'start'` | `contentBefore` slot                    |
| icon at end of field         | `icon?: ShorthandValue<BoxProps>` + `iconPosition: 'end'`   | `contentAfter` and `dismiss` slots      |
| value                        | `value?: string \| number`                                  | `value?: string`                        |
| defaultValue                 | `defaultValue?: string \| string[]`                         | `defaultValue?: string`                 |
| onChange                     | `(ev, data: { ...props, value }) => void`                   | `(ev, data: { value: string }) => void` |
| onClear                      | `(ev?: any) => void`                                        | `(ev?: any) => void` on `dismiss` slot  |
| onSearch                     | `(newValue: any) => void`                                   | not supported                           |
| container className          |                                                             | top-level `className`                   |
| input className              | `input.className?: `                                        |                                         |
| aria label                   | `'aria-label'?: string`                                     | `'aria-label'?: string`                 |
| clearable                    | `clearable?: boolean`                                       | `dismiss` slot                          |
| style overrides              | `styles?: ComponentSlotStyles<...>`                         | className, slot classNames              |
| accessibility                | individual props                                            | individual props                        |

```ts
// packages/fluentui/react-northstar/src/utils/htmlPropsUtils.tsx
type SupportedIntrinsicInputProps = {
  [K in HtmlInputProps]?: K extends keyof JSX.IntrinsicElements['input'] ? JSX.IntrinsicElements['input'][K] : any;
};
// HtmlInputProps: a subset of React and HTML native props

// packages/fluentui/react-northstar/src/components/Box/Box.tsx
interface BoxProps extends UIComponentProps<BoxProps>, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
}
```

## Migrations from v8

| Prop/concept                 | v8                                                    | v9                                      |
| ---------------------------- | ----------------------------------------------------- | --------------------------------------- |
| imperative API               | `componentRef`                                        | n/a                                     |
| supported native props       | `React.AllHTMLAttributes` (input or textarea)         | `React.InputHTMLAttributes`             |
| setting native props on root |                                                       | `root` slot                             |
| root element access          | `elementRef`                                          | `ref` on `root` slot                    |
| primary element access       | not possible                                          | top-level `ref`                         |
| multiline mode               | `multiline?: boolean`                                 | separate component                      |
| underlined                   | `underlined?: boolean`                                | `appearance`                            |
| borderless                   | `borderless?: boolean`                                | not supported?                          |
| fluid (full width)           | default behavior                                      | default behavior                        |
| inline                       | n/a (use styling)                                     | `inline?: boolean`                      |
| label                        | `label?: string`, `onRenderLabel`                     | handled by Field                        |
| label position               | n/a (use styling)                                     | handled by Field                        |
| description                  | `description?: string`, `onRenderDescription`         | handled by Field                        |
| error message                | see [Spec-variants.md](./Spec-variants.md#validation) | handled by Field                        |
| content outside before field | `prefix?: string`, `onRenderPrefix`                   |                                         |
| content outside after field  | `suffix?: string`, `onRenderSuffix`                   |                                         |
| icon at start of field       | n/a                                                   | `contentBefore` slot                    |
| icon at end of field         | `iconProps?: IIconProps`                              | `contentAfter` slot                     |
| value                        | `value?: string`                                      | `value?: string`                        |
| defaultValue                 | `defaultValue?: string`                               | `defaultValue?: string`                 |
| onChange                     | `(ev, value) => void`                                 | `(ev, data: { value: string }) => void` |
| onClear                      | n/a                                                   | `(ev?: any) => void` on `dismiss` slot  |
| onSearch                     | n/a                                                   | not supported                           |
| container className          | `className?: string`                                  | top-level `className`                   |
| input className              | `inputClassName?: string`                             |                                         |
| aria label                   | `ariaLabel?: string`                                  | `'aria-label'?: string`                 |
| clearable                    | n/a                                                   | `dismiss` slot                          |
| style overrides              | `styles?: IStyleFunctionOrObject<...>`                | className, slot classNames              |
| accessibility                | `Accessibility<InputBehaviorProps>` (see below)       | individual props                        |

```ts
// packages/fluentui/accessibility/src/behaviors/Input/inputBehavior.ts
type InputBehaviorProps = { disabled?: boolean; required?: boolean; error?: boolean };
```

## Native Props

Native props following standard behavior in both libraries + `v9`:

- `disabled?: boolean`
- `readOnly?: boolean`
- `autoComplete?: string`
- and most other native props not specified
