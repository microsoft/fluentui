'use client';

import * as React from 'react';
import { useAnnounce } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import type { DashboardGridRect, DashboardGridRejectedReason } from '../interaction/types';

export type DashboardGridAnnouncement =
  | {
      type: 'arrange-start' | 'arrange-commit' | 'arrange-cancel' | 'pointer-start' | 'pointer-cancel';
      itemLabel: string;
      sourceGridLabel?: string;
      targetGridLabel?: string;
    }
  | {
      type: 'move' | 'resize' | 'rotate';
      itemLabel: string;
      rect: DashboardGridRect;
      sourceGridLabel?: string;
      targetGridLabel?: string;
    }
  | {
      type: 'rejected';
      itemLabel: string;
      reason: DashboardGridRejectedReason;
      sourceGridLabel?: string;
      targetGridLabel?: string;
    }
  | {
      type: 'target' | 'drop' | 'add' | 'remove';
      itemLabel: string;
      targetLabel?: string;
      sourceGridLabel?: string;
      targetGridLabel?: string;
    };

export type DashboardGridAnnouncementFormatter = (announcement: DashboardGridAnnouncement) => string;

export type DashboardGridAnnouncementStrings = {
  format?: DashboardGridAnnouncementFormatter;
  arrangeInstructions?: string;
  formatPosition?: (rect: DashboardGridRect) => string;
  formatRejectedReason?: (reason: DashboardGridRejectedReason) => string;
};

const defaultFormatPosition = (rect: DashboardGridRect): string =>
  `column ${rect.column + 1}, row ${rect.row + 1}, width ${rect.columnSpan}, height ${rect.rowSpan}`;

const defaultFormatRejectedReason = (reason: DashboardGridRejectedReason): string => reason.replace(/-/g, ' ');

const defaultFormatAnnouncement = (
  announcement: DashboardGridAnnouncement,
  strings: DashboardGridAnnouncementStrings,
): string => {
  const position = 'rect' in announcement ? (strings.formatPosition ?? defaultFormatPosition)(announcement.rect) : '';
  const sourceAndTarget =
    announcement.sourceGridLabel &&
    announcement.targetGridLabel &&
    announcement.sourceGridLabel !== announcement.targetGridLabel
      ? ` from ${announcement.sourceGridLabel} to ${announcement.targetGridLabel}`
      : announcement.targetGridLabel
      ? ` in ${announcement.targetGridLabel}`
      : announcement.sourceGridLabel
      ? ` in ${announcement.sourceGridLabel}`
      : '';

  switch (announcement.type) {
    case 'arrange-start':
      return `${announcement.itemLabel} arrange mode. ${
        strings.arrangeInstructions ??
        'Use arrow keys to move, Shift plus arrow keys to resize, R to rotate, Enter to commit, or Escape to cancel.'
      }`;
    case 'arrange-commit':
      return `${announcement.itemLabel} arrangement committed${sourceAndTarget}.`;
    case 'arrange-cancel':
      return `${announcement.itemLabel} arrangement cancelled.`;
    case 'pointer-start':
      return `Moving ${announcement.itemLabel}.`;
    case 'pointer-cancel':
      return `Moving ${announcement.itemLabel} cancelled.`;
    case 'move':
      return `${announcement.itemLabel} moved to ${position}${sourceAndTarget}.`;
    case 'resize':
      return `${announcement.itemLabel} resized to ${position}${sourceAndTarget}.`;
    case 'rotate':
      return `${announcement.itemLabel} rotated to ${position}${sourceAndTarget}.`;
    case 'rejected':
      return `${announcement.itemLabel} could not be changed: ${(
        strings.formatRejectedReason ?? defaultFormatRejectedReason
      )(announcement.reason)}.`;
    case 'target':
      return `${announcement.itemLabel} over ${announcement.targetLabel ?? announcement.targetGridLabel ?? 'target'}.`;
    case 'drop':
      return `${announcement.itemLabel} dropped${sourceAndTarget}.`;
    case 'add':
      return `${announcement.itemLabel} added${sourceAndTarget}.`;
    case 'remove':
      return `${announcement.itemLabel} removed${sourceAndTarget}.`;
  }
};

const getBatchId = (announcement: DashboardGridAnnouncement): string => {
  const updateType =
    announcement.type === 'move' || announcement.type === 'resize' || announcement.type === 'rotate'
      ? 'position'
      : announcement.type;
  return `dashboard-grid:${announcement.itemLabel}:${updateType}`;
};

export const useDashboardGridAnnouncements = (
  strings: DashboardGridAnnouncementStrings = {},
): {
  announceDashboardGrid: (announcement: DashboardGridAnnouncement) => void;
} => {
  const { announce } = useAnnounce();
  const lastMessages = React.useRef(new Map<string, string>());

  const announceDashboardGrid = useEventCallback((announcement: DashboardGridAnnouncement) => {
    const message = strings.format?.(announcement) ?? defaultFormatAnnouncement(announcement, strings);
    if (!message) {
      return;
    }

    const batchId = getBatchId(announcement);
    if (lastMessages.current.get(batchId) === message) {
      return;
    }
    lastMessages.current.set(batchId, message);
    announce(message, {
      batchId,
      polite: announcement.type !== 'rejected',
      alert: announcement.type === 'rejected',
    });
  });

  return { announceDashboardGrid };
};
