import type { Theme } from './types';

/**
 * THEMING PHASE 2a (settled with user, extends Phase 1's option B of 2026-07-29 to the
 * FULL token set): every constant below is the READ path for a CANONICAL kebab-case CSS
 * variable aligned with the Tailwind v4 theme namespaces registered by the
 * react-tailwind-theme package — `--color-neutral-foreground-1`, `--text-base-300`
 * (font sizes), `--font-weight-semibold`, `--leading-base-300` (line heights),
 * `--radius-medium`, `--shadow-2`, `--ease-easy-ease` (curves), `--duration-fast`,
 * `--z-index-popup`, plus the Phase-1 `--spacing-*` / `--stroke-width-*` set. The old
 * camelCase CSS variables (`--colorNeutralForeground1`, …) no longer exist in emitted
 * CSS (single vocabulary; documented major break for hand-written consumer CSS).
 * FluentProvider's runtime theme tag writes the SAME values under both vocabularies
 * until theming Phase 2b removes it, so these strings resolve per-provider exactly as
 * before. Lockstep is asserted three ways: tokens.test.ts (independent derivation),
 * the react-tailwind-theme generator (throws on drift, every run), and the committed
 * mapping migration/griffel-to-tailwind/reports/token-rename-map.json.
 */
export const tokens: Record<keyof Theme, string> = {
  // Color tokens
  colorNeutralForeground1: 'var(--color-neutral-foreground-1)',
  colorNeutralForeground1Hover: 'var(--color-neutral-foreground-1-hover)',
  colorNeutralForeground1Pressed: 'var(--color-neutral-foreground-1-pressed)',
  colorNeutralForeground1Selected: 'var(--color-neutral-foreground-1-selected)',
  colorNeutralForeground2: 'var(--color-neutral-foreground-2)',
  colorNeutralForeground2Hover: 'var(--color-neutral-foreground-2-hover)',
  colorNeutralForeground2Pressed: 'var(--color-neutral-foreground-2-pressed)',
  colorNeutralForeground2Selected: 'var(--color-neutral-foreground-2-selected)',
  colorNeutralForeground2BrandHover: 'var(--color-neutral-foreground-2-brand-hover)',
  colorNeutralForeground2BrandPressed: 'var(--color-neutral-foreground-2-brand-pressed)',
  colorNeutralForeground2BrandSelected: 'var(--color-neutral-foreground-2-brand-selected)',
  colorNeutralForeground3: 'var(--color-neutral-foreground-3)',
  colorNeutralForeground3Hover: 'var(--color-neutral-foreground-3-hover)',
  colorNeutralForeground3Pressed: 'var(--color-neutral-foreground-3-pressed)',
  colorNeutralForeground3Selected: 'var(--color-neutral-foreground-3-selected)',
  colorNeutralForeground3BrandHover: 'var(--color-neutral-foreground-3-brand-hover)',
  colorNeutralForeground3BrandPressed: 'var(--color-neutral-foreground-3-brand-pressed)',
  colorNeutralForeground3BrandSelected: 'var(--color-neutral-foreground-3-brand-selected)',
  colorNeutralForeground4: 'var(--color-neutral-foreground-4)',
  colorNeutralForeground5: 'var(--color-neutral-foreground-5)',
  colorNeutralForeground5Hover: 'var(--color-neutral-foreground-5-hover)',
  colorNeutralForeground5Pressed: 'var(--color-neutral-foreground-5-pressed)',
  colorNeutralForeground5Selected: 'var(--color-neutral-foreground-5-selected)',
  colorNeutralForegroundDisabled: 'var(--color-neutral-foreground-disabled)',
  colorBrandForegroundLink: 'var(--color-brand-foreground-link)',
  colorBrandForegroundLinkHover: 'var(--color-brand-foreground-link-hover)',
  colorBrandForegroundLinkPressed: 'var(--color-brand-foreground-link-pressed)',
  colorBrandForegroundLinkSelected: 'var(--color-brand-foreground-link-selected)',
  colorNeutralForeground2Link: 'var(--color-neutral-foreground-2-link)',
  colorNeutralForeground2LinkHover: 'var(--color-neutral-foreground-2-link-hover)',
  colorNeutralForeground2LinkPressed: 'var(--color-neutral-foreground-2-link-pressed)',
  colorNeutralForeground2LinkSelected: 'var(--color-neutral-foreground-2-link-selected)',
  colorCompoundBrandForeground1: 'var(--color-compound-brand-foreground-1)',
  colorCompoundBrandForeground1Hover: 'var(--color-compound-brand-foreground-1-hover)',
  colorCompoundBrandForeground1Pressed: 'var(--color-compound-brand-foreground-1-pressed)',
  colorNeutralForegroundOnBrand: 'var(--color-neutral-foreground-on-brand)',
  colorNeutralForegroundInverted: 'var(--color-neutral-foreground-inverted)',
  colorNeutralForegroundInvertedHover: 'var(--color-neutral-foreground-inverted-hover)',
  colorNeutralForegroundInvertedPressed: 'var(--color-neutral-foreground-inverted-pressed)',
  colorNeutralForegroundInvertedSelected: 'var(--color-neutral-foreground-inverted-selected)',
  colorNeutralForegroundInverted2: 'var(--color-neutral-foreground-inverted-2)',
  colorNeutralForegroundStaticInverted: 'var(--color-neutral-foreground-static-inverted)',
  colorNeutralForegroundInvertedLink: 'var(--color-neutral-foreground-inverted-link)',
  colorNeutralForegroundInvertedLinkHover: 'var(--color-neutral-foreground-inverted-link-hover)',
  colorNeutralForegroundInvertedLinkPressed: 'var(--color-neutral-foreground-inverted-link-pressed)',
  colorNeutralForegroundInvertedLinkSelected: 'var(--color-neutral-foreground-inverted-link-selected)',
  colorNeutralForegroundInvertedDisabled: 'var(--color-neutral-foreground-inverted-disabled)',
  colorBrandForeground1: 'var(--color-brand-foreground-1)',
  colorBrandForeground2: 'var(--color-brand-foreground-2)',
  colorBrandForeground2Hover: 'var(--color-brand-foreground-2-hover)',
  colorBrandForeground2Pressed: 'var(--color-brand-foreground-2-pressed)',
  colorNeutralForeground1Static: 'var(--color-neutral-foreground-1-static)',
  colorBrandForegroundInverted: 'var(--color-brand-foreground-inverted)',
  colorBrandForegroundInvertedHover: 'var(--color-brand-foreground-inverted-hover)',
  colorBrandForegroundInvertedPressed: 'var(--color-brand-foreground-inverted-pressed)',
  colorBrandForegroundOnLight: 'var(--color-brand-foreground-on-light)',
  colorBrandForegroundOnLightHover: 'var(--color-brand-foreground-on-light-hover)',
  colorBrandForegroundOnLightPressed: 'var(--color-brand-foreground-on-light-pressed)',
  colorBrandForegroundOnLightSelected: 'var(--color-brand-foreground-on-light-selected)',
  colorNeutralBackground1: 'var(--color-neutral-background-1)',
  colorNeutralBackground1Hover: 'var(--color-neutral-background-1-hover)',
  colorNeutralBackground1Pressed: 'var(--color-neutral-background-1-pressed)',
  colorNeutralBackground1Selected: 'var(--color-neutral-background-1-selected)',
  colorNeutralBackground2: 'var(--color-neutral-background-2)',
  colorNeutralBackground2Hover: 'var(--color-neutral-background-2-hover)',
  colorNeutralBackground2Pressed: 'var(--color-neutral-background-2-pressed)',
  colorNeutralBackground2Selected: 'var(--color-neutral-background-2-selected)',
  colorNeutralBackground3: 'var(--color-neutral-background-3)',
  colorNeutralBackground3Hover: 'var(--color-neutral-background-3-hover)',
  colorNeutralBackground3Pressed: 'var(--color-neutral-background-3-pressed)',
  colorNeutralBackground3Selected: 'var(--color-neutral-background-3-selected)',
  colorNeutralBackground4: 'var(--color-neutral-background-4)',
  colorNeutralBackground4Hover: 'var(--color-neutral-background-4-hover)',
  colorNeutralBackground4Pressed: 'var(--color-neutral-background-4-pressed)',
  colorNeutralBackground4Selected: 'var(--color-neutral-background-4-selected)',
  colorNeutralBackground5: 'var(--color-neutral-background-5)',
  colorNeutralBackground5Hover: 'var(--color-neutral-background-5-hover)',
  colorNeutralBackground5Pressed: 'var(--color-neutral-background-5-pressed)',
  colorNeutralBackground5Selected: 'var(--color-neutral-background-5-selected)',
  colorNeutralBackground6: 'var(--color-neutral-background-6)',
  colorNeutralBackground7: 'var(--color-neutral-background-7)',
  colorNeutralBackground7Hover: 'var(--color-neutral-background-7-hover)',
  colorNeutralBackground7Pressed: 'var(--color-neutral-background-7-pressed)',
  colorNeutralBackground7Selected: 'var(--color-neutral-background-7-selected)',
  colorNeutralBackground8: 'var(--color-neutral-background-8)',
  colorNeutralBackgroundInverted: 'var(--color-neutral-background-inverted)',
  colorNeutralBackgroundInvertedHover: 'var(--color-neutral-background-inverted-hover)',
  colorNeutralBackgroundInvertedPressed: 'var(--color-neutral-background-inverted-pressed)',
  colorNeutralBackgroundInvertedSelected: 'var(--color-neutral-background-inverted-selected)',
  colorNeutralBackgroundStatic: 'var(--color-neutral-background-static)',
  colorNeutralBackgroundAlpha: 'var(--color-neutral-background-alpha)',
  colorNeutralBackgroundAlpha2: 'var(--color-neutral-background-alpha-2)',
  colorSubtleBackground: 'var(--color-subtle-background)',
  colorSubtleBackgroundHover: 'var(--color-subtle-background-hover)',
  colorSubtleBackgroundPressed: 'var(--color-subtle-background-pressed)',
  colorSubtleBackgroundSelected: 'var(--color-subtle-background-selected)',
  colorSubtleBackgroundLightAlphaHover: 'var(--color-subtle-background-light-alpha-hover)',
  colorSubtleBackgroundLightAlphaPressed: 'var(--color-subtle-background-light-alpha-pressed)',
  colorSubtleBackgroundLightAlphaSelected: 'var(--color-subtle-background-light-alpha-selected)',
  colorSubtleBackgroundInverted: 'var(--color-subtle-background-inverted)',
  colorSubtleBackgroundInvertedHover: 'var(--color-subtle-background-inverted-hover)',
  colorSubtleBackgroundInvertedPressed: 'var(--color-subtle-background-inverted-pressed)',
  colorSubtleBackgroundInvertedSelected: 'var(--color-subtle-background-inverted-selected)',
  colorTransparentBackground: 'var(--color-transparent-background)',
  colorTransparentBackgroundHover: 'var(--color-transparent-background-hover)',
  colorTransparentBackgroundPressed: 'var(--color-transparent-background-pressed)',
  colorTransparentBackgroundSelected: 'var(--color-transparent-background-selected)',
  colorNeutralBackgroundDisabled: 'var(--color-neutral-background-disabled)',
  colorNeutralBackgroundDisabled2: 'var(--color-neutral-background-disabled-2)',
  colorNeutralBackgroundInvertedDisabled: 'var(--color-neutral-background-inverted-disabled)',
  colorNeutralStencil1: 'var(--color-neutral-stencil-1)',
  colorNeutralStencil2: 'var(--color-neutral-stencil-2)',
  colorNeutralStencil1Alpha: 'var(--color-neutral-stencil-1-alpha)',
  colorNeutralStencil2Alpha: 'var(--color-neutral-stencil-2-alpha)',
  colorBackgroundOverlay: 'var(--color-background-overlay)',
  colorScrollbarOverlay: 'var(--color-scrollbar-overlay)',
  colorBrandBackground: 'var(--color-brand-background)',
  colorBrandBackgroundHover: 'var(--color-brand-background-hover)',
  colorBrandBackgroundPressed: 'var(--color-brand-background-pressed)',
  colorBrandBackgroundSelected: 'var(--color-brand-background-selected)',
  colorCompoundBrandBackground: 'var(--color-compound-brand-background)',
  colorCompoundBrandBackgroundHover: 'var(--color-compound-brand-background-hover)',
  colorCompoundBrandBackgroundPressed: 'var(--color-compound-brand-background-pressed)',
  colorBrandBackgroundStatic: 'var(--color-brand-background-static)',
  colorBrandBackground2: 'var(--color-brand-background-2)',
  colorBrandBackground2Hover: 'var(--color-brand-background-2-hover)',
  colorBrandBackground2Pressed: 'var(--color-brand-background-2-pressed)',
  colorBrandBackground3Static: 'var(--color-brand-background-3-static)',
  colorBrandBackground4Static: 'var(--color-brand-background-4-static)',
  colorBrandBackgroundInverted: 'var(--color-brand-background-inverted)',
  colorBrandBackgroundInvertedHover: 'var(--color-brand-background-inverted-hover)',
  colorBrandBackgroundInvertedPressed: 'var(--color-brand-background-inverted-pressed)',
  colorBrandBackgroundInvertedSelected: 'var(--color-brand-background-inverted-selected)',
  colorNeutralCardBackground: 'var(--color-neutral-card-background)',
  colorNeutralCardBackgroundHover: 'var(--color-neutral-card-background-hover)',
  colorNeutralCardBackgroundPressed: 'var(--color-neutral-card-background-pressed)',
  colorNeutralCardBackgroundSelected: 'var(--color-neutral-card-background-selected)',
  colorNeutralCardBackgroundDisabled: 'var(--color-neutral-card-background-disabled)',
  colorNeutralStrokeAccessible: 'var(--color-neutral-stroke-accessible)',
  colorNeutralStrokeAccessibleHover: 'var(--color-neutral-stroke-accessible-hover)',
  colorNeutralStrokeAccessiblePressed: 'var(--color-neutral-stroke-accessible-pressed)',
  colorNeutralStrokeAccessibleSelected: 'var(--color-neutral-stroke-accessible-selected)',
  colorNeutralStroke1: 'var(--color-neutral-stroke-1)',
  colorNeutralStroke1Hover: 'var(--color-neutral-stroke-1-hover)',
  colorNeutralStroke1Pressed: 'var(--color-neutral-stroke-1-pressed)',
  colorNeutralStroke1Selected: 'var(--color-neutral-stroke-1-selected)',
  colorNeutralStroke2: 'var(--color-neutral-stroke-2)',
  colorNeutralStroke3: 'var(--color-neutral-stroke-3)',
  colorNeutralStroke4: 'var(--color-neutral-stroke-4)',
  colorNeutralStroke4Hover: 'var(--color-neutral-stroke-4-hover)',
  colorNeutralStroke4Pressed: 'var(--color-neutral-stroke-4-pressed)',
  colorNeutralStroke4Selected: 'var(--color-neutral-stroke-4-selected)',
  colorNeutralStrokeSubtle: 'var(--color-neutral-stroke-subtle)',
  colorNeutralStrokeOnBrand: 'var(--color-neutral-stroke-on-brand)',
  colorNeutralStrokeOnBrand2: 'var(--color-neutral-stroke-on-brand-2)',
  colorNeutralStrokeOnBrand2Hover: 'var(--color-neutral-stroke-on-brand-2-hover)',
  colorNeutralStrokeOnBrand2Pressed: 'var(--color-neutral-stroke-on-brand-2-pressed)',
  colorNeutralStrokeOnBrand2Selected: 'var(--color-neutral-stroke-on-brand-2-selected)',
  colorBrandStroke1: 'var(--color-brand-stroke-1)',
  colorBrandStroke2: 'var(--color-brand-stroke-2)',
  colorBrandStroke2Hover: 'var(--color-brand-stroke-2-hover)',
  colorBrandStroke2Pressed: 'var(--color-brand-stroke-2-pressed)',
  colorBrandStroke2Contrast: 'var(--color-brand-stroke-2-contrast)',
  colorCompoundBrandStroke: 'var(--color-compound-brand-stroke)',
  colorCompoundBrandStrokeHover: 'var(--color-compound-brand-stroke-hover)',
  colorCompoundBrandStrokePressed: 'var(--color-compound-brand-stroke-pressed)',
  colorNeutralStrokeDisabled: 'var(--color-neutral-stroke-disabled)',
  colorNeutralStrokeDisabled2: 'var(--color-neutral-stroke-disabled-2)',
  colorNeutralStrokeInvertedDisabled: 'var(--color-neutral-stroke-inverted-disabled)',
  colorTransparentStroke: 'var(--color-transparent-stroke)',
  colorTransparentStrokeInteractive: 'var(--color-transparent-stroke-interactive)',
  colorTransparentStrokeDisabled: 'var(--color-transparent-stroke-disabled)',
  colorNeutralStrokeAlpha: 'var(--color-neutral-stroke-alpha)',
  colorNeutralStrokeAlpha2: 'var(--color-neutral-stroke-alpha-2)',
  colorStrokeFocus1: 'var(--color-stroke-focus-1)',
  colorStrokeFocus2: 'var(--color-stroke-focus-2)',
  colorNeutralShadowAmbient: 'var(--color-neutral-shadow-ambient)',
  colorNeutralShadowKey: 'var(--color-neutral-shadow-key)',
  colorNeutralShadowAmbientLighter: 'var(--color-neutral-shadow-ambient-lighter)',
  colorNeutralShadowKeyLighter: 'var(--color-neutral-shadow-key-lighter)',
  colorNeutralShadowAmbientDarker: 'var(--color-neutral-shadow-ambient-darker)',
  colorNeutralShadowKeyDarker: 'var(--color-neutral-shadow-key-darker)',
  colorBrandShadowAmbient: 'var(--color-brand-shadow-ambient)',
  colorBrandShadowKey: 'var(--color-brand-shadow-key)',

  // Color palette tokens

  // Color palette red tokens
  colorPaletteRedBackground1: 'var(--color-palette-red-background-1)',
  colorPaletteRedBackground2: 'var(--color-palette-red-background-2)',
  colorPaletteRedBackground3: 'var(--color-palette-red-background-3)',
  colorPaletteRedBorderActive: 'var(--color-palette-red-border-active)',
  colorPaletteRedBorder1: 'var(--color-palette-red-border-1)',
  colorPaletteRedBorder2: 'var(--color-palette-red-border-2)',
  colorPaletteRedForeground1: 'var(--color-palette-red-foreground-1)',
  colorPaletteRedForeground2: 'var(--color-palette-red-foreground-2)',
  colorPaletteRedForeground3: 'var(--color-palette-red-foreground-3)',
  colorPaletteRedForegroundInverted: 'var(--color-palette-red-foreground-inverted)',

  // Color palette green tokens
  colorPaletteGreenBackground1: 'var(--color-palette-green-background-1)',
  colorPaletteGreenBackground2: 'var(--color-palette-green-background-2)',
  colorPaletteGreenBackground3: 'var(--color-palette-green-background-3)',
  colorPaletteGreenBorderActive: 'var(--color-palette-green-border-active)',
  colorPaletteGreenBorder1: 'var(--color-palette-green-border-1)',
  colorPaletteGreenBorder2: 'var(--color-palette-green-border-2)',
  colorPaletteGreenForeground1: 'var(--color-palette-green-foreground-1)',
  colorPaletteGreenForeground2: 'var(--color-palette-green-foreground-2)',
  colorPaletteGreenForeground3: 'var(--color-palette-green-foreground-3)',
  colorPaletteGreenForegroundInverted: 'var(--color-palette-green-foreground-inverted)',

  // Color palette dark orange tokens
  colorPaletteDarkOrangeBackground1: 'var(--color-palette-dark-orange-background-1)',
  colorPaletteDarkOrangeBackground2: 'var(--color-palette-dark-orange-background-2)',
  colorPaletteDarkOrangeBackground3: 'var(--color-palette-dark-orange-background-3)',
  colorPaletteDarkOrangeBorderActive: 'var(--color-palette-dark-orange-border-active)',
  colorPaletteDarkOrangeBorder1: 'var(--color-palette-dark-orange-border-1)',
  colorPaletteDarkOrangeBorder2: 'var(--color-palette-dark-orange-border-2)',
  colorPaletteDarkOrangeForeground1: 'var(--color-palette-dark-orange-foreground-1)',
  colorPaletteDarkOrangeForeground2: 'var(--color-palette-dark-orange-foreground-2)',
  colorPaletteDarkOrangeForeground3: 'var(--color-palette-dark-orange-foreground-3)',

  // Color palette yellow tokens
  colorPaletteYellowBackground1: 'var(--color-palette-yellow-background-1)',
  colorPaletteYellowBackground2: 'var(--color-palette-yellow-background-2)',
  colorPaletteYellowBackground3: 'var(--color-palette-yellow-background-3)',
  colorPaletteYellowBorderActive: 'var(--color-palette-yellow-border-active)',
  colorPaletteYellowBorder1: 'var(--color-palette-yellow-border-1)',
  colorPaletteYellowBorder2: 'var(--color-palette-yellow-border-2)',
  colorPaletteYellowForeground1: 'var(--color-palette-yellow-foreground-1)',
  colorPaletteYellowForeground2: 'var(--color-palette-yellow-foreground-2)',
  colorPaletteYellowForeground3: 'var(--color-palette-yellow-foreground-3)',
  colorPaletteYellowForegroundInverted: 'var(--color-palette-yellow-foreground-inverted)',

  // Color palette berry tokens
  colorPaletteBerryBackground1: 'var(--color-palette-berry-background-1)',
  colorPaletteBerryBackground2: 'var(--color-palette-berry-background-2)',
  colorPaletteBerryBackground3: 'var(--color-palette-berry-background-3)',
  colorPaletteBerryBorderActive: 'var(--color-palette-berry-border-active)',
  colorPaletteBerryBorder1: 'var(--color-palette-berry-border-1)',
  colorPaletteBerryBorder2: 'var(--color-palette-berry-border-2)',
  colorPaletteBerryForeground1: 'var(--color-palette-berry-foreground-1)',
  colorPaletteBerryForeground2: 'var(--color-palette-berry-foreground-2)',
  colorPaletteBerryForeground3: 'var(--color-palette-berry-foreground-3)',

  // Color palette marigold tokens
  colorPaletteMarigoldBackground1: 'var(--color-palette-marigold-background-1)',
  colorPaletteMarigoldBackground2: 'var(--color-palette-marigold-background-2)',
  colorPaletteMarigoldBackground3: 'var(--color-palette-marigold-background-3)',
  colorPaletteMarigoldBorderActive: 'var(--color-palette-marigold-border-active)',
  colorPaletteMarigoldBorder1: 'var(--color-palette-marigold-border-1)',
  colorPaletteMarigoldBorder2: 'var(--color-palette-marigold-border-2)',
  colorPaletteMarigoldForeground1: 'var(--color-palette-marigold-foreground-1)',
  colorPaletteMarigoldForeground2: 'var(--color-palette-marigold-foreground-2)',
  colorPaletteMarigoldForeground3: 'var(--color-palette-marigold-foreground-3)',

  // Color palette light green tokens
  colorPaletteLightGreenBackground1: 'var(--color-palette-light-green-background-1)',
  colorPaletteLightGreenBackground2: 'var(--color-palette-light-green-background-2)',
  colorPaletteLightGreenBackground3: 'var(--color-palette-light-green-background-3)',
  colorPaletteLightGreenBorderActive: 'var(--color-palette-light-green-border-active)',
  colorPaletteLightGreenBorder1: 'var(--color-palette-light-green-border-1)',
  colorPaletteLightGreenBorder2: 'var(--color-palette-light-green-border-2)',
  colorPaletteLightGreenForeground1: 'var(--color-palette-light-green-foreground-1)',
  colorPaletteLightGreenForeground2: 'var(--color-palette-light-green-foreground-2)',
  colorPaletteLightGreenForeground3: 'var(--color-palette-light-green-foreground-3)',

  // Color palette anchor tokens
  colorPaletteAnchorBackground2: 'var(--color-palette-anchor-background-2)',
  colorPaletteAnchorBorderActive: 'var(--color-palette-anchor-border-active)',
  colorPaletteAnchorForeground2: 'var(--color-palette-anchor-foreground-2)',

  // Color palette beige tokens
  colorPaletteBeigeBackground2: 'var(--color-palette-beige-background-2)',
  colorPaletteBeigeBorderActive: 'var(--color-palette-beige-border-active)',
  colorPaletteBeigeForeground2: 'var(--color-palette-beige-foreground-2)',

  // Color palette blue tokens
  colorPaletteBlueBackground2: 'var(--color-palette-blue-background-2)',
  colorPaletteBlueBorderActive: 'var(--color-palette-blue-border-active)',
  colorPaletteBlueForeground2: 'var(--color-palette-blue-foreground-2)',

  // Color palette brass tokens
  colorPaletteBrassBackground2: 'var(--color-palette-brass-background-2)',
  colorPaletteBrassBorderActive: 'var(--color-palette-brass-border-active)',
  colorPaletteBrassForeground2: 'var(--color-palette-brass-foreground-2)',

  // Color palette brown tokens
  colorPaletteBrownBackground2: 'var(--color-palette-brown-background-2)',
  colorPaletteBrownBorderActive: 'var(--color-palette-brown-border-active)',
  colorPaletteBrownForeground2: 'var(--color-palette-brown-foreground-2)',

  // Color palette cornflower tokens
  colorPaletteCornflowerBackground2: 'var(--color-palette-cornflower-background-2)',
  colorPaletteCornflowerBorderActive: 'var(--color-palette-cornflower-border-active)',
  colorPaletteCornflowerForeground2: 'var(--color-palette-cornflower-foreground-2)',

  // Color palette cranberry tokens
  colorPaletteCranberryBackground2: 'var(--color-palette-cranberry-background-2)',
  colorPaletteCranberryBorderActive: 'var(--color-palette-cranberry-border-active)',
  colorPaletteCranberryForeground2: 'var(--color-palette-cranberry-foreground-2)',

  // Color palette dark green tokens
  colorPaletteDarkGreenBackground2: 'var(--color-palette-dark-green-background-2)',
  colorPaletteDarkGreenBorderActive: 'var(--color-palette-dark-green-border-active)',
  colorPaletteDarkGreenForeground2: 'var(--color-palette-dark-green-foreground-2)',

  // Color palette dark red tokens
  colorPaletteDarkRedBackground2: 'var(--color-palette-dark-red-background-2)',
  colorPaletteDarkRedBorderActive: 'var(--color-palette-dark-red-border-active)',
  colorPaletteDarkRedForeground2: 'var(--color-palette-dark-red-foreground-2)',

  // Color palette forest tokens
  colorPaletteForestBackground2: 'var(--color-palette-forest-background-2)',
  colorPaletteForestBorderActive: 'var(--color-palette-forest-border-active)',
  colorPaletteForestForeground2: 'var(--color-palette-forest-foreground-2)',

  // Color palette gold tokens
  colorPaletteGoldBackground2: 'var(--color-palette-gold-background-2)',
  colorPaletteGoldBorderActive: 'var(--color-palette-gold-border-active)',
  colorPaletteGoldForeground2: 'var(--color-palette-gold-foreground-2)',

  // Color palette grape tokens
  colorPaletteGrapeBackground2: 'var(--color-palette-grape-background-2)',
  colorPaletteGrapeBorderActive: 'var(--color-palette-grape-border-active)',
  colorPaletteGrapeForeground2: 'var(--color-palette-grape-foreground-2)',

  // Color palette lavender tokens
  colorPaletteLavenderBackground2: 'var(--color-palette-lavender-background-2)',
  colorPaletteLavenderBorderActive: 'var(--color-palette-lavender-border-active)',
  colorPaletteLavenderForeground2: 'var(--color-palette-lavender-foreground-2)',

  // Color palette light teal tokens
  colorPaletteLightTealBackground2: 'var(--color-palette-light-teal-background-2)',
  colorPaletteLightTealBorderActive: 'var(--color-palette-light-teal-border-active)',
  colorPaletteLightTealForeground2: 'var(--color-palette-light-teal-foreground-2)',

  // Color palette lilac tokens
  colorPaletteLilacBackground2: 'var(--color-palette-lilac-background-2)',
  colorPaletteLilacBorderActive: 'var(--color-palette-lilac-border-active)',
  colorPaletteLilacForeground2: 'var(--color-palette-lilac-foreground-2)',

  // Color palette magenta tokens
  colorPaletteMagentaBackground2: 'var(--color-palette-magenta-background-2)',
  colorPaletteMagentaBorderActive: 'var(--color-palette-magenta-border-active)',
  colorPaletteMagentaForeground2: 'var(--color-palette-magenta-foreground-2)',

  // Color palette mink tokens
  colorPaletteMinkBackground2: 'var(--color-palette-mink-background-2)',
  colorPaletteMinkBorderActive: 'var(--color-palette-mink-border-active)',
  colorPaletteMinkForeground2: 'var(--color-palette-mink-foreground-2)',

  // Color palette navy tokens
  colorPaletteNavyBackground2: 'var(--color-palette-navy-background-2)',
  colorPaletteNavyBorderActive: 'var(--color-palette-navy-border-active)',
  colorPaletteNavyForeground2: 'var(--color-palette-navy-foreground-2)',

  // Color palette peach tokens
  colorPalettePeachBackground2: 'var(--color-palette-peach-background-2)',
  colorPalettePeachBorderActive: 'var(--color-palette-peach-border-active)',
  colorPalettePeachForeground2: 'var(--color-palette-peach-foreground-2)',

  // Color palette pink tokens
  colorPalettePinkBackground2: 'var(--color-palette-pink-background-2)',
  colorPalettePinkBorderActive: 'var(--color-palette-pink-border-active)',
  colorPalettePinkForeground2: 'var(--color-palette-pink-foreground-2)',

  // Color palette platinum tokens
  colorPalettePlatinumBackground2: 'var(--color-palette-platinum-background-2)',
  colorPalettePlatinumBorderActive: 'var(--color-palette-platinum-border-active)',
  colorPalettePlatinumForeground2: 'var(--color-palette-platinum-foreground-2)',

  // Color palette plum tokens
  colorPalettePlumBackground2: 'var(--color-palette-plum-background-2)',
  colorPalettePlumBorderActive: 'var(--color-palette-plum-border-active)',
  colorPalettePlumForeground2: 'var(--color-palette-plum-foreground-2)',

  // Color palette pumpkin tokens
  colorPalettePumpkinBackground2: 'var(--color-palette-pumpkin-background-2)',
  colorPalettePumpkinBorderActive: 'var(--color-palette-pumpkin-border-active)',
  colorPalettePumpkinForeground2: 'var(--color-palette-pumpkin-foreground-2)',

  // Color palette purple tokens
  colorPalettePurpleBackground2: 'var(--color-palette-purple-background-2)',
  colorPalettePurpleBorderActive: 'var(--color-palette-purple-border-active)',
  colorPalettePurpleForeground2: 'var(--color-palette-purple-foreground-2)',

  // Color palette royal blue tokens
  colorPaletteRoyalBlueBackground2: 'var(--color-palette-royal-blue-background-2)',
  colorPaletteRoyalBlueBorderActive: 'var(--color-palette-royal-blue-border-active)',
  colorPaletteRoyalBlueForeground2: 'var(--color-palette-royal-blue-foreground-2)',

  // Color palette seafoam tokens
  colorPaletteSeafoamBackground2: 'var(--color-palette-seafoam-background-2)',
  colorPaletteSeafoamBorderActive: 'var(--color-palette-seafoam-border-active)',
  colorPaletteSeafoamForeground2: 'var(--color-palette-seafoam-foreground-2)',

  // Color palette steel tokens
  colorPaletteSteelBackground2: 'var(--color-palette-steel-background-2)',
  colorPaletteSteelBorderActive: 'var(--color-palette-steel-border-active)',
  colorPaletteSteelForeground2: 'var(--color-palette-steel-foreground-2)',

  // Color palette teal tokens
  colorPaletteTealBackground2: 'var(--color-palette-teal-background-2)',
  colorPaletteTealBorderActive: 'var(--color-palette-teal-border-active)',
  colorPaletteTealForeground2: 'var(--color-palette-teal-foreground-2)',

  // Color status success tokens
  colorStatusSuccessBackground1: 'var(--color-status-success-background-1)',
  colorStatusSuccessBackground2: 'var(--color-status-success-background-2)',
  colorStatusSuccessBackground3: 'var(--color-status-success-background-3)',
  colorStatusSuccessForeground1: 'var(--color-status-success-foreground-1)',
  colorStatusSuccessForeground2: 'var(--color-status-success-foreground-2)',
  colorStatusSuccessForeground3: 'var(--color-status-success-foreground-3)',
  colorStatusSuccessForegroundInverted: 'var(--color-status-success-foreground-inverted)',
  colorStatusSuccessBorderActive: 'var(--color-status-success-border-active)',
  colorStatusSuccessBorder1: 'var(--color-status-success-border-1)',
  colorStatusSuccessBorder2: 'var(--color-status-success-border-2)',

  // Color status warning tokens
  colorStatusWarningBackground1: 'var(--color-status-warning-background-1)',
  colorStatusWarningBackground2: 'var(--color-status-warning-background-2)',
  colorStatusWarningBackground3: 'var(--color-status-warning-background-3)',
  colorStatusWarningForeground1: 'var(--color-status-warning-foreground-1)',
  colorStatusWarningForeground2: 'var(--color-status-warning-foreground-2)',
  colorStatusWarningForeground3: 'var(--color-status-warning-foreground-3)',
  colorStatusWarningForegroundInverted: 'var(--color-status-warning-foreground-inverted)',
  colorStatusWarningBorderActive: 'var(--color-status-warning-border-active)',
  colorStatusWarningBorder1: 'var(--color-status-warning-border-1)',
  colorStatusWarningBorder2: 'var(--color-status-warning-border-2)',

  // Color status danger tokens
  colorStatusDangerBackground1: 'var(--color-status-danger-background-1)',
  colorStatusDangerBackground2: 'var(--color-status-danger-background-2)',
  colorStatusDangerBackground3: 'var(--color-status-danger-background-3)',
  colorStatusDangerBackground3Hover: 'var(--color-status-danger-background-3-hover)',
  colorStatusDangerBackground3Pressed: 'var(--color-status-danger-background-3-pressed)',
  colorStatusDangerForeground1: 'var(--color-status-danger-foreground-1)',
  colorStatusDangerForeground2: 'var(--color-status-danger-foreground-2)',
  colorStatusDangerForeground3: 'var(--color-status-danger-foreground-3)',
  colorStatusDangerForegroundInverted: 'var(--color-status-danger-foreground-inverted)',
  colorStatusDangerBorderActive: 'var(--color-status-danger-border-active)',
  colorStatusDangerBorder1: 'var(--color-status-danger-border-1)',
  colorStatusDangerBorder2: 'var(--color-status-danger-border-2)',

  // Border radius tokens
  borderRadiusNone: 'var(--radius-none)',
  borderRadiusSmall: 'var(--radius-small)',
  borderRadiusMedium: 'var(--radius-medium)',
  borderRadiusLarge: 'var(--radius-large)',
  borderRadiusXLarge: 'var(--radius-x-large)',
  borderRadius2XLarge: 'var(--radius-2-x-large)',
  borderRadius3XLarge: 'var(--radius-3-x-large)',
  borderRadius4XLarge: 'var(--radius-4-x-large)',
  borderRadius5XLarge: 'var(--radius-5-x-large)',
  borderRadius6XLarge: 'var(--radius-6-x-large)',
  borderRadiusCircular: 'var(--radius-circular)',

  // Font family tokens
  fontFamilyBase: 'var(--font-base)',
  fontFamilyMonospace: 'var(--font-monospace)',
  fontFamilyNumeric: 'var(--font-numeric)',

  // Font size tokens
  fontSizeBase100: 'var(--text-base-100)',
  fontSizeBase200: 'var(--text-base-200)',
  fontSizeBase300: 'var(--text-base-300)',
  fontSizeBase400: 'var(--text-base-400)',
  fontSizeBase500: 'var(--text-base-500)',
  fontSizeBase600: 'var(--text-base-600)',
  fontSizeHero700: 'var(--text-hero-700)',
  fontSizeHero800: 'var(--text-hero-800)',
  fontSizeHero900: 'var(--text-hero-900)',
  fontSizeHero1000: 'var(--text-hero-1000)',

  // Font weight tokens
  fontWeightRegular: 'var(--font-weight-regular)',
  fontWeightMedium: 'var(--font-weight-medium)',
  fontWeightSemibold: 'var(--font-weight-semibold)',
  fontWeightBold: 'var(--font-weight-bold)',

  // Line height tokens
  lineHeightBase100: 'var(--leading-base-100)',
  lineHeightBase200: 'var(--leading-base-200)',
  lineHeightBase300: 'var(--leading-base-300)',
  lineHeightBase400: 'var(--leading-base-400)',
  lineHeightBase500: 'var(--leading-base-500)',
  lineHeightBase600: 'var(--leading-base-600)',
  lineHeightHero700: 'var(--leading-hero-700)',
  lineHeightHero800: 'var(--leading-hero-800)',
  lineHeightHero900: 'var(--leading-hero-900)',
  lineHeightHero1000: 'var(--leading-hero-1000)',

  // Shadow tokens
  shadow2: 'var(--shadow-2)',
  shadow4: 'var(--shadow-4)',
  shadow8: 'var(--shadow-8)',
  shadow16: 'var(--shadow-16)',
  shadow28: 'var(--shadow-28)',
  shadow64: 'var(--shadow-64)',

  // Shadow brand tokens
  shadow2Brand: 'var(--shadow-2-brand)',
  shadow4Brand: 'var(--shadow-4-brand)',
  shadow8Brand: 'var(--shadow-8-brand)',
  shadow16Brand: 'var(--shadow-16-brand)',
  shadow28Brand: 'var(--shadow-28-brand)',
  shadow64Brand: 'var(--shadow-64-brand)',

  // Stroke width tokens.
  //
  // THEMING PHASE 1 (settled with user 2026-07-29, option B): these JS constants are the
  // READ path for stroke widths and reference the CANONICAL kebab-case variables emitted
  // by @fluentui/react-tailwind-theme at `:root, :host` (--stroke-width-* — literal
  // base-scale values, deliberately NOT coupled to the --spacing density knob). The old
  // camelCase CSS variables (--strokeWidthThin, ...) no longer exist in emitted CSS.
  strokeWidthThin: 'var(--stroke-width-thin)',
  strokeWidthThick: 'var(--stroke-width-thick)',
  strokeWidthThicker: 'var(--stroke-width-thicker)',
  strokeWidthThickest: 'var(--stroke-width-thickest)',

  // Spacings.
  //
  // THEMING PHASE 1: same as stroke widths — these reference the canonical
  // --spacing-horizontal-* / --spacing-vertical-* variables (numeric-axis aliases,
  // calc(var(--spacing) * N)) emitted by the theme artifact; the old camelCase CSS
  // variables (--spacingHorizontalM, ...) no longer exist in emitted CSS.
  spacingHorizontalNone: 'var(--spacing-horizontal-none)',
  spacingHorizontalXXS: 'var(--spacing-horizontal-xxs)',
  spacingHorizontalXS: 'var(--spacing-horizontal-xs)',
  spacingHorizontalSNudge: 'var(--spacing-horizontal-s-nudge)',
  spacingHorizontalS: 'var(--spacing-horizontal-s)',
  spacingHorizontalMNudge: 'var(--spacing-horizontal-m-nudge)',
  spacingHorizontalM: 'var(--spacing-horizontal-m)',
  spacingHorizontalL: 'var(--spacing-horizontal-l)',
  spacingHorizontalXL: 'var(--spacing-horizontal-xl)',
  spacingHorizontalXXL: 'var(--spacing-horizontal-xxl)',
  spacingHorizontalXXXL: 'var(--spacing-horizontal-xxxl)',

  spacingVerticalNone: 'var(--spacing-vertical-none)',
  spacingVerticalXXS: 'var(--spacing-vertical-xxs)',
  spacingVerticalXS: 'var(--spacing-vertical-xs)',
  spacingVerticalSNudge: 'var(--spacing-vertical-s-nudge)',
  spacingVerticalS: 'var(--spacing-vertical-s)',
  spacingVerticalMNudge: 'var(--spacing-vertical-m-nudge)',
  spacingVerticalM: 'var(--spacing-vertical-m)',
  spacingVerticalL: 'var(--spacing-vertical-l)',
  spacingVerticalXL: 'var(--spacing-vertical-xl)',
  spacingVerticalXXL: 'var(--spacing-vertical-xxl)',
  spacingVerticalXXXL: 'var(--spacing-vertical-xxxl)',

  // Durations
  durationUltraFast: 'var(--duration-ultra-fast)',
  durationFaster: 'var(--duration-faster)',
  durationFast: 'var(--duration-fast)',
  durationNormal: 'var(--duration-normal)',
  durationGentle: 'var(--duration-gentle)',
  durationSlow: 'var(--duration-slow)',
  durationSlower: 'var(--duration-slower)',
  durationUltraSlow: 'var(--duration-ultra-slow)',

  // Curves
  curveAccelerateMax: 'var(--ease-accelerate-max)',
  curveAccelerateMid: 'var(--ease-accelerate-mid)',
  curveAccelerateMin: 'var(--ease-accelerate-min)',
  curveDecelerateMax: 'var(--ease-decelerate-max)',
  curveDecelerateMid: 'var(--ease-decelerate-mid)',
  curveDecelerateMin: 'var(--ease-decelerate-min)',
  curveEasyEaseMax: 'var(--ease-easy-ease-max)',
  curveEasyEase: 'var(--ease-easy-ease)',
  curveLinear: 'var(--ease-linear)',

  /**
   * ZIndexes
   * Special case where the tokens contain default values
   * ZIndexes are not mandatory, so they are not included in the theme, but can be used as tokens with default values
   */

  /**
   * Elevation 0
   * Can be used for background elements, like surfaces
   */
  zIndexBackground: 'var(--z-index-background, 0)',

  /**
   * Elevation 2
   * Can be used content that is on top of the background, like cards
   */
  zIndexContent: 'var(--z-index-content, 1)',

  /**
   * Elevation 4
   * Can be used for overlays, like the backdrop of a modal
   */
  zIndexOverlay: 'var(--z-index-overlay, 1000)',

  /**
   * Elevation 8
   * Can be used for popups, like modals and drawers
   */
  zIndexPopup: 'var(--z-index-popup, 2000)',

  /**
   * Elevation 16
   * Can be used for messages, like snackbars and toasts
   */
  zIndexMessages: 'var(--z-index-messages, 3000)',

  /**
   * Elevation 28
   * Can be used for floating elements, like dropdowns
   */
  zIndexFloating: 'var(--z-index-floating, 4000)',

  /**
   * Elevation 64
   * Can be used for high priority floating elements, like tooltips
   */
  zIndexPriority: 'var(--z-index-priority, 5000)',

  /**
   * Special elevation
   * Can be used for elements that need to be above everything else, like debug overlays
   */
  zIndexDebug: 'var(--z-index-debug, 6000)',
};
