import { tokens } from '@fluentui/react-theme';

export const smtcCornerControlCircular = `var(--smtcCornerControlCircular,${tokens.borderRadiusCircular}))`;
export const smtcAvatarStroke = `var(--smtcAvatarStroke,${tokens.colorBrandStroke1}))`;
export const smtcAvatarBackgroundRest = `var(--smtcAvatarBackgroundRest,${tokens.colorNeutralBackground6}))`;
export const smtcAvatarNeutralForegroundRest = `var(--smtcAvatarNeutralForegroundRest,${tokens.colorNeutralForeground3}))`;
export const smtcAvatarBrandBackgroundRest = `var(--smtcAvatarBrandBackgroundRest,${tokens.colorBrandBackgroundStatic}))`;
export const smtcAvatarBrandForegroundRest = `var(--smtcAvatarBrandForegroundRest,${tokens.colorNeutralForegroundStaticInverted}))`;

export const avatarTokens = {
  ctrlAvatarCornerRadius: `var(--ctrlAvatarCornerRadius,${smtcCornerControlCircular}))`,
  ctrlActiveRingRest: `var(--ctrlActiveRingRest,${smtcAvatarStroke}))`,
  // ctrlAvatarRingDisabled is not used in the Avatar component

  ctrlAvatarNeutralBackgroundRest: `var(--ctrlAvatarNeutralBackgroundRest,${smtcAvatarBackgroundRest}))`,
  // ctrlAvatarNeutralBackgroundDisabled is not used in the Avatar component
  ctrlAvatarNeutralForegroundRest: `var(--ctrlAvatarNeutralForegroundRest,${smtcAvatarNeutralForegroundRest}))`,
  // ctrlAvatarNeutralForegroundDisabled is not used in the Avatar component

  ctrlAvatarBrandBackgroundRest: `var(--ctrlAvatarBrandBackgroundRest,${smtcAvatarBrandBackgroundRest}))`,
  // ctrlAvatarBrandBackgroundDisabled is not used in the Avatar component
  ctrlAvatarBrandForegroundRest: `var(--ctrlAvatarBrandForegroundRest,${smtcAvatarBrandForegroundRest}))`,
  // ctrlAvatarBrandForegroundDisabled is not used in the Avatar component
};
