import * as React from 'react';
import { classNamesFunction, css, getId } from '@fluentui/react/lib/Utilities';
import type { IChartAnnotation } from '../../../types/IChartAnnotation';
import type {
  IAnnotationPoint,
  IChartAnnotationContext,
  IChartAnnotationLayerProps,
  ConnectorRenderData,
  IResolvedAnnotationPosition,
} from './ChartAnnotationLayer.types';
import {
  applyOpacityToColor,
  DEFAULT_ANNOTATION_BACKGROUND_OPACITY,
  DEFAULT_CONNECTOR_ARROW,
  DEFAULT_CONNECTOR_END_PADDING,
  DEFAULT_CONNECTOR_START_PADDING,
  DEFAULT_CONNECTOR_STROKE_WIDTH,
  getDefaultConnectorStrokeColor,
  getStyles,
} from './ChartAnnotationLayer.styles';
import type { IChartAnnotationLayerStyleProps, IChartAnnotationLayerStyles } from './ChartAnnotationLayer.styles';

const getClassNames = classNamesFunction<IChartAnnotationLayerStyleProps, IChartAnnotationLayerStyles>();

const DEFAULT_HORIZONTAL_ALIGN = 'center';
const DEFAULT_VERTICAL_ALIGN = 'middle';
const DEFAULT_FOREIGN_OBJECT_WIDTH = 180;
const DEFAULT_FOREIGN_OBJECT_HEIGHT = 60;
const MIN_ARROW_SIZE = 6;
const MAX_ARROW_SIZE = 24;
const ARROW_SIZE_SCALE = 0.35;
const getAnnotationKey = (annotation: IChartAnnotation, index: number) =>
  annotation.id ??
  (typeof annotation.text === 'string' || typeof annotation.text === 'number' ? String(annotation.text) : undefined) ??
  `annotation-${index}`;

const decodeHtmlEntities = (html: string, documentRef: Document): string => {
  if (!html || html.indexOf('&') === -1) {
    return html;
  }

  if (!documentRef?.implementation?.createHTMLDocument) {
    return html;
  }

  const workingDocument = documentRef.implementation.createHTMLDocument('');
  workingDocument.body.innerHTML = html;
  return workingDocument.body.textContent ?? '';
};

const sanitizeAnnotationHtml = (html: string): string => {
  if (!html) {
    return '';
  }

  if (typeof window === 'undefined' || !window.document?.implementation?.createHTMLDocument) {
    return html;
  }

  const workingDocument = window.document.implementation.createHTMLDocument('');
  workingDocument.body.innerHTML = decodeHtmlEntities(html, window.document);

  workingDocument.body.querySelectorAll('script, iframe, object, embed, link').forEach(node => node.remove());

  workingDocument.body.querySelectorAll('*').forEach(node => {
    Array.from(node.attributes).forEach(attr => {
      if (/^on/i.test(attr.name)) {
        node.removeAttribute(attr.name);
      }
    });
  });

  return workingDocument.body.innerHTML;
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

const createMeasurementSignature = (
  annotationHtml: string,
  containerStyle: React.CSSProperties,
  contentStyle: React.CSSProperties,
  layoutClassName?: string,
  styleClassName?: string,
) =>
  JSON.stringify({
    annotationHtml,
    containerStyle,
    contentStyle,
    layoutClassName: layoutClassName ?? '',
    styleClassName: styleClassName ?? '',
  });

type MeasurementEntry = { width: number; height: number; signature: string };

const resolveCoordinates = (
  annotation: IChartAnnotation,
  context: IChartAnnotationContext,
): IResolvedAnnotationPosition | undefined => {
  const { coordinates, layout } = annotation;

  if (!coordinates) {
    return undefined;
  }

  const offsetX = layout?.offsetX ?? 0;
  const offsetY = layout?.offsetY ?? 0;

  const anchor: IAnnotationPoint = { x: 0, y: 0 };

  switch (coordinates.type) {
    case 'data': {
      const { x, y, yAxis = 'primary' } = coordinates;
      const xScale = context.xScale;
      const yScale = yAxis === 'secondary' ? context.yScaleSecondary : context.yScalePrimary;
      if (!xScale || !yScale) {
        return undefined;
      }
      const xValue = normalizeBandOffset(xScale, x instanceof Date ? x.getTime() : x);
      const yValue = normalizeBandOffset(yScale, y instanceof Date ? y.getTime() : y);
      if (typeof xValue !== 'number' || typeof yValue !== 'number') {
        return undefined;
      }
      anchor.x = xValue;
      anchor.y = yValue;
      break;
    }
    case 'relative': {
      if (typeof coordinates.x !== 'number' || typeof coordinates.y !== 'number') {
        return undefined;
      }
      anchor.x = context.plotRect.x + context.plotRect.width * coordinates.x;
      anchor.y = context.plotRect.y + context.plotRect.height * coordinates.y;
      break;
    }
    case 'pixel': {
      if (typeof coordinates.x !== 'number' || typeof coordinates.y !== 'number') {
        return undefined;
      }
      anchor.x = context.plotRect.x + coordinates.x;
      anchor.y = context.plotRect.y + coordinates.y;
      break;
    }
    default:
      return undefined;
  }

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

export const ChartAnnotationLayer: React.FC<IChartAnnotationLayerProps> = React.memo(props => {
  const { annotations: annotationsProp, theme, context, className } = props;

  const classNames = getClassNames(getStyles, { theme, className });
  const idPrefix = React.useMemo(() => getId('chart-annotation'), []);

  const [measurements, setMeasurements] = React.useState<Record<string, MeasurementEntry>>({});

  const resolvedAnnotations = React.useMemo(
    () =>
      (annotationsProp ?? []).map((annotation, index) => ({ annotation, key: getAnnotationKey(annotation, index) })),
    [annotationsProp],
  );

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

    const annotationHtml = sanitizeAnnotationHtml(annotation.text ?? '');

    const layout = annotation.layout;
    const horizontalAlign = layout?.align ?? DEFAULT_HORIZONTAL_ALIGN;
    const verticalAlign = layout?.verticalAlign ?? DEFAULT_VERTICAL_ALIGN;
    const backgroundOpacity = annotation.style?.opacity ?? DEFAULT_ANNOTATION_BACKGROUND_OPACITY;
    const baseBackgroundColor = annotation.style?.backgroundColor ?? theme.semanticColors.bodyBackground;
    const hasCustomBackground =
      annotation.style?.backgroundColor !== undefined || annotation.style?.opacity !== undefined;

    const containerStyle: React.CSSProperties = {
      maxWidth: layout?.maxWidth,
      ...(hasCustomBackground && {
        backgroundColor: applyOpacityToColor(baseBackgroundColor, backgroundOpacity),
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
      annotationHtml,
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
        const fallbackDirection: IAnnotationPoint = { x: 0, y: -1 };
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
      left: topLeftX,
      top: topLeftY,
      pointerEvents: 'none',
      ...containerStyle,
    };

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
          className={css(classNames.annotation, classNames.measurement, layout?.className, annotation.style?.className)}
          style={measurementStyle}
          aria-hidden={true}
          data-annotation-key={key}
          data-chart-annotation-measurement="true"
        >
          {/* eslint-disable-next-line react/no-danger -- content sanitized via sanitizeAnnotationHtml */}
          <div
            className={css(classNames.annotationContent, layout?.className, annotation.style?.className)}
            style={contentStyle}
            dangerouslySetInnerHTML={{ __html: annotationHtml }}
          />
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
        className={css(classNames.annotationForeignObject)}
        data-annotation-key={key}
      >
        <div
          className={css(classNames.annotation, layout?.className, annotation.style?.className)}
          style={containerStyle}
          data-annotation-key={key}
        >
          {/* eslint-disable-next-line react/no-danger -- content sanitized via sanitizeAnnotationHtml */}
          <div
            className={css(classNames.annotationContent, annotation.style?.className)}
            style={contentStyle}
            role={annotation.accessibility?.role ?? 'note'}
            aria-label={annotation.accessibility?.ariaLabel}
            aria-describedby={annotation.accessibility?.ariaDescribedBy}
            data-chart-annotation="true"
            data-annotation-key={key}
            dangerouslySetInnerHTML={{ __html: annotationHtml }}
          />
        </div>
      </foreignObject>,
    );

    if (annotation.connector) {
      const {
        startPadding = DEFAULT_CONNECTOR_START_PADDING,
        endPadding = DEFAULT_CONNECTOR_END_PADDING,
        strokeColor = getDefaultConnectorStrokeColor(theme),
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

      const start: IAnnotationPoint = {
        x: displayPoint.x + ux * startPadding,
        y: displayPoint.y + uy * startPadding,
      };

      const end: IAnnotationPoint = {
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
    <div className={classNames.root} role="presentation" data-chart-annotation-layer="true">
      {shouldRenderSvg && (
        <svg
          className={classNames.connectorLayer}
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none"
          data-chart-annotation-svg="true"
        >
          {markerDefs.length > 0 && <defs>{markerDefs}</defs>}
          {connectorElements.length > 0 && (
            <g aria-hidden="true" className={classNames.connectorGroup}>
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
