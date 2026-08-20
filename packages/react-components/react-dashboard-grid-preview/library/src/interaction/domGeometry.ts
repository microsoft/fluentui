import type {
  DashboardGridCellMetrics,
  DashboardGridDirection,
  DashboardGridPixelRect,
  DashboardGridPoint,
  DashboardGridRect,
  DashboardGridResizeEdge,
} from './types';

export type DashboardGridTransformedAncestorMeasurement = {
  element: HTMLElement;
  scaleX: number;
  scaleY: number;
  translateX: number;
  translateY: number;
};

export type DashboardGridDomMeasurement = {
  rootRect: DOMRectReadOnly;
  localWidth: number;
  localHeight: number;
  scaleX: number;
  scaleY: number;
  transformedAncestors: readonly DashboardGridTransformedAncestorMeasurement[];
};

export type DashboardGridDomGeometrySession = {
  getMeasurement(): DashboardGridDomMeasurement;
  invalidate(): void;
  clientToLocal(point: DashboardGridPoint): DashboardGridPoint;
  clientDeltaToLocal(delta: DashboardGridPoint): DashboardGridPoint;
  elementToLocalRect(element: HTMLElement): DashboardGridPixelRect;
  clientRectToLocalRect(rect: DashboardGridPixelRect): DashboardGridPixelRect;
  localRectToClientRect(rect: DashboardGridPixelRect): DashboardGridPixelRect;
};

type MatrixParts = {
  scaleX: number;
  scaleY: number;
  translateX: number;
  translateY: number;
  supported: boolean;
};

const isElementLike = (value: unknown): value is HTMLElement =>
  typeof value === 'object' &&
  value !== null &&
  'nodeType' in value &&
  (value as Node).nodeType === 1 &&
  'getBoundingClientRect' in value;

const getRootHost = (node: Node): HTMLElement | null => {
  const root = node.getRootNode();
  if (root && 'host' in root && isElementLike(root.host)) {
    return root.host;
  }

  return null;
};

export const getComposedParent = (element: HTMLElement): HTMLElement | null =>
  element.parentElement ?? getRootHost(element);

export const getComposedDepth = (element: HTMLElement): number => {
  let depth = 0;
  let current: HTMLElement | null = element;

  while (current) {
    depth++;
    current = getComposedParent(current);
  }

  return depth;
};

export const composedContains = (ancestor: HTMLElement, descendant: HTMLElement): boolean => {
  let current: HTMLElement | null = descendant;

  while (current) {
    if (current === ancestor) {
      return true;
    }
    current = getComposedParent(current);
  }

  return false;
};

const parseTransform = (transform: string): MatrixParts => {
  if (!transform || transform === 'none') {
    return { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, supported: true };
  }

  const matrixMatch = /^matrix\(([^)]+)\)$/.exec(transform);
  if (matrixMatch) {
    const values = matrixMatch[1].split(',').map(value => Number(value.trim()));
    if (values.length === 6 && values.every(Number.isFinite)) {
      const [a, b, c, d, translateX, translateY] = values;
      return {
        scaleX: Math.abs(a),
        scaleY: Math.abs(d),
        translateX,
        translateY,
        supported: Math.abs(b) < Number.EPSILON && Math.abs(c) < Number.EPSILON,
      };
    }
  }

  const matrix3dMatch = /^matrix3d\(([^)]+)\)$/.exec(transform);
  if (matrix3dMatch) {
    const values = matrix3dMatch[1].split(',').map(value => Number(value.trim()));
    if (values.length === 16 && values.every(Number.isFinite)) {
      return {
        scaleX: Math.abs(values[0]),
        scaleY: Math.abs(values[5]),
        translateX: values[12],
        translateY: values[13],
        supported:
          Math.abs(values[1]) < Number.EPSILON &&
          Math.abs(values[4]) < Number.EPSILON &&
          Math.abs(values[2]) < Number.EPSILON &&
          Math.abs(values[6]) < Number.EPSILON &&
          Math.abs(values[3]) < Number.EPSILON &&
          Math.abs(values[7]) < Number.EPSILON &&
          Math.abs(values[8]) < Number.EPSILON &&
          Math.abs(values[9]) < Number.EPSILON &&
          Math.abs(values[11]) < Number.EPSILON,
      };
    }
  }

  return { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, supported: false };
};

const measureTransformedAncestors = (
  rootElement: HTMLElement,
  targetDocument: Document,
  onUnsupportedTransform?: (element: HTMLElement, transform: string) => void,
): DashboardGridTransformedAncestorMeasurement[] => {
  const targetWindow = targetDocument.defaultView;
  if (!targetWindow) {
    return [];
  }

  const measurements: DashboardGridTransformedAncestorMeasurement[] = [];
  let current: HTMLElement | null = rootElement;

  while (current) {
    const transform = targetWindow.getComputedStyle(current).transform;
    if (transform && transform !== 'none') {
      const matrix = parseTransform(transform);
      if (!matrix.supported) {
        onUnsupportedTransform?.(current, transform);
      }
      measurements.push({
        element: current,
        scaleX: matrix.scaleX || 1,
        scaleY: matrix.scaleY || 1,
        translateX: matrix.translateX,
        translateY: matrix.translateY,
      });
    }
    current = getComposedParent(current);
  }

  return measurements;
};

const finitePositiveOrOne = (value: number): number => (Number.isFinite(value) && value > 0 ? value : 1);

export const createDashboardGridDomGeometrySession = (options: {
  targetDocument: Document;
  rootElement: HTMLElement;
  direction: DashboardGridDirection;
  onUnsupportedTransform?: (element: HTMLElement, transform: string) => void;
}): DashboardGridDomGeometrySession => {
  const { targetDocument, rootElement, direction, onUnsupportedTransform } = options;
  let cachedMeasurement: DashboardGridDomMeasurement | undefined;

  const measure = (): DashboardGridDomMeasurement => {
    if (cachedMeasurement) {
      return cachedMeasurement;
    }

    const rootRect = rootElement.getBoundingClientRect();
    const localWidth = rootElement.offsetWidth || rootElement.clientWidth || rootRect.width;
    const localHeight = rootElement.offsetHeight || rootElement.clientHeight || rootRect.height;

    cachedMeasurement = {
      rootRect,
      localWidth,
      localHeight,
      scaleX: finitePositiveOrOne(rootRect.width / finitePositiveOrOne(localWidth)),
      scaleY: finitePositiveOrOne(rootRect.height / finitePositiveOrOne(localHeight)),
      transformedAncestors: measureTransformedAncestors(rootElement, targetDocument, onUnsupportedTransform),
    };

    return cachedMeasurement;
  };

  const clientToLocal = (point: DashboardGridPoint): DashboardGridPoint => {
    const measurement = measure();
    const physicalX = (point.clientX - measurement.rootRect.left) / measurement.scaleX;

    return {
      clientX: direction === 'rtl' ? measurement.localWidth - physicalX : physicalX,
      clientY: (point.clientY - measurement.rootRect.top) / measurement.scaleY,
    };
  };

  const clientDeltaToLocal = (delta: DashboardGridPoint): DashboardGridPoint => {
    const measurement = measure();
    const physicalX = delta.clientX / measurement.scaleX;

    return {
      clientX: direction === 'rtl' ? -physicalX : physicalX,
      clientY: delta.clientY / measurement.scaleY,
    };
  };

  const clientRectToLocalRect = (rect: DashboardGridPixelRect): DashboardGridPixelRect => {
    const measurement = measure();
    const physicalX = (rect.x - measurement.rootRect.left) / measurement.scaleX;
    const width = rect.width / measurement.scaleX;

    return {
      x: direction === 'rtl' ? measurement.localWidth - physicalX - width : physicalX,
      y: (rect.y - measurement.rootRect.top) / measurement.scaleY,
      width,
      height: rect.height / measurement.scaleY,
    };
  };

  const elementToLocalRect = (element: HTMLElement): DashboardGridPixelRect => {
    const rect = element.getBoundingClientRect();
    return clientRectToLocalRect({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  };

  const localRectToClientRect = (rect: DashboardGridPixelRect): DashboardGridPixelRect => {
    const measurement = measure();
    const physicalX = direction === 'rtl' ? measurement.localWidth - rect.x - rect.width : rect.x;

    return {
      x: measurement.rootRect.left + physicalX * measurement.scaleX,
      y: measurement.rootRect.top + rect.y * measurement.scaleY,
      width: rect.width * measurement.scaleX,
      height: rect.height * measurement.scaleY,
    };
  };

  return {
    getMeasurement: measure,
    invalidate: () => {
      cachedMeasurement = undefined;
    },
    clientToLocal,
    clientDeltaToLocal,
    elementToLocalRect,
    clientRectToLocalRect,
    localRectToClientRect,
  };
};

const cappedDirectionalMargin = (margin: number, cellSize: number): number =>
  Math.min(Math.max(0, margin), Math.max(0, cellSize) * 0.1);

export const getDashboardGridDirectionalBias = (
  metrics: DashboardGridCellMetrics,
  delta: { x: number; y: number },
): { x: number; y: number } => ({
  x:
    delta.x > 0
      ? cappedDirectionalMargin(metrics.gapRight, metrics.columnWidth)
      : delta.x < 0
        ? -cappedDirectionalMargin(metrics.gapLeft, metrics.columnWidth)
        : 0,
  y:
    delta.y > 0
      ? cappedDirectionalMargin(metrics.gapBottom, metrics.rowHeight)
      : delta.y < 0
        ? -cappedDirectionalMargin(metrics.gapTop, metrics.rowHeight)
        : 0,
});

export const dashboardGridRectToPixelRect = (
  rect: DashboardGridRect,
  metrics: DashboardGridCellMetrics,
): DashboardGridPixelRect => ({
  x: rect.column * metrics.columnWidth + metrics.gapLeft,
  y: rect.row * metrics.rowHeight + metrics.gapTop,
  width: rect.columnSpan * metrics.columnWidth - metrics.gapLeft - metrics.gapRight,
  height: rect.rowSpan * metrics.rowHeight - metrics.gapTop - metrics.gapBottom,
});

export const dashboardGridPixelRectToRawRect = (
  rect: DashboardGridPixelRect,
  metrics: DashboardGridCellMetrics,
  delta: { x: number; y: number } = { x: 0, y: 0 },
): DashboardGridRect => {
  const bias = getDashboardGridDirectionalBias(metrics, delta);

  return {
    column: Math.round((rect.x - metrics.gapLeft + bias.x) / finitePositiveOrOne(metrics.columnWidth)),
    row: Math.round((rect.y - metrics.gapTop + bias.y) / finitePositiveOrOne(metrics.rowHeight)),
    columnSpan: Math.round(
      (rect.width + metrics.gapLeft + metrics.gapRight) / finitePositiveOrOne(metrics.columnWidth),
    ),
    rowSpan: Math.round(
      (rect.height + metrics.gapTop + metrics.gapBottom) / finitePositiveOrOne(metrics.rowHeight),
    ),
  };
};

export const mirrorDashboardGridResizeEdge = (
  edge: DashboardGridResizeEdge,
  direction: DashboardGridDirection,
): DashboardGridResizeEdge => {
  if (direction !== 'rtl') {
    return edge;
  }

  switch (edge) {
    case 'e':
      return 'w';
    case 'w':
      return 'e';
    case 'ne':
      return 'nw';
    case 'nw':
      return 'ne';
    case 'se':
      return 'sw';
    case 'sw':
      return 'se';
    default:
      return edge;
  }
};

export const isDashboardGridPointWithinElement = (
  point: DashboardGridPoint,
  element: HTMLElement,
  includeElement?: HTMLElement,
): boolean => {
  const rect = element.getBoundingClientRect();
  const includeRect = includeElement?.getBoundingClientRect();
  const left = includeRect ? Math.min(rect.left, includeRect.left) : rect.left;
  const right = includeRect ? Math.max(rect.right, includeRect.right) : rect.right;
  const top = includeRect ? Math.min(rect.top, includeRect.top) : rect.top;
  const bottom = includeRect ? Math.max(rect.bottom, includeRect.bottom) : rect.bottom;

  return point.clientX >= left && point.clientX <= right && point.clientY >= top && point.clientY <= bottom;
};

export const sortDashboardGridElementsDeepestFirst = <T extends { element: HTMLElement }>(values: readonly T[]): T[] =>
  [...values].sort((left, right) => {
    const depthDifference = getComposedDepth(right.element) - getComposedDepth(left.element);
    if (depthDifference !== 0) {
      return depthDifference;
    }

    const leftRect = left.element.getBoundingClientRect();
    const rightRect = right.element.getBoundingClientRect();
    return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
  });
