# Spinner Migration

Fluent UI V8 provides the `Spinner` control to allow users to indicate that content is being loaded on the screen. Fluent UI v9 provides a `Spinner` control with a different API.

## Examples

### Basic Migration

Basic usage of `Spinner` V8

An equivalent `Spinner` in v9 is

## Props Mapping

This table maps `Spinner` v8 props to the `Spinner` v9 equivalent.

| v8              | v9              | Notes                                    |
| --------------- | --------------- | ---------------------------------------- |
| `aria-label`    | n/a             |                                          |
| `aria-live`     | n/a             |                                          |
| `className`     | `className`     |                                          |
| `componentRef`  | n/a             |                                          |
| `label`         | `label`         |                                          |
| `labelPosition` | `labelPosition` | Default changes from `bottom` to 'after' |
| `size`          | `size`          |                                          |
| `styles`        | `className`     |                                          |
| `theme`         | n/a             | Use `FluentProvider` to customize themes |
