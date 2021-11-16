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
  tiny: null,
  'extra-small': PresenceAway10Filled,
  small: PresenceAway12Filled,
  medium: PresenceAway16Filled,
  large: null,
  'extra-large': null,
};

export const presenceAvailableRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  tiny: null,
  'extra-small': PresenceAvailable10Regular,
  small: PresenceAvailable12Regular,
  medium: PresenceAvailable16Regular,
  large: null,
  'extra-large': null,
};

export const presenceAvailableFilled: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  tiny: null,
  'extra-small': PresenceAvailable10Filled,
  small: PresenceAvailable12Filled,
  medium: PresenceAvailable16Filled,
  large: null,
  'extra-large': null,
};

export const presenceBusyFilled: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  tiny: null,
  'extra-small': PresenceBusy10Filled,
  small: PresenceBusy12Filled,
  medium: PresenceBusy16Filled,
  large: null,
  'extra-large': null,
};

export const presenceDndFilled: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  tiny: null,
  'extra-small': PresenceDnd10Filled,
  small: PresenceDnd12Filled,
  medium: PresenceDnd16Filled,
  large: null,
  'extra-large': null,
};

export const presenceDndRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  tiny: null,
  'extra-small': PresenceDnd10Regular,
  small: PresenceDnd12Regular,
  medium: PresenceDnd16Regular,
  large: null,
  'extra-large': null,
};

export const presenceOofRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  tiny: null,
  'extra-small': PresenceOof10Regular,
  small: PresenceOof12Regular,
  medium: PresenceOof16Regular,
  large: null,
  'extra-large': null,
};

export const presenceOfflineRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  tiny: null,
  'extra-small': PresenceOffline10Regular,
  small: PresenceOffline12Regular,
  medium: PresenceOffline16Regular,
  large: null,
  'extra-large': null,
};

export const presenceUnknownRegular: Record<PresenceBadgeState['size'], React.FunctionComponent | null> = {
  tiny: null,
  'extra-small': PresenceUnknown10Regular,
  small: PresenceUnknown12Regular,
  medium: PresenceUnknown16Regular,
  large: null,
  'extra-large': null,
};
