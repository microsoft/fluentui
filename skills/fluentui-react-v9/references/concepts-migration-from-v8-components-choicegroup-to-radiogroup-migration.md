# ChoiceGroup to RadioGroup Migration

Fluent UI v8 provides the `ChoiceGroup` control for presenting a list of radio options. In Fluent UI v9 `ChoiceGroup` is replaced with `RadioGroup`.

While there are several differences between these controls, the primary change is that `RadioGroup` accepts its options as child `Radio` components while `ChoiceGroup` accepts options via its `options` prop.

## Examples

### Basic Migration

Basic usage of `ChoiceGroup` looks like

An equivalent `RadioGroup` usage is

### Custom Option Rendering Migration

Since `RadioGroup` accepts options as children, options may be directly customized without the use of v8's `onRenderField` callback.

`ChoiceGroup` `onRenderField` callback for customization:

An equivalent `RadioGroup` implementation:

## Prop Mapping

This table maps v8 `ChoiceGroup` props to the v9 `RadioGroup` equivalent.

| v8                   | v9                    | Notes                                                                |
| -------------------- | --------------------- | -------------------------------------------------------------------- |
| `componentRef`       | `ref`                 | v9 provides access to the underlyig DOM node, not IChoiceGroup       |
| `options`            | `children`            | v9 uses React `children` rather than data props                      |
| `defaultSelectedKey` | `defaultValue`        | Mutually exclusive with `value`                                      |
| `selectedKey`        | `value`               | Mutually exclusive with `defaultValue`                               |
| `onChange`           | `onChange`            | The Typescript types have changed in v9                              |
| `label`              | Use `Label` component | Be sure to associate `Label` with `RadioGroup` via `aria-labelledby` |
| `theme`              | n/a                   | Use `FluentProvider` to customize themes                             |
| `styles`             | `className`           |                                                                      |
| `ariaLabelledBy`     | `aria-labelledby`     | In v9 this is the intrinsic HTML prop                                |

This table maps v8 `IChoiceGroupOption` props to the v9 `Radio` equivalent.

| v8                 | v9           | Notes                                                                                                          |
| ------------------ | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `key`              | `key`        | This is only necessary if you `.map()` an array to generate the list of `Radio`s.                              |
| `text`             | `label`      | In v9 this is a slot so this prop can be a string, a component or a shorthand object                           |
| `onRenderField`    | n/a          | Provide a custom child to `RadioGroup`                                                                         |
| `onRenderLabel`    | `label`      | Provide a custom component to the `label` slot                                                                 |
| `iconProps`        | n/a          | Use slots to customize `Radio`                                                                                 |
| `imageSrc`         | n/a          | Use slots to customize `Radio`                                                                                 |
| `imageAlt`         | n/a          | Use slots to customize `Radio`                                                                                 |
| `selectedImageSrc` | n/a          | Use slots to customize `Radio`                                                                                 |
| `imageSize`        | n/a          | Use slots to customize `Radio`                                                                                 |
| `disabled`         | `disabled`   |                                                                                                                |
| `id`               | `id`         | In v9 this is the intrinsic HTML prop                                                                          |
| `labeldId`         | n/a          | Provide an id to the `label` slot via shorthand props or a custom component                                    |
| `ariaLabel`        | `aria-label` | In v9 this is the intrinsic HTML prop                                                                          |
| `styles`           | `className`  |                                                                                                                |
| `itemKey`          | n/a          |                                                                                                                |
| `checked`          | `checked`    | When used in a `RadioGroup` use the `value` prop on `RadioGroup` instead                                       |
| `onChange`         | `onChange`   | Typescript types have changed                                                                                  |
| `onFocus`          | `onFocus`    | v9 uses native `onFocus`                                                                                       |
| `onBlur`           | `onBlur`     | v9 uses native `onBlur`                                                                                        |
| `focused`          | n/a          |                                                                                                                |
| `theme`            | n/a          | Use `FluentProvider` to customize themes                                                                       |
| `required`         | `required`   |                                                                                                                |
| `name`             | `name`       | v9 uses native HTML prop. When used in a `RadioGroup` this prop is inherited from the `RadioGroup` by default. |
