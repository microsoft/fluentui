import * as React from 'react';
import {
  PresenceAvailable10Regular,
  PresenceAvailable12Regular,
  PresenceAvailable16Regular,
  PresenceAvailable10Filled,
  PresenceAvailable12Filled,
  PresenceAvailable16Filled,
  PresenceAway10Filled,
  PresenceAway12Filled,
  PresenceAway16Filled,
  PresenceBusy10Filled,
  PresenceBusy12Filled,
  PresenceBusy16Filled,
  PresenceDnd10Regular,
  PresenceDnd12Regular,
  PresenceDnd16Regular,
  PresenceDnd10Filled,
  PresenceDnd12Filled,
  PresenceDnd16Filled,
  PresenceOof10Regular,
  PresenceOof12Regular,
  PresenceOof16Regular,
  PresenceOffline10Regular,
  PresenceOffline12Regular,
  PresenceOffline16Regular,
  PresenceUnknown10Regular,
  PresenceUnknown12Regular,
  PresenceUnknown16Regular,
} from '@fluentui/react-icons';
import type { PresenceBadgeState } from './PresenceBadge.types';

export const presenceAwayFilled: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAway10Filled,
  'extra-small': PresenceAway10Filled,
  small: PresenceAway12Filled,
  medium: PresenceAway16Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceAway16Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAway16Filled,
};

export const presenceAvailableRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAvailable10Regular,
  'extra-small': PresenceAvailable10Regular,
  small: PresenceAvailable12Regular,
  medium: PresenceAvailable16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceAvailable16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAvailable16Regular,
};

export const presenceAvailableFilled: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceAvailable10Filled,
  'extra-small': PresenceAvailable10Filled,
  small: PresenceAvailable12Filled,
  medium: PresenceAvailable16Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceAvailable16Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceAvailable16Filled,
};

export const presenceBusyFilled: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceBusy10Filled,
  'extra-small': PresenceBusy10Filled,
  small: PresenceBusy12Filled,
  medium: PresenceBusy16Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceBusy16Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceBusy16Filled,
};

export const presenceDndFilled: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceDnd10Filled,
  'extra-small': PresenceDnd10Filled,
  small: PresenceDnd12Filled,
  medium: PresenceDnd16Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceDnd16Filled,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceDnd16Filled,
};

export const presenceDndRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceDnd10Regular,
  'extra-small': PresenceDnd10Regular,
  small: PresenceDnd12Regular,
  medium: PresenceDnd16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceDnd16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceDnd16Regular,
};

export const presenceOofRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceOof10Regular,
  'extra-small': PresenceOof10Regular,
  small: PresenceOof12Regular,
  medium: PresenceOof16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceOof16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceOof16Regular,
};

export const presenceOfflineRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceOffline10Regular,
  'extra-small': PresenceOffline10Regular,
  small: PresenceOffline12Regular,
  medium: PresenceOffline16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceOffline16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceOffline16Regular,
};

export const presenceUnknownRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  tiny: PresenceUnknown10Regular,
  'extra-small': PresenceUnknown10Regular,
  small: PresenceUnknown12Regular,
  medium: PresenceUnknown16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  large: PresenceUnknown16Regular,
  // FIXME not all presence icon sizes are available
  // https://github.com/microsoft/fluentui/issues/20650
  'extra-large': PresenceUnknown16Regular,
};
