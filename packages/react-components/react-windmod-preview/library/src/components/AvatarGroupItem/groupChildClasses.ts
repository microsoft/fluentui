import { clsx } from 'clsx';

import type { AvatarSize } from '../Avatar';
import type { AvatarGroupProps } from '../AvatarGroup/AvatarGroup.types';

import styles from './AvatarGroupItem.module.css';

// Each upper boundary is exclusive, and the ring and gap ladders do not share one. Every range is
// written in full so the keys partition AvatarSize with no implied else; `+()` coerces a condition
// to 1 or 0 because TS rejects a bare boolean computed key (TS2464).
const stackRingClass = (size: AvatarSize) =>
  ({
    [+(size < 56)]: styles.stackThick,
    [+(size >= 56 && size < 72)]: styles.stackThicker,
    [+(size >= 72)]: styles.stackThickest,
  })[1];

const stackGapClass = (size: AvatarSize) =>
  ({
    [+(size < 24)]: styles.stackGapXxs,
    [+(size >= 24 && size < 48)]: styles.stackGapXs,
    [+(size >= 48 && size < 96)]: styles.stackGapS,
    [+(size >= 96)]: styles.stackGapL,
  })[1];

// Four classes, not five: Griffel's `m` bucket sits between the `mNudge` and `l` boundaries and
// is unreachable for every size.
const spreadGapClass = (size: AvatarSize) =>
  ({
    [+(size < 20)]: styles.spreadGapS,
    [+(size >= 20 && size < 32)]: styles.spreadGapMNudge,
    [+(size >= 32 && size < 64)]: styles.spreadGapL,
    [+(size >= 64)]: styles.spreadGapXl,
  })[1];

/**
 * Spacing and ring a direct child of an AvatarGroup carries for its layout and size. A plain
 * function rather than a hook: no shared state exists, only conditional class assembly. The pie
 * layout spaces its children by clip geometry instead and takes nothing from here.
 *
 * The overflow trigger button is a group child too, so AvatarGroupPopover calls this as well.
 */
export const groupChildClasses = (layout: AvatarGroupProps['layout'], size: AvatarSize): string => {
  if (layout === 'stack') {
    return clsx(stackRingClass(size), stackGapClass(size));
  }
  if (layout === 'spread') {
    return clsx(spreadGapClass(size));
  }
  return '';
};
