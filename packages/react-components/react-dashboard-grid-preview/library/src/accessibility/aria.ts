import type * as React from 'react';
import { dashboardGridDataAttributes } from '../interaction/types';
import type { DashboardGridRect, DashboardGridResizeEdge } from '../interaction/types';

export type DashboardGridSemanticRole = 'group' | 'list' | 'listitem' | 'grid' | 'gridcell';

export type DashboardGridSpatialDescriptionFormatter = (rect: DashboardGridRect) => string;

export type DashboardGridAriaStrings = {
  formatPosition?: DashboardGridSpatialDescriptionFormatter;
  formatResizeHandle?: (edge: DashboardGridResizeEdge, itemLabel?: string) => string;
};

export type DashboardGridSemanticProjection = {
  rootRole: Extract<DashboardGridSemanticRole, 'group' | 'list' | 'grid'>;
  itemRole: Extract<DashboardGridSemanticRole, 'group' | 'listitem' | 'gridcell'>;
};

const defaultFormatPosition: DashboardGridSpatialDescriptionFormatter = rect =>
  `Column ${rect.column + 1}, row ${rect.row + 1}, width ${rect.columnSpan}, height ${rect.rowSpan}`;

const defaultFormatResizeHandle = (edge: DashboardGridResizeEdge, itemLabel?: string): string =>
  `Resize ${itemLabel ? `${itemLabel} ` : ''}${edge}`;

const warn = (message: string, onWarning?: (message: string) => void) => {
  if (process.env.NODE_ENV !== 'production') {
    if (onWarning) {
      onWarning(message);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`@fluentui/react-dashboard-grid-preview: ${message}`);
    }
  }
};

export const resolveDashboardGridSemanticProjection = (options: {
  rootRole?: DashboardGridSemanticProjection['rootRole'];
  itemRole?: DashboardGridSemanticProjection['itemRole'];
  hasGridRowProjection?: boolean;
  onWarning?: (message: string) => void;
}): DashboardGridSemanticProjection => {
  const projection: DashboardGridSemanticProjection = {
    rootRole: options.rootRole ?? 'group',
    itemRole: options.itemRole ?? 'group',
  };

  const valid =
    (projection.rootRole === 'group' && projection.itemRole === 'group') ||
    (projection.rootRole === 'list' && projection.itemRole === 'listitem') ||
    (projection.rootRole === 'grid' && projection.itemRole === 'gridcell' && options.hasGridRowProjection === true);

  if (!valid) {
    warn(
      'DashboardGrid root and item roles must form group/group, list/listitem, or a structurally projected grid/gridcell pair.',
      options.onWarning,
    );
    return { rootRole: 'group', itemRole: 'group' };
  }

  return projection;
};

export const getDashboardGridRootAriaProps = (options: {
  label?: string;
  labelledBy?: string;
  role?: DashboardGridSemanticProjection['rootRole'];
  itemRole?: DashboardGridSemanticProjection['itemRole'];
  hasGridRowProjection?: boolean;
  onWarning?: (message: string) => void;
}): React.HTMLAttributes<HTMLElement> => {
  let role = options.role ?? 'group';
  if (role === 'grid' && options.hasGridRowProjection !== true) {
    warn('DashboardGrid role="grid" requires a structural row projection.', options.onWarning);
    role = 'group';
  }
  if (
    options.itemRole &&
    ((role === 'group' && options.itemRole !== 'group') ||
      (role === 'list' && options.itemRole !== 'listitem') ||
      (role === 'grid' && options.itemRole !== 'gridcell'))
  ) {
    warn('DashboardGrid root and item roles are incompatible.', options.onWarning);
  }

  if (!options.label && !options.labelledBy) {
    warn('DashboardGrid requires an accessible name through label or labelledBy.', options.onWarning);
  }

  return {
    role,
    'aria-label': options.label,
    'aria-labelledby': options.labelledBy,
  };
};

export const getDashboardGridItemAriaProps = (options: {
  rect: DashboardGridRect;
  label?: string;
  labelledBy?: string;
  rootRole?: DashboardGridSemanticProjection['rootRole'];
  role?: DashboardGridSemanticProjection['itemRole'];
  hasGridRowProjection?: boolean;
  arranging?: boolean;
  movable?: boolean;
  resizable?: boolean;
  strings?: DashboardGridAriaStrings;
  onWarning?: (message: string) => void;
}): React.HTMLAttributes<HTMLElement> => {
  const projection = resolveDashboardGridSemanticProjection({
    rootRole: options.rootRole,
    itemRole: options.role,
    hasGridRowProjection: options.hasGridRowProjection,
    onWarning: options.onWarning,
  });
  if (!options.label && !options.labelledBy) {
    warn('DashboardGridItem requires an accessible name through label or labelledBy.', options.onWarning);
  }
  const formatPosition = options.strings?.formatPosition ?? defaultFormatPosition;
  const keyShortcuts = [
    'Enter',
    'Space',
    'F2',
    options.movable ? 'ArrowLeft ArrowRight ArrowUp ArrowDown' : '',
    options.resizable ? 'Shift+ArrowLeft Shift+ArrowRight Shift+ArrowUp Shift+ArrowDown' : '',
    options.resizable ? 'R' : '',
    'Escape',
  ]
    .filter(Boolean)
    .join(' ');

  const ariaProps: React.HTMLAttributes<HTMLElement> = {
    role: projection.itemRole,
    'aria-label': options.label,
    'aria-labelledby': options.labelledBy,
    'aria-keyshortcuts': keyShortcuts,
  };
  (ariaProps as Record<string, unknown>)['aria-description'] = formatPosition(options.rect);
  return ariaProps;
};

export const getDashboardGridHiddenChromeAriaProps = (): React.HTMLAttributes<HTMLElement> => ({
  'aria-hidden': true,
  tabIndex: -1,
});

export const getDashboardGridResizeHandleAriaProps = (options: {
  edge: DashboardGridResizeEdge;
  itemLabel?: string;
  strings?: DashboardGridAriaStrings;
  disabled?: boolean;
}): React.ButtonHTMLAttributes<HTMLButtonElement> => {
  const props: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: 'button',
    'aria-label': (options.strings?.formatResizeHandle ?? defaultFormatResizeHandle)(options.edge, options.itemLabel),
    'aria-keyshortcuts': 'ArrowLeft ArrowRight ArrowUp ArrowDown Escape',
    disabled: options.disabled,
  };
  (props as Record<string, unknown>)[dashboardGridDataAttributes.resizeHandle] = options.edge;
  return props;
};
