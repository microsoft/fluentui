import { tokens } from '@fluentui/react-theme';

// Brand colors (Used as default Link control colors in Fluent 2)
export const ctrlLinkForegroundBrandRest = `var(--ctrl-link-foreground-brand-rest, var(--foreground-ctrl-brand-rest,${tokens.colorBrandForegroundLink}))))`;
export const ctrlLinkForegroundBrandHover = `var(--ctrl-link-foreground-brand-hover, var(--foreground-ctrl-brand-hover,${tokens.colorBrandForegroundLinkHover}))))`;
export const ctrlLinkForegroundBrandPressed = `var(--ctrl-link-foreground-brand-pressed, var(--foreground-ctrl-brand-pressed,${tokens.colorBrandForegroundLinkPressed}))))`;

// Neutral colors (for non-branded use aka fluent2 'subtle')
// In the design specs, this falls back to colorNeutralForeground1, but in fluent2 it falls back to colorNeutralForeground2
export const ctrlLinkForegroundNeutralRest = `var(--ctrl-link-foreground-neutral-rest, var(--foreground-ctrl-neutral-primary-rest,${tokens.colorNeutralForeground2}))))`;
export const ctrlLinkForegroundNeutralHover = `var(--ctrl-link-foreground-neutral-hover, var(--foreground-ctrl-neutral-primary-hover,${tokens.colorNeutralForeground2Hover}))))`;
export const ctrlLinkForegroundNeutralPressed = `var(--ctrl-link-foreground-neutral-pressed, var(--foreground-ctrl-neutral-primary-pressed,${tokens.colorNeutralForeground2Pressed}))))`;
