# RFC: Global styles

---

@miroslavstastny

## Summary

Fluent UI Converged components' styles expect global styles to be set. This RFC proposes how those global styles will be injected into DOM.

## Background

There are two kinds of global (not owned by a component) styles which the converged components depend on - **CSS resets** and **Theme root styles**.

### Theme root styles

## Detailed Design or Proposal

### CSS resets

Converged components depend on Normalize.css for CSS resets. Fluent UI needs to provide a way how an application can inject the Normalize styles in each `window` instance.

Both v7/v8 and v0/northstar components require Normalize.css as well. During a transition phase, converged components will be used side by side with existing components. In these cases Normalize.css will be handled out of converged components, therefore converged must have a possibility to opt-out of injecting the Normalize.

**Proposal is to create a `CSSBaseline` component which will inject Normalize globally on the window.**

It is application's responsibility to instantiate the component wherever needed.

This is similar to [MaterialUI's CSSBaseline component](https://material-ui.com/components/css-baseline/).

### Theme root styles

Theme global styles must be applied to the whole application (sub)tree the theme is applied to.
These are:

- foreground color
- background color
- font family, size and weight for default text

As Fluent UI supports multiple themes to coexist both side-by-side and nested, these Theme root styles cannot be applied globally.

Each `Provider` already creates a `div` and injects tokens as CSS variables on this div.

**Proposal is for the `Provider` to set theme root styles on this div as well.**

## Open Issues

- Where will the `CSSBaseline` component take the `window` from? If from context, then it must be inside a `Provider` tree.

- If there will be a requirement to have element styles in `Theme root styles` (like font weight for `<b>`), how would we do that on a provider div? (as `.abcd b`?)
