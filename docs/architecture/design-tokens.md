# Design Tokens

## Rule

**Always use design tokens** from `@fluentui/react-theme` instead of hardcoded values.
Hardcoded values break theming, high contrast mode, and dark mode.

## Token Categories

| Category | Example tokens | Use for |
|----------|---------------|---------|
| Color | `tokens.colorNeutralForeground1`, `tokens.colorBrandBackground` | All colors |
| Spacing | `tokens.spacingVerticalM`, `tokens.spacingHorizontalL` | Padding, margin, gap |
| Border radius | `tokens.borderRadiusMedium`, `tokens.borderRadiusLarge` | Border radius |
| Font | `tokens.fontSizeBase300`, `tokens.fontWeightSemibold` | Typography |
| Line height | `tokens.lineHeightBase300` | Line height |
| Stroke | `tokens.strokeWidthThin`, `tokens.strokeWidthThick` | Border width |
| Shadow | `tokens.shadow4`, `tokens.shadow16` | Box shadow |
| Duration | `tokens.durationNormal`, `tokens.durationFast` | Animations |
| Easing | `tokens.curveEasyEase` | Animation timing |

## Examples

```tsx
// CORRECT — uses semantic design tokens
color: tokens.colorBrandForeground1;
padding: tokens.spacingVerticalM;
borderRadius: tokens.borderRadiusMedium;
fontSize: tokens.fontSizeBase300;
boxShadow: tokens.shadow4;

// WRONG — hardcoded values break theming
color: '#0078d4';
padding: '8px';
borderRadius: '4px';
fontSize: '14px';
boxShadow: '0 2px 4px rgba(0,0,0,0.1)';
```

## Theme Architecture

Themes define CSS custom properties consumed by components:

```tsx
// FluentProvider injects CSS variables into DOM
<FluentProvider theme={webLightTheme}>
  <App />
</FluentProvider>

// Tokens resolve to CSS variables at build time
makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    // becomes: 'var(--colorNeutralForeground1)'
  },
});
```

## Available Themes

- `webLightTheme` — Default light
- `webDarkTheme` — Default dark
- `teamsLightTheme` / `teamsDarkTheme` / `teamsHighContrastTheme` — Teams variants
