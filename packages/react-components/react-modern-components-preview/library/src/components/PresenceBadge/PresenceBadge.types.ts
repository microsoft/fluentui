import type {
  PresenceBadgeProps as PresenceBadgeBaseProps,
  PresenceBadgeState as PresenceBadgeBaseState,
} from '@fluentui/react-headless-components-preview/badge';
import type { BadgeProps } from '../Badge/Badge.types';

export type {
  BadgeSlots as PresenceBadgeSlots,
  PresenceBadgeStatus,
} from '@fluentui/react-headless-components-preview/badge';

export type PresenceBadgeProps = PresenceBadgeBaseProps & {
  /**
   * Size of the PresenceBadge.
   *
   * @default 'medium'
   */
  size?: BadgeProps['size'];
};

export type PresenceBadgeState = PresenceBadgeBaseState & {
  size: NonNullable<PresenceBadgeProps['size']>;
  root: PresenceBadgeBaseState['root'] & {
    'data-size': NonNullable<PresenceBadgeProps['size']>;
  };
};
