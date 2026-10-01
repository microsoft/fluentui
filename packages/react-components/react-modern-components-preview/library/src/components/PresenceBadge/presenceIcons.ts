import type * as React from 'react';
import {
  PresenceAvailable10Filled,
  PresenceAvailable10Regular,
  PresenceAvailable12Filled,
  PresenceAvailable12Regular,
  PresenceAvailable16Filled,
  PresenceAvailable16Regular,
  PresenceAvailable20Filled,
  PresenceAvailable20Regular,
  PresenceAway10Filled,
  PresenceAway12Filled,
  PresenceAway16Filled,
  PresenceAway20Filled,
  PresenceBlocked10Regular,
  PresenceBlocked12Regular,
  PresenceBlocked16Regular,
  PresenceBlocked20Regular,
  PresenceBusy10Filled,
  PresenceBusy12Filled,
  PresenceBusy16Filled,
  PresenceBusy20Filled,
  PresenceDnd10Filled,
  PresenceDnd10Regular,
  PresenceDnd12Filled,
  PresenceDnd12Regular,
  PresenceDnd16Filled,
  PresenceDnd16Regular,
  PresenceDnd20Filled,
  PresenceDnd20Regular,
  PresenceOffline10Regular,
  PresenceOffline12Regular,
  PresenceOffline16Regular,
  PresenceOffline20Regular,
  PresenceOof10Regular,
  PresenceOof12Regular,
  PresenceOof16Regular,
  PresenceOof20Regular,
  PresenceUnknown10Regular,
  PresenceUnknown12Regular,
  PresenceUnknown16Regular,
  PresenceUnknown20Regular,
} from '@fluentui/react-icons';
import type { PresenceBadgeState } from './PresenceBadge.types';

type PresenceIconMap = Record<PresenceBadgeState['size'], React.FunctionComponent>;

const mapIconSizes = (
  size10: React.FunctionComponent,
  size12: React.FunctionComponent,
  size16: React.FunctionComponent,
  size20: React.FunctionComponent,
): PresenceIconMap => ({
  tiny: size10,
  'extra-small': size10,
  small: size12,
  medium: size16,
  large: size20,
  'extra-large': size20,
});

export const presenceAvailableFilled = mapIconSizes(
  PresenceAvailable10Filled,
  PresenceAvailable12Filled,
  PresenceAvailable16Filled,
  PresenceAvailable20Filled,
);
export const presenceAvailableRegular = mapIconSizes(
  PresenceAvailable10Regular,
  PresenceAvailable12Regular,
  PresenceAvailable16Regular,
  PresenceAvailable20Regular,
);
export const presenceAwayFilled = mapIconSizes(
  PresenceAway10Filled,
  PresenceAway12Filled,
  PresenceAway16Filled,
  PresenceAway20Filled,
);
export const presenceBlockedRegular = mapIconSizes(
  PresenceBlocked10Regular,
  PresenceBlocked12Regular,
  PresenceBlocked16Regular,
  PresenceBlocked20Regular,
);
export const presenceBusyFilled = mapIconSizes(
  PresenceBusy10Filled,
  PresenceBusy12Filled,
  PresenceBusy16Filled,
  PresenceBusy20Filled,
);
export const presenceDndFilled = mapIconSizes(
  PresenceDnd10Filled,
  PresenceDnd12Filled,
  PresenceDnd16Filled,
  PresenceDnd20Filled,
);
export const presenceDndRegular = mapIconSizes(
  PresenceDnd10Regular,
  PresenceDnd12Regular,
  PresenceDnd16Regular,
  PresenceDnd20Regular,
);
export const presenceOfflineRegular = mapIconSizes(
  PresenceOffline10Regular,
  PresenceOffline12Regular,
  PresenceOffline16Regular,
  PresenceOffline20Regular,
);
export const presenceOofRegular = mapIconSizes(
  PresenceOof10Regular,
  PresenceOof12Regular,
  PresenceOof16Regular,
  PresenceOof20Regular,
);
export const presenceUnknownRegular = mapIconSizes(
  PresenceUnknown10Regular,
  PresenceUnknown12Regular,
  PresenceUnknown16Regular,
  PresenceUnknown20Regular,
);
