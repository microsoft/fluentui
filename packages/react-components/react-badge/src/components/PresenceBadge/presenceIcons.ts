import * as React from 'react';
import {
  PresenceAvailable10Regular,
  PresenceAvailable12Regular,
  PresenceAvailable16Regular,
  PresenceAvailable20Regular,
  PresenceAvailable10Filled,
  PresenceAvailable12Filled,
  PresenceAvailable16Filled,
  PresenceAvailable20Filled,
  PresenceAway10Regular,
  PresenceAway12Regular,
  PresenceAway16Regular,
  PresenceAway20Regular,
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
  PresenceDnd10Regular,
  PresenceDnd12Regular,
  PresenceDnd16Regular,
  PresenceDnd20Regular,
  PresenceDnd10Filled,
  PresenceDnd12Filled,
  PresenceDnd16Filled,
  PresenceDnd20Filled,
  PresenceOof10Regular,
  PresenceOof12Regular,
  PresenceOof16Regular,
  PresenceOof20Regular,
  PresenceOffline10Regular,
  PresenceOffline12Regular,
  PresenceOffline16Regular,
  PresenceOffline20Regular,
  PresenceUnknown10Regular,
  PresenceUnknown12Regular,
  PresenceUnknown16Regular,
  PresenceUnknown20Regular,
} from '@fluentui/react-icons';
import type { PresenceBadgeState } from './PresenceBadge.types';

export const presenceAwayRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAway10Regular,
  'extra-small': PresenceAway10Regular,
  small: PresenceAway12Regular,
  medium: PresenceAway16Regular,
  large: PresenceAway20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAway20Regular,
};

export const presenceAwayFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAway10Filled,
  'extra-small': PresenceAway10Filled,
  small: PresenceAway12Filled,
  medium: PresenceAway16Filled,
  large: PresenceAway20Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAway20Filled,
};

export const presenceAvailableRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAvailable10Regular,
  'extra-small': PresenceAvailable10Regular,
  small: PresenceAvailable12Regular,
  medium: PresenceAvailable16Regular,
  large: PresenceAvailable20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAvailable20Regular,
};

export const presenceAvailableFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAvailable10Filled,
  'extra-small': PresenceAvailable10Filled,
  small: PresenceAvailable12Filled,
  medium: PresenceAvailable16Filled,
  large: PresenceAvailable20Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAvailable20Filled,
};

export const presenceBlockedRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceBlocked10Regular,
  'extra-small': PresenceBlocked10Regular,
  small: PresenceBlocked12Regular,
  medium: PresenceBlocked16Regular,
  large: PresenceBlocked20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceBlocked20Regular,
};

export const presenceBusyFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceBusy10Filled,
  'extra-small': PresenceBusy10Filled,
  small: PresenceBusy12Filled,
  medium: PresenceBusy16Filled,
  large: PresenceBusy20Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceBusy20Filled,
};

export const presenceDndFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceDnd10Filled,
  'extra-small': PresenceDnd10Filled,
  small: PresenceDnd12Filled,
  medium: PresenceDnd16Filled,
  large: PresenceDnd20Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceDnd20Filled,
};

export const presenceDndRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceDnd10Regular,
  'extra-small': PresenceDnd10Regular,
  small: PresenceDnd12Regular,
  medium: PresenceDnd16Regular,
  large: PresenceDnd20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceDnd20Regular,
};

export const presenceOofRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceOof10Regular,
  'extra-small': PresenceOof10Regular,
  small: PresenceOof12Regular,
  medium: PresenceOof16Regular,
  large: PresenceOof20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceOof20Regular,
};

export const presenceOfflineRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceOffline10Regular,
  'extra-small': PresenceOffline10Regular,
  small: PresenceOffline12Regular,
  medium: PresenceOffline16Regular,
  large: PresenceOffline20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceOffline20Regular,
};

export const presenceUnknownRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceUnknown10Regular,
  'extra-small': PresenceUnknown10Regular,
  small: PresenceUnknown12Regular,
  medium: PresenceUnknown16Regular,
  large: PresenceUnknown20Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceUnknown20Regular,
};
