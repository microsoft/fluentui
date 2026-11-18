'use client';

import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import type { ChartAnnotation } from '../../../types/ChartAnnotation';
import type {
  AnnotationPoint,
  ChartAnnotationContext,
  ChartAnnotationLayerProps,
  ConnectorRenderData,
  LineChartAnnotationRenderProps,
  ResolvedAnnotationPosition,
} from './ChartAnnotationLayer.types';
import {
  applyOpacityToColor,
  DEFAULT_ANNOTATION_BACKGROUND_OPACITY,
  DEFAULT_CONNECTOR_ARROW,
  DEFAULT_CONNECTOR_END_PADDING,
  DEFAULT_CONNECTOR_START_PADDING,
  DEFAULT_CONNECTOR_STROKE_WIDTH,
  getDefaultConnectorStrokeColor,
  useChartAnnotationLayerStyles,
} from './useChartAnnotationLayer.styles';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { tokens } from '@fluentui/react-theme';

const DEFAULT_HORIZONTAL_ALIGN = 'center';
const DEFAULT_VERTICAL_ALIGN = 'middle';
const DEFAULT_FOREIGN_OBJECT_WIDTH = 180;
const DEFAULT_FOREIGN_OBJECT_HEIGHT = 60;
const MIN_ARROW_SIZE = 6;
const MAX_ARROW_SIZE = 24;
const ARROW_SIZE_SCALE = 0.35;
const MAX_SIMPLE_MARKUP_DEPTH = 5;
const CHAR_CODE_LESS_THAN = '<'.codePointAt(0)!;
const CHAR_CODE_GREATER_THAN = '>'.codePointAt(0)!;
type SimpleMarkupNode =
  | { type: 'text'; content: string }
  | { type: 'br' }
  | { type: 'element'; tag: 'b' | 'i'; children: SimpleMarkupNode[] };

type ElementMarkupNode = Extract<SimpleMarkupNode, { type: 'element' }>;

type StackFrame = {
  node: ElementMarkupNode | null;
};

const decodeSimpleMarkupInput = (input: string): string => {
  const namedEntities: Record<string, string> = {
    amp: '&',
    quot: '"',
    apos: "'",
    nbsp: '\u00a0',
  };

  const withBasicEntitiesDecoded = input.replace(/&(#x?[0-9a-f]+|#\d+|[a-z][\w-]*);/gi, (match, entity) => {
    const lower = entity.toLowerCase();
    if (lower === 'lt' || lower === 'gt') {
      return `&${lower};`;
    }
    if (lower.startsWith('#')) {
      const isHex = lower[1] === 'x';
      const digits = lower.slice(isHex ? 2 : 1);
      const codePoint = Number.parseInt(digits, isHex ? 16 : 10);
      if (Number.isNaN(codePoint)) {
        return match;
      }
      if (codePoint === CHAR_CODE_LESS_THAN) {
        return '&lt;';
      }
      if (codePoint === CHAR_CODE_GREATER_THAN) {
        return '&gt;';
      }
      return String.fromCodePoint(codePoint);
    }
    return namedEntities[lower] ?? match;
  });

  return withBasicEntitiesDecoded.replace(/&lt;([^;]+)&gt;/gi, (match, inner) => {
    const normalized = inner.trim().replace(/\s+/g, ' ');
    const lower = normalized.toLowerCase();

    switch (lower) {
      case 'b':
        return '<b>';
      case '/b':
        return '</b>';
      case 'i':
        return '<i>';
      case '/i':
        return '</i>';
      case 'br':
      case 'br/':
      case 'br /':
        return '<br />';
      default:
        return match;
    }
  });
};

const appendTextNode = (nodes: SimpleMarkupNode[], text: string) => {
  if (text.length === 0) {
    return;
  }

  const last = nodes[nodes.length - 1];
  if (last && last.type === 'text') {
    last.content += text;
  } else {
    nodes.push({ type: 'text', content: text });
  }
};

const serializeSimpleMarkup = (nodes: SimpleMarkupNode[]): string =>
  nodes
    .map(node => {
      if (node.type === 'text') {
        return node.content;
      }
      if (node.type === 'br') {
        return '<br />';
      }
      return `<${node.tag}>${serializeSimpleMarkup(node.children)}</${node.tag}>`;
    })
    .join('');

const parseSimpleMarkup = (input: string): SimpleMarkupNode[] => {
  if (!input) {
    return [];
  }

  const decodedInput = decodeSimpleMarkupInput(input);
  const rootChildren: SimpleMarkupNode[] = [];
  const stack: StackFrame[] = [{ node: null }];
  const currentChildren = () => stack[stack.length - 1].node?.children ?? rootChildren;
  const tagRegex = /<\/?([a-z]+)\s*\/?\s*>/gi;
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(decodedInput)) !== null) {
    const [fullMatch, rawTagName] = match;
    const tagName = rawTagName.toLowerCase();
    const isClosing = fullMatch.startsWith('</');
    const isSelfClosing = /\/\s*>$/.test(fullMatch);

    appendTextNode(currentChildren(), decodedInput.slice(lastIndex, match.index));
    lastIndex = match.index + fullMatch.length;

    if (tagName === 'br' && !isClosing) {
      currentChildren().push({ type: 'br' });
      continue;
    }

    if ((tagName === 'b' || tagName === 'i') && !isSelfClosing) {
      if (isClosing) {
        const top = stack[stack.length - 1].node;
        if (stack.length > 1 && top?.tag === tagName) {
          stack.pop();
        } else {
          appendTextNode(currentChildren(), fullMatch);
        }
      } else {
        if (stack.length - 1 >= MAX_SIMPLE_MARKUP_DEPTH) {
          appendTextNode(currentChildren(), fullMatch);
          continue;
        }
        const elementNode: ElementMarkupNode = {
          type: 'element',
          tag: tagName as 'b' | 'i',
          children: [],
        };
        currentChildren().push(elementNode);
        stack.push({ node: elementNode });
      }
      continue;
    }

    appendTextNode(currentChildren(), fullMatch);
  }

  appendTextNode(currentChildren(), decodedInput.slice(lastIndex));

  while (stack.length > 1) {
    const unclosed = stack.pop()!;
    const elementNode = unclosed.node;
    if (!elementNode) {
      continue;
    }

    const parentChildren = stack[stack.length - 1].node?.children ?? rootChildren;
    const lastChild = parentChildren[parentChildren.length - 1];
    if (lastChild === elementNode) {
      parentChildren.pop();
    } else {
      const nodeIndex = parentChildren.indexOf(elementNode);
      if (nodeIndex !== -1) {
        parentChildren.splice(nodeIndex, 1);
      }
    }

    appendTextNode(
      parentChildren,
      `<${elementNode.tag}>${serializeSimpleMarkup(elementNode.children)}</${elementNode.tag}>`,
    );
  }

  return rootChildren;
};

const simpleMarkupNodesToPlainText = (nodes: SimpleMarkupNode[]): string =>
  nodes
    .map(node => {
      if (node.type === 'text') {
        return node.content;
      }
      if (node.type === 'br') {
        return '\n';
      }
      return simpleMarkupNodesToPlainText(node.children);
    })
    .join('');

const renderSimpleMarkupNodeList = (nodes: SimpleMarkupNode[], keyPrefix: string): React.ReactNode[] =>
  nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;

    if (node.type === 'text') {
      return <React.Fragment key={key}>{node.content}</React.Fragment>;
    }

    if (node.type === 'br') {
      return <br key={key} />;
    }

    const Tag = node.tag === 'b' ? 'strong' : 'em';
    return React.createElement(Tag, { key }, ...renderSimpleMarkupNodeList(node.children, key));
  });
const renderSimpleMarkup = (nodes: SimpleMarkupNode[], keyPrefix: string): React.ReactNode => {
  const rendered = renderSimpleMarkupNodeList(nodes, keyPrefix);
  return rendered.length <= 1 ? rendered[0] ?? null : rendered;
};

const normalizeBandOffset = (
  scale: (((value: unknown) => number) & { bandwidth?: () => number }) | undefined,
  value: unknown,
) => {
  const position = scale?.(value as never);
  if (typeof position !== 'number' || !Number.isFinite(position)) {
    return undefined;
  }
  if (scale && typeof scale.bandwidth === 'function') {
    return position + scale.bandwidth() / 2;
  }
  return position;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

type AxisCoordinateType = 'data' | 'relative' | 'pixel';

const resolveDataCoordinate = (
  axis: 'x' | 'y',
  value: number | string | Date,
  context: ChartAnnotationContext,
  yAxis: 'primary' | 'secondary' = 'primary',
): number | undefined => {
  if (axis === 'x') {
    const xScale = context.xScale;
    if (!xScale) {
      return undefined;
    }
    const parsedValue = value instanceof Date ? value.getTime() : value;
    return normalizeBandOffset(xScale, parsedValue);
  }

  const yScale = yAxis === 'secondary' ? context.yScaleSecondary : context.yScalePrimary;
  if (!yScale) {
    return undefined;
  }
  const parsedValue = value instanceof Date ? value.getTime() : value;
  return normalizeBandOffset(yScale, parsedValue);
};

const resolveAxisCoordinate = (
  axis: 'x' | 'y',
  coordinateType: AxisCoordinateType,
  value: number | string | Date,
  context: ChartAnnotationContext,
  options: { yAxis?: 'primary' | 'secondary'; yScaleKey?: string } = {},
): number | undefined => {
  switch (coordinateType) {
    case 'data':
      if (axis === 'y' && options.yScaleKey !== undefined) {
        return typeof value === 'number' && Number.isFinite(value)
          ? context.projectY?.(options.yScaleKey, value)
          : undefined;
      }
      return resolveDataCoordinate(axis, value, context, options.yAxis);
    case 'relative':
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        return undefined;
      }
      return axis === 'x'
        ? context.plotRect.x + context.plotRect.width * value
        : context.plotRect.y + context.plotRect.height * value;
    case 'pixel':
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        return undefined;
      }
      return axis === 'x' ? context.plotRect.x + value : context.plotRect.y + value;
    default:
      return undefined;
  }
};

const createMeasurementSignature = (
  annotationContentSignature: string,
  containerStyle: React.CSSProperties,
  contentStyle: React.CSSProperties,
  layoutClassName?: string,
  styleClassName?: string,
) =>
  JSON.stringify({
    annotationContentSignature,
    containerStyle,
    contentStyle,
    layoutClassName: layoutClassName ?? '',
    styleClassName: styleClassName ?? '',
  });

type MeasurementEntry = { width: number; height: number; signature: string };

type CoordinateDescriptor = {
  xType: AxisCoordinateType;
  yType: AxisCoordinateType;
  yAxis?: 'primary' | 'secondary';
  yScaleKey?: string;
};

const getCoordinateDescriptor = (coordinates: ChartAnnotation['coordinates']): CoordinateDescriptor | undefined => {
  switch (coordinates.type) {
    case 'data':
      return { xType: 'data', yType: 'data', yAxis: coordinates.yAxis, yScaleKey: coordinates.yScaleKey };
    case 'relative':
      return { xType: 'relative', yType: 'relative' };
    case 'pixel':
      return { xType: 'pixel', yType: 'pixel' };
    case 'mixed':
      return {
        xType: coordinates.xCoordinateType,
        yType: coordinates.yCoordinateType,
        yAxis: coordinates.yAxis,
        yScaleKey: coordinates.yScaleKey,
      };
    default:
      return undefined;
  }
};

const resolveCoordinates = (
  annotation: ChartAnnotation,
  context: ChartAnnotationContext,
  isAction: boolean,
): ResolvedAnnotationPosition | undefined => {
  const { coordinates, layout } = annotation;

  if (!coordinates) {
    return undefined;
  }

  const descriptor = getCoordinateDescriptor(coordinates);
  if (!descriptor) {
    return undefined;
  }

  const offsetX = layout?.offsetX ?? 0;
  const offsetY = layout?.offsetY ?? 0;

  const anchorX = resolveAxisCoordinate('x', descriptor.xType, coordinates.x, context);
  const anchorY = resolveAxisCoordinate('y', descriptor.yType, coordinates.y, context, {
    yAxis: descriptor.yAxis,
    yScaleKey: descriptor.yScaleKey,
  });

  if (anchorX === undefined || anchorY === undefined || !Number.isFinite(anchorX) || !Number.isFinite(anchorY)) {
    return undefined;
  }
  if (descriptor.yScaleKey !== undefined || isAction) {
    const { x, y, width, height } = context.plotRect;
    if (anchorX < x || anchorX > x + width || anchorY < y || anchorY > y + height) {
      return undefined;
    }
  }

  const anchor: AnnotationPoint = { x: anchorX, y: anchorY };

  let left = anchor.x + offsetX;
  let top = anchor.y + offsetY;

  if (layout?.clipToBounds) {
    left = clamp(left, context.plotRect.x, context.plotRect.x + context.plotRect.width);
    top = clamp(top, context.plotRect.y, context.plotRect.y + context.plotRect.height);
  }

  return {
    anchor,
    point: { x: left, y: top },
  };
};

const nonnegativeFinite = (value: number | undefined, fallback: number) =>
  value !== undefined && Number.isFinite(value) && value >= 0 ? value : fallback;

const rectanglesCollide = (
  first: { x: number; y: number; width: number; height: number },
  second: { x: number; y: number; width: number; height: number },
  spacing: number,
) =>
  first.x < second.x + second.width + spacing &&
  first.x + first.width + spacing > second.x &&
  first.y < second.y + second.height + spacing &&
  first.y + first.height + spacing > second.y;

const stopAnnotationEvent = (event: React.SyntheticEvent) => event.stopPropagation();

const renderDefaultAnnotationContent = (props?: LineChartAnnotationRenderProps): JSXElement | null =>
  props ? <>{renderSimpleMarkup(parseSimpleMarkup(props.annotation.text), 'annotation-content')}</> : null;

const setInert = (node: HTMLElement | SVGElement | null) => node?.setAttribute('inert', '');

export const ChartAnnotationLayer: React.FC<ChartAnnotationLayerProps> = React.memo(props => {
  const { annotations: annotationsProp, context, hideDefaultStyles, annotationLayout, plot, chartRef } = props;
  const { targetDocument } = useFluent_unstable();

  const classes = useChartAnnotationLayerStyles(props);
  const idPrefix = useId('chart-annotation');
  const autoKeyPrefix = useId('chart-annotation-item');

  const [measurements, setMeasurements] = React.useState<Record<string, MeasurementEntry>>({});
  const measurementsRef = React.useRef(measurements);
  const [measurementRevision, setMeasurementRevision] = React.useState(0);
  const [rootAspectRatio, setRootAspectRatio] = React.useState('xMidYMid meet');
  const rootAspectRatioRef = React.useRef(rootAspectRatio);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const measurementNodes = React.useRef(new Map<HTMLElement, { key: string; signature: string; isCopy: boolean }>());
  const measurementObserver = React.useRef<ResizeObserver | undefined>(undefined);
  const observedMeasurementNodes = React.useRef(new Set<HTMLElement>());
  const actionNodes = React.useRef(new Map<string, HTMLButtonElement>());
  const focusedAction = React.useRef<string | undefined>(undefined);
  const previousOrder = React.useRef<string[]>([]);

  const measurementRef = (key: string, signature: string, isCopy = false) => {
    let previous: HTMLElement | null = null;
    return (node: HTMLElement | null) => {
      if (previous) {
        measurementNodes.current.delete(previous);
      }
      previous = node;
      if (node) {
        measurementNodes.current.set(node, { key, signature, isCopy });
      }
    };
  };

  const resolvedAnnotations = React.useMemo(() => {
    let fallbackIndex = 0;
    return (annotationsProp ?? []).map((annotation, annotationIndex) => ({
      annotation,
      annotationIndex,
      key: annotation.id ?? `${autoKeyPrefix}-${fallbackIndex++}`,
    }));
  }, [annotationsProp, autoKeyPrefix]);

  React.useEffect(() => {
    setMeasurements(prev => {
      if (resolvedAnnotations.length === 0) {
        if (Object.keys(prev).length === 0) {
          return prev;
        }
        measurementsRef.current = {};
        return measurementsRef.current;
      }

      const next: Record<string, MeasurementEntry> = {};
      resolvedAnnotations.forEach(({ key }) => {
        if (prev[key]) {
          next[key] = prev[key];
        }
      });

      if (Object.keys(next).length === Object.keys(prev).length) {
        let identical = true;
        for (const key of Object.keys(next)) {
          if (next[key] !== prev[key]) {
            identical = false;
            break;
          }
        }
        if (identical) {
          return prev;
        }
      }

      measurementsRef.current = next;
      return next;
    });
  }, [resolvedAnnotations]);

  const measure = React.useCallback(() => {
    const sources = new Map<string, { node: HTMLElement; signature: string; isCopy: boolean }>();
    measurementNodes.current.forEach(({ key, signature, isCopy }, node) => {
      // A hidden intrinsic-size copy and its constrained foreignObject host can differ.
      // They must not compete to update the same cached measurement on every commit.
      if (isCopy || !sources.has(key)) {
        sources.set(key, { node, signature, isCopy });
      }
    });
    const previous = measurementsRef.current;
    let next = previous;
    sources.forEach(({ node, signature }, key) => {
      const rect = node.getBoundingClientRect();
      // offset dimensions remain in SVG user units when the root is CSS-scaled.
      const width = node.offsetWidth || rect.width;
      const height = node.offsetHeight || rect.height;
      const entry = previous[key];
      if (
        (width === 0 && height === 0) ||
        (entry &&
          entry.signature === signature &&
          Math.abs(entry.width - width) < 0.5 &&
          Math.abs(entry.height - height) < 0.5)
      ) {
        return;
      }
      if (next === previous) {
        next = { ...previous };
      }
      next[key] = { width, height, signature };
    });
    if (next !== previous) {
      measurementsRef.current = next;
      setMeasurements(next);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    setMeasurementRevision(value => value + 1);
  }, [context.svgRect.width, context.svgRect.height, hideDefaultStyles]);

  const hasPlot = Boolean(plot);
  const syncRootAspectRatio = React.useCallback(() => {
    if (hasPlot) {
      const aspectRatio = chartRef?.current?.getAttribute('preserveAspectRatio') ?? 'xMidYMid meet';
      if (rootAspectRatioRef.current !== aspectRatio) {
        rootAspectRatioRef.current = aspectRatio;
        setRootAspectRatio(aspectRatio);
      }
    }
  }, [chartRef, hasPlot]);

  // Read after an external render has committed the native SVG attributes, not
  // after every internal measurement commit.
  useIsomorphicLayoutEffect(syncRootAspectRatio, [props, syncRootAspectRatio]);
  useIsomorphicLayoutEffect(() => {
    const root = chartRef?.current;
    const MutationObserverConstructor = targetDocument?.defaultView?.MutationObserver;
    const observer =
      hasPlot && root && MutationObserverConstructor ? new MutationObserverConstructor(syncRootAspectRatio) : undefined;
    if (root) {
      observer?.observe(root, { attributes: true, attributeFilter: ['preserveAspectRatio'] });
    }
    return () => observer?.disconnect();
  }, [chartRef, hasPlot, syncRootAspectRatio, targetDocument]);

  useIsomorphicLayoutEffect(() => {
    const ResizeObserverConstructor = targetDocument?.defaultView?.ResizeObserver;
    const observer = ResizeObserverConstructor ? new ResizeObserverConstructor(measure) : undefined;
    measurementObserver.current = observer;
    const observed = observedMeasurementNodes.current;
    return () => {
      observer?.disconnect();
      observed.clear();
      measurementObserver.current = undefined;
    };
  }, [measure, targetDocument]);

  useIsomorphicLayoutEffect(() => {
    const observer = measurementObserver.current;
    const observed = observedMeasurementNodes.current;
    observed.forEach(node => {
      if (!measurementNodes.current.has(node)) {
        observer?.unobserve(node);
        observed.delete(node);
      }
    });
    measurementNodes.current.forEach((_value, node) => {
      if (!observed.has(node)) {
        observer?.observe(node);
        observed.add(node);
      }
    });
    measure();
  });

  React.useEffect(() => {
    const invalidate = () => setMeasurementRevision(value => value + 1);
    const fonts = targetDocument?.fonts;
    let mounted = true;
    fonts?.ready.then(() => mounted && invalidate());
    fonts?.addEventListener('loadingdone', invalidate);
    fonts?.addEventListener('loadingerror', invalidate);
    return () => {
      mounted = false;
      fonts?.removeEventListener('loadingdone', invalidate);
      fonts?.removeEventListener('loadingerror', invalidate);
    };
  }, [targetDocument]);

  useIsomorphicLayoutEffect(() => {
    const invalidate = () => setMeasurementRevision(value => value + 1);
    const MutationObserverConstructor = targetDocument?.defaultView?.MutationObserver;
    const observer = MutationObserverConstructor ? new MutationObserverConstructor(invalidate) : undefined;
    let ancestor: HTMLElement | null = rootRef.current;
    while (ancestor) {
      observer?.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style', 'dir'] });
      ancestor = ancestor.parentElement;
    }
    return () => observer?.disconnect();
  }, [targetDocument]);

  useIsomorphicLayoutEffect(() => {
    const key = focusedAction.current;
    if (key && !actionNodes.current.has(key)) {
      const oldIndex = previousOrder.current.indexOf(key);
      const candidates = [
        ...previousOrder.current.slice(oldIndex + 1),
        ...previousOrder.current.slice(0, Math.max(oldIndex, 0)).reverse(),
      ];
      const nextKey = candidates.find(candidate => actionNodes.current.has(candidate));
      focusedAction.current = nextKey;
      const next = nextKey ? actionNodes.current.get(nextKey) : undefined;
      (next ?? chartRef?.current)?.focus();
    }
    previousOrder.current = resolvedAnnotations.map(annotation => annotation.key);
  });

  const annotationForeignObjects: { annotationIndex: number; element: JSXElement }[] = [];
  const measurementElements: React.ReactNode[] = [];
  const connectors: (ConnectorRenderData & { renderProps?: LineChartAnnotationRenderProps })[] = [];
  const occupied: { x: number; y: number; width: number; height: number }[] = [];
  const spacing = nonnegativeFinite(annotationLayout?.spacing, 0);
  const maxShift = nonnegativeFinite(annotationLayout?.maxShift, 24);
  const candidates = resolvedAnnotations.map(item => {
    const priority = annotationLayout?.getPriority?.(item.annotation, item.annotationIndex) ?? 0;
    return { ...item, priority: Number.isFinite(priority) ? priority : 0 };
  });
  if (annotationLayout?.collision && annotationLayout.collision !== 'allow') {
    candidates.sort(
      (first, second) => second.priority - first.priority || first.annotationIndex - second.annotationIndex,
    );
  }

  candidates.forEach(({ annotation, key, annotationIndex }) => {
    const resolved = resolveCoordinates(annotation, context, Boolean(plot && annotation.action));
    if (!resolved) {
      return;
    }

    const action =
      plot &&
      typeof annotation.action?.label === 'string' &&
      annotation.action.label.trim() &&
      typeof annotation.action.onInvoke === 'function'
        ? annotation.action
        : undefined;
    if (plot && annotation.action && !action) {
      return;
    }
    const rawAnnotationText = annotation.text === undefined || annotation.text === null ? '' : String(annotation.text);
    const annotationMarkupNodes = parseSimpleMarkup(rawAnnotationText);
    const annotationMarkupSignature = JSON.stringify(annotationMarkupNodes);
    const annotationPlainText = simpleMarkupNodesToPlainText(annotationMarkupNodes);

    const layout = annotation.layout;
    const horizontalAlign = layout?.align ?? DEFAULT_HORIZONTAL_ALIGN;
    const verticalAlign = layout?.verticalAlign ?? DEFAULT_VERTICAL_ALIGN;
    const backgroundOpacity = annotation.style?.opacity ?? DEFAULT_ANNOTATION_BACKGROUND_OPACITY;
    const baseBackgroundColor = annotation.style?.backgroundColor;
    const hasCustomBackground =
      annotation.style?.backgroundColor !== undefined || annotation.style?.opacity !== undefined;

    const containerStyle: React.CSSProperties = {
      ...(action && hideDefaultStyles ? { border: 'none', backgroundColor: 'transparent' } : {}),
      maxWidth: layout?.maxWidth,
      ...(hasCustomBackground
        ? {
            backgroundColor: applyOpacityToColor(baseBackgroundColor, backgroundOpacity, {
              preserveOriginalOpacity: annotation.style?.opacity === undefined,
            }),
          }
        : hideDefaultStyles
        ? {}
        : {
            backgroundColor: applyOpacityToColor(tokens.colorNeutralBackground1, DEFAULT_ANNOTATION_BACKGROUND_OPACITY),
          }),
      borderColor: annotation.style?.borderColor,
      borderWidth: annotation.style?.borderWidth,
      borderStyle: annotation.style?.borderStyle ?? (annotation.style?.borderColor ? 'solid' : undefined),
      borderRadius: annotation.style?.borderRadius,
      padding: annotation.style?.padding,
      boxShadow: annotation.style?.boxShadow,
    };

    const contentStyle: React.CSSProperties = {
      color: annotation.style?.textColor,
      fontSize: annotation.style?.fontSize,
      fontWeight: annotation.style?.fontWeight,
      opacity: 1,
    };

    if (typeof annotation.style?.rotation === 'number' && !Number.isNaN(annotation.style.rotation)) {
      containerStyle.transform = `rotate(${annotation.style.rotation}deg)`;
      containerStyle.transformOrigin = '50% 50%';
    }

    const measurementSignature = createMeasurementSignature(
      `${annotationMarkupSignature}-${measurementRevision}-${action ? 'action' : 'note'}`,
      containerStyle,
      contentStyle,
      layout?.className,
      annotation.style?.className,
    );
    const measurementEntry = measurements[key];
    const isMeasurementValid = measurementEntry?.signature === measurementSignature;
    // Preserve the last size while invalidated material is remeasured before paint.
    const width = Math.max(measurementEntry?.width ?? layout?.maxWidth ?? DEFAULT_FOREIGN_OBJECT_WIDTH, 1);
    const height = Math.max(measurementEntry?.height ?? DEFAULT_FOREIGN_OBJECT_HEIGHT, 1);

    const offsetX = horizontalAlign === 'center' ? -width / 2 : horizontalAlign === 'end' ? -width : 0;
    const offsetY = verticalAlign === 'middle' ? -height / 2 : verticalAlign === 'bottom' ? -height : 0;

    const baseTopLeftX = resolved.point.x + offsetX;
    const baseTopLeftY = resolved.point.y + offsetY;

    const usePlotBounds = layout?.clipToBounds !== false;
    const viewportX = usePlotBounds ? context.plotRect.x : plot?.svgRect.x ?? 0;
    const viewportY = usePlotBounds ? context.plotRect.y : plot?.svgRect.y ?? 0;
    const viewportWidth = usePlotBounds ? context.plotRect.width : plot?.svgRect.width ?? context.svgRect.width ?? 0;
    const viewportHeight = usePlotBounds
      ? context.plotRect.height
      : plot?.svgRect.height ?? context.svgRect.height ?? 0;

    const maxTopLeftX = viewportWidth > 0 ? viewportX + viewportWidth - width : baseTopLeftX;
    const maxTopLeftY = viewportHeight > 0 ? viewportY + viewportHeight - height : baseTopLeftY;

    let topLeftX = viewportWidth > 0 ? clamp(baseTopLeftX, viewportX, Math.max(viewportX, maxTopLeftX)) : baseTopLeftX;
    let topLeftY = viewportHeight > 0 ? clamp(baseTopLeftY, viewportY, Math.max(viewportY, maxTopLeftY)) : baseTopLeftY;

    let displayPoint = {
      x: topLeftX - offsetX,
      y: topLeftY - offsetY,
    };

    if (annotation.connector) {
      const startPadding = annotation.connector.startPadding ?? 12;
      const endPadding = annotation.connector.endPadding ?? 0;
      const minArrowClearance = 6;
      const minDistance = Math.max(startPadding + endPadding + minArrowClearance, startPadding);

      const dx = displayPoint.x - resolved.anchor.x;
      const dy = displayPoint.y - resolved.anchor.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        const fallbackDirection: AnnotationPoint = { x: 0, y: -1 };
        const ux = distance === 0 ? fallbackDirection.x : dx / distance;
        const uy = distance === 0 ? fallbackDirection.y : dy / distance;

        const desiredDisplayX = resolved.anchor.x + ux * minDistance;
        const desiredDisplayY = resolved.anchor.y + uy * minDistance;

        let desiredTopLeftX = desiredDisplayX + offsetX;
        let desiredTopLeftY = desiredDisplayY + offsetY;

        desiredTopLeftX =
          viewportWidth > 0 ? clamp(desiredTopLeftX, viewportX, Math.max(viewportX, maxTopLeftX)) : desiredTopLeftX;
        desiredTopLeftY =
          viewportHeight > 0 ? clamp(desiredTopLeftY, viewportY, Math.max(viewportY, maxTopLeftY)) : desiredTopLeftY;

        topLeftX = desiredTopLeftX;
        topLeftY = desiredTopLeftY;
        displayPoint = {
          x: topLeftX - offsetX,
          y: topLeftY - offsetY,
        };
      }
    }

    const getRenderProps = (): LineChartAnnotationRenderProps | undefined => {
      if (!plot) {
        return undefined;
      }
      const dx = resolved.anchor.x - displayPoint.x;
      const dy = resolved.anchor.y - displayPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const startPadding = annotation.connector?.startPadding ?? DEFAULT_CONNECTOR_START_PADDING;
      const endPadding = annotation.connector?.endPadding ?? DEFAULT_CONNECTOR_END_PADDING;
      return {
        annotation,
        annotationIndex,
        plot,
        anchor: resolved.anchor,
        labelRect: { x: topLeftX, y: topLeftY, width, height },
        connectorStart: {
          x: displayPoint.x + (dx / distance) * startPadding,
          y: displayPoint.y + (dy / distance) * startPadding,
        },
        connectorEnd: {
          x: resolved.anchor.x - (dx / distance) * endPadding,
          y: resolved.anchor.y - (dy / distance) * endPadding,
        },
      };
    };
    const renderContent = (renderProps: LineChartAnnotationRenderProps | undefined) =>
      renderProps && props.onRenderAnnotationContent
        ? props.onRenderAnnotationContent(renderProps, renderDefaultAnnotationContent)
        : renderSimpleMarkup(annotationMarkupNodes, `${key}-content`);
    const annotationClass = hideDefaultStyles ? classes.annotationNoDefaults : classes.annotation;
    const hostClassName = mergeClasses(
      annotationClass,
      action && classes.action,
      layout?.className,
      annotation.style?.className,
    );
    const measurementStyle: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      top: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      ...containerStyle,
    };

    if (!isMeasurementValid || (plot && props.onRenderAnnotationContent)) {
      const MeasurementHost = action ? 'button' : 'div';
      const MeasurementContent = action ? 'span' : 'div';
      const register = measurementRef(key, measurementSignature, true);
      measurementElements.push(
        <MeasurementHost
          key={`${key}-measurement`}
          ref={(node: HTMLButtonElement | HTMLDivElement | null) => {
            setInert(node);
            register(node);
          }}
          className={mergeClasses(hostClassName, classes.measurement)}
          style={measurementStyle}
          type={action ? 'button' : undefined}
          aria-hidden={true}
          tabIndex={-1}
          data-annotation-key={key}
          data-chart-annotation-measurement="true"
        >
          <MeasurementContent className={classes.annotationContent} style={contentStyle}>
            {renderContent(getRenderProps())}
          </MeasurementContent>
        </MeasurementHost>,
      );
    }

    const collision = annotationLayout?.collision ?? 'allow';
    const rectangle = { x: topLeftX, y: topLeftY, width, height };
    const collides = (candidate: typeof rectangle) =>
      occupied.some(other => rectanglesCollide(candidate, other, spacing));
    if (collision !== 'allow' && collides(rectangle)) {
      let shifted = false;
      if (collision === 'shift') {
        const step = Math.max(1, spacing);
        for (let displacement = step; displacement <= maxShift && !shifted; displacement += step) {
          for (const direction of [1, -1]) {
            const y = rectangle.y + displacement * direction;
            const candidate = { ...rectangle, y };
            if (y >= viewportY && y + height <= viewportY + viewportHeight && !collides(candidate)) {
              topLeftY = y;
              displayPoint = { ...displayPoint, y: y - offsetY };
              shifted = true;
              break;
            }
          }
        }
      }
      if (!shifted) {
        return;
      }
    }
    if (
      collision === 'shift' &&
      (topLeftX < viewportX ||
        topLeftY < viewportY ||
        topLeftX + width > viewportX + viewportWidth ||
        topLeftY + height > viewportY + viewportHeight)
    ) {
      return;
    }
    occupied.push({ x: topLeftX, y: topLeftY, width, height });
    const renderProps = getRenderProps();
    const content = renderContent(renderProps);
    const descriptionId = `${idPrefix}-${encodeURIComponent(key)}-description`;
    const registerActionMeasurement = measurementRef(key, measurementSignature);

    annotationForeignObjects.push({
      annotationIndex,
      element: (
        <foreignObject
          key={`${key}-annotation`}
          x={topLeftX}
          y={topLeftY}
          width={width}
          height={height}
          className={mergeClasses(
            classes.annotationForeignObject,
            action && classes.annotationForeignObjectInteractive,
          )}
          data-annotation-key={key}
          onPointerMove={action ? stopAnnotationEvent : undefined}
          onPointerDown={action ? stopAnnotationEvent : undefined}
        >
          {action ? (
            <>
              <button
                ref={node => {
                  if (node) {
                    actionNodes.current.set(key, node);
                  } else {
                    actionNodes.current.delete(key);
                  }
                  registerActionMeasurement(node);
                }}
                type="button"
                id={`${idPrefix}-${encodeURIComponent(key)}-action`}
                className={hostClassName}
                style={containerStyle}
                aria-label={action.label}
                aria-describedby={`${descriptionId}${
                  annotation.accessibility?.ariaDescribedBy ? ` ${annotation.accessibility.ariaDescribedBy}` : ''
                }`}
                data-chart-annotation="true"
                data-annotation-key={key}
                onFocus={() => {
                  focusedAction.current = key;
                }}
                onBlur={() => {
                  focusedAction.current = undefined;
                }}
                onKeyDown={stopAnnotationEvent}
                onKeyUp={stopAnnotationEvent}
                onClick={event => {
                  event.stopPropagation();
                  action.onInvoke(event.detail === 0 ? 'keyboard' : 'pointer');
                }}
              >
                <span ref={setInert} aria-hidden="true" className={classes.annotationContent} style={contentStyle}>
                  {content}
                </span>
              </button>
              <span id={descriptionId} hidden>
                {annotationPlainText}
              </span>
            </>
          ) : (
            <div
              ref={measurementRef(key, measurementSignature)}
              className={hostClassName}
              style={containerStyle}
              data-annotation-key={key}
            >
              <div
                className={mergeClasses(
                  classes.annotationContent,
                  classes.annotationContentInteractive,
                  annotation.style?.className,
                )}
                style={contentStyle}
                role={annotation.accessibility?.role ?? 'note'}
                aria-label={annotation.accessibility?.ariaLabel ?? (annotationPlainText || undefined)}
                aria-describedby={annotation.accessibility?.ariaDescribedBy}
                tabIndex={0}
                data-chart-annotation="true"
                data-annotation-key={key}
              >
                {props.onRenderAnnotationContent && plot ? (
                  <span ref={setInert} aria-hidden="true">
                    {content}
                  </span>
                ) : (
                  content
                )}
              </div>
            </div>
          )}
        </foreignObject>
      ),
    });

    if (annotation.connector || (plot && props.onRenderAnnotationConnector)) {
      const {
        startPadding = DEFAULT_CONNECTOR_START_PADDING,
        endPadding = DEFAULT_CONNECTOR_END_PADDING,
        strokeColor = getDefaultConnectorStrokeColor(),
        strokeWidth = DEFAULT_CONNECTOR_STROKE_WIDTH,
        dashArray,
        arrow = DEFAULT_CONNECTOR_ARROW,
      } = annotation.connector ?? {};

      const dx = resolved.anchor.x - displayPoint.x;
      const dy = resolved.anchor.y - displayPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const ux = dx / distance;
      const uy = dy / distance;

      const sizeBasis = Math.max(1, Math.min(width, height));
      const proportionalSize = sizeBasis * ARROW_SIZE_SCALE;
      const maxByPadding = startPadding > 0 ? startPadding * 1.25 : MAX_ARROW_SIZE;
      const maxByDistance = distance * 0.6;
      const markerSize = clamp(proportionalSize, MIN_ARROW_SIZE, Math.min(MAX_ARROW_SIZE, maxByPadding, maxByDistance));
      const markerStrokeWidth = clamp(strokeWidth, 1, markerSize / 2);

      const start: AnnotationPoint = {
        x: displayPoint.x + ux * startPadding,
        y: displayPoint.y + uy * startPadding,
      };

      const end: AnnotationPoint = {
        x: resolved.anchor.x - ux * endPadding,
        y: resolved.anchor.y - uy * endPadding,
      };

      connectors.push({
        key: `${key}-connector`,
        start,
        end,
        strokeColor,
        strokeWidth,
        dashArray,
        arrow,
        markerSize,
        markerStrokeWidth,
        renderProps,
      });
    }
  });

  if (annotationForeignObjects.length === 0 && connectors.length === 0 && measurementElements.length === 0) {
    return null;
  }

  const viewBoxX = plot?.svgRect.x ?? 0;
  const viewBoxY = plot?.svgRect.y ?? 0;
  const viewBoxWidth = plot?.svgRect.width || context.svgRect.width || 1;
  const viewBoxHeight = plot?.svgRect.height || context.svgRect.height || 1;

  const markerDefs: React.ReactNode[] = [];

  const createMarkerId = (color: string, position: 'start' | 'end', size: number, markerStrokeWidth: number) => {
    const id = `${idPrefix}-${position}-${markerDefs.length}`;
    const refY = size / 2;
    const refX = position === 'end' ? size : 0;
    const pathEnd = `M0 0 L ${size} ${refY} L0 ${size} Z`;
    const pathStart = `M ${size} 0 L0 ${refY} L ${size} ${size} Z`;
    const path = position === 'end' ? pathEnd : pathStart;

    markerDefs.push(
      <marker
        key={id}
        id={id}
        markerWidth={size}
        markerHeight={size}
        viewBox={`0 0 ${size} ${size}`}
        refX={refX}
        refY={refY}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={path}
          fill={color}
          stroke={color}
          strokeWidth={markerStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>,
    );

    return id;
  };

  const connectorElements = connectors.map(connector => {
    let markerStart: string | undefined;
    let markerEnd: string | undefined;

    if (connector.arrow === 'start' || connector.arrow === 'both') {
      markerStart = createMarkerId(connector.strokeColor, 'start', connector.markerSize, connector.markerStrokeWidth);
    }
    if (connector.arrow === 'end' || connector.arrow === 'both') {
      markerEnd = createMarkerId(connector.strokeColor, 'end', connector.markerSize, connector.markerStrokeWidth);
    }

    const defaultRender = (renderProps?: LineChartAnnotationRenderProps): JSXElement | null => {
      if (!connector.renderProps && !renderProps) {
        return (
          <line
            x1={connector.start.x}
            y1={connector.start.y}
            x2={connector.end.x}
            y2={connector.end.y}
            stroke={connector.strokeColor}
            strokeWidth={connector.strokeWidth}
            strokeDasharray={connector.dashArray}
            strokeLinecap="round"
            markerStart={markerStart ? `url(#${markerStart})` : undefined}
            markerEnd={markerEnd ? `url(#${markerEnd})` : undefined}
          />
        );
      }
      if (!renderProps?.annotation.connector) {
        return null;
      }
      return (
        <line
          x1={renderProps.connectorStart.x}
          y1={renderProps.connectorStart.y}
          x2={renderProps.connectorEnd.x}
          y2={renderProps.connectorEnd.y}
          stroke={connector.strokeColor}
          strokeWidth={connector.strokeWidth}
          strokeDasharray={connector.dashArray}
          strokeLinecap="round"
          markerStart={markerStart ? `url(#${markerStart})` : undefined}
          markerEnd={markerEnd ? `url(#${markerEnd})` : undefined}
        />
      );
    };
    const content =
      connector.renderProps && props.onRenderAnnotationConnector
        ? props.onRenderAnnotationConnector(connector.renderProps, defaultRender)
        : defaultRender(connector.renderProps);
    if (!plot) {
      return content ? React.cloneElement(content, { key: connector.key }) : null;
    }
    return (
      <g key={connector.key} ref={setInert} pointerEvents="none" aria-hidden="true">
        {content}
      </g>
    );
  });

  const shouldRenderSvg = connectors.length > 0 || annotationForeignObjects.length > 0;
  return (
    <div ref={rootRef} className={classes.root} role="presentation" data-chart-annotation-layer="true">
      {shouldRenderSvg && (
        <svg
          className={classes.connectorLayer}
          width="100%"
          height="100%"
          viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio={plot ? rootAspectRatio : 'none'}
          data-chart-annotation-svg="true"
        >
          {markerDefs.length > 0 && <defs>{markerDefs}</defs>}
          {connectorElements.length > 0 && (
            <g aria-hidden="true" className={classes.connectorGroup}>
              {connectorElements}
            </g>
          )}
          {annotationForeignObjects
            .sort((first, second) => first.annotationIndex - second.annotationIndex)
            .map(item => item.element)}
        </svg>
      )}
      {measurementElements}
    </div>
  );
});

ChartAnnotationLayer.displayName = 'ChartAnnotationLayer';
