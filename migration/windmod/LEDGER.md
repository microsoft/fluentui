# Ledger

Status flow: `planned` → `pilot` → `audited` → `converted` → `validated` (zero-tolerance VR vs Griffel suite).

## Infra

| Item                                   | Status  | Notes                                       |
| -------------------------------------- | ------- | ------------------------------------------- |
| Branch styling/react-windmod           | done    | off master 06cbcbe0b1                       |
| PLAN.md committed                      | done    |                                             |
| react-tailwind-theme-preview port      | planned | source: branch styling/tailwind-css-modules |
| react-windmod-preview scaffold         | planned | library/ + stories/                         |
| ThemeProvider                          | planned | display:contents, verified viable           |
| Stories Storybook + Tailwind v4 wiring | planned |                                             |
| VR harness adaptation                  | planned | after pilot review                          |

## Components (pilot)

| Component | Status | Notes                                                |
| --------- | ------ | ---------------------------------------------------- |
| Button    | pilot  | variants w/o data-* (appearance/size/shape)          |
| Tooltip   | pilot  | top-layer popover=hint + positioning + ThemeProvider |

## Components (remaining headless coverage)

Not yet enumerated — Phase 2 audit populates this section from the headless
export map (~53 components).
