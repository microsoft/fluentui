# Label Migration

Fluent UI v8 provides the `Label` control that gives a name or title to a control or group of controls. Fluent UI v9 also provides a `Label` with a slightly different API.

The main difference with v8's and v9's `Label` is that v9 allows the user to use a custom indicator.

## Examples

### Basic Migration

Basic usage of `Label` v8

An equivalent `Label` in v9 is

## Prop Mapping

This table maps `Label` v8 props to the `Label` v9 equivalent.

| v8             | v9          | Notes                                    |
| -------------- | ----------- | ---------------------------------------- |
| `as`           | n/a         |                                          |
| `componentRef` | `ref`       |                                          |
| `disabled`     | `disabled`  |                                          |
| `required`     | `required`  |                                          |
| `styles`       | `className` |                                          |
| `theme`        | n/a         | use `FluentProvider` to customize themes |
