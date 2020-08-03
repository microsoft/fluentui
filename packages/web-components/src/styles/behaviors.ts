import { CSSCustomPropertyBehavior, cssCustomPropertyBehaviorFactory } from '@microsoft/fast-foundation';
import {
  accentBaseColor,
  accentFill,
  accentFillLarge,
  accentForeground,
  accentForegroundCut,
  accentForegroundLarge,
  DesignSystem,
  direction,
  neutralDividerRest,
  neutralFill,
  neutralFillCard,
  neutralFillInput,
  neutralFillStealth,
  neutralFillToggle,
  neutralFocus,
  neutralFocusInnerAccent,
  neutralForeground,
  neutralForegroundHint,
  neutralForegroundHintLarge,
  neutralForegroundToggle,
  neutralForegroundToggleLarge,
  neutralLayerCard,
  neutralLayerCardContainer,
  neutralLayerFloating,
  neutralLayerL1,
  neutralLayerL1Alt,
  neutralLayerL2,
  neutralLayerL3,
  neutralLayerL4,
  neutralOutline,
} from '@microsoft/fast-components-styles-msft';
import { Direction } from '@microsoft/fast-web-utilities';
import { FASTDesignSystemProvider } from '../design-system-provider';

/**
 * Behavior to resolve and make available the neutral-foreground-rest CSS custom property.
 * @public
 */
export const neutralForegroundRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-foreground-rest',
  x => neutralForeground(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-foreground-hover CSS custom property.
 * @public
 */
export const neutralForegroundHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-foreground-hover',
  x => neutralForeground(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-foreground-active CSS custom property.
 * @public
 */
export const neutralForegroundActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-foreground-active',
  x => neutralForeground(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-foreground-focus CSS custom property.
 * @public
 */
export const neutralForegroundFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-foreground-focus',
  x => neutralForeground(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-foreground-toggle CSS custom property.
 * @public
 */
export const neutralForegroundToggleBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-foreground-toggle',
  neutralForegroundToggle,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-foreground-toggle-large CSS custom property.
 * @public
 */
export const neutralForegroundToggleLargeBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-foreground-toggle-large',
  neutralForegroundToggleLarge,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-foreground-hint CSS custom property.
 * @public
 */
export const neutralForegroundHintBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-foreground-hint',
  neutralForegroundHint,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-foreground-hint-large CSS custom property.
 * @public
 */
export const neutralForegroundHintLargeBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-foreground-hint-large',
  neutralForegroundHintLarge,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-rest CSS custom property.
 * @public
 */
export const accentForegroundRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-rest',
  x => accentForeground(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-hover CSS custom property.
 * @public
 */
export const accentForegroundHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-hover',
  x => accentForeground(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-active CSS custom property.
 * @public
 */
export const accentForegroundActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-active',
  x => accentForeground(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-focus CSS custom property.
 * @public
 */
export const accentForegroundFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-focus',
  x => accentForeground(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-cut-rest CSS custom property.
 * @public
 */
export const accentForegroundCutRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-cut-rest',
  x => accentForegroundCut(x),
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-large-rest CSS custom property.
 * @public
 */
export const accentForegroundLargeRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-large-rest',
  x => accentForegroundLarge(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-large-hover CSS custom property.
 * @public
 */
export const accentForegroundLargeHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-large-hover',
  x => accentForegroundLarge(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-large-active CSS custom property.
 * @public
 */
export const accentForegroundLargeActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-large-active',
  x => accentForegroundLarge(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-foreground-large-focus CSS custom property.
 * @public
 */
export const accentForegroundLargeFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-foreground-large-focus',
  x => accentForegroundLarge(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-rest CSS custom property.
 * @public
 */
export const neutralFillRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-rest',
  x => neutralFill(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-hover CSS custom property.
 * @public
 */
export const neutralFillHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-hover',
  x => neutralFill(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-active CSS custom property.
 * @public
 */
export const neutralFillActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-active',
  x => neutralFill(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-focus CSS custom property.
 * @public
 */
export const neutralFillFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-focus',
  x => neutralFill(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-selected CSS custom property.
 * @public
 */
export const neutralFillSelectedBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-selected',
  x => neutralFill(x).selected,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-stealth-rest CSS custom property.
 * @public
 */
export const neutralFillStealthRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-stealth-rest',
  x => neutralFillStealth(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-stealth-hover CSS custom property.
 * @public
 */
export const neutralFillStealthHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-stealth-hover',
  x => neutralFillStealth(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-stealth-active CSS custom property.
 * @public
 */
export const neutralFillStealthActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-stealth-active',
  x => neutralFillStealth(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-stealth-focus CSS custom property.
 * @public
 */
export const neutralFillStealthFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-stealth-focus',
  x => neutralFillStealth(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-stealth-selected CSS custom property.
 * @public
 */
export const neutralFillStealthSelectedBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-stealth-selected',
  x => neutralFillStealth(x).selected,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-toggle-rest CSS custom property.
 * @public
 */
export const neutralFillToggleRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-toggle-rest',
  x => neutralFillToggle(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-toggle-hover CSS custom property.
 * @public
 */
export const neutralFillToggleHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-toggle-hover',
  x => neutralFillToggle(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-toggle-active CSS custom property.
 * @public
 */
export const neutralFillToggleActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-toggle-active',
  x => neutralFillToggle(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-toggle-focus CSS custom property.
 * @public
 */
export const neutralFillToggleFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-toggle-focus',
  x => neutralFillToggle(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-input-rest CSS custom property.
 * @public
 */
export const neutralFillInputRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-input-rest',
  x => neutralFillInput(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-input-hover CSS custom property.
 * @public
 */
export const neutralFillInputHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-input-hover',
  x => neutralFillInput(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-input-active CSS custom property.
 * @public
 */
export const neutralFillInputActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-input-active',
  x => neutralFillInput(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-input-focus CSS custom property.
 * @public
 */
export const neutralFillInputFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-input-focus',
  x => neutralFillInput(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-rest CSS custom property.
 * @public
 */
export const accentFillRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-rest',
  x => accentFill(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-hover CSS custom property.
 * @public
 */
export const accentFillHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-hover',
  x => accentFill(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-active CSS custom property.
 * @public
 */
export const accentFillActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-active',
  x => accentFill(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-focus CSS custom property.
 * @public
 */
export const accentFillFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-focus',
  x => accentFill(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-selected CSS custom property.
 * @public
 */
export const accentFillSelectedBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-selected',
  x => accentFill(x).selected,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-large-rest CSS custom property.
 * @public
 */
export const accentFillLargeRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-large-rest',
  x => accentFillLarge(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-large-hover CSS custom property.
 * @public
 */
export const accentFillLargeHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-large-hover',
  x => accentFillLarge(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-large-active CSS custom property.
 * @public
 */
export const accentFillLargeActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-large-active',
  x => accentFillLarge(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-large-focus CSS custom property.
 * @public
 */
export const accentFillLargeFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-large-focus',
  x => accentFillLarge(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the accent-fill-large-selected CSS custom property.
 * @public
 */
export const accentFillLargeSelectedBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'accent-fill-large-selected',
  x => accentFillLarge(x).selected,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-fill-card-rest CSS custom property.
 * @public
 */
export const neutralFillCardRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-fill-card-rest',
  x => neutralFillCard(x),
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-outline-rest CSS custom property.
 * @public
 */
export const neutralOutlineRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-outline-rest',
  x => neutralOutline(x).rest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-outline-hover CSS custom property.
 * @public
 */
export const neutralOutlineHoverBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-outline-hover',
  x => neutralOutline(x).hover,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-outline-active CSS custom property.
 * @public
 */
export const neutralOutlineActiveBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-outline-active',
  x => neutralOutline(x).active,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-outline-focus CSS custom property.
 * @public
 */
export const neutralOutlineFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-outline-focus',
  x => neutralOutline(x).focus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-divider-rest CSS custom property.
 * @public
 */
export const neutralDividerRestBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-divider-rest',
  neutralDividerRest,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-layer-floating CSS custom property.
 * @public
 */
export const neutralLayerFloatingBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-layer-floating',
  neutralLayerFloating,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-layer-card CSS custom property.
 * @public
 */
export const neutralLayerCardBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-layer-card',
  neutralLayerCard,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-layer-card-container CSS custom property.
 * @public
 */
export const neutralLayerCardContainerBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-layer-card-container',
  neutralLayerCardContainer,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-layer-l1 CSS custom property.
 * @public
 */
export const neutralLayerL1Behavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-layer-l1',
  neutralLayerL1,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-layer-l1-alt CSS custom property.
 * @public
 */
export const neutralLayerL1AltBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-layer-l1-alt',
  neutralLayerL1Alt,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-layer-l2 CSS custom property.
 * @public
 */
export const neutralLayerL2Behavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-layer-l2',
  neutralLayerL2,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-layer-l3 CSS custom property.
 * @public
 */
export const neutralLayerL3Behavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-layer-l3',
  neutralLayerL3,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-layer-l4 CSS custom property.
 * @public
 */
export const neutralLayerL4Behavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-layer-l4',
  neutralLayerL4,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-focus CSS custom property.
 * @public
 */
export const neutralFocusBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-focus',
  neutralFocus,
  FASTDesignSystemProvider.findProvider,
);
/**
 * Behavior to resolve and make available the neutral-focus-inner-accent CSS custom property.
 * @public
 */
export const neutralFocusInnerAccentBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'neutral-focus-inner-accent',
  neutralFocusInnerAccent(accentBaseColor),
  FASTDesignSystemProvider.findProvider,
);

/**
 * Behavior to resolve and make available the inline-start CSS custom property.
 *
 * @remarks
 * Replaces the inline-start value for the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/float | float} property
 * when the native value is not supported.
 *
 * @public
 * @example
 * ```ts
 * import { css } from "@microsoft/fast-element";
 * import { inlineStartBehavior } from "@microsoft/fast-components-msft";
 *
 * css`
 *   :host {
 *     float: ${inlineStartBehavior.var};
 *   }
 * `.withBehaviors(inlineStartBehavior)
 * ```
 */
export const inlineStartBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'inline-start',
  (designSystem: DesignSystem) => (direction(designSystem) === Direction.ltr ? 'left' : 'right'),
  FASTDesignSystemProvider.findProvider,
);

/**
 * Behavior to resolve and make available the inline-end CSS custom property.
 *
 * @remarks
 * Replaces the inline-end value for the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/float | float} property
 * when the native value is not supported.
 *
 * @public
 * @example
 * ```ts
 * import { css } from "@microsoft/fast-element";
 * import { inlineEndBehavior } from "@microsoft/fast-components-msft";
 *
 * css`
 *   :host {
 *     float: ${inlineEndBehavior.var};
 *   }
 * `.withBehaviors(inlineEndBehavior)
 * ```
 */
export const inlineEndBehavior: CSSCustomPropertyBehavior = cssCustomPropertyBehaviorFactory(
  'inline-end',
  (designSystem: DesignSystem) => (direction(designSystem) === Direction.ltr ? 'right' : 'left'),
  FASTDesignSystemProvider.findProvider,
);
