# Textarea Migration

Fluent UI Northstar (v0) provides the `TextArea` control to allow users to enter and edit multi-line text. Fluent UI v9 provides a `Textarea` control, but has a different API.

## Examples

### Basic Migration

Basic usage of `TextArea` v0

An equivalent `Textarea` in v9 is

## Props Mapping

This table maps `TextArea` v0 props to the `Textarea` v9 equivalent.

| v0              | v9             | Notes                                              |
| --------------- | -------------- | -------------------------------------------------- |
| `accessibility` | n/a            |                                                    |
| `as`            | n/a            |                                                    |
| `className`     | `className`    |                                                    |
| `defaultValue`  | `defaultValue` | Mutually exclusive with `value`                    |
| `design`        | n/a            |                                                    |
| `disabled`      | `disabled`     |                                                    |
| `error`         | n/a            |                                                    |
| `fluid`         | n/a            |                                                    |
| `inverted`      | `appearance`   | The equivalent appearance would be `filledLighter` |
| `key`           | `key`          |                                                    |
| `onChange`      | `onChange`     |                                                    |
| `ref`           | `ref`          |                                                    |
| `required`      | `required`     |                                                    |
| `resize`        | `resize`       |                                                    |
| `styles`        | `className`    |                                                    |
| `value`         | `value`        | Mutually exclusivewith `defaultValue`              |
| `variables`     | n/a            | Use `FluentProvider` to customize themes           |
