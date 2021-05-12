# RFC: Inserting Theme CSS Vars

@ling1726 @layershifter

## Summary

React Portals are often used for components like Tooltips, Dialogs and Popups to render elements out of the DOM order to avoid overflow and clipping issues. However, current theme styling through CSS variables makes it impossible to style portals without wrapping a new `ThemeProvider` around each Portal

This RFC considers some alternative ways of writing Theme CSS variables so that Portals (and any element) on the page can access `Theme` values without requiring a new `ThemeProvider` if no new theme is required.

## Problem Statement

### Inline styles (Current solution)

Simply rendering all css variables as inline styles onto the DOM element

**_CSS variables can only be used by DOM children - not good in the case of React portals_**

```tsx
<div style={{...cssVars}}>
    // happy can inherit CSS variables
</div>

// React.createPortal()
// no theme values here ⚠
<div id="tooltip" />
```

To get around this we would need to render a `ThemeProvider` for each `Portal`

```tsx
<Portal>
    <ThemeProvider> // writes CSS vars inline again
        <div id="tooltip"> /
    </ThemeProvider>
</Portal>
```

## Detailed Design or Proposal

### Possible solutions

#### Inserting styles to `document.head`

Each `ThemeProvider` will create a style tag and insers all css vars as a single CSS rule for a CSS class unique to that `ThemeProvider`

The classname will be passed down through context to children and can be useful for Portals which can't consume CSS variables from DOM parents if `Inline` insertion is used

```tsx
const cssVars = themeToCssVars(theme);
const cssRule = {...};
// result: .theme-provider { --css-var: '#fff' }
styleEl.sheet.insertRule(cssRule);

<head>
  <style id="theme-provider-1" />
  <style id="theme-provider-2" />
  <style id="theme-provider-3" />
</head>
```

```tsx
<Portal className="theme-provider-1">
    <div id="tooltip"> // can use theme \o/
</Portal>
```

#### Inheriting parent cssVars

Compares current `Theme` with parent `Theme` and only adds the CSS variables that are different to the parent `Theme`.

Now each subsequent layer of `ThemeProvider` will need to use the CSS class rule of all of its parents.

```tsx
const cssVars = themeToCssVars(theme);
const parentCssVars = themeToCssVars(parentTheme);
const diff = diff(cssVars, parentCssVars)
const cssRule = {...};
// result: .theme-provider { --css-var: '#fff' }
styleEl.sheet.insertRule(cssRule);

<head>
  <style id="theme-provider-1" />
  <style id="theme-provider-2" />
  <style id="theme-provider-3" />
</head>


<div class="theme-provider-1">
    <div class="theme-provider-1 theme-provider-2">
        <div class="theme-provider-1 theme-provider-2 theme-provider-3">
        </div>
    </div>
</div>
```

#### Inheriting parent cssVars and reusing style tag

Same as above except all `ThemeProviders` now share `<style />` tag

```tsx
const cssVars = themeToCssVars(theme);
const parentCssVars = themeToCssVars(parentTheme);
const diff = diff(cssVars, parentCssVars)
const cssRule = {...};
// result: .theme-provider { --css-var: '#fff' }
styleEl.sheet.insertRule(cssRule);

<head>
  <style id="the one" />
</head>


<div class="theme-provider-1">
    <div class="theme-provider-1 theme-provider-2">
        <div class="theme-provider-1 theme-provider-2 theme-provider-3">
        </div>
    </div>
</div>
```

### Performance benchmark

- Single theme - all providers use the same theme
- Alternating - First provider uses `webLight`, next provider uses `webDark`

> Each test renders ~640 theme providers
> [Uses this benchmark tool](https://github.com/necolas/react-native-web/tree/master/packages/benchmarks)

| Insertion method     | Variation    | Render count | Value (ms) | Deviation (ms) | Style (ms) | Layout (ms) |
| -------------------- | ------------ | ------------ | ---------- | -------------- | ---------- | ----------- |
| inline               | Single theme | 7            | 3027.39    | 523.03         | 2772.32    | 255.07      |
| inline               | Alternating  | 7            | 3365.01    | 969.08         | 3129.91    | 235.09      |
| head                 | Single theme | 11           | 1789.14    | 197.76         | 1486.51    | 302.63      |
| head                 | Alternating  | 11           | 1815.63    | 173.24         | 1503.68    | 311.95      |
| head - inherit       | Single theme | 16           | 1225.44    | 107.33         | 901.59     | 323.85      |
| head - inherit       | Alternating  | 10           | 2028.33    | 221.57         | 1398.72    | 629.61      |
| head - reuse inherit | Single theme | 15           | 1156.81    | 164.47         | 917.48     | 239.33      |
| head - reuse inherit | Alternating  | 12           | 1777.92    | 211.32         | 1280.3     | 497.19      |

### Proposed Solution

Simply `Inserting styles to document.head` has enough performance. The optimizations offered by inheriting parent CSS variables and sharing `style` elements do provide visible improvements in the test benchmark, but the differences are not great enough for the problem set (640 ThemeProviders) to justify adding those more complicated optimizations yet.

## Pros and Cons

### Pros

- As long as a component is a part of the React tree it is possible to use theme CSS variables without using a new `ThemeProvider`
- Can be optimized in the future relatively easily

### Cons

- Not the most optimized solution
- More complicated - must handle cleanup of `style` elements
- More complicated - `ThemeProvider` components need to have unique classnames
- More complicated - An extra React context to pass down classNames
