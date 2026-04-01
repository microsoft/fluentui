# AgentCraftworks FluentUI Theme

Shared brand theme for all AgentCraftworks surfaces (website, Hub, dashboard, VS Code extension webviews).

## Setup

1. Open the [Fluent Theme Designer](https://react.fluentui.dev/?path=/docs/themedesigner--docs)
2. Enter key color `#0C6FD1`, Hue Torsion `0`, Vibrancy `0`
3. Set theme name to `themeAgentCraftworks`
4. Click **Export**
5. Paste the exported `BrandVariants` values into `brand.ts` (replace the placeholder `#000000` values)

## Files

| File | Purpose |
|------|---------|
| `brand.ts` | Theme Designer export — 16-step brand ramp + base light/dark themes |
| `theme.ts` | Semantic overrides (AgentCraftworks colors) + high-contrast theme |
| `index.ts` | Public exports — import from here |

## Usage

```tsx
import { FluentProvider } from '@fluentui/react-components';
import { lightTheme, darkTheme } from '../path-to-fork/agentcraftworks';

function App() {
  return (
    <FluentProvider theme={lightTheme}>
      {/* Your app */}
    </FluentProvider>
  );
}
```

## Brand Colors

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Brand primary | `#0c6fd1` | `#1a80e0` | Confident blue |
| Accent | `#8029D6` | `#9238E0` | Purple (from logo) |
| Foreground | `#102f5e` | `#d6dbe4` | Text |
| Background | `#fafbfc` | `#090c14` | Page background |
