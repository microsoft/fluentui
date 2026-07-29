export { PresenceBadge } from './PresenceBadge';
export type {
  PresenceBadgeBaseProps,
  PresenceBadgeBaseState,
  PresenceBadgeProps,
  PresenceBadgeState,
  PresenceBadgeStatus,
} from './PresenceBadge.types';
export { usePresenceBadge_unstable, usePresenceBadgeBase_unstable } from './usePresenceBadge';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- `presenceBadgeClassNames` is deprecated for styling (DECISIONS.md D16.5); re-exporting it is the point.
export { presenceBadgeClassNames, usePresenceBadgeStyles_unstable } from './usePresenceBadgeStyles.styles';
export {
  presenceAvailableFilled,
  presenceAvailableRegular,
  presenceAwayFilled,
  presenceAwayRegular,
  presenceBlockedRegular,
  presenceBusyFilled,
  presenceDndFilled,
  presenceDndRegular,
  presenceOfflineRegular,
  presenceOofRegular,
  presenceUnknownRegular,
} from './presenceIcons';
