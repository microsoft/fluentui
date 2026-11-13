import * as React from 'react';
import {
  PresenceAvailable10Filled,
  PresenceAvailable10Regular,
  PresenceAvailable12Filled,
  PresenceAvailable12Regular,
  PresenceAvailable16Filled,
  PresenceAvailable16Regular,
  PresenceAvailable20Filled,
  PresenceAvailable20Regular,
} from '@fluentui/react-icons/headless/svg/presence-available';
import {
  PresenceAway10Filled,
  PresenceAway12Filled,
  PresenceAway16Filled,
  PresenceAway20Filled,
} from '@fluentui/react-icons/headless/svg/presence-away';
import {
  PresenceBlocked10Regular,
  PresenceBlocked12Regular,
  PresenceBlocked16Regular,
  PresenceBlocked20Regular,
} from '@fluentui/react-icons/headless/svg/presence-blocked';
import {
  PresenceBusy10Filled,
  PresenceBusy12Filled,
  PresenceBusy16Filled,
  PresenceBusy20Filled,
} from '@fluentui/react-icons/headless/svg/presence-busy';
import {
  PresenceDnd10Filled,
  PresenceDnd10Regular,
  PresenceDnd12Filled,
  PresenceDnd12Regular,
  PresenceDnd16Filled,
  PresenceDnd16Regular,
  PresenceDnd20Filled,
  PresenceDnd20Regular,
} from '@fluentui/react-icons/headless/svg/presence-dnd';
import {
  PresenceOffline10Regular,
  PresenceOffline12Regular,
  PresenceOffline16Regular,
  PresenceOffline20Regular,
} from '@fluentui/react-icons/headless/svg/presence-offline';
import {
  PresenceOof10Regular,
  PresenceOof12Regular,
  PresenceOof16Regular,
  PresenceOof20Regular,
} from '@fluentui/react-icons/headless/svg/presence-oof';
import {
  PresenceUnknown10Regular,
  PresenceUnknown12Regular,
  PresenceUnknown16Regular,
  PresenceUnknown20Regular,
} from '@fluentui/react-icons/headless/svg/presence-unknown';

import type { PresenceBadgeStatus } from './PresenceBadge.types';

/** windmod's density size → the icon pixel asset Griffel selects for it. tiny reuses the
 * extra-small asset and extra-large reuses the large one, matching Griffel's own icon set gaps
 * (@fluentui/react-badge presenceIcons.ts) — the CSS forces the two reused cases to their own
 * pixel footprint. */
type IconPixelSize = 10 | 12 | 16 | 20;

const iconPixelSizeFor: Record<'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large', IconPixelSize> = {
  tiny: 10,
  'extra-small': 10,
  small: 12,
  medium: 16,
  large: 20,
  'extra-large': 20,
};

type GlyphKey =
  | 'available'
  | 'availableOof'
  | 'away'
  | 'blocked'
  | 'busy'
  | 'busyOof'
  | 'dnd'
  | 'dndOof'
  | 'offline'
  | 'oof'
  | 'unknown';

const glyphsAt: Record<IconPixelSize, Record<GlyphKey, React.FunctionComponent>> = {
  10: {
    available: PresenceAvailable10Filled,
    availableOof: PresenceAvailable10Regular,
    away: PresenceAway10Filled,
    blocked: PresenceBlocked10Regular,
    busy: PresenceBusy10Filled,
    busyOof: PresenceUnknown10Regular,
    dnd: PresenceDnd10Filled,
    dndOof: PresenceDnd10Regular,
    offline: PresenceOffline10Regular,
    oof: PresenceOof10Regular,
    unknown: PresenceUnknown10Regular,
  },
  12: {
    available: PresenceAvailable12Filled,
    availableOof: PresenceAvailable12Regular,
    away: PresenceAway12Filled,
    blocked: PresenceBlocked12Regular,
    busy: PresenceBusy12Filled,
    busyOof: PresenceUnknown12Regular,
    dnd: PresenceDnd12Filled,
    dndOof: PresenceDnd12Regular,
    offline: PresenceOffline12Regular,
    oof: PresenceOof12Regular,
    unknown: PresenceUnknown12Regular,
  },
  16: {
    available: PresenceAvailable16Filled,
    availableOof: PresenceAvailable16Regular,
    away: PresenceAway16Filled,
    blocked: PresenceBlocked16Regular,
    busy: PresenceBusy16Filled,
    busyOof: PresenceUnknown16Regular,
    dnd: PresenceDnd16Filled,
    dndOof: PresenceDnd16Regular,
    offline: PresenceOffline16Regular,
    oof: PresenceOof16Regular,
    unknown: PresenceUnknown16Regular,
  },
  20: {
    available: PresenceAvailable20Filled,
    availableOof: PresenceAvailable20Regular,
    away: PresenceAway20Filled,
    blocked: PresenceBlocked20Regular,
    busy: PresenceBusy20Filled,
    busyOof: PresenceUnknown20Regular,
    dnd: PresenceDnd20Filled,
    dndOof: PresenceDnd20Regular,
    offline: PresenceOffline20Regular,
    oof: PresenceOof20Regular,
    unknown: PresenceUnknown20Regular,
  },
};

/** Mirrors `@fluentui/react-badge`'s presenceIcons iconMap switch. `away` and `offline`
 * out-of-office read the shared `oof` glyph; `busy` out-of-office reads `unknown`. */
const glyphKeyFor = (status: PresenceBadgeStatus, outOfOffice: boolean): GlyphKey => {
  switch (status) {
    case 'available':
      return outOfOffice ? 'availableOof' : 'available';
    case 'away':
      return outOfOffice ? 'oof' : 'away';
    case 'blocked':
      return 'blocked';
    case 'busy':
      return outOfOffice ? 'busyOof' : 'busy';
    case 'do-not-disturb':
      return outOfOffice ? 'dndOof' : 'dnd';
    case 'offline':
      return outOfOffice ? 'oof' : 'offline';
    case 'out-of-office':
      return 'oof';
    case 'unknown':
      return 'unknown';
  }
};

/** The default glyph for a status and size, combined with out-of-office where Griffel's icon
 * set draws a distinct glyph for that combination. */
export const presenceGlyph = (
  status: PresenceBadgeStatus,
  outOfOffice: boolean,
  size: keyof typeof iconPixelSizeFor,
): React.ReactElement => {
  const Glyph = glyphsAt[iconPixelSizeFor[size]][glyphKeyFor(status, outOfOffice)];

  return <Glyph />;
};
