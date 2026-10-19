import type {
  DetectOverflowOptions,
  FlipOptions,
  LimitShiftOptions,
  Middleware,
  MiddlewareState,
  OffsetOptions,
  Padding,
  Placement,
  ReferenceElement,
  Side,
  ShiftOptions,
  SizeOptions,
} from '@floating-ui/dom';

const opposite: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
const sideOf = (placement: Placement) => placement.split('-')[0] as Side;
const alignOf = (placement: Placement) => placement.split('-')[1];
const vertical = (placement: Placement) => /^(top|bottom)/.test(placement);
const clamp = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max));
const paddingOf = (padding: Padding = 0) =>
  typeof padding === 'number'
    ? { top: padding, right: padding, bottom: padding, left: padding }
    : { top: 0, right: 0, bottom: 0, left: 0, ...padding };

export async function detectOverflow(
  state: MiddlewareState,
  options: DetectOverflowOptions = {},
): Promise<Record<Side, number>> {
  const { rects, elements, platform, strategy } = state;
  const {
    elementContext = 'floating',
    altBoundary = false,
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
  } = options;
  const context = altBoundary ? (elementContext === 'floating' ? 'reference' : 'floating') : elementContext;
  const element = elements[context];
  const clippingElement = (await platform.isElement?.(element))
    ? (element as Element)
    : (element as ReferenceElement & { contextElement?: Element }).contextElement ??
      elements.floating.ownerDocument.documentElement;
  const clip = await platform.getClippingRect({ element: clippingElement, boundary, rootBoundary, strategy });
  const parent = await platform.getOffsetParent?.(elements.floating);
  const scale =
    parent && (await platform.isElement?.(parent)) && platform.getScale
      ? await platform.getScale(parent)
      : { x: 1, y: 1 };
  const local =
    elementContext === 'reference'
      ? rects.reference
      : { x: state.x, y: state.y, width: rects.floating.width, height: rects.floating.height };
  const rect = platform.convertOffsetParentRelativeRectToViewportRelativeRect
    ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements,
        rect: local,
        offsetParent: parent,
        strategy,
      })
    : local;
  const padding = paddingOf(options.padding);
  return {
    top: (clip.y - rect.y + padding.top) / scale.y,
    bottom: (rect.y + rect.height - clip.y - clip.height + padding.bottom) / scale.y,
    left: (clip.x - rect.x + padding.left) / scale.x,
    right: (rect.x + rect.width - clip.x - clip.width + padding.right) / scale.x,
  };
}

export function offset(options: OffsetOptions = 0): Middleware {
  return {
    name: 'offset',
    async fn(state) {
      const raw = typeof options === 'function' ? options(state) : options;
      const value = typeof raw === 'number' ? { mainAxis: raw } : raw;
      let cross = value.crossAxis || 0;
      if (alignOf(state.placement) && typeof value.alignmentAxis === 'number') {
        cross = value.alignmentAxis * (alignOf(state.placement) === 'end' ? -1 : 1);
      }
      const isVertical = vertical(state.placement);
      const rtl = await state.platform.isRTL?.(state.elements.floating);
      const main = (value.mainAxis || 0) * (/^(top|left)/.test(state.placement) ? -1 : 1);
      cross *= rtl && isVertical ? -1 : 1;
      if (state.middlewareData.offset?.placement === state.placement && state.middlewareData.arrow?.alignmentOffset) {
        return {};
      }
      const delta = { x: isVertical ? cross : main, y: isVertical ? main : cross };
      return { x: state.x + delta.x, y: state.y + delta.y, data: { ...delta, placement: state.placement } };
    },
  };
}

export function flip(options: FlipOptions = {}): Middleware {
  return {
    name: 'flip',
    async fn(state) {
      if (state.middlewareData.arrow?.alignmentOffset) {
        return {};
      }
      const initial = state.initialPlacement;
      const align = alignOf(initial);
      const oppositePlacement = (p: Placement): Placement =>
        `${opposite[sideOf(p)]}${alignOf(p) ? `-${alignOf(p)}` : ''}` as Placement;
      const oppositeAlignment = (p: Placement): Placement =>
        p.replace(/start|end/, match => (match === 'start' ? 'end' : 'start')) as Placement;
      const candidates = [
        initial,
        ...(options.fallbackPlacements ??
          (align
            ? [oppositeAlignment(initial), oppositePlacement(initial), oppositeAlignment(oppositePlacement(initial))]
            : [oppositePlacement(initial)])),
      ];
      const overflow = await detectOverflow(state, options);
      const isVertical = vertical(state.placement);
      const rtl = await state.platform.isRTL?.(state.elements.floating);
      const length = isVertical ? 'width' : 'height';
      let alignmentSide: Side = isVertical
        ? alignOf(state.placement) === (rtl ? 'end' : 'start')
          ? 'right'
          : 'left'
        : alignOf(state.placement) === 'start'
        ? 'bottom'
        : 'top';
      if (state.rects.reference[length] > state.rects.floating[length]) {
        alignmentSide = opposite[alignmentSide];
      }
      const overflows = [overflow[sideOf(state.placement)], overflow[alignmentSide], overflow[opposite[alignmentSide]]];
      const attempts: { placement: Placement; overflows: number[] }[] = [
        ...(state.middlewareData.flip?.overflows ?? []),
        { placement: state.placement, overflows },
      ];
      if (overflows.every(value => value <= 0)) {
        return {};
      }
      const index = (state.middlewareData.flip?.index ?? 0) + 1;
      if (candidates[index]) {
        return { data: { index, overflows: attempts }, reset: { placement: candidates[index] } };
      }
      const fitting = attempts.filter(item => item.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1]);
      const score = (values: number[]) => values.reduce((sum, value) => sum + Math.max(0, value), 0);
      const best = fitting[0] ?? attempts.sort((a, b) => score(a.overflows) - score(b.overflows))[0];
      return best.placement === state.placement ? {} : { reset: { placement: best.placement } };
    },
  };
}

export function limitShift(options: LimitShiftOptions = {}): NonNullable<ShiftOptions['limiter']> {
  return {
    fn(state) {
      const coords = { x: state.x, y: state.y };
      const main = vertical(state.placement) ? 'x' : 'y';
      const cross = main === 'x' ? 'y' : 'x';
      const { reference: r, floating: f } = state.rects;
      if (options.mainAxis !== false) {
        const length = main === 'x' ? 'width' : 'height';
        coords[main] = clamp(r[main] - f[length], coords[main], r[main] + r[length]);
      }
      if (options.crossAxis !== false) {
        const length = cross === 'x' ? 'width' : 'height';
        const origin = /^(top|left)/.test(state.placement);
        const delta = state.middlewareData.offset?.[cross] || 0;
        coords[cross] = clamp(
          r[cross] - f[length] + (origin ? delta : 0),
          coords[cross],
          r[cross] + r[length] + (origin ? 0 : delta),
        );
      }
      return coords;
    },
  };
}

export function shift(options: ShiftOptions = {}): Middleware {
  return {
    name: 'shift',
    async fn(state) {
      const overflow = await detectOverflow(state, options);
      const coords = { x: state.x, y: state.y };
      const main = vertical(state.placement) ? 'x' : 'y';
      const cross = main === 'x' ? 'y' : 'x';
      const enabled = { [main]: options.mainAxis !== false, [cross]: !!options.crossAxis };
      for (const axis of ['x', 'y'] as const) {
        if (enabled[axis]) {
          coords[axis] = clamp(
            coords[axis] + overflow[axis === 'x' ? 'left' : 'top'],
            coords[axis],
            coords[axis] - overflow[axis === 'x' ? 'right' : 'bottom'],
          );
        }
      }
      const limited = options.limiter?.fn({ ...state, ...coords }) ?? coords;
      return { ...limited, data: { x: limited.x - state.x, y: limited.y - state.y, enabled } };
    },
  };
}

export function size(options: SizeOptions): Middleware {
  return {
    name: 'size',
    async fn(state) {
      const overflow = await detectOverflow(state, options);
      const side = sideOf(state.placement);
      const align = alignOf(state.placement);
      const rtl = await state.platform.isRTL?.(state.elements.floating);
      const { width, height } = state.rects.floating;
      const widthSide = vertical(state.placement) ? (align === (rtl ? 'start' : 'end') ? 'left' : 'right') : side;
      const heightSide = vertical(state.placement) ? side : align === 'end' ? 'top' : 'bottom';
      const maxWidth = width - overflow.left - overflow.right;
      const maxHeight = height - overflow.top - overflow.bottom;
      const availableWidth = state.middlewareData.shift?.enabled.x
        ? maxWidth
        : Math.min(width - overflow[widthSide], maxWidth);
      const availableHeight = state.middlewareData.shift?.enabled.y
        ? maxHeight
        : Math.min(height - overflow[heightSide], maxHeight);
      await options.apply?.({ ...state, availableWidth, availableHeight });
      const dimensions = await state.platform.getDimensions(state.elements.floating);
      return width !== dimensions.width || height !== dimensions.height ? { reset: { rects: true } } : {};
    },
  };
}
