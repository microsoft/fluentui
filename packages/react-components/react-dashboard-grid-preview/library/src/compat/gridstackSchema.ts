import type {
  DashboardGridCompatibilityGap,
  DashboardGridCompatibilityItem,
  DashboardGridCompatibilityOptions,
  DashboardGridCompatibilityResponsiveOptions,
  GridStackNumberOrString,
  GridStackOptions,
  GridStackWidget,
  GridStackWidgetMappingOptions,
  GridStackWidgetsMappingOptions,
} from './gridstackTypes';

const unsafeObjectKeys = new Set(['__proto__', 'constructor', 'prototype']);

const gridStackWidgetKeys = new Set([
  'x',
  'y',
  'w',
  'h',
  'autoPosition',
  'minW',
  'maxW',
  'minH',
  'maxH',
  'noResize',
  'noMove',
  'locked',
  'id',
  'content',
  'print',
  'lazyLoad',
  'sizeToContent',
  'resizeToContentParent',
  'resizeHandles',
  'subGridOpts',
  'component',
  'props',
  'class',
  'data',
  'el',
  'grid',
  'subGrid',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isSafeKey(key: string): boolean {
  return !unsafeObjectKeys.has(key) && !key.startsWith('_');
}

function copySafeRecord(value: unknown): Record<string, unknown> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const copy: Record<string, unknown> = {};
  for (const key of Object.keys(value)) {
    if (isSafeKey(key)) {
      copy[key] = value[key];
    }
  }

  return Object.keys(copy).length === 0 ? undefined : copy;
}

function copyLegacyRecord(value: unknown): Record<string, unknown> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const copy: Record<string, unknown> = {};
  for (const key of Object.keys(value)) {
    const entry = value[key];
    if (
      isSafeKey(key) &&
      key !== 'el' &&
      key !== 'grid' &&
      key !== 'subGrid' &&
      entry !== null &&
      entry !== undefined
    ) {
      copy[key] = entry;
    }
  }
  return Object.keys(copy).length === 0 ? undefined : copy;
}

function omitUndefined<T extends object>(value: T): T {
  const result: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry !== undefined) {
      result[key] = entry;
    }
  }
  return result as T;
}

function toFiniteNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function toPositiveNumber(value: unknown): number | undefined {
  const number = toFiniteNumber(value);
  return number !== undefined && number > 0 ? number : undefined;
}

function withUnit(
  value: GridStackNumberOrString | undefined,
  unit: string | undefined,
): GridStackNumberOrString | undefined {
  if (typeof value !== 'number' || value === 0 || !unit || unit === 'px') {
    return value;
  }

  return `${value}${unit}`;
}

function mapHandleVisibility(
  alwaysShowResizeHandle: GridStackOptions['alwaysShowResizeHandle'],
  autoHide: boolean | undefined,
): 'hover' | 'always' | 'coarse-pointer' | undefined {
  if (alwaysShowResizeHandle === 'mobile') {
    return 'coarse-pointer';
  }
  if (alwaysShowResizeHandle === true) {
    return 'always';
  }
  if (alwaysShowResizeHandle === false) {
    return 'hover';
  }
  if (autoHide !== undefined) {
    return autoHide ? 'hover' : 'always';
  }
  return undefined;
}

function mapResponsiveFromGridStack(
  responsive: GridStackOptions['columnOpts'],
): DashboardGridCompatibilityResponsiveOptions | undefined {
  if (!responsive) {
    return undefined;
  }

  return omitUndefined({
    columnWidth: responsive.columnWidth,
    maxColumns: responsive.columnMax,
    breakpoints: responsive.breakpoints?.map(breakpoint => ({
      maxWidth: breakpoint.w,
      columns: breakpoint.c,
      layout: breakpoint.layout,
    })),
    useViewportWidth: responsive.breakpointForWindow,
    layout: responsive.layout,
  });
}

function mapResponsiveToGridStack(
  responsive: DashboardGridCompatibilityResponsiveOptions | undefined,
): GridStackOptions['columnOpts'] {
  if (!responsive) {
    return undefined;
  }

  return omitUndefined({
    columnWidth: responsive.columnWidth,
    columnMax: responsive.maxColumns,
    breakpoints: responsive.breakpoints?.map(breakpoint => ({
      w: breakpoint.maxWidth,
      c: breakpoint.columns,
      layout: breakpoint.layout,
    })),
    breakpointForWindow: responsive.useViewportWidth,
    layout: responsive.layout,
  });
}

function mapGapFromGridStack(options: GridStackOptions): DashboardGridCompatibilityGap | undefined {
  const hasSides =
    options.marginTop !== undefined ||
    options.marginRight !== undefined ||
    options.marginBottom !== undefined ||
    options.marginLeft !== undefined;

  if (hasSides) {
    return omitUndefined({
      top: withUnit(options.marginTop, options.marginUnit),
      right: withUnit(options.marginRight, options.marginUnit),
      bottom: withUnit(options.marginBottom, options.marginUnit),
      left: withUnit(options.marginLeft, options.marginUnit),
    });
  }

  return withUnit(options.margin, options.marginUnit);
}

function mapGapToGridStack(gap: DashboardGridCompatibilityGap | undefined, target: GridStackOptions): void {
  if (gap === undefined) {
    return;
  }

  if (isRecord(gap)) {
    target.marginTop = gap.top as GridStackNumberOrString | undefined;
    target.marginRight = gap.right as GridStackNumberOrString | undefined;
    target.marginBottom = gap.bottom as GridStackNumberOrString | undefined;
    target.marginLeft = gap.left as GridStackNumberOrString | undefined;
    return;
  }

  target.margin = gap;
}

function extractLegacyWidgetFields(widget: GridStackWidget): Record<string, unknown> | undefined {
  const legacy: Record<string, unknown> = {};

  for (const key of Object.keys(widget)) {
    if (!gridStackWidgetKeys.has(key) && isSafeKey(key)) {
      const value = widget[key];
      if (value !== null && value !== undefined) {
        legacy[key] = value;
      }
    }
  }

  return Object.keys(legacy).length === 0 ? undefined : legacy;
}

function assignIfDefined(target: Record<string, unknown>, key: string, value: unknown): void {
  if (value !== undefined) {
    target[key] = value;
  }
}

export function allocateGridStackId(preferredId: string | undefined, usedIds: Set<string>, fallbackId: string): string {
  const baseId = preferredId && preferredId.length > 0 ? preferredId : fallbackId;
  let id = baseId;
  let suffix = 1;

  while (usedIds.has(id)) {
    id = `${baseId}_${suffix}`;
    suffix += 1;
  }

  usedIds.add(id);
  return id;
}

export function fromGridStackWidget<TData = unknown>(
  widget: Readonly<GridStackWidget>,
  options: GridStackWidgetMappingOptions = {},
): DashboardGridCompatibilityItem<TData> {
  const usedIds = options.usedIds ?? new Set<string>();
  const id = allocateGridStackId(widget.id, usedIds, options.fallbackId ?? 'gridstack-item');
  const legacy = extractLegacyWidgetFields(widget);
  const props = copySafeRecord(widget.props);
  const column = toFiniteNumber(widget.x);
  const row = toFiniteNumber(widget.y);
  const autoPosition = widget.autoPosition === true || column === undefined || row === undefined;

  const item: DashboardGridCompatibilityItem<TData> = {
    id,
    column: autoPosition ? undefined : column,
    row: autoPosition ? undefined : row,
    columnSpan: toPositiveNumber(widget.w),
    rowSpan: toPositiveNumber(widget.h),
    minColumnSpan: toPositiveNumber(widget.minW),
    maxColumnSpan: toPositiveNumber(widget.maxW),
    minRowSpan: toPositiveNumber(widget.minH),
    maxRowSpan: toPositiveNumber(widget.maxH),
    autoPosition: autoPosition || undefined,
    movable: widget.noMove === undefined ? undefined : !widget.noMove,
    resizable: widget.noResize === undefined ? undefined : !widget.noResize,
    locked: widget.locked || undefined,
    content: typeof widget.content === 'string' ? widget.content : undefined,
    print: widget.print ? { ...widget.print } : undefined,
    lazyMount: widget.lazyLoad,
    sizeToContent: widget.sizeToContent,
    sizeToContentSelector: widget.resizeToContentParent,
    resizeHandles: typeof widget.resizeHandles === 'string' ? widget.resizeHandles : undefined,
    subGrid: widget.subGridOpts ? fromGridStackOptions<TData>(widget.subGridOpts) : undefined,
    component: typeof widget.component === 'string' ? widget.component : undefined,
    props,
    className: typeof widget.class === 'string' ? widget.class : undefined,
    data: widget.data as TData | undefined,
    legacy,
  };

  return omitUndefined(item);
}

export function fromGridStackWidgets<TData = unknown>(
  widgets: readonly Readonly<GridStackWidget>[],
  options: GridStackWidgetsMappingOptions = {},
): DashboardGridCompatibilityItem<TData>[] {
  const existingIds = new Set(options.existingIds ?? []);
  const allocatedIds = new Set<string>();
  const matchedExistingIds = new Set<string>();
  const fallbackIdPrefix = options.fallbackIdPrefix ?? 'gridstack-item';

  return widgets.map((widget, index) => {
    const fallbackId = `${fallbackIdPrefix}-${index + 1}`;
    const preferredId = widget.id && widget.id.length > 0 ? widget.id : fallbackId;
    let id: string;

    if (
      options.preserveFirstExistingId &&
      existingIds.has(preferredId) &&
      !matchedExistingIds.has(preferredId)
    ) {
      id = preferredId;
      matchedExistingIds.add(preferredId);
      allocatedIds.add(preferredId);
    } else {
      const blockedIds = new Set([...existingIds, ...allocatedIds]);
      id = allocateGridStackId(preferredId, blockedIds, fallbackId);
      allocatedIds.add(id);
    }

    return fromGridStackWidget<TData>({ ...widget, id }, { fallbackId, usedIds: new Set<string>() });
  });
}

export function suffixDuplicateGridStackIds(
  widgets: readonly Readonly<GridStackWidget>[],
  existingIds: Iterable<string> = [],
): GridStackWidget[] {
  const mapped = fromGridStackWidgets(widgets, { existingIds });
  return mapped.map((item, index) => ({ ...widgets[index], id: item.id }));
}

export function toGridStackWidget<TData = unknown>(
  item: Readonly<DashboardGridCompatibilityItem<TData>>,
): GridStackWidget {
  const widget: Record<string, unknown> = {
    ...(copyLegacyRecord(item.legacy) ?? {}),
  };

  const column = toFiniteNumber(item.column);
  const row = toFiniteNumber(item.row);
  const autoPosition = item.autoPosition === true || column === undefined || row === undefined;
  if (!autoPosition) {
    assignIfDefined(widget, 'x', column);
    assignIfDefined(widget, 'y', row);
  }

  const columnSpan = toPositiveNumber(item.columnSpan);
  const rowSpan = toPositiveNumber(item.rowSpan);
  const minColumnSpan = toPositiveNumber(item.minColumnSpan);
  const minRowSpan = toPositiveNumber(item.minRowSpan);

  if (columnSpan !== undefined && columnSpan !== 1 && columnSpan !== minColumnSpan) {
    widget.w = columnSpan;
  }
  if (rowSpan !== undefined && rowSpan !== 1 && rowSpan !== minRowSpan) {
    widget.h = rowSpan;
  }

  assignIfDefined(widget, 'minW', minColumnSpan);
  assignIfDefined(widget, 'maxW', toPositiveNumber(item.maxColumnSpan));
  assignIfDefined(widget, 'minH', minRowSpan);
  assignIfDefined(widget, 'maxH', toPositiveNumber(item.maxRowSpan));

  if (autoPosition) {
    widget.autoPosition = true;
  }
  if (item.movable === false) {
    widget.noMove = true;
  }
  if (item.resizable === false) {
    widget.noResize = true;
  }
  if (item.locked) {
    widget.locked = true;
  }

  widget.id = item.id;
  assignIfDefined(widget, 'content', item.content);
  assignIfDefined(widget, 'print', item.print ? { ...item.print } : undefined);
  assignIfDefined(widget, 'lazyLoad', item.lazyMount);
  assignIfDefined(widget, 'sizeToContent', item.sizeToContent);
  assignIfDefined(widget, 'resizeToContentParent', item.sizeToContentSelector);
  assignIfDefined(widget, 'subGridOpts', item.subGrid ? toGridStackOptions(item.subGrid) : undefined);
  assignIfDefined(widget, 'component', item.component);
  assignIfDefined(widget, 'props', copySafeRecord(item.props));
  assignIfDefined(widget, 'class', item.className);
  assignIfDefined(widget, 'data', item.data);

  return widget as GridStackWidget;
}

export function toGridStackWidgets<TData = unknown>(
  items: readonly Readonly<DashboardGridCompatibilityItem<TData>>[],
): GridStackWidget[] {
  return items.map(item => toGridStackWidget(item));
}

export function serializeGridStackWidget<TData = unknown>(
  item: Readonly<DashboardGridCompatibilityItem<TData>>,
): GridStackWidget {
  return toGridStackWidget(item);
}

export function serializeGridStackWidgets<TData = unknown>(
  items: readonly Readonly<DashboardGridCompatibilityItem<TData>>[],
): GridStackWidget[] {
  return toGridStackWidgets(items);
}

export function fromGridStackOptions<TData = unknown>(
  options: Readonly<GridStackOptions>,
): DashboardGridCompatibilityOptions<TData> {
  const callbacks =
    options.draggable?.start || options.draggable?.stop || options.draggable?.drag
      ? omitUndefined({
          start: options.draggable.start,
          stop: options.draggable.stop,
          drag: options.draggable.drag,
        })
      : undefined;

  const compatibility = omitUndefined({
    autoImportDom: options.auto,
    cellHeightUnit: options.cellHeightUnit,
    engineClass: options.engineClass,
    handleClass: options.handleClass,
    itemClass: options.itemClass,
    marginUnit: options.marginUnit,
    nonce: options.nonce,
    styleInHead: options.styleInHead,
  });

  return omitUndefined({
    items: options.children ? fromGridStackWidgets<TData>(options.children) : undefined,
    columns: options.column,
    responsive: mapResponsiveFromGridStack(options.columnOpts),
    rowHeight: withUnit(options.cellHeight, options.cellHeightUnit) as
      | GridStackNumberOrString
      | 'auto'
      | 'initial'
      | undefined,
    rowHeightThrottle: options.cellHeightThrottle,
    gap: mapGapFromGridStack(options),
    minRows: options.row === undefined ? toFiniteNumber(options.minRow) : undefined,
    maxRows: options.row === undefined ? toFiniteNumber(options.maxRow) : undefined,
    fixedRows: toPositiveNumber(options.row),
    float: options.float,
    animate: options.animate,
    direction: options.rtl === true ? 'rtl' : options.rtl === false ? 'ltr' : options.rtl,
    static: options.staticGrid,
    disableDrag: options.disableDrag,
    disableResize: options.disableResize,
    lazyMount: options.lazyLoad,
    sizeToContent: options.sizeToContent,
    printMode: options.printMode,
    acceptExternal: options.acceptWidgets,
    removable: options.removable,
    removal: options.removableOptions ? omitUndefined({ ...options.removableOptions }) : undefined,
    drag:
      options.draggable || options.handle || options.handleClass
        ? omitUndefined({
            handleSelector: options.handleClass
              ? options.handleClass.startsWith('.')
                ? options.handleClass
                : `.${options.handleClass}`
              : options.handle ?? options.draggable?.handle,
            appendTo: options.draggable?.appendTo,
            pause: options.draggable?.pause,
            scroll: options.draggable?.scroll,
            cancel: options.draggable?.cancel,
            helper: options.draggable?.helper,
            callbacks,
          })
        : undefined,
    resize:
      options.resizable || options.alwaysShowResizeHandle !== undefined
        ? omitUndefined({
            handleVisibility: mapHandleVisibility(
              options.alwaysShowResizeHandle,
              options.resizable?.autoHide,
            ),
            handles: options.resizable?.handles,
            element: options.resizable?.element,
          })
        : undefined,
    placeholder:
      options.placeholderClass !== undefined || options.placeholderText !== undefined
        ? omitUndefined({
            className: options.placeholderClass,
            text: options.placeholderText,
          })
        : undefined,
    className: options.class,
    layoutOnResize: options.layout,
    subGridDefaults: options.subGridOpts ? fromGridStackOptions<TData>(options.subGridOpts) : undefined,
    dynamicNesting: options.subGridDynamic,
    compatibility: Object.keys(compatibility).length > 0 ? compatibility : undefined,
  });
}

export function toGridStackOptions<TData = unknown>(
  options: Readonly<DashboardGridCompatibilityOptions<TData>>,
): GridStackOptions {
  const target: GridStackOptions = {};

  assignIfDefined(target, 'children', options.items ? toGridStackWidgets(options.items) : undefined);
  assignIfDefined(target, 'column', options.columns);
  assignIfDefined(target, 'columnOpts', mapResponsiveToGridStack(options.responsive));
  assignIfDefined(target, 'cellHeight', options.rowHeight);
  assignIfDefined(target, 'cellHeightThrottle', options.rowHeightThrottle);
  mapGapToGridStack(options.gap, target);

  if (options.fixedRows !== undefined) {
    target.row = options.fixedRows;
  } else {
    assignIfDefined(target, 'minRow', options.minRows);
    assignIfDefined(target, 'maxRow', options.maxRows);
  }

  assignIfDefined(target, 'float', options.float);
  assignIfDefined(target, 'animate', options.animate);
  assignIfDefined(
    target,
    'rtl',
    options.direction === 'rtl' ? true : options.direction === 'ltr' ? false : options.direction,
  );
  assignIfDefined(target, 'staticGrid', options.static);
  assignIfDefined(target, 'disableDrag', options.disableDrag);
  assignIfDefined(target, 'disableResize', options.disableResize);
  assignIfDefined(target, 'lazyLoad', options.lazyMount);
  assignIfDefined(target, 'sizeToContent', options.sizeToContent);
  assignIfDefined(target, 'printMode', options.printMode);
  assignIfDefined(target, 'acceptWidgets', options.acceptExternal);
  assignIfDefined(target, 'removable', options.removable);
  assignIfDefined(target, 'removableOptions', options.removal ? { ...options.removal } : undefined);

  if (options.drag) {
    assignIfDefined(target, 'handle', options.drag.handleSelector);
    target.draggable = omitUndefined({
      handle: options.drag.handleSelector,
      appendTo: options.drag.appendTo,
      pause: options.drag.pause,
      scroll: options.drag.scroll,
      cancel: options.drag.cancel,
      helper: options.drag.helper,
      start: options.drag.callbacks?.start,
      stop: options.drag.callbacks?.stop,
      drag: options.drag.callbacks?.drag,
    });
  }

  if (options.resize) {
    assignIfDefined(
      target,
      'alwaysShowResizeHandle',
      options.resize.handleVisibility === 'always'
        ? true
        : options.resize.handleVisibility === 'hover'
          ? false
          : options.resize.handleVisibility === 'coarse-pointer'
            ? 'mobile'
            : undefined,
    );
    target.resizable = omitUndefined({
      autoHide:
        options.resize.handleVisibility === 'always'
          ? false
          : options.resize.handleVisibility === 'hover'
            ? true
            : undefined,
      handles: options.resize.handles,
      element: options.resize.element,
    });
  }

  if (options.placeholder) {
    assignIfDefined(target, 'placeholderClass', options.placeholder.className);
    assignIfDefined(target, 'placeholderText', options.placeholder.text);
  }

  assignIfDefined(target, 'class', options.className);
  assignIfDefined(target, 'layout', options.layoutOnResize);
  assignIfDefined(
    target,
    'subGridOpts',
    options.subGridDefaults ? toGridStackOptions(options.subGridDefaults) : undefined,
  );
  assignIfDefined(target, 'subGridDynamic', options.dynamicNesting);

  if (options.compatibility) {
    assignIfDefined(target, 'auto', options.compatibility.autoImportDom);
    assignIfDefined(target, 'cellHeightUnit', options.compatibility.cellHeightUnit);
    assignIfDefined(target, 'engineClass', options.compatibility.engineClass);
    assignIfDefined(target, 'handleClass', options.compatibility.handleClass);
    assignIfDefined(target, 'itemClass', options.compatibility.itemClass);
    assignIfDefined(target, 'marginUnit', options.compatibility.marginUnit);
    assignIfDefined(target, 'nonce', options.compatibility.nonce);
    assignIfDefined(target, 'styleInHead', options.compatibility.styleInHead);
  }

  return target;
}
