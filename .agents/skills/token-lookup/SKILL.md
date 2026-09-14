---
name: token-lookup
description: Find the matching Fluent UI design token for a hardcoded CSS value (color, spacing, font size, border radius, shadow)
argument-hint: <css-value>
allowed-tools: Read Grep Glob
---

# Design Token Lookup

Find the correct `@fluentui/react-theme` design token for the hardcoded value **$ARGUMENTS**.

## Steps

1. **Identify the value category:**

   - Hex color / rgb / named color → color tokens
   - px/rem spacing → spacing tokens
   - px/rem font size → font size tokens
   - px/rem border radius → border radius tokens
   - Font weight (400, 600, bold) → font weight tokens
   - Box shadow → shadow tokens
   - Border width → stroke width tokens
   - Duration (ms/s) → duration tokens

2. **Search the theme source** for matching values:

   ```
   packages/react-components/react-theme/library/src/
   ```

   Look in the relevant theme files (e.g., `colorPalette*.ts`, `global/`, `alias/`) to find tokens that map to the given value.

3. **Return the token name and usage:**

   ```tsx
   // Instead of: color: '#0078d4'
   // Use:
   import { tokens } from '@fluentui/react-theme';
   color: tokens.colorBrandBackground;
   ```

4. **If no exact match exists**, suggest the closest semantic token and explain the difference. Refer to [docs/architecture/design-tokens.md](docs/architecture/design-tokens.md) for token categories.

## Common Mappings

| Hardcoded           | Token                                                    |
| ------------------- | -------------------------------------------------------- |
| `#0078d4`           | `tokens.colorBrandBackground`                            |
| `#323130`           | `tokens.colorNeutralForeground1`                         |
| `#ffffff`           | `tokens.colorNeutralBackground1`                         |
| `4px` border-radius | `tokens.borderRadiusMedium`                              |
| `8px` padding       | `tokens.spacingHorizontalS` or `tokens.spacingVerticalS` |
| `14px` font-size    | `tokens.fontSizeBase300`                                 |
| `600` font-weight   | `tokens.fontWeightSemibold`                              |

These are approximate — always verify against the actual theme source.
