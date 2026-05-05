'use client';

import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import type { ChartAnnotation } from '../../../types/ChartAnnotation';
import type {
  AnnotationPoint,
  ChartAnnotationContext,
  ChartAnnotationLayerProps,
  ConnectorRenderData,
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
import { useId } from '@fluentui/react-utilities';
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
  if (typeof position !== 'number' || Number.isNaN(position)) {
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
  options: { yAxis?: 'primary' | 'secondary' } = {},
): number | undefined => {
  switch (coordinateType) {
    case 'data':
      return resolveDataCoordinate(axis, value, context, options.yAxis);
    case 'relative':
      if (typeof value !== 'number' || Number.isNaN(value)) {
        return undefined;
      }
      return axis === 'x'
        ? context.plotRect.x + context.plotRect.width * value
        : context.plotRect.y + context.plotRect.height * value;
    case 'pixel':
      if (typeof value !== 'number' || Number.isNaN(value)) {
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
};

const getCoordinateDescriptor = (coordinates: ChartAnnotation['coordinates']): CoordinateDescriptor | undefined => {
  switch (coordinates.type) {
    case 'data':
      return { xType: 'data', yType: 'data', yAxis: coordinates.yAxis };
    case 'relative':
      return { xType: 'relative', yType: 'relative' };
    case 'pixel':
      return { xType: 'pixel', yType: 'pixel' };
    case 'mixed':
      return {
        xType: coordinates.xCoordinateType,
        yType: coordinates.yCoordinateType,
        yAxis: coordinates.yAxis,
      };
    default:
      return undefined;
  }
};

const resolveCoordinates = (
  annotation: ChartAnnotation,
  context: ChartAnnotationContext,
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
  });

  if (anchorX === undefined || anchorY === undefined) {
    return undefined;
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

export const ChartAnnotationLayer: React.FC<ChartAnnotationLayerProps> = React.memo(props => {
  const { annotations: annotationsProp, context, hideDefaultStyles } = props;

  const classes = useChartAnnotationLayerStyles(props);
  const idPrefix = useId('chart-annotation');
  const autoKeyPrefix = useId('chart-annotation-item');

  const [measurements, setMeasurements] = React.useState<Record<string, MeasurementEntry>>({});

  const resolvedAnnotations = React.useMemo(() => {
    let fallbackIndex = 0;
    return (annotationsProp ?? []).map(annotation => ({
      annotation,
      key: annotation.id ?? `${autoKeyPrefix}-${fallbackIndex++}`,
    }));
  }, [annotationsProp, autoKeyPrefix]);

  React.useEffect(() => {
    setMeasurements(prev => {
      if (resolvedAnnotations.length === 0) {
        if (Object.keys(prev).length === 0) {
          return prev;
        }
        return {} as Record<string, MeasurementEntry>;
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

      return next;
    });
  }, [resolvedAnnotations]);

  const updateMeasurement = React.useCallback((key: string, width: number, height: number, signature: string) => {
    setMeasurements(prev => {
      const prevEntry = prev[key];
      if (
        prevEntry &&
        prevEntry.signature === signature &&
        Math.abs(prevEntry.width - width) < 0.5 &&
        Math.abs(prevEntry.height - height) < 0.5
      ) {
        return prev;
      }

      if (width === 0 && height === 0) {
        return prev;
      }

      return {
        ...prev,
        [key]: { width, height, signature },
      };
    });
  }, []);

  const annotationForeignObjects: React.ReactNode[] = [];
  const measurementElements: React.ReactNode[] = [];
  const connectors: ConnectorRenderData[] = [];

  resolvedAnnotations.forEach(({ annotation, key }) => {
    const resolved = resolveCoordinates(annotation, context);
    if (!resolved) {
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
      annotationMarkupSignature,
      containerStyle,
      contentStyle,
      layout?.className,
      annotation.style?.className,
    );
    const measurementEntry = measurements[key];
    const isMeasurementValid = measurementEntry?.signature === measurementSignature;
    const measuredSize = isMeasurementValid ? measurementEntry : undefined;
    const width = Math.max(measuredSize?.width ?? layout?.maxWidth ?? DEFAULT_FOREIGN_OBJECT_WIDTH, 1);
    const height = Math.max(measuredSize?.height ?? DEFAULT_FOREIGN_OBJECT_HEIGHT, 1);

    const offsetX = horizontalAlign === 'center' ? -width / 2 : horizontalAlign === 'end' ? -width : 0;
    const offsetY = verticalAlign === 'middle' ? -height / 2 : verticalAlign === 'bottom' ? -height : 0;

    const baseTopLeftX = resolved.point.x + offsetX;
    const baseTopLeftY = resolved.point.y + offsetY;

    const usePlotBounds = layout?.clipToBounds !== false;
    const viewportX = usePlotBounds ? context.plotRect.x : 0;
    const viewportY = usePlotBounds ? context.plotRect.y : 0;
    const viewportWidth = usePlotBounds ? context.plotRect.width : context.svgRect.width ?? 0;
    const viewportHeight = usePlotBounds ? context.plotRect.height : context.svgRect.height ?? 0;

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

    const measurementStyle: React.CSSProperties = {
      position: 'absolute',
      left: topLeftX,
      top: topLeftY,
      pointerEvents: 'none',
      visibility: 'hidden',
      ...containerStyle,
    };

    const annotationClass = hideDefaultStyles ? classes.annotationNoDefaults : classes.annotation;

    if (!isMeasurementValid) {
      measurementElements.push(
        <div
          key={`${key}-measurement`}
          ref={node => {
            if (node) {
              const rect = node.getBoundingClientRect();
              if (rect.width !== 0 || rect.height !== 0) {
                updateMeasurement(key, rect.width, rect.height, measurementSignature);
              }
            }
          }}
          className={mergeClasses(annotationClass, classes.measurement, layout?.className, annotation.style?.className)}
          style={measurementStyle}
          aria-hidden={true}
          data-annotation-key={key}
          data-chart-annotation-measurement="true"
        >
          <div
            className={mergeClasses(classes.annotationContent, layout?.className, annotation.style?.className)}
            style={contentStyle}
          >
            {renderSimpleMarkup(annotationMarkupNodes, `${key}-measurement`)}
          </div>
        </div>,
      );
    }

    annotationForeignObjects.push(
      <foreignObject
        key={`${key}-annotation`}
        x={topLeftX}
        y={topLeftY}
        width={width}
        height={height}
        className={mergeClasses(classes.annotationForeignObject)}
        data-annotation-key={key}
      >
        <div
          className={mergeClasses(annotationClass, layout?.className, annotation.style?.className)}
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
            aria-label={annotation.accessibility?.ariaLabel ?? (annotationPlainText ? annotationPlainText : undefined)}
            aria-describedby={annotation.accessibility?.ariaDescribedBy}
            tabIndex={0}
            data-chart-annotation="true"
            data-annotation-key={key}
          >
            {renderSimpleMarkup(annotationMarkupNodes, `${key}-content`)}
          </div>
        </div>
      </foreignObject>,
    );

    if (annotation.connector) {
      const {
        startPadding = DEFAULT_CONNECTOR_START_PADDING,
        endPadding = DEFAULT_CONNECTOR_END_PADDING,
        strokeColor = getDefaultConnectorStrokeColor(),
        strokeWidth = DEFAULT_CONNECTOR_STROKE_WIDTH,
        dashArray,
        arrow = DEFAULT_CONNECTOR_ARROW,
      } = annotation.connector;

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
      });
    }
  });

  if (annotationForeignObjects.length === 0 && connectors.length === 0) {
    return null;
  }

  const viewBoxWidth = context.svgRect.width || 1;
  const viewBoxHeight = context.svgRect.height || 1;

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

    return (
      <line
        key={connector.key}
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
  });

  const shouldRenderSvg = connectors.length > 0 || annotationForeignObjects.length > 0;
  return (
    <div className={classes.root} role="presentation" data-chart-annotation-layer="true">
      {shouldRenderSvg && (
        <svg
          className={classes.connectorLayer}
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none"
          data-chart-annotation-svg="true"
        >
          {markerDefs.length > 0 && <defs>{markerDefs}</defs>}
          {connectorElements.length > 0 && (
            <g aria-hidden="true" className={classes.connectorGroup}>
              {connectorElements}
            </g>
          )}
          {annotationForeignObjects}
        </svg>
      )}
      {measurementElements}
    </div>
  );
});

ChartAnnotationLayer.displayName = 'ChartAnnotationLayer';
