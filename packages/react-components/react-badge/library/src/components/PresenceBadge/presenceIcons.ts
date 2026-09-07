import type * as React from 'react';
import {
  PresenceAvailableRegular,
  PresenceAvailableFilled,
  PresenceAwayRegular,
  PresenceAwayFilled,
  PresenceBlockedRegular,
  PresenceBusyFilled,
  PresenceDndRegular,
  PresenceDndFilled,
  PresenceOofRegular,
  PresenceOfflineRegular,
  PresenceUnknownRegular,
} from '@fluentui/react-icons';
import type { PresenceBadgeState } from './PresenceBadge.types';

const createIconMap = (Icon: React.FunctionComponent): Record<PresenceBadgeState['size'], React.FunctionComponent> => ({
  tiny: Icon,
  'extra-small': Icon,
  small: Icon,
  medium: Icon,
  large: Icon,
  'extra-large': Icon,
});

export const presenceAwayRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceAwayRegular);

export const presenceAwayFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceAwayFilled);

export const presenceAvailableRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceAvailableRegular);

export const presenceAvailableFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceAvailableFilled);

export const presenceBlockedRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceBlockedRegular);

export const presenceBusyFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceBusyFilled);

export const presenceDndFilled: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceDndFilled);

export const presenceDndRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceDndRegular);

export const presenceOofRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceOofRegular);

export const presenceOfflineRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceOfflineRegular);

export const presenceUnknownRegular: Record<PresenceBadgeState['size'], React.FunctionComponent> =
  createIconMap(PresenceUnknownRegular);
