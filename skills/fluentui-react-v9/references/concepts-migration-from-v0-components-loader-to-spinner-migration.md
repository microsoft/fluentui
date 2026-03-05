# Loader Migration

Fluent UI Northstar (v0) provides the `Loader` control to allow users to indicate that content is being loaded on the screen. Fluent UI v9 provides a `Spinner` control with a different API.

## Examples

### Basic Migration

Basic usage of `Loader` v0

An equivalent `Spinner` in v9 is

## Props Mapping

This table maps `Loader` v0 props to the `Spinner` v9 equivalent.

| v0              | v9              | Notes                                    |
| --------------- | --------------- | ---------------------------------------- |
| `accessibility` | n/a             |                                          |
| `as`            | n/a             |                                          |
| `className`     | `className`     |                                          |
| `delay`         | n/a             |                                          |
| `design`        | n/a             |                                          |
| `indicator`     | n/a             |                                          |
| `inline`        | n/a             |                                          |
| `label`         | `label`         |                                          |
| `labelPosition` | `labelPosition` | Default changes from `below` to 'after'  |
| `size`          | `size`          |                                          |
| `styles`        | `className`     |                                          |
| `svg`           | n/a             |                                          |
| `variables`     | n/a             | Use `FluentProvider` to customize themes |
