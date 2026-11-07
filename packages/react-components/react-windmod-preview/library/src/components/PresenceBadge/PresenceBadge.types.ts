import type {
  PresenceBadgeProps as PresenceBadgeHeadlessProps,
  PresenceBadgeState as PresenceBadgeHeadlessState,
} from '@fluentui/react-headless-components-preview/badge';

import type { BadgeSize } from '../Badge/Badge.types';

export type { BadgeSlots, PresenceBadgeStatus } from '@fluentui/react-headless-components-preview/badge';

/**
 * Windmod PresenceBadge props: the headless presence badge plus the look prop the headless
 * surface deliberately omits (it exists purely to select styles and glyph size).
 */
export type PresenceBadgeProps = PresenceBadgeHeadlessProps & {
  /** @default 'medium' */
  size?: BadgeSize;
};

/** Windmod PresenceBadge state: headless state plus the resolved look prop. */
export type PresenceBadgeState = PresenceBadgeHeadlessState & Required<Pick<PresenceBadgeProps, 'size'>>;
