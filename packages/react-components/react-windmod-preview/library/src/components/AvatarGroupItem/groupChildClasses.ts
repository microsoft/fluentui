import { clsx } from 'clsx';

import type { AvatarSize } from '../Avatar';
import type { AvatarGroupProps } from '../AvatarGroup/AvatarGroup.types';

import styles from './AvatarGroupItem.module.css';

// Each boundary is exclusive, and the ring and gap ladders do not share one.
const stackRingClass = (size: AvatarSize) => {
  if (size < 56) {
    return styles.stackThick;
  }
  if (size < 72) {
    return styles.stackThicker;
  }
  return styles.stackThickest;
};

const stackGapClass = (size: AvatarSize) => {
  if (size < 24) {
    return styles.stackGapXxs;
  }
  if (size < 48) {
    return styles.stackGapXs;
  }
  if (size < 96) {
    return styles.stackGapS;
  }
  return styles.stackGapL;
};

// Four classes, not five: Griffel's `m` bucket sits between the `mNudge` and `l` boundaries and
// is unreachable for every size.
const spreadGapClass = (size: AvatarSize) => {
  if (size < 20) {
    return styles.spreadGapS;
  }
  if (size < 32) {
    return styles.spreadGapMNudge;
  }
  if (size < 64) {
    return styles.spreadGapL;
  }
  return styles.spreadGapXl;
};

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
