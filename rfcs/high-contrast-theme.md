# RFC: High Contrast theme

---

_List contributors to the proposal here_: @miroslavstastny

## Summary

High contrast theme should use system colors if user enables forced colors in their Windows settings.

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

`react-components` support High Contrast theme. There are currently two problems with the theme:

1. Even if user configures their Windows to use high contrast, they need to explicitly set High Contrast (HC) theme in Fluent UI (FUI) application.
2. Fluent UI High Contrast theme uses colors chosen by designers. Those are always light on dark with hardcoded colors - users cannot choose to use dark on light HC theme or customise the colors used - this might limit users with specific visual impairments.

This RFC does not address the first issue - after the change, users will still need to opt-in to use HC theme in FUI application. This can be discussed and addressed in a separate RFC.

The main topic of the RFC is the second issue - HC FUI theme driven by System HC color theme.

## Detailed Design or Proposal

### Windows implementation

In Windows 10 (version 1909) user can enable HC theme in system settings and also customize colors used. These settings are reflected in modern browsers (tested in Chrome 89 and Edge 89) by using `forced-colors` and `prefers-color-scheme` media queries:

```css
@media (forced-colors: active) {
  /* HC is enabled in Windows */

  @media (prefers-color-scheme: light) {
    /* The HC theme is dark on light */
  }

  @media (prefers-color-scheme: dark) {
    /* The HC theme is light on dark */
  }
}
```

More details are available in [Edge blog: Styling for Windows high contrast with new standards for forced colors](https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors/).

Besides the media query, [CSS system colors](https://www.w3.org/TR/css-color-4/#css-system-colors) are set to match the colors defined by the HC theme. User can customize following colors which are then used to theme the UI:

- `CanvasText`
- `Canvas`
- `LinkText`
- `GrayText`
- `HighlightText`
- `Highlight`
- `ButtonText`
- `ButtonFace`

#### High Contrast Black (Windows built-in, matches FUI HC theme)

![Black High contrast theme screenshot](assets/high-contrast-theme-black.png)

#### High Contrast White (Windows built-in)

![White High contrast theme screenshot](assets/high-contrast-theme-white.png)

#### High Contrast with custom user-defined colors

![Custom High contrast theme screenshot](assets/high-contrast-theme-custom.png)

The screenshots are from a [codesandbox showing the usage of CSS system colors](https://codesandbox.io/s/high-contrast-1usny?file=/index.html) to render the same layout as Windows settings dialog for HC.

### Implementation in FUI theme

Current HC FUI theme uses the following five colors - `white`, `black`, `hyperlink`, `disabled`, `selected`:
![Current HC colors](assets/high-contrast-theme-current-colors.png).

A simple solution would be to create five new color tokens and, using a combination of `forced-colors` media query and css variables, map them to the FUI colors if `forced-colors` are not active and to system colors if `forced-colors` are active.
After discussion with design, we decided to use all the eight colors currently available in Windows High Contrast theme. That adds HighlightText, ButtonText and ButtonFace to the 5 colors which are currently used in the high contrast theme.

#### Mapping table

| Token        | FUI color     | System color  |
| ------------ | ------------- | ------------- |
| hcCanvas     | black         | Canvas        |
| hcCanvasText | white         | CanvasText    |
| hcHyperlink  | hyperlink     | LinkText      |
| hcDisabled   | disabled      | GrayText      |
| hcSelected   | selected      | Highlight     |
| tbd          | not available | HighlightText |
| tbd          | not available | ButtonText    |
| tbd          | not available | ButtonFace    |

#### Example code

```css
/* FUI colors */
:root {
  --global-color-hc-canvas: var(--global-color-black); /* #000000 */
  --global-color-hc-canvas-text: var(--global-color-white); /* #FFFFFF */
  --global-color-hc-hyperlink: var(--global-color-hyperlink); /* #FFFF00 */
  --global-color-hc-disabled: var(--global-color-selected); /* #1AEBFF */
  --global-color-hc-selected: var(--global-color-disabled); /* #3FF23F */
}

@media (forced-colors: active) {
  /* System colors */
  :root {
    --global-color-hc-canvas: Canvas;
    --global-color-hc-canvas-text: CanvasText;
    --global-color-hc-hyperlink: LinkText;
    --global-color-hc-disabled: GrayText;
    --global-color-hc-selected: Highlight;
  }
}
```

### Allowing custom colors

When HC theme is enabled in Windows, browsers enforce the system colors based on semantics. In that case styling options are quite limited. To avoid the limitation, a web application can set `forced-color-adjust: none` CSS property. FUI theme will set it on its root.

### Other operating systems

Only Windows currently supports High Contrast theme with user defined colors and `forced-colors` media query. High contrast theme with system colors will be only supported on Windows.
