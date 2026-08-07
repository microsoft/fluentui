# Design-token CSS variable rename map (Phases 1 + 2a)

Single-vocabulary rename (option B, settled with user): the old camelCase CSS custom
properties cease to exist; every token’s canonical variable is kebab-case and aligned
with the Tailwind v4 theme namespace the token registers under. `tokens.*` JS constants
read the canonical names. Machine-readable source: `token-rename-map.json` (same rows).

| #   | Family                  | Tokens | Canonical namespace                                                      |
| --- | ----------------------- | -----: | ------------------------------------------------------------------------ |
| 1   | Colors                  |    216 | `--color-*`                                                              |
| 2   | Palette colors          |    150 | `--color-palette-*`                                                      |
| 3   | Font families           |      3 | `--font-*`                                                               |
| 4   | Font sizes              |     10 | `--text-*`                                                               |
| 5   | Font weights            |      4 | `--font-weight-*`                                                        |
| 6   | Line heights            |     10 | `--leading-*`                                                            |
| 7   | Border radii            |     11 | `--radius-*`                                                             |
| 8   | Shadows                 |     12 | `--shadow-*`                                                             |
| 9   | Easing curves           |      9 | `--ease-*`                                                               |
| 10  | Durations               |      8 | `--duration-* (custom namespace; @theme key is --transition-duration-*)` |
| 11  | z-index                 |      8 | `--z-index-* (fallback carried in tokens.*)`                             |
| 12  | Spacing (Phase 1)       |     22 | `--spacing-horizontal-* / --spacing-vertical-*`                          |
| 13  | Stroke widths (Phase 1) |      4 | `--stroke-width-*`                                                       |

Total: 467 tokens (26 Phase 1, 441 Phase 2a).

## Colors (216) — `--color-*`

| Token                                        | Old CSS variable                               | New CSS variable                                    |
| -------------------------------------------- | ---------------------------------------------- | --------------------------------------------------- |
| `colorNeutralForeground1`                    | `--colorNeutralForeground1`                    | `--color-neutral-foreground-1`                      |
| `colorNeutralForeground1Hover`               | `--colorNeutralForeground1Hover`               | `--color-neutral-foreground-1-hover`                |
| `colorNeutralForeground1Pressed`             | `--colorNeutralForeground1Pressed`             | `--color-neutral-foreground-1-pressed`              |
| `colorNeutralForeground1Selected`            | `--colorNeutralForeground1Selected`            | `--color-neutral-foreground-1-selected`             |
| `colorNeutralForeground2`                    | `--colorNeutralForeground2`                    | `--color-neutral-foreground-2`                      |
| `colorNeutralForeground2Hover`               | `--colorNeutralForeground2Hover`               | `--color-neutral-foreground-2-hover`                |
| `colorNeutralForeground2Pressed`             | `--colorNeutralForeground2Pressed`             | `--color-neutral-foreground-2-pressed`              |
| `colorNeutralForeground2Selected`            | `--colorNeutralForeground2Selected`            | `--color-neutral-foreground-2-selected`             |
| `colorNeutralForeground2BrandHover`          | `--colorNeutralForeground2BrandHover`          | `--color-neutral-foreground-2-brand-hover`          |
| `colorNeutralForeground2BrandPressed`        | `--colorNeutralForeground2BrandPressed`        | `--color-neutral-foreground-2-brand-pressed`        |
| `colorNeutralForeground2BrandSelected`       | `--colorNeutralForeground2BrandSelected`       | `--color-neutral-foreground-2-brand-selected`       |
| `colorNeutralForeground3`                    | `--colorNeutralForeground3`                    | `--color-neutral-foreground-3`                      |
| `colorNeutralForeground3Hover`               | `--colorNeutralForeground3Hover`               | `--color-neutral-foreground-3-hover`                |
| `colorNeutralForeground3Pressed`             | `--colorNeutralForeground3Pressed`             | `--color-neutral-foreground-3-pressed`              |
| `colorNeutralForeground3Selected`            | `--colorNeutralForeground3Selected`            | `--color-neutral-foreground-3-selected`             |
| `colorNeutralForeground3BrandHover`          | `--colorNeutralForeground3BrandHover`          | `--color-neutral-foreground-3-brand-hover`          |
| `colorNeutralForeground3BrandPressed`        | `--colorNeutralForeground3BrandPressed`        | `--color-neutral-foreground-3-brand-pressed`        |
| `colorNeutralForeground3BrandSelected`       | `--colorNeutralForeground3BrandSelected`       | `--color-neutral-foreground-3-brand-selected`       |
| `colorNeutralForeground4`                    | `--colorNeutralForeground4`                    | `--color-neutral-foreground-4`                      |
| `colorNeutralForeground5`                    | `--colorNeutralForeground5`                    | `--color-neutral-foreground-5`                      |
| `colorNeutralForeground5Hover`               | `--colorNeutralForeground5Hover`               | `--color-neutral-foreground-5-hover`                |
| `colorNeutralForeground5Pressed`             | `--colorNeutralForeground5Pressed`             | `--color-neutral-foreground-5-pressed`              |
| `colorNeutralForeground5Selected`            | `--colorNeutralForeground5Selected`            | `--color-neutral-foreground-5-selected`             |
| `colorNeutralForegroundDisabled`             | `--colorNeutralForegroundDisabled`             | `--color-neutral-foreground-disabled`               |
| `colorBrandForegroundLink`                   | `--colorBrandForegroundLink`                   | `--color-brand-foreground-link`                     |
| `colorBrandForegroundLinkHover`              | `--colorBrandForegroundLinkHover`              | `--color-brand-foreground-link-hover`               |
| `colorBrandForegroundLinkPressed`            | `--colorBrandForegroundLinkPressed`            | `--color-brand-foreground-link-pressed`             |
| `colorBrandForegroundLinkSelected`           | `--colorBrandForegroundLinkSelected`           | `--color-brand-foreground-link-selected`            |
| `colorNeutralForeground2Link`                | `--colorNeutralForeground2Link`                | `--color-neutral-foreground-2-link`                 |
| `colorNeutralForeground2LinkHover`           | `--colorNeutralForeground2LinkHover`           | `--color-neutral-foreground-2-link-hover`           |
| `colorNeutralForeground2LinkPressed`         | `--colorNeutralForeground2LinkPressed`         | `--color-neutral-foreground-2-link-pressed`         |
| `colorNeutralForeground2LinkSelected`        | `--colorNeutralForeground2LinkSelected`        | `--color-neutral-foreground-2-link-selected`        |
| `colorCompoundBrandForeground1`              | `--colorCompoundBrandForeground1`              | `--color-compound-brand-foreground-1`               |
| `colorCompoundBrandForeground1Hover`         | `--colorCompoundBrandForeground1Hover`         | `--color-compound-brand-foreground-1-hover`         |
| `colorCompoundBrandForeground1Pressed`       | `--colorCompoundBrandForeground1Pressed`       | `--color-compound-brand-foreground-1-pressed`       |
| `colorNeutralForegroundOnBrand`              | `--colorNeutralForegroundOnBrand`              | `--color-neutral-foreground-on-brand`               |
| `colorNeutralForegroundInverted`             | `--colorNeutralForegroundInverted`             | `--color-neutral-foreground-inverted`               |
| `colorNeutralForegroundInvertedHover`        | `--colorNeutralForegroundInvertedHover`        | `--color-neutral-foreground-inverted-hover`         |
| `colorNeutralForegroundInvertedPressed`      | `--colorNeutralForegroundInvertedPressed`      | `--color-neutral-foreground-inverted-pressed`       |
| `colorNeutralForegroundInvertedSelected`     | `--colorNeutralForegroundInvertedSelected`     | `--color-neutral-foreground-inverted-selected`      |
| `colorNeutralForegroundInverted2`            | `--colorNeutralForegroundInverted2`            | `--color-neutral-foreground-inverted-2`             |
| `colorNeutralForegroundStaticInverted`       | `--colorNeutralForegroundStaticInverted`       | `--color-neutral-foreground-static-inverted`        |
| `colorNeutralForegroundInvertedLink`         | `--colorNeutralForegroundInvertedLink`         | `--color-neutral-foreground-inverted-link`          |
| `colorNeutralForegroundInvertedLinkHover`    | `--colorNeutralForegroundInvertedLinkHover`    | `--color-neutral-foreground-inverted-link-hover`    |
| `colorNeutralForegroundInvertedLinkPressed`  | `--colorNeutralForegroundInvertedLinkPressed`  | `--color-neutral-foreground-inverted-link-pressed`  |
| `colorNeutralForegroundInvertedLinkSelected` | `--colorNeutralForegroundInvertedLinkSelected` | `--color-neutral-foreground-inverted-link-selected` |
| `colorNeutralForegroundInvertedDisabled`     | `--colorNeutralForegroundInvertedDisabled`     | `--color-neutral-foreground-inverted-disabled`      |
| `colorBrandForeground1`                      | `--colorBrandForeground1`                      | `--color-brand-foreground-1`                        |
| `colorBrandForeground2`                      | `--colorBrandForeground2`                      | `--color-brand-foreground-2`                        |
| `colorBrandForeground2Hover`                 | `--colorBrandForeground2Hover`                 | `--color-brand-foreground-2-hover`                  |
| `colorBrandForeground2Pressed`               | `--colorBrandForeground2Pressed`               | `--color-brand-foreground-2-pressed`                |
| `colorNeutralForeground1Static`              | `--colorNeutralForeground1Static`              | `--color-neutral-foreground-1-static`               |
| `colorBrandForegroundInverted`               | `--colorBrandForegroundInverted`               | `--color-brand-foreground-inverted`                 |
| `colorBrandForegroundInvertedHover`          | `--colorBrandForegroundInvertedHover`          | `--color-brand-foreground-inverted-hover`           |
| `colorBrandForegroundInvertedPressed`        | `--colorBrandForegroundInvertedPressed`        | `--color-brand-foreground-inverted-pressed`         |
| `colorBrandForegroundOnLight`                | `--colorBrandForegroundOnLight`                | `--color-brand-foreground-on-light`                 |
| `colorBrandForegroundOnLightHover`           | `--colorBrandForegroundOnLightHover`           | `--color-brand-foreground-on-light-hover`           |
| `colorBrandForegroundOnLightPressed`         | `--colorBrandForegroundOnLightPressed`         | `--color-brand-foreground-on-light-pressed`         |
| `colorBrandForegroundOnLightSelected`        | `--colorBrandForegroundOnLightSelected`        | `--color-brand-foreground-on-light-selected`        |
| `colorNeutralBackground1`                    | `--colorNeutralBackground1`                    | `--color-neutral-background-1`                      |
| `colorNeutralBackground1Hover`               | `--colorNeutralBackground1Hover`               | `--color-neutral-background-1-hover`                |
| `colorNeutralBackground1Pressed`             | `--colorNeutralBackground1Pressed`             | `--color-neutral-background-1-pressed`              |
| `colorNeutralBackground1Selected`            | `--colorNeutralBackground1Selected`            | `--color-neutral-background-1-selected`             |
| `colorNeutralBackground2`                    | `--colorNeutralBackground2`                    | `--color-neutral-background-2`                      |
| `colorNeutralBackground2Hover`               | `--colorNeutralBackground2Hover`               | `--color-neutral-background-2-hover`                |
| `colorNeutralBackground2Pressed`             | `--colorNeutralBackground2Pressed`             | `--color-neutral-background-2-pressed`              |
| `colorNeutralBackground2Selected`            | `--colorNeutralBackground2Selected`            | `--color-neutral-background-2-selected`             |
| `colorNeutralBackground3`                    | `--colorNeutralBackground3`                    | `--color-neutral-background-3`                      |
| `colorNeutralBackground3Hover`               | `--colorNeutralBackground3Hover`               | `--color-neutral-background-3-hover`                |
| `colorNeutralBackground3Pressed`             | `--colorNeutralBackground3Pressed`             | `--color-neutral-background-3-pressed`              |
| `colorNeutralBackground3Selected`            | `--colorNeutralBackground3Selected`            | `--color-neutral-background-3-selected`             |
| `colorNeutralBackground4`                    | `--colorNeutralBackground4`                    | `--color-neutral-background-4`                      |
| `colorNeutralBackground4Hover`               | `--colorNeutralBackground4Hover`               | `--color-neutral-background-4-hover`                |
| `colorNeutralBackground4Pressed`             | `--colorNeutralBackground4Pressed`             | `--color-neutral-background-4-pressed`              |
| `colorNeutralBackground4Selected`            | `--colorNeutralBackground4Selected`            | `--color-neutral-background-4-selected`             |
| `colorNeutralBackground5`                    | `--colorNeutralBackground5`                    | `--color-neutral-background-5`                      |
| `colorNeutralBackground5Hover`               | `--colorNeutralBackground5Hover`               | `--color-neutral-background-5-hover`                |
| `colorNeutralBackground5Pressed`             | `--colorNeutralBackground5Pressed`             | `--color-neutral-background-5-pressed`              |
| `colorNeutralBackground5Selected`            | `--colorNeutralBackground5Selected`            | `--color-neutral-background-5-selected`             |
| `colorNeutralBackground6`                    | `--colorNeutralBackground6`                    | `--color-neutral-background-6`                      |
| `colorNeutralBackground7`                    | `--colorNeutralBackground7`                    | `--color-neutral-background-7`                      |
| `colorNeutralBackground7Hover`               | `--colorNeutralBackground7Hover`               | `--color-neutral-background-7-hover`                |
| `colorNeutralBackground7Pressed`             | `--colorNeutralBackground7Pressed`             | `--color-neutral-background-7-pressed`              |
| `colorNeutralBackground7Selected`            | `--colorNeutralBackground7Selected`            | `--color-neutral-background-7-selected`             |
| `colorNeutralBackground8`                    | `--colorNeutralBackground8`                    | `--color-neutral-background-8`                      |
| `colorNeutralBackgroundInverted`             | `--colorNeutralBackgroundInverted`             | `--color-neutral-background-inverted`               |
| `colorNeutralBackgroundInvertedHover`        | `--colorNeutralBackgroundInvertedHover`        | `--color-neutral-background-inverted-hover`         |
| `colorNeutralBackgroundInvertedPressed`      | `--colorNeutralBackgroundInvertedPressed`      | `--color-neutral-background-inverted-pressed`       |
| `colorNeutralBackgroundInvertedSelected`     | `--colorNeutralBackgroundInvertedSelected`     | `--color-neutral-background-inverted-selected`      |
| `colorNeutralBackgroundStatic`               | `--colorNeutralBackgroundStatic`               | `--color-neutral-background-static`                 |
| `colorNeutralBackgroundAlpha`                | `--colorNeutralBackgroundAlpha`                | `--color-neutral-background-alpha`                  |
| `colorNeutralBackgroundAlpha2`               | `--colorNeutralBackgroundAlpha2`               | `--color-neutral-background-alpha-2`                |
| `colorSubtleBackground`                      | `--colorSubtleBackground`                      | `--color-subtle-background`                         |
| `colorSubtleBackgroundHover`                 | `--colorSubtleBackgroundHover`                 | `--color-subtle-background-hover`                   |
| `colorSubtleBackgroundPressed`               | `--colorSubtleBackgroundPressed`               | `--color-subtle-background-pressed`                 |
| `colorSubtleBackgroundSelected`              | `--colorSubtleBackgroundSelected`              | `--color-subtle-background-selected`                |
| `colorSubtleBackgroundLightAlphaHover`       | `--colorSubtleBackgroundLightAlphaHover`       | `--color-subtle-background-light-alpha-hover`       |
| `colorSubtleBackgroundLightAlphaPressed`     | `--colorSubtleBackgroundLightAlphaPressed`     | `--color-subtle-background-light-alpha-pressed`     |
| `colorSubtleBackgroundLightAlphaSelected`    | `--colorSubtleBackgroundLightAlphaSelected`    | `--color-subtle-background-light-alpha-selected`    |
| `colorSubtleBackgroundInverted`              | `--colorSubtleBackgroundInverted`              | `--color-subtle-background-inverted`                |
| `colorSubtleBackgroundInvertedHover`         | `--colorSubtleBackgroundInvertedHover`         | `--color-subtle-background-inverted-hover`          |
| `colorSubtleBackgroundInvertedPressed`       | `--colorSubtleBackgroundInvertedPressed`       | `--color-subtle-background-inverted-pressed`        |
| `colorSubtleBackgroundInvertedSelected`      | `--colorSubtleBackgroundInvertedSelected`      | `--color-subtle-background-inverted-selected`       |
| `colorTransparentBackground`                 | `--colorTransparentBackground`                 | `--color-transparent-background`                    |
| `colorTransparentBackgroundHover`            | `--colorTransparentBackgroundHover`            | `--color-transparent-background-hover`              |
| `colorTransparentBackgroundPressed`          | `--colorTransparentBackgroundPressed`          | `--color-transparent-background-pressed`            |
| `colorTransparentBackgroundSelected`         | `--colorTransparentBackgroundSelected`         | `--color-transparent-background-selected`           |
| `colorNeutralBackgroundDisabled`             | `--colorNeutralBackgroundDisabled`             | `--color-neutral-background-disabled`               |
| `colorNeutralBackgroundDisabled2`            | `--colorNeutralBackgroundDisabled2`            | `--color-neutral-background-disabled-2`             |
| `colorNeutralBackgroundInvertedDisabled`     | `--colorNeutralBackgroundInvertedDisabled`     | `--color-neutral-background-inverted-disabled`      |
| `colorNeutralStencil1`                       | `--colorNeutralStencil1`                       | `--color-neutral-stencil-1`                         |
| `colorNeutralStencil2`                       | `--colorNeutralStencil2`                       | `--color-neutral-stencil-2`                         |
| `colorNeutralStencil1Alpha`                  | `--colorNeutralStencil1Alpha`                  | `--color-neutral-stencil-1-alpha`                   |
| `colorNeutralStencil2Alpha`                  | `--colorNeutralStencil2Alpha`                  | `--color-neutral-stencil-2-alpha`                   |
| `colorBackgroundOverlay`                     | `--colorBackgroundOverlay`                     | `--color-background-overlay`                        |
| `colorScrollbarOverlay`                      | `--colorScrollbarOverlay`                      | `--color-scrollbar-overlay`                         |
| `colorBrandBackground`                       | `--colorBrandBackground`                       | `--color-brand-background`                          |
| `colorBrandBackgroundHover`                  | `--colorBrandBackgroundHover`                  | `--color-brand-background-hover`                    |
| `colorBrandBackgroundPressed`                | `--colorBrandBackgroundPressed`                | `--color-brand-background-pressed`                  |
| `colorBrandBackgroundSelected`               | `--colorBrandBackgroundSelected`               | `--color-brand-background-selected`                 |
| `colorCompoundBrandBackground`               | `--colorCompoundBrandBackground`               | `--color-compound-brand-background`                 |
| `colorCompoundBrandBackgroundHover`          | `--colorCompoundBrandBackgroundHover`          | `--color-compound-brand-background-hover`           |
| `colorCompoundBrandBackgroundPressed`        | `--colorCompoundBrandBackgroundPressed`        | `--color-compound-brand-background-pressed`         |
| `colorBrandBackgroundStatic`                 | `--colorBrandBackgroundStatic`                 | `--color-brand-background-static`                   |
| `colorBrandBackground2`                      | `--colorBrandBackground2`                      | `--color-brand-background-2`                        |
| `colorBrandBackground2Hover`                 | `--colorBrandBackground2Hover`                 | `--color-brand-background-2-hover`                  |
| `colorBrandBackground2Pressed`               | `--colorBrandBackground2Pressed`               | `--color-brand-background-2-pressed`                |
| `colorBrandBackground3Static`                | `--colorBrandBackground3Static`                | `--color-brand-background-3-static`                 |
| `colorBrandBackground4Static`                | `--colorBrandBackground4Static`                | `--color-brand-background-4-static`                 |
| `colorBrandBackgroundInverted`               | `--colorBrandBackgroundInverted`               | `--color-brand-background-inverted`                 |
| `colorBrandBackgroundInvertedHover`          | `--colorBrandBackgroundInvertedHover`          | `--color-brand-background-inverted-hover`           |
| `colorBrandBackgroundInvertedPressed`        | `--colorBrandBackgroundInvertedPressed`        | `--color-brand-background-inverted-pressed`         |
| `colorBrandBackgroundInvertedSelected`       | `--colorBrandBackgroundInvertedSelected`       | `--color-brand-background-inverted-selected`        |
| `colorNeutralCardBackground`                 | `--colorNeutralCardBackground`                 | `--color-neutral-card-background`                   |
| `colorNeutralCardBackgroundHover`            | `--colorNeutralCardBackgroundHover`            | `--color-neutral-card-background-hover`             |
| `colorNeutralCardBackgroundPressed`          | `--colorNeutralCardBackgroundPressed`          | `--color-neutral-card-background-pressed`           |
| `colorNeutralCardBackgroundSelected`         | `--colorNeutralCardBackgroundSelected`         | `--color-neutral-card-background-selected`          |
| `colorNeutralCardBackgroundDisabled`         | `--colorNeutralCardBackgroundDisabled`         | `--color-neutral-card-background-disabled`          |
| `colorNeutralStrokeAccessible`               | `--colorNeutralStrokeAccessible`               | `--color-neutral-stroke-accessible`                 |
| `colorNeutralStrokeAccessibleHover`          | `--colorNeutralStrokeAccessibleHover`          | `--color-neutral-stroke-accessible-hover`           |
| `colorNeutralStrokeAccessiblePressed`        | `--colorNeutralStrokeAccessiblePressed`        | `--color-neutral-stroke-accessible-pressed`         |
| `colorNeutralStrokeAccessibleSelected`       | `--colorNeutralStrokeAccessibleSelected`       | `--color-neutral-stroke-accessible-selected`        |
| `colorNeutralStroke1`                        | `--colorNeutralStroke1`                        | `--color-neutral-stroke-1`                          |
| `colorNeutralStroke1Hover`                   | `--colorNeutralStroke1Hover`                   | `--color-neutral-stroke-1-hover`                    |
| `colorNeutralStroke1Pressed`                 | `--colorNeutralStroke1Pressed`                 | `--color-neutral-stroke-1-pressed`                  |
| `colorNeutralStroke1Selected`                | `--colorNeutralStroke1Selected`                | `--color-neutral-stroke-1-selected`                 |
| `colorNeutralStroke2`                        | `--colorNeutralStroke2`                        | `--color-neutral-stroke-2`                          |
| `colorNeutralStroke3`                        | `--colorNeutralStroke3`                        | `--color-neutral-stroke-3`                          |
| `colorNeutralStroke4`                        | `--colorNeutralStroke4`                        | `--color-neutral-stroke-4`                          |
| `colorNeutralStroke4Hover`                   | `--colorNeutralStroke4Hover`                   | `--color-neutral-stroke-4-hover`                    |
| `colorNeutralStroke4Pressed`                 | `--colorNeutralStroke4Pressed`                 | `--color-neutral-stroke-4-pressed`                  |
| `colorNeutralStroke4Selected`                | `--colorNeutralStroke4Selected`                | `--color-neutral-stroke-4-selected`                 |
| `colorNeutralStrokeSubtle`                   | `--colorNeutralStrokeSubtle`                   | `--color-neutral-stroke-subtle`                     |
| `colorNeutralStrokeOnBrand`                  | `--colorNeutralStrokeOnBrand`                  | `--color-neutral-stroke-on-brand`                   |
| `colorNeutralStrokeOnBrand2`                 | `--colorNeutralStrokeOnBrand2`                 | `--color-neutral-stroke-on-brand-2`                 |
| `colorNeutralStrokeOnBrand2Hover`            | `--colorNeutralStrokeOnBrand2Hover`            | `--color-neutral-stroke-on-brand-2-hover`           |
| `colorNeutralStrokeOnBrand2Pressed`          | `--colorNeutralStrokeOnBrand2Pressed`          | `--color-neutral-stroke-on-brand-2-pressed`         |
| `colorNeutralStrokeOnBrand2Selected`         | `--colorNeutralStrokeOnBrand2Selected`         | `--color-neutral-stroke-on-brand-2-selected`        |
| `colorBrandStroke1`                          | `--colorBrandStroke1`                          | `--color-brand-stroke-1`                            |
| `colorBrandStroke2`                          | `--colorBrandStroke2`                          | `--color-brand-stroke-2`                            |
| `colorBrandStroke2Hover`                     | `--colorBrandStroke2Hover`                     | `--color-brand-stroke-2-hover`                      |
| `colorBrandStroke2Pressed`                   | `--colorBrandStroke2Pressed`                   | `--color-brand-stroke-2-pressed`                    |
| `colorBrandStroke2Contrast`                  | `--colorBrandStroke2Contrast`                  | `--color-brand-stroke-2-contrast`                   |
| `colorCompoundBrandStroke`                   | `--colorCompoundBrandStroke`                   | `--color-compound-brand-stroke`                     |
| `colorCompoundBrandStrokeHover`              | `--colorCompoundBrandStrokeHover`              | `--color-compound-brand-stroke-hover`               |
| `colorCompoundBrandStrokePressed`            | `--colorCompoundBrandStrokePressed`            | `--color-compound-brand-stroke-pressed`             |
| `colorNeutralStrokeDisabled`                 | `--colorNeutralStrokeDisabled`                 | `--color-neutral-stroke-disabled`                   |
| `colorNeutralStrokeDisabled2`                | `--colorNeutralStrokeDisabled2`                | `--color-neutral-stroke-disabled-2`                 |
| `colorNeutralStrokeInvertedDisabled`         | `--colorNeutralStrokeInvertedDisabled`         | `--color-neutral-stroke-inverted-disabled`          |
| `colorTransparentStroke`                     | `--colorTransparentStroke`                     | `--color-transparent-stroke`                        |
| `colorTransparentStrokeInteractive`          | `--colorTransparentStrokeInteractive`          | `--color-transparent-stroke-interactive`            |
| `colorTransparentStrokeDisabled`             | `--colorTransparentStrokeDisabled`             | `--color-transparent-stroke-disabled`               |
| `colorNeutralStrokeAlpha`                    | `--colorNeutralStrokeAlpha`                    | `--color-neutral-stroke-alpha`                      |
| `colorNeutralStrokeAlpha2`                   | `--colorNeutralStrokeAlpha2`                   | `--color-neutral-stroke-alpha-2`                    |
| `colorStrokeFocus1`                          | `--colorStrokeFocus1`                          | `--color-stroke-focus-1`                            |
| `colorStrokeFocus2`                          | `--colorStrokeFocus2`                          | `--color-stroke-focus-2`                            |
| `colorNeutralShadowAmbient`                  | `--colorNeutralShadowAmbient`                  | `--color-neutral-shadow-ambient`                    |
| `colorNeutralShadowKey`                      | `--colorNeutralShadowKey`                      | `--color-neutral-shadow-key`                        |
| `colorNeutralShadowAmbientLighter`           | `--colorNeutralShadowAmbientLighter`           | `--color-neutral-shadow-ambient-lighter`            |
| `colorNeutralShadowKeyLighter`               | `--colorNeutralShadowKeyLighter`               | `--color-neutral-shadow-key-lighter`                |
| `colorNeutralShadowAmbientDarker`            | `--colorNeutralShadowAmbientDarker`            | `--color-neutral-shadow-ambient-darker`             |
| `colorNeutralShadowKeyDarker`                | `--colorNeutralShadowKeyDarker`                | `--color-neutral-shadow-key-darker`                 |
| `colorBrandShadowAmbient`                    | `--colorBrandShadowAmbient`                    | `--color-brand-shadow-ambient`                      |
| `colorBrandShadowKey`                        | `--colorBrandShadowKey`                        | `--color-brand-shadow-key`                          |
| `colorStatusSuccessBackground1`              | `--colorStatusSuccessBackground1`              | `--color-status-success-background-1`               |
| `colorStatusSuccessBackground2`              | `--colorStatusSuccessBackground2`              | `--color-status-success-background-2`               |
| `colorStatusSuccessBackground3`              | `--colorStatusSuccessBackground3`              | `--color-status-success-background-3`               |
| `colorStatusSuccessForeground1`              | `--colorStatusSuccessForeground1`              | `--color-status-success-foreground-1`               |
| `colorStatusSuccessForeground2`              | `--colorStatusSuccessForeground2`              | `--color-status-success-foreground-2`               |
| `colorStatusSuccessForeground3`              | `--colorStatusSuccessForeground3`              | `--color-status-success-foreground-3`               |
| `colorStatusSuccessForegroundInverted`       | `--colorStatusSuccessForegroundInverted`       | `--color-status-success-foreground-inverted`        |
| `colorStatusSuccessBorderActive`             | `--colorStatusSuccessBorderActive`             | `--color-status-success-border-active`              |
| `colorStatusSuccessBorder1`                  | `--colorStatusSuccessBorder1`                  | `--color-status-success-border-1`                   |
| `colorStatusSuccessBorder2`                  | `--colorStatusSuccessBorder2`                  | `--color-status-success-border-2`                   |
| `colorStatusWarningBackground1`              | `--colorStatusWarningBackground1`              | `--color-status-warning-background-1`               |
| `colorStatusWarningBackground2`              | `--colorStatusWarningBackground2`              | `--color-status-warning-background-2`               |
| `colorStatusWarningBackground3`              | `--colorStatusWarningBackground3`              | `--color-status-warning-background-3`               |
| `colorStatusWarningForeground1`              | `--colorStatusWarningForeground1`              | `--color-status-warning-foreground-1`               |
| `colorStatusWarningForeground2`              | `--colorStatusWarningForeground2`              | `--color-status-warning-foreground-2`               |
| `colorStatusWarningForeground3`              | `--colorStatusWarningForeground3`              | `--color-status-warning-foreground-3`               |
| `colorStatusWarningForegroundInverted`       | `--colorStatusWarningForegroundInverted`       | `--color-status-warning-foreground-inverted`        |
| `colorStatusWarningBorderActive`             | `--colorStatusWarningBorderActive`             | `--color-status-warning-border-active`              |
| `colorStatusWarningBorder1`                  | `--colorStatusWarningBorder1`                  | `--color-status-warning-border-1`                   |
| `colorStatusWarningBorder2`                  | `--colorStatusWarningBorder2`                  | `--color-status-warning-border-2`                   |
| `colorStatusDangerBackground1`               | `--colorStatusDangerBackground1`               | `--color-status-danger-background-1`                |
| `colorStatusDangerBackground2`               | `--colorStatusDangerBackground2`               | `--color-status-danger-background-2`                |
| `colorStatusDangerBackground3`               | `--colorStatusDangerBackground3`               | `--color-status-danger-background-3`                |
| `colorStatusDangerBackground3Hover`          | `--colorStatusDangerBackground3Hover`          | `--color-status-danger-background-3-hover`          |
| `colorStatusDangerBackground3Pressed`        | `--colorStatusDangerBackground3Pressed`        | `--color-status-danger-background-3-pressed`        |
| `colorStatusDangerForeground1`               | `--colorStatusDangerForeground1`               | `--color-status-danger-foreground-1`                |
| `colorStatusDangerForeground2`               | `--colorStatusDangerForeground2`               | `--color-status-danger-foreground-2`                |
| `colorStatusDangerForeground3`               | `--colorStatusDangerForeground3`               | `--color-status-danger-foreground-3`                |
| `colorStatusDangerForegroundInverted`        | `--colorStatusDangerForegroundInverted`        | `--color-status-danger-foreground-inverted`         |
| `colorStatusDangerBorderActive`              | `--colorStatusDangerBorderActive`              | `--color-status-danger-border-active`               |
| `colorStatusDangerBorder1`                   | `--colorStatusDangerBorder1`                   | `--color-status-danger-border-1`                    |
| `colorStatusDangerBorder2`                   | `--colorStatusDangerBorder2`                   | `--color-status-danger-border-2`                    |

## Palette colors (150) — `--color-palette-*`

| Token                                  | Old CSS variable                         | New CSS variable                             |
| -------------------------------------- | ---------------------------------------- | -------------------------------------------- |
| `colorPaletteRedBackground1`           | `--colorPaletteRedBackground1`           | `--color-palette-red-background-1`           |
| `colorPaletteRedBackground2`           | `--colorPaletteRedBackground2`           | `--color-palette-red-background-2`           |
| `colorPaletteRedBackground3`           | `--colorPaletteRedBackground3`           | `--color-palette-red-background-3`           |
| `colorPaletteRedBorderActive`          | `--colorPaletteRedBorderActive`          | `--color-palette-red-border-active`          |
| `colorPaletteRedBorder1`               | `--colorPaletteRedBorder1`               | `--color-palette-red-border-1`               |
| `colorPaletteRedBorder2`               | `--colorPaletteRedBorder2`               | `--color-palette-red-border-2`               |
| `colorPaletteRedForeground1`           | `--colorPaletteRedForeground1`           | `--color-palette-red-foreground-1`           |
| `colorPaletteRedForeground2`           | `--colorPaletteRedForeground2`           | `--color-palette-red-foreground-2`           |
| `colorPaletteRedForeground3`           | `--colorPaletteRedForeground3`           | `--color-palette-red-foreground-3`           |
| `colorPaletteRedForegroundInverted`    | `--colorPaletteRedForegroundInverted`    | `--color-palette-red-foreground-inverted`    |
| `colorPaletteGreenBackground1`         | `--colorPaletteGreenBackground1`         | `--color-palette-green-background-1`         |
| `colorPaletteGreenBackground2`         | `--colorPaletteGreenBackground2`         | `--color-palette-green-background-2`         |
| `colorPaletteGreenBackground3`         | `--colorPaletteGreenBackground3`         | `--color-palette-green-background-3`         |
| `colorPaletteGreenBorderActive`        | `--colorPaletteGreenBorderActive`        | `--color-palette-green-border-active`        |
| `colorPaletteGreenBorder1`             | `--colorPaletteGreenBorder1`             | `--color-palette-green-border-1`             |
| `colorPaletteGreenBorder2`             | `--colorPaletteGreenBorder2`             | `--color-palette-green-border-2`             |
| `colorPaletteGreenForeground1`         | `--colorPaletteGreenForeground1`         | `--color-palette-green-foreground-1`         |
| `colorPaletteGreenForeground2`         | `--colorPaletteGreenForeground2`         | `--color-palette-green-foreground-2`         |
| `colorPaletteGreenForeground3`         | `--colorPaletteGreenForeground3`         | `--color-palette-green-foreground-3`         |
| `colorPaletteGreenForegroundInverted`  | `--colorPaletteGreenForegroundInverted`  | `--color-palette-green-foreground-inverted`  |
| `colorPaletteDarkOrangeBackground1`    | `--colorPaletteDarkOrangeBackground1`    | `--color-palette-dark-orange-background-1`   |
| `colorPaletteDarkOrangeBackground2`    | `--colorPaletteDarkOrangeBackground2`    | `--color-palette-dark-orange-background-2`   |
| `colorPaletteDarkOrangeBackground3`    | `--colorPaletteDarkOrangeBackground3`    | `--color-palette-dark-orange-background-3`   |
| `colorPaletteDarkOrangeBorderActive`   | `--colorPaletteDarkOrangeBorderActive`   | `--color-palette-dark-orange-border-active`  |
| `colorPaletteDarkOrangeBorder1`        | `--colorPaletteDarkOrangeBorder1`        | `--color-palette-dark-orange-border-1`       |
| `colorPaletteDarkOrangeBorder2`        | `--colorPaletteDarkOrangeBorder2`        | `--color-palette-dark-orange-border-2`       |
| `colorPaletteDarkOrangeForeground1`    | `--colorPaletteDarkOrangeForeground1`    | `--color-palette-dark-orange-foreground-1`   |
| `colorPaletteDarkOrangeForeground2`    | `--colorPaletteDarkOrangeForeground2`    | `--color-palette-dark-orange-foreground-2`   |
| `colorPaletteDarkOrangeForeground3`    | `--colorPaletteDarkOrangeForeground3`    | `--color-palette-dark-orange-foreground-3`   |
| `colorPaletteYellowBackground1`        | `--colorPaletteYellowBackground1`        | `--color-palette-yellow-background-1`        |
| `colorPaletteYellowBackground2`        | `--colorPaletteYellowBackground2`        | `--color-palette-yellow-background-2`        |
| `colorPaletteYellowBackground3`        | `--colorPaletteYellowBackground3`        | `--color-palette-yellow-background-3`        |
| `colorPaletteYellowBorderActive`       | `--colorPaletteYellowBorderActive`       | `--color-palette-yellow-border-active`       |
| `colorPaletteYellowBorder1`            | `--colorPaletteYellowBorder1`            | `--color-palette-yellow-border-1`            |
| `colorPaletteYellowBorder2`            | `--colorPaletteYellowBorder2`            | `--color-palette-yellow-border-2`            |
| `colorPaletteYellowForeground1`        | `--colorPaletteYellowForeground1`        | `--color-palette-yellow-foreground-1`        |
| `colorPaletteYellowForeground2`        | `--colorPaletteYellowForeground2`        | `--color-palette-yellow-foreground-2`        |
| `colorPaletteYellowForeground3`        | `--colorPaletteYellowForeground3`        | `--color-palette-yellow-foreground-3`        |
| `colorPaletteYellowForegroundInverted` | `--colorPaletteYellowForegroundInverted` | `--color-palette-yellow-foreground-inverted` |
| `colorPaletteBerryBackground1`         | `--colorPaletteBerryBackground1`         | `--color-palette-berry-background-1`         |
| `colorPaletteBerryBackground2`         | `--colorPaletteBerryBackground2`         | `--color-palette-berry-background-2`         |
| `colorPaletteBerryBackground3`         | `--colorPaletteBerryBackground3`         | `--color-palette-berry-background-3`         |
| `colorPaletteBerryBorderActive`        | `--colorPaletteBerryBorderActive`        | `--color-palette-berry-border-active`        |
| `colorPaletteBerryBorder1`             | `--colorPaletteBerryBorder1`             | `--color-palette-berry-border-1`             |
| `colorPaletteBerryBorder2`             | `--colorPaletteBerryBorder2`             | `--color-palette-berry-border-2`             |
| `colorPaletteBerryForeground1`         | `--colorPaletteBerryForeground1`         | `--color-palette-berry-foreground-1`         |
| `colorPaletteBerryForeground2`         | `--colorPaletteBerryForeground2`         | `--color-palette-berry-foreground-2`         |
| `colorPaletteBerryForeground3`         | `--colorPaletteBerryForeground3`         | `--color-palette-berry-foreground-3`         |
| `colorPaletteMarigoldBackground1`      | `--colorPaletteMarigoldBackground1`      | `--color-palette-marigold-background-1`      |
| `colorPaletteMarigoldBackground2`      | `--colorPaletteMarigoldBackground2`      | `--color-palette-marigold-background-2`      |
| `colorPaletteMarigoldBackground3`      | `--colorPaletteMarigoldBackground3`      | `--color-palette-marigold-background-3`      |
| `colorPaletteMarigoldBorderActive`     | `--colorPaletteMarigoldBorderActive`     | `--color-palette-marigold-border-active`     |
| `colorPaletteMarigoldBorder1`          | `--colorPaletteMarigoldBorder1`          | `--color-palette-marigold-border-1`          |
| `colorPaletteMarigoldBorder2`          | `--colorPaletteMarigoldBorder2`          | `--color-palette-marigold-border-2`          |
| `colorPaletteMarigoldForeground1`      | `--colorPaletteMarigoldForeground1`      | `--color-palette-marigold-foreground-1`      |
| `colorPaletteMarigoldForeground2`      | `--colorPaletteMarigoldForeground2`      | `--color-palette-marigold-foreground-2`      |
| `colorPaletteMarigoldForeground3`      | `--colorPaletteMarigoldForeground3`      | `--color-palette-marigold-foreground-3`      |
| `colorPaletteLightGreenBackground1`    | `--colorPaletteLightGreenBackground1`    | `--color-palette-light-green-background-1`   |
| `colorPaletteLightGreenBackground2`    | `--colorPaletteLightGreenBackground2`    | `--color-palette-light-green-background-2`   |
| `colorPaletteLightGreenBackground3`    | `--colorPaletteLightGreenBackground3`    | `--color-palette-light-green-background-3`   |
| `colorPaletteLightGreenBorderActive`   | `--colorPaletteLightGreenBorderActive`   | `--color-palette-light-green-border-active`  |
| `colorPaletteLightGreenBorder1`        | `--colorPaletteLightGreenBorder1`        | `--color-palette-light-green-border-1`       |
| `colorPaletteLightGreenBorder2`        | `--colorPaletteLightGreenBorder2`        | `--color-palette-light-green-border-2`       |
| `colorPaletteLightGreenForeground1`    | `--colorPaletteLightGreenForeground1`    | `--color-palette-light-green-foreground-1`   |
| `colorPaletteLightGreenForeground2`    | `--colorPaletteLightGreenForeground2`    | `--color-palette-light-green-foreground-2`   |
| `colorPaletteLightGreenForeground3`    | `--colorPaletteLightGreenForeground3`    | `--color-palette-light-green-foreground-3`   |
| `colorPaletteAnchorBackground2`        | `--colorPaletteAnchorBackground2`        | `--color-palette-anchor-background-2`        |
| `colorPaletteAnchorBorderActive`       | `--colorPaletteAnchorBorderActive`       | `--color-palette-anchor-border-active`       |
| `colorPaletteAnchorForeground2`        | `--colorPaletteAnchorForeground2`        | `--color-palette-anchor-foreground-2`        |
| `colorPaletteBeigeBackground2`         | `--colorPaletteBeigeBackground2`         | `--color-palette-beige-background-2`         |
| `colorPaletteBeigeBorderActive`        | `--colorPaletteBeigeBorderActive`        | `--color-palette-beige-border-active`        |
| `colorPaletteBeigeForeground2`         | `--colorPaletteBeigeForeground2`         | `--color-palette-beige-foreground-2`         |
| `colorPaletteBlueBackground2`          | `--colorPaletteBlueBackground2`          | `--color-palette-blue-background-2`          |
| `colorPaletteBlueBorderActive`         | `--colorPaletteBlueBorderActive`         | `--color-palette-blue-border-active`         |
| `colorPaletteBlueForeground2`          | `--colorPaletteBlueForeground2`          | `--color-palette-blue-foreground-2`          |
| `colorPaletteBrassBackground2`         | `--colorPaletteBrassBackground2`         | `--color-palette-brass-background-2`         |
| `colorPaletteBrassBorderActive`        | `--colorPaletteBrassBorderActive`        | `--color-palette-brass-border-active`        |
| `colorPaletteBrassForeground2`         | `--colorPaletteBrassForeground2`         | `--color-palette-brass-foreground-2`         |
| `colorPaletteBrownBackground2`         | `--colorPaletteBrownBackground2`         | `--color-palette-brown-background-2`         |
| `colorPaletteBrownBorderActive`        | `--colorPaletteBrownBorderActive`        | `--color-palette-brown-border-active`        |
| `colorPaletteBrownForeground2`         | `--colorPaletteBrownForeground2`         | `--color-palette-brown-foreground-2`         |
| `colorPaletteCornflowerBackground2`    | `--colorPaletteCornflowerBackground2`    | `--color-palette-cornflower-background-2`    |
| `colorPaletteCornflowerBorderActive`   | `--colorPaletteCornflowerBorderActive`   | `--color-palette-cornflower-border-active`   |
| `colorPaletteCornflowerForeground2`    | `--colorPaletteCornflowerForeground2`    | `--color-palette-cornflower-foreground-2`    |
| `colorPaletteCranberryBackground2`     | `--colorPaletteCranberryBackground2`     | `--color-palette-cranberry-background-2`     |
| `colorPaletteCranberryBorderActive`    | `--colorPaletteCranberryBorderActive`    | `--color-palette-cranberry-border-active`    |
| `colorPaletteCranberryForeground2`     | `--colorPaletteCranberryForeground2`     | `--color-palette-cranberry-foreground-2`     |
| `colorPaletteDarkGreenBackground2`     | `--colorPaletteDarkGreenBackground2`     | `--color-palette-dark-green-background-2`    |
| `colorPaletteDarkGreenBorderActive`    | `--colorPaletteDarkGreenBorderActive`    | `--color-palette-dark-green-border-active`   |
| `colorPaletteDarkGreenForeground2`     | `--colorPaletteDarkGreenForeground2`     | `--color-palette-dark-green-foreground-2`    |
| `colorPaletteDarkRedBackground2`       | `--colorPaletteDarkRedBackground2`       | `--color-palette-dark-red-background-2`      |
| `colorPaletteDarkRedBorderActive`      | `--colorPaletteDarkRedBorderActive`      | `--color-palette-dark-red-border-active`     |
| `colorPaletteDarkRedForeground2`       | `--colorPaletteDarkRedForeground2`       | `--color-palette-dark-red-foreground-2`      |
| `colorPaletteForestBackground2`        | `--colorPaletteForestBackground2`        | `--color-palette-forest-background-2`        |
| `colorPaletteForestBorderActive`       | `--colorPaletteForestBorderActive`       | `--color-palette-forest-border-active`       |
| `colorPaletteForestForeground2`        | `--colorPaletteForestForeground2`        | `--color-palette-forest-foreground-2`        |
| `colorPaletteGoldBackground2`          | `--colorPaletteGoldBackground2`          | `--color-palette-gold-background-2`          |
| `colorPaletteGoldBorderActive`         | `--colorPaletteGoldBorderActive`         | `--color-palette-gold-border-active`         |
| `colorPaletteGoldForeground2`          | `--colorPaletteGoldForeground2`          | `--color-palette-gold-foreground-2`          |
| `colorPaletteGrapeBackground2`         | `--colorPaletteGrapeBackground2`         | `--color-palette-grape-background-2`         |
| `colorPaletteGrapeBorderActive`        | `--colorPaletteGrapeBorderActive`        | `--color-palette-grape-border-active`        |
| `colorPaletteGrapeForeground2`         | `--colorPaletteGrapeForeground2`         | `--color-palette-grape-foreground-2`         |
| `colorPaletteLavenderBackground2`      | `--colorPaletteLavenderBackground2`      | `--color-palette-lavender-background-2`      |
| `colorPaletteLavenderBorderActive`     | `--colorPaletteLavenderBorderActive`     | `--color-palette-lavender-border-active`     |
| `colorPaletteLavenderForeground2`      | `--colorPaletteLavenderForeground2`      | `--color-palette-lavender-foreground-2`      |
| `colorPaletteLightTealBackground2`     | `--colorPaletteLightTealBackground2`     | `--color-palette-light-teal-background-2`    |
| `colorPaletteLightTealBorderActive`    | `--colorPaletteLightTealBorderActive`    | `--color-palette-light-teal-border-active`   |
| `colorPaletteLightTealForeground2`     | `--colorPaletteLightTealForeground2`     | `--color-palette-light-teal-foreground-2`    |
| `colorPaletteLilacBackground2`         | `--colorPaletteLilacBackground2`         | `--color-palette-lilac-background-2`         |
| `colorPaletteLilacBorderActive`        | `--colorPaletteLilacBorderActive`        | `--color-palette-lilac-border-active`        |
| `colorPaletteLilacForeground2`         | `--colorPaletteLilacForeground2`         | `--color-palette-lilac-foreground-2`         |
| `colorPaletteMagentaBackground2`       | `--colorPaletteMagentaBackground2`       | `--color-palette-magenta-background-2`       |
| `colorPaletteMagentaBorderActive`      | `--colorPaletteMagentaBorderActive`      | `--color-palette-magenta-border-active`      |
| `colorPaletteMagentaForeground2`       | `--colorPaletteMagentaForeground2`       | `--color-palette-magenta-foreground-2`       |
| `colorPaletteMinkBackground2`          | `--colorPaletteMinkBackground2`          | `--color-palette-mink-background-2`          |
| `colorPaletteMinkBorderActive`         | `--colorPaletteMinkBorderActive`         | `--color-palette-mink-border-active`         |
| `colorPaletteMinkForeground2`          | `--colorPaletteMinkForeground2`          | `--color-palette-mink-foreground-2`          |
| `colorPaletteNavyBackground2`          | `--colorPaletteNavyBackground2`          | `--color-palette-navy-background-2`          |
| `colorPaletteNavyBorderActive`         | `--colorPaletteNavyBorderActive`         | `--color-palette-navy-border-active`         |
| `colorPaletteNavyForeground2`          | `--colorPaletteNavyForeground2`          | `--color-palette-navy-foreground-2`          |
| `colorPalettePeachBackground2`         | `--colorPalettePeachBackground2`         | `--color-palette-peach-background-2`         |
| `colorPalettePeachBorderActive`        | `--colorPalettePeachBorderActive`        | `--color-palette-peach-border-active`        |
| `colorPalettePeachForeground2`         | `--colorPalettePeachForeground2`         | `--color-palette-peach-foreground-2`         |
| `colorPalettePinkBackground2`          | `--colorPalettePinkBackground2`          | `--color-palette-pink-background-2`          |
| `colorPalettePinkBorderActive`         | `--colorPalettePinkBorderActive`         | `--color-palette-pink-border-active`         |
| `colorPalettePinkForeground2`          | `--colorPalettePinkForeground2`          | `--color-palette-pink-foreground-2`          |
| `colorPalettePlatinumBackground2`      | `--colorPalettePlatinumBackground2`      | `--color-palette-platinum-background-2`      |
| `colorPalettePlatinumBorderActive`     | `--colorPalettePlatinumBorderActive`     | `--color-palette-platinum-border-active`     |
| `colorPalettePlatinumForeground2`      | `--colorPalettePlatinumForeground2`      | `--color-palette-platinum-foreground-2`      |
| `colorPalettePlumBackground2`          | `--colorPalettePlumBackground2`          | `--color-palette-plum-background-2`          |
| `colorPalettePlumBorderActive`         | `--colorPalettePlumBorderActive`         | `--color-palette-plum-border-active`         |
| `colorPalettePlumForeground2`          | `--colorPalettePlumForeground2`          | `--color-palette-plum-foreground-2`          |
| `colorPalettePumpkinBackground2`       | `--colorPalettePumpkinBackground2`       | `--color-palette-pumpkin-background-2`       |
| `colorPalettePumpkinBorderActive`      | `--colorPalettePumpkinBorderActive`      | `--color-palette-pumpkin-border-active`      |
| `colorPalettePumpkinForeground2`       | `--colorPalettePumpkinForeground2`       | `--color-palette-pumpkin-foreground-2`       |
| `colorPalettePurpleBackground2`        | `--colorPalettePurpleBackground2`        | `--color-palette-purple-background-2`        |
| `colorPalettePurpleBorderActive`       | `--colorPalettePurpleBorderActive`       | `--color-palette-purple-border-active`       |
| `colorPalettePurpleForeground2`        | `--colorPalettePurpleForeground2`        | `--color-palette-purple-foreground-2`        |
| `colorPaletteRoyalBlueBackground2`     | `--colorPaletteRoyalBlueBackground2`     | `--color-palette-royal-blue-background-2`    |
| `colorPaletteRoyalBlueBorderActive`    | `--colorPaletteRoyalBlueBorderActive`    | `--color-palette-royal-blue-border-active`   |
| `colorPaletteRoyalBlueForeground2`     | `--colorPaletteRoyalBlueForeground2`     | `--color-palette-royal-blue-foreground-2`    |
| `colorPaletteSeafoamBackground2`       | `--colorPaletteSeafoamBackground2`       | `--color-palette-seafoam-background-2`       |
| `colorPaletteSeafoamBorderActive`      | `--colorPaletteSeafoamBorderActive`      | `--color-palette-seafoam-border-active`      |
| `colorPaletteSeafoamForeground2`       | `--colorPaletteSeafoamForeground2`       | `--color-palette-seafoam-foreground-2`       |
| `colorPaletteSteelBackground2`         | `--colorPaletteSteelBackground2`         | `--color-palette-steel-background-2`         |
| `colorPaletteSteelBorderActive`        | `--colorPaletteSteelBorderActive`        | `--color-palette-steel-border-active`        |
| `colorPaletteSteelForeground2`         | `--colorPaletteSteelForeground2`         | `--color-palette-steel-foreground-2`         |
| `colorPaletteTealBackground2`          | `--colorPaletteTealBackground2`          | `--color-palette-teal-background-2`          |
| `colorPaletteTealBorderActive`         | `--colorPaletteTealBorderActive`         | `--color-palette-teal-border-active`         |
| `colorPaletteTealForeground2`          | `--colorPaletteTealForeground2`          | `--color-palette-teal-foreground-2`          |

## Font families (3) — `--font-*`

| Token                 | Old CSS variable        | New CSS variable   |
| --------------------- | ----------------------- | ------------------ |
| `fontFamilyBase`      | `--fontFamilyBase`      | `--font-base`      |
| `fontFamilyMonospace` | `--fontFamilyMonospace` | `--font-monospace` |
| `fontFamilyNumeric`   | `--fontFamilyNumeric`   | `--font-numeric`   |

## Font sizes (10) — `--text-*`

| Token              | Old CSS variable     | New CSS variable   |
| ------------------ | -------------------- | ------------------ |
| `fontSizeBase100`  | `--fontSizeBase100`  | `--text-base-100`  |
| `fontSizeBase200`  | `--fontSizeBase200`  | `--text-base-200`  |
| `fontSizeBase300`  | `--fontSizeBase300`  | `--text-base-300`  |
| `fontSizeBase400`  | `--fontSizeBase400`  | `--text-base-400`  |
| `fontSizeBase500`  | `--fontSizeBase500`  | `--text-base-500`  |
| `fontSizeBase600`  | `--fontSizeBase600`  | `--text-base-600`  |
| `fontSizeHero700`  | `--fontSizeHero700`  | `--text-hero-700`  |
| `fontSizeHero800`  | `--fontSizeHero800`  | `--text-hero-800`  |
| `fontSizeHero900`  | `--fontSizeHero900`  | `--text-hero-900`  |
| `fontSizeHero1000` | `--fontSizeHero1000` | `--text-hero-1000` |

## Font weights (4) — `--font-weight-*`

| Token                | Old CSS variable       | New CSS variable         |
| -------------------- | ---------------------- | ------------------------ |
| `fontWeightRegular`  | `--fontWeightRegular`  | `--font-weight-regular`  |
| `fontWeightMedium`   | `--fontWeightMedium`   | `--font-weight-medium`   |
| `fontWeightSemibold` | `--fontWeightSemibold` | `--font-weight-semibold` |
| `fontWeightBold`     | `--fontWeightBold`     | `--font-weight-bold`     |

## Line heights (10) — `--leading-*`

| Token                | Old CSS variable       | New CSS variable      |
| -------------------- | ---------------------- | --------------------- |
| `lineHeightBase100`  | `--lineHeightBase100`  | `--leading-base-100`  |
| `lineHeightBase200`  | `--lineHeightBase200`  | `--leading-base-200`  |
| `lineHeightBase300`  | `--lineHeightBase300`  | `--leading-base-300`  |
| `lineHeightBase400`  | `--lineHeightBase400`  | `--leading-base-400`  |
| `lineHeightBase500`  | `--lineHeightBase500`  | `--leading-base-500`  |
| `lineHeightBase600`  | `--lineHeightBase600`  | `--leading-base-600`  |
| `lineHeightHero700`  | `--lineHeightHero700`  | `--leading-hero-700`  |
| `lineHeightHero800`  | `--lineHeightHero800`  | `--leading-hero-800`  |
| `lineHeightHero900`  | `--lineHeightHero900`  | `--leading-hero-900`  |
| `lineHeightHero1000` | `--lineHeightHero1000` | `--leading-hero-1000` |

## Border radii (11) — `--radius-*`

| Token                  | Old CSS variable         | New CSS variable     |
| ---------------------- | ------------------------ | -------------------- |
| `borderRadiusNone`     | `--borderRadiusNone`     | `--radius-none`      |
| `borderRadiusSmall`    | `--borderRadiusSmall`    | `--radius-small`     |
| `borderRadiusMedium`   | `--borderRadiusMedium`   | `--radius-medium`    |
| `borderRadiusLarge`    | `--borderRadiusLarge`    | `--radius-large`     |
| `borderRadiusXLarge`   | `--borderRadiusXLarge`   | `--radius-x-large`   |
| `borderRadius2XLarge`  | `--borderRadius2XLarge`  | `--radius-2-x-large` |
| `borderRadius3XLarge`  | `--borderRadius3XLarge`  | `--radius-3-x-large` |
| `borderRadius4XLarge`  | `--borderRadius4XLarge`  | `--radius-4-x-large` |
| `borderRadius5XLarge`  | `--borderRadius5XLarge`  | `--radius-5-x-large` |
| `borderRadius6XLarge`  | `--borderRadius6XLarge`  | `--radius-6-x-large` |
| `borderRadiusCircular` | `--borderRadiusCircular` | `--radius-circular`  |

## Shadows (12) — `--shadow-*`

| Token           | Old CSS variable  | New CSS variable    |
| --------------- | ----------------- | ------------------- |
| `shadow2`       | `--shadow2`       | `--shadow-2`        |
| `shadow4`       | `--shadow4`       | `--shadow-4`        |
| `shadow8`       | `--shadow8`       | `--shadow-8`        |
| `shadow16`      | `--shadow16`      | `--shadow-16`       |
| `shadow28`      | `--shadow28`      | `--shadow-28`       |
| `shadow64`      | `--shadow64`      | `--shadow-64`       |
| `shadow2Brand`  | `--shadow2Brand`  | `--shadow-2-brand`  |
| `shadow4Brand`  | `--shadow4Brand`  | `--shadow-4-brand`  |
| `shadow8Brand`  | `--shadow8Brand`  | `--shadow-8-brand`  |
| `shadow16Brand` | `--shadow16Brand` | `--shadow-16-brand` |
| `shadow28Brand` | `--shadow28Brand` | `--shadow-28-brand` |
| `shadow64Brand` | `--shadow64Brand` | `--shadow-64-brand` |

## Easing curves (9) — `--ease-*`

| Token                | Old CSS variable       | New CSS variable        |
| -------------------- | ---------------------- | ----------------------- |
| `curveAccelerateMax` | `--curveAccelerateMax` | `--ease-accelerate-max` |
| `curveAccelerateMid` | `--curveAccelerateMid` | `--ease-accelerate-mid` |
| `curveAccelerateMin` | `--curveAccelerateMin` | `--ease-accelerate-min` |
| `curveDecelerateMax` | `--curveDecelerateMax` | `--ease-decelerate-max` |
| `curveDecelerateMid` | `--curveDecelerateMid` | `--ease-decelerate-mid` |
| `curveDecelerateMin` | `--curveDecelerateMin` | `--ease-decelerate-min` |
| `curveEasyEaseMax`   | `--curveEasyEaseMax`   | `--ease-easy-ease-max`  |
| `curveEasyEase`      | `--curveEasyEase`      | `--ease-easy-ease`      |
| `curveLinear`        | `--curveLinear`        | `--ease-linear`         |

## Durations (8) — `--duration-* (custom namespace; @theme key is --transition-duration-*)`

| Token               | Old CSS variable      | New CSS variable        |
| ------------------- | --------------------- | ----------------------- |
| `durationUltraFast` | `--durationUltraFast` | `--duration-ultra-fast` |
| `durationFaster`    | `--durationFaster`    | `--duration-faster`     |
| `durationFast`      | `--durationFast`      | `--duration-fast`       |
| `durationNormal`    | `--durationNormal`    | `--duration-normal`     |
| `durationGentle`    | `--durationGentle`    | `--duration-gentle`     |
| `durationSlow`      | `--durationSlow`      | `--duration-slow`       |
| `durationSlower`    | `--durationSlower`    | `--duration-slower`     |
| `durationUltraSlow` | `--durationUltraSlow` | `--duration-ultra-slow` |

## z-index (8) — `--z-index-* (fallback carried in tokens.*)`

| Token              | Old CSS variable     | New CSS variable       |
| ------------------ | -------------------- | ---------------------- |
| `zIndexBackground` | `--zIndexBackground` | `--z-index-background` |
| `zIndexContent`    | `--zIndexContent`    | `--z-index-content`    |
| `zIndexOverlay`    | `--zIndexOverlay`    | `--z-index-overlay`    |
| `zIndexPopup`      | `--zIndexPopup`      | `--z-index-popup`      |
| `zIndexMessages`   | `--zIndexMessages`   | `--z-index-messages`   |
| `zIndexFloating`   | `--zIndexFloating`   | `--z-index-floating`   |
| `zIndexPriority`   | `--zIndexPriority`   | `--z-index-priority`   |
| `zIndexDebug`      | `--zIndexDebug`      | `--z-index-debug`      |

## Spacing (Phase 1) (22) — `--spacing-horizontal-* / --spacing-vertical-*`

| Token                     | Old CSS variable            | New CSS variable               |
| ------------------------- | --------------------------- | ------------------------------ |
| `spacingHorizontalNone`   | `--spacingHorizontalNone`   | `--spacing-horizontal-none`    |
| `spacingHorizontalXXS`    | `--spacingHorizontalXXS`    | `--spacing-horizontal-xxs`     |
| `spacingHorizontalXS`     | `--spacingHorizontalXS`     | `--spacing-horizontal-xs`      |
| `spacingHorizontalSNudge` | `--spacingHorizontalSNudge` | `--spacing-horizontal-s-nudge` |
| `spacingHorizontalS`      | `--spacingHorizontalS`      | `--spacing-horizontal-s`       |
| `spacingHorizontalMNudge` | `--spacingHorizontalMNudge` | `--spacing-horizontal-m-nudge` |
| `spacingHorizontalM`      | `--spacingHorizontalM`      | `--spacing-horizontal-m`       |
| `spacingHorizontalL`      | `--spacingHorizontalL`      | `--spacing-horizontal-l`       |
| `spacingHorizontalXL`     | `--spacingHorizontalXL`     | `--spacing-horizontal-xl`      |
| `spacingHorizontalXXL`    | `--spacingHorizontalXXL`    | `--spacing-horizontal-xxl`     |
| `spacingHorizontalXXXL`   | `--spacingHorizontalXXXL`   | `--spacing-horizontal-xxxl`    |
| `spacingVerticalNone`     | `--spacingVerticalNone`     | `--spacing-vertical-none`      |
| `spacingVerticalXXS`      | `--spacingVerticalXXS`      | `--spacing-vertical-xxs`       |
| `spacingVerticalXS`       | `--spacingVerticalXS`       | `--spacing-vertical-xs`        |
| `spacingVerticalSNudge`   | `--spacingVerticalSNudge`   | `--spacing-vertical-s-nudge`   |
| `spacingVerticalS`        | `--spacingVerticalS`        | `--spacing-vertical-s`         |
| `spacingVerticalMNudge`   | `--spacingVerticalMNudge`   | `--spacing-vertical-m-nudge`   |
| `spacingVerticalM`        | `--spacingVerticalM`        | `--spacing-vertical-m`         |
| `spacingVerticalL`        | `--spacingVerticalL`        | `--spacing-vertical-l`         |
| `spacingVerticalXL`       | `--spacingVerticalXL`       | `--spacing-vertical-xl`        |
| `spacingVerticalXXL`      | `--spacingVerticalXXL`      | `--spacing-vertical-xxl`       |
| `spacingVerticalXXXL`     | `--spacingVerticalXXXL`     | `--spacing-vertical-xxxl`      |

## Stroke widths (Phase 1) (4) — `--stroke-width-*`

| Token                 | Old CSS variable        | New CSS variable          |
| --------------------- | ----------------------- | ------------------------- |
| `strokeWidthThin`     | `--strokeWidthThin`     | `--stroke-width-thin`     |
| `strokeWidthThick`    | `--strokeWidthThick`    | `--stroke-width-thick`    |
| `strokeWidthThicker`  | `--strokeWidthThicker`  | `--stroke-width-thicker`  |
| `strokeWidthThickest` | `--strokeWidthThickest` | `--stroke-width-thickest` |
