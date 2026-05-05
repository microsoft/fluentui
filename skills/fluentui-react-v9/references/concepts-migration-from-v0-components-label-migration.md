# Label Migration

Fluent UI Northstar (v0) provides the `Label` control to allow users to classify content. Fluent UI v9 also provides a `Label`, but has a different API.

The main difference with v0's and v9's `Label` is that v9 doesn't provide an image and icon prop. v9 also accepts a custom required indicator that can be a string or JSX element.

## Examples

### Basic Migration

Basic usage of `Label` v0

An equivalent `Label` in v9 is

## Prop Mapping

This table maps `Label` v0 props to the `Label` v9 equivalent.

| v0              | v9          | Notes                                          |
| --------------- | ----------- | ---------------------------------------------- |
| `accessibility` | n/a         |                                                |
| `as`            | n/a         |                                                |
| `circular`      | n/a         |                                                |
| `className`     | `className` |                                                |
| `color`         | `className` | use `className` to customize color             |
| `content`       | `children`  | v9 uses React `children` instead of data props |
| `design`        | n/a         |                                                |
| `fluid`         | n/a         |                                                |
| `icon`          | n/a         |                                                |
| `iconPosition`  | n/a         |                                                |
| `image`         | n/a         |                                                |
| `imagePosition` | n/a         |                                                |
| `key`           | `key`       | v9 uses the intrinsic React prop               |
| `ref`           | `ref`       |                                                |
| `styles`        | `className` |                                                |
| `variables`     | n/a         | Use `FluentProvider` to customize themes       |
