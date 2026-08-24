import type {
  DashboardGridCompatibilityItem,
  DashboardGridCompatibilityOptions,
  DashboardGridSerializedGrid,
  GridStackDOMReadOptions,
  GridStackDOMWriteOptions,
  GridStackOptions,
  GridStackSelectorRoot,
  GridStackWidget,
} from './gridstackTypes';
import {
  fromGridStackOptions,
  fromGridStackWidgets,
  toGridStackOptions,
  toGridStackWidgets,
} from './gridstackSchema';

const defaultMetadataLimit = 100_000;
const unsafeObjectKeys = new Set(['__proto__', 'constructor', 'prototype']);
const constraintAttributes = ['gs-min-w', 'gs-max-w', 'gs-min-h', 'gs-max-h'] as const;

type MetadataReadOptions = Readonly<{
  consume?: boolean;
  maxLength?: number;
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizeParsedValue(value: unknown, depth = 0): unknown {
  if (depth > 50) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map(entry => sanitizeParsedValue(entry, depth + 1));
  }

  if (!isRecord(value)) {
    return value;
  }

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(value)) {
    if (!unsafeObjectKeys.has(key) && !key.startsWith('_')) {
      result[key] = sanitizeParsedValue(value[key], depth + 1);
    }
  }
  return result;
}

function parseFiniteNumber(value: string | null): number | undefined {
  if (value === null || value.length === 0) {
    return undefined;
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

function parseBoolean(value: string | null): boolean | undefined {
  if (value === null) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  return !(normalized === '' || normalized === '0' || normalized === 'no' || normalized === 'false');
}

function parseSizeToContent(value: string | null): boolean | number | undefined {
  if (value === null) {
    return undefined;
  }
  if (value === 'true' || value === 'false') {
    return parseBoolean(value);
  }

  const numericValue = Number.parseInt(value, 10);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

function readDirectChildByClass(element: Element, className: string): HTMLElement | undefined {
  return Array.from(element.children).find(child => child.classList.contains(className)) as HTMLElement | undefined;
}

function readGridClassColumns(root: Element): number | undefined {
  for (const className of Array.from(root.classList)) {
    const match = /^gs-(\d+)$/.exec(className);
    if (match) {
      return Number(match[1]);
    }
  }
  return undefined;
}

function findNestedGrid(itemElement: Element): Element | undefined {
  const grids = Array.from(itemElement.querySelectorAll('.grid-stack'));
  return grids.find(grid => grid.closest('.grid-stack-item') === itemElement);
}

function isGridItem(element: Element): element is HTMLElement {
  const HTMLElementConstructor = element.ownerDocument.defaultView?.HTMLElement;
  return (
    HTMLElementConstructor !== undefined &&
    element instanceof HTMLElementConstructor &&
    element.classList.contains('grid-stack-item') &&
    !element.classList.contains('grid-stack-placeholder')
  );
}

function getDirectGridItems(root: Element): HTMLElement[] {
  return Array.from(root.children).filter(isGridItem);
}

function setOrRemoveAttribute(element: HTMLElement, name: string, value: unknown): void {
  if (value === undefined || value === null || value === false) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, String(value));
  }
}

function normalizeCoordinate(value: unknown): number {
  const numericValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numericValue) ? Math.max(0, Math.trunc(numericValue)) : 0;
}

function normalizeSpan(value: unknown): number {
  const numericValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numericValue) ? Math.max(1, Math.trunc(numericValue)) : 1;
}

function getAllElements(root: GridStackSelectorRoot): Element[] {
  const descendants = Array.from(root.querySelectorAll('*'));
  return 'matches' in root ? [root, ...descendants] : descendants;
}

export function readGridStackWidgetMetadata(
  element: Element,
  options: MetadataReadOptions = {},
): GridStackWidget | undefined {
  const attributeName = element.hasAttribute('data-gs-widget')
    ? 'data-gs-widget'
    : element.hasAttribute('gridstacknode')
      ? 'gridstacknode'
      : undefined;

  if (!attributeName) {
    return undefined;
  }

  const serialized = element.getAttribute(attributeName);
  if (
    serialized === null ||
    serialized.length > (options.maxLength ?? defaultMetadataLimit)
  ) {
    if (options.consume) {
      element.removeAttribute('data-gs-widget');
      element.removeAttribute('gridstacknode');
    }
    return undefined;
  }

  try {
    const parsed = sanitizeParsedValue(JSON.parse(serialized));
    if (options.consume) {
      element.removeAttribute('data-gs-widget');
      element.removeAttribute('gridstacknode');
    }
    return isRecord(parsed) ? (parsed as GridStackWidget) : undefined;
  } catch {
    if (options.consume) {
      element.removeAttribute('data-gs-widget');
      element.removeAttribute('gridstacknode');
    }
    return undefined;
  }
}

export function writeGridStackWidgetMetadata(element: HTMLElement, widget: Readonly<GridStackWidget>): void {
  const safeWidget = sanitizeParsedValue(widget);
  const serialized = JSON.stringify(safeWidget);
  if (serialized !== undefined) {
    element.setAttribute('data-gs-widget', serialized);
  } else {
    element.removeAttribute('data-gs-widget');
  }
  element.removeAttribute('gridstacknode');
}

export function readGridStackWidgetAttributes(
  element: HTMLElement,
  options: GridStackDOMReadOptions = {},
): GridStackWidget {
  const metadata =
    readGridStackWidgetMetadata(element, { maxLength: options.maxMetadataLength }) ?? {};
  const widget: GridStackWidget = { ...metadata };

  const x = parseFiniteNumber(element.getAttribute('gs-x'));
  const y = parseFiniteNumber(element.getAttribute('gs-y'));
  const width = parseFiniteNumber(element.getAttribute('gs-w'));
  const height = parseFiniteNumber(element.getAttribute('gs-h'));
  const minWidth = parseFiniteNumber(element.getAttribute('gs-min-w'));
  const maxWidth = parseFiniteNumber(element.getAttribute('gs-max-w'));
  const minHeight = parseFiniteNumber(element.getAttribute('gs-min-h'));
  const maxHeight = parseFiniteNumber(element.getAttribute('gs-max-h'));

  if (x !== undefined) {
    widget.x = x;
  }
  if (y !== undefined) {
    widget.y = y;
  }
  if (width !== undefined) {
    widget.w = width;
  }
  if (height !== undefined) {
    widget.h = height;
  }
  if (minWidth !== undefined) {
    widget.minW = minWidth;
  }
  if (maxWidth !== undefined) {
    widget.maxW = maxWidth;
  }
  if (minHeight !== undefined) {
    widget.minH = minHeight;
  }
  if (maxHeight !== undefined) {
    widget.maxH = maxHeight;
  }

  if (parseBoolean(element.getAttribute('gs-auto-position'))) {
    widget.autoPosition = true;
  }
  if (parseBoolean(element.getAttribute('gs-no-resize'))) {
    widget.noResize = true;
  }
  if (parseBoolean(element.getAttribute('gs-no-move'))) {
    widget.noMove = true;
  }
  if (parseBoolean(element.getAttribute('gs-locked'))) {
    widget.locked = true;
  }

  const id = element.getAttribute('gs-id');
  if (id !== null && id.length > 0) {
    widget.id = id;
  }

  const sizeToContent = parseSizeToContent(element.getAttribute('gs-size-to-content'));
  if (sizeToContent !== undefined) {
    widget.sizeToContent = sizeToContent;
  }

  const pageBreak = parseBoolean(element.getAttribute('gs-page-break'));
  const hide = element.classList.contains('gs-print-hide');
  const orientation = element.getAttribute('gs-print-orientation');
  if (pageBreak || hide || orientation === 'portrait' || orientation === 'landscape') {
    widget.print = {
      pageBreak: pageBreak || undefined,
      hide: hide || undefined,
      orientation: orientation === 'portrait' || orientation === 'landscape' ? orientation : undefined,
    };
  }

  const resizeHandles = element.getAttribute('gs-resize-handles');
  if (resizeHandles) {
    widget.resizeHandles = resizeHandles;
  }

  if (options.clearLegacyConstraintAttributes ?? true) {
    if (width === 1) {
      element.removeAttribute('gs-w');
    }
    if (height === 1) {
      element.removeAttribute('gs-h');
    }
    for (const attribute of constraintAttributes) {
      element.removeAttribute(attribute);
    }
  }

  return widget;
}

export function writeGridStackAttributes<TData = unknown>(
  item: Readonly<DashboardGridCompatibilityItem<TData>>,
  element: HTMLElement,
  options: GridStackDOMWriteOptions = {},
): void {
  const column = normalizeCoordinate(item.column);
  const row = normalizeCoordinate(item.row);
  const columnSpan = normalizeSpan(item.columnSpan);
  const rowSpan = normalizeSpan(item.rowSpan);

  element.classList.add('grid-stack-item');
  element.setAttribute('gs-x', String(column));
  element.setAttribute('gs-y', String(row));
  setOrRemoveAttribute(element, 'gs-w', columnSpan > 1 ? columnSpan : undefined);
  setOrRemoveAttribute(element, 'gs-h', rowSpan > 1 ? rowSpan : undefined);
  setOrRemoveAttribute(element, 'gs-id', item.id);
  setOrRemoveAttribute(element, 'gs-no-move', item.movable === false ? true : undefined);
  setOrRemoveAttribute(element, 'gs-no-resize', item.resizable === false ? true : undefined);
  setOrRemoveAttribute(element, 'gs-locked', item.locked ? true : undefined);
  if (item.sizeToContent === undefined) {
    element.removeAttribute('gs-size-to-content');
  } else {
    element.setAttribute('gs-size-to-content', String(item.sizeToContent));
  }
  setOrRemoveAttribute(element, 'gs-page-break', item.print?.pageBreak ? true : undefined);
  setOrRemoveAttribute(element, 'gs-print-orientation', item.print?.orientation);

  element.classList.toggle('gs-print-hide', item.print?.hide === true);
  element.removeAttribute('gs-auto-position');
  for (const attribute of constraintAttributes) {
    element.removeAttribute(attribute);
  }

  if (options.writeCssVariables ?? true) {
    element.style.setProperty('--gs-x', String(column));
    element.style.setProperty('--gs-y', String(row));
    element.style.setProperty('--gs-w', String(columnSpan));
    element.style.setProperty('--gs-h', String(rowSpan));
  }
}

export function writeGridStackWidgetContent(contentElement: HTMLElement, content: string | undefined): void {
  contentElement.classList.add('grid-stack-item-content');
  contentElement.textContent = content ?? '';
}

export function readGridStackRootOptions(root: Element): GridStackOptions {
  const row = parseFiniteNumber(root.getAttribute('gs-row'));
  const column = parseFiniteNumber(root.getAttribute('gs-column')) ?? readGridClassColumns(root);
  const minRow = parseFiniteNumber(root.getAttribute('gs-min-row'));
  const maxRow = parseFiniteNumber(root.getAttribute('gs-max-row'));
  const animateAttribute = root.getAttribute('gs-animate');
  const staticAttribute = root.getAttribute('gs-static');
  const sizeToContent = parseBoolean(root.getAttribute('gs-size-to-content'));

  const options: GridStackOptions = {
    column,
    row,
    minRow: row === undefined ? minRow : undefined,
    maxRow: row === undefined ? maxRow : undefined,
    staticGrid:
      staticAttribute !== null
        ? parseBoolean(staticAttribute)
        : root.classList.contains('grid-stack-static') || undefined,
    animate:
      animateAttribute !== null
        ? parseBoolean(animateAttribute)
        : root.classList.contains('grid-stack-animate') || undefined,
    sizeToContent,
    rtl: root.classList.contains('grid-stack-rtl') ? true : undefined,
    printMode: root.classList.contains('gs-print-exact')
      ? 'exact'
      : root.classList.contains('gs-print-flow')
        ? 'flow'
        : undefined,
  };

  return options;
}

export function writeGridStackRootAttributes<TData = unknown>(
  options: Readonly<DashboardGridCompatibilityOptions<TData>>,
  root: HTMLElement,
): void {
  const gridStackOptions = toGridStackOptions(options);

  root.classList.add('grid-stack');
  for (const className of Array.from(root.classList)) {
    if (/^gs-\d+$/.test(className)) {
      root.classList.remove(className);
    }
  }
  if (typeof gridStackOptions.column === 'number') {
    root.classList.add(`gs-${gridStackOptions.column}`);
  }

  setOrRemoveAttribute(root, 'gs-column', gridStackOptions.column);
  setOrRemoveAttribute(root, 'gs-row', gridStackOptions.row);
  setOrRemoveAttribute(root, 'gs-min-row', gridStackOptions.row === undefined ? gridStackOptions.minRow : undefined);
  setOrRemoveAttribute(root, 'gs-max-row', gridStackOptions.row === undefined ? gridStackOptions.maxRow : undefined);
  setOrRemoveAttribute(root, 'gs-static', gridStackOptions.staticGrid ? true : undefined);
  if (gridStackOptions.animate === undefined) {
    root.removeAttribute('gs-animate');
  } else {
    root.setAttribute('gs-animate', String(gridStackOptions.animate));
  }
  setOrRemoveAttribute(root, 'gs-size-to-content', gridStackOptions.sizeToContent ? true : undefined);

  root.classList.toggle('grid-stack-static', gridStackOptions.staticGrid === true);
  root.classList.toggle('grid-stack-animate', gridStackOptions.animate === true);
  root.classList.toggle('grid-stack-rtl', gridStackOptions.rtl === true);
  root.classList.toggle('gs-print-exact', gridStackOptions.printMode === 'exact');
  root.classList.toggle('gs-print-flow', gridStackOptions.printMode === 'flow');
}

export function readGridStackDOM<TData = unknown>(
  root: Element,
  options: GridStackDOMReadOptions = {},
): DashboardGridSerializedGrid<TData> {
  const widgets = getDirectGridItems(root).map((itemElement, index) => {
    const widget = readGridStackWidgetAttributes(itemElement, options);

    if (!widget.id && itemElement.id) {
      widget.id = itemElement.id;
    }

    const nestedRoot = findNestedGrid(itemElement);
    if (nestedRoot) {
      const nested = readGridStackDOM<TData>(nestedRoot, options);
      widget.subGridOpts = {
        ...toGridStackOptions(nested.options),
        children: toGridStackWidgets(nested.items),
      };
    } else if (options.includeTextContent ?? true) {
      const contentElement = readDirectChildByClass(itemElement, 'grid-stack-item-content');
      const content = contentElement?.textContent;
      if (content) {
        widget.content = content;
      }
    }

    if (!widget.id) {
      widget.id = `${options.fallbackIdPrefix ?? 'gridstack-item'}-${index + 1}`;
    }

    return widget;
  });

  const items = fromGridStackWidgets<TData>(widgets, options);
  const mappedOptions = fromGridStackOptions<TData>(readGridStackRootOptions(root));

  return {
    version: 1,
    options: mappedOptions,
    items,
  };
}

export function getGridStackElements(
  selectorOrElement: string | Element,
  root: GridStackSelectorRoot,
): Element[] {
  if (typeof selectorOrElement !== 'string') {
    return root === selectorOrElement || root.contains(selectorOrElement) ? [selectorOrElement] : [];
  }

  if (selectorOrElement.length === 0) {
    return [];
  }

  const ownerDocument = root.nodeType === 9 ? (root as Document) : root.ownerDocument;
  if (/^\d/.test(selectorOrElement)) {
    const byId =
      'getElementById' in root
        ? root.getElementById(selectorOrElement)
        : ownerDocument?.getElementById(selectorOrElement);
    return byId && (byId === root || root.contains(byId)) ? [byId] : [];
  }

  try {
    const matches = Array.from(root.querySelectorAll(selectorOrElement));
    if ('matches' in root && root.matches(selectorOrElement)) {
      matches.unshift(root);
    }
    if (matches.length > 0) {
      return matches;
    }
  } catch {
    // Continue with exact class/id/gs-id matching.
  }

  if (selectorOrElement.startsWith('.') || selectorOrElement.startsWith('#') || selectorOrElement.startsWith('[')) {
    return [];
  }

  return getAllElements(root).filter(
    element =>
      element.id === selectorOrElement ||
      element.classList.contains(selectorOrElement) ||
      element.getAttribute('gs-id') === selectorOrElement,
  );
}

export function getGridStackElement(
  selectorOrElement: string | Element,
  root: GridStackSelectorRoot,
): Element | undefined {
  return getGridStackElements(selectorOrElement, root)[0];
}
