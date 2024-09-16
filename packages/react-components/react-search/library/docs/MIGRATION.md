# SearchBox Migration

## Migrations from v0

| Prop/concept                 | v0                                                                              | Proposal                                                               |
| ---------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| imperative API               | n/a                                                                             | n/a                                                                    |
| supported native props       | `SupportedIntrinsicInputProps` (see below)                                      | `React.InputHTMLAttributes`                                            |
| setting native props on root | ?                                                                               | `root` slot                                                            |
| root element access          | ?                                                                               | `ref` on `root` slot                                                   |
| primary element access       | `ref`                                                                           | top-level `ref`                                                        |
| underlined                   |                                                                                 | `appearance`                                                           |
| fluid (full width)           | `fluid?: boolean`                                                               | default behavior                                                       |
| inline                       | `inline?: boolean`                                                              | custom styles                                                          |
| label                        | `label?: ShorthandValue<InputLabelProps>`,                                      | handled by Field                                                       |
| label position               | `labelPosition?: 'above' \| 'inline' \| 'inside'`                               | handled by Field                                                       |
| description                  | use FormField                                                                   | handled by Field                                                       |
| error message                | use FormField                                                                   | handled by Field                                                       |
| icon at start of field       | `icon?: ShorthandValue<BoxProps>` + `iconPosition: 'start'`                     | `contentBefore` slot                                                   |
| icon at end of field         | `icon?: ShorthandValue<BoxProps>` + `iconPosition: 'end'`                       | `contentAfter` and `dismiss` slots                                     |
| value                        | `value?: string \| number`                                                      | `value?: string`                                                       |
| defaultValue                 | `defaultValue?: string \| string[]`                                             | `defaultValue?: string`                                                |
| onChange                     | `(ev?: React.ChangeEvent<HTMLInputElement>, data: { ...props, value }) => void` | `(ev: ChangeEvent<HTMLInputElement>, data: { value: string }) => void` |
| onClear                      | `(ev?: any) => void`                                                            | `(ev?: any) => void` on `dismiss` slot                                 |
| onSearch                     | `(newValue: any) => void`                                                       | not supported                                                          |
| container className          |                                                                                 | top-level `className`                                                  |
| input className              | `input.className?: `                                                            | `className` on the `Input`'s `input` slot                              |
| aria-label                   | `'aria-label'?: string`                                                         | `'aria-label'?: string`                                                |
| clearable                    | `clearable?: boolean`                                                           | `dismiss` slot                                                         |
| style overrides              | `styles?: ComponentSlotStyles<...>`                                             | className, slot classNames                                             |

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

| Prop/concept                 | v8                                                                     | v9                                                                     |
| ---------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| imperative API               | `componentRef`                                                         | n/a                                                                    |
| supported native props       | `React.AllHTMLAttributes` (input or textarea)                          | `React.InputHTMLAttributes`                                            |
| setting native props on root |                                                                        | `root` slot                                                            |
| root element access          | `elementRef`                                                           | `ref` on `root` slot                                                   |
| primary element access       | not possible                                                           | top-level `ref`                                                        |
| underlined                   | `underlined?: boolean`                                                 | `appearance`                                                           |
| borderless                   | `borderless?: boolean`                                                 | `appearance` or custom styles                                          |
| fluid (full width)           | default behavior                                                       | default behavior                                                       |
| label                        | `label?: string`, `onRenderLabel`                                      | handled by Field                                                       |
| label position               | n/a (use styling)                                                      | handled by Field                                                       |
| description                  | `description?: string`, `onRenderDescription`                          | handled by Field                                                       |
| error message                | see [Spec-variants.md](./Spec-variants.md#validation)                  | handled by Field                                                       |
| content outside before field | `prefix?: string`, `onRenderPrefix`                                    |                                                                        |
| content outside after field  | `suffix?: string`, `onRenderSuffix`                                    |                                                                        |
| icon at start of field       | n/a                                                                    | `contentBefore` slot                                                   |
| icon at end of field         | `iconProps?: IIconProps`                                               | `contentAfter` slot                                                    |
| value                        | `value?: string`                                                       | `value?: string`                                                       |
| defaultValue                 | `defaultValue?: string`                                                | `defaultValue?: string`                                                |
| onChange                     | `(ev?: React.ChangeEvent<HTMLInputElement>, value) => void`            | `(ev: ChangeEvent<HTMLInputElement>, data: { value: string }) => void` |
| onClear                      | `(ev?: any) => void`                                                   | `(ev?: any) => void` on `dismiss` slot                                 |
| onSearch                     | `(newValue: any) => void`                                              | not supported                                                          |
| onEscape                     | `(ev?: any) => void`                                                   | not supported                                                          |
| disableAnimation             | `disableAnimation?: boolean`                                           | default behavior                                                       |
| container className          | `className?: string`                                                   | top-level `className`                                                  |
| input className              | `inputClassName?: string`                                              | `className` on the `Input`'s `input` slot                              |
| aria-label                   | `ariaLabel?: string`                                                   | `'aria-label'?: string`                                                |
| showIcon                     | `showIcon?: boolean`                                                   | default behavior                                                       |
| iconProps                    | `iconProps?: Pick<IIconProps, Exclude<keyof IIconProps, 'className'>>` | `contentBefore`, `dismiss`, and `contentAfter` props                   |
| clearButtonProps             | `clearButtonProps?: IButtonProps`                                      | `dismiss` props                                                        |
| style overrides              | `styles?: IStyleFunctionOrObject<...>`                                 | className, slot classNames                                             |

## Native Props

Native props following standard behavior in both libraries + `v9`:

- `disabled?: boolean`
- `readOnly?: boolean`
- `autoComplete?: string`
- and most other native props not specified
