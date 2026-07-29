export { Badge } from './Badge';
// Explicit exports to omit BadgeCommons
export type { BadgeBaseProps, BadgeBaseState, BadgeProps, BadgeSlots, BadgeState } from './Badge.types';
export { renderBadge_unstable } from './renderBadge';
export { useBadge_unstable, useBadgeBase_unstable } from './useBadge';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- `badgeClassNames` is deprecated for styling (DECISIONS.md D16.5); re-exporting it is the point.
export { badgeClassNames, useBadgeStyles_unstable } from './useBadgeStyles.styles';
