import type { PositioningProps } from './types';

export const AVAILABLE_HEIGHT_PROPERTY = '--fui-max-height';
export const AVAILABLE_WIDTH_PROPERTY = '--fui-max-width';

export const positioningSizeStyles = {
  maxHeight: `var(${AVAILABLE_HEIGHT_PROPERTY}, revert-layer)`,
  maxWidth: `var(${AVAILABLE_WIDTH_PROPERTY}, revert-layer)`,
};

function getZoom(element: Element, win: Window): number {
  const current = element.currentCSSZoom;
  if (current !== undefined) {
    return current;
  }
  let zoom = 1;
  for (
    let parent: Element | null | undefined = element;
    parent;
    parent = parent.parentElement ?? (parent.getRootNode() as ShadowRoot).host
  ) {
    zoom *= parseFloat(win.getComputedStyle(parent).zoom) || 1;
  }
  return zoom;
}

function getAvailableSpace(
  area: string,
  axis: 'block' | 'inline',
  start: number,
  end: number,
  targetStart: number,
  targetEnd: number,
  reverse = false,
): number {
  if (!area.includes(axis)) {
    return end - start;
  }
  const fromStart = area.includes(`${axis}-start`) !== reverse;
  const span = area.includes(`span-${axis}`);
  return fromStart ? (span ? targetEnd : targetStart) - start : end - (span ? targetStart : targetEnd);
}

function getBoxSpacing(styles: CSSStyleDeclaration, sides: readonly string[]): [number, number] {
  let margins = 0;
  let insets = 0;
  for (const side of sides) {
    margins += parseFloat(styles.getPropertyValue(`margin-${side}`)) || 0;
    if (styles.boxSizing !== 'border-box') {
      insets +=
        (parseFloat(styles.getPropertyValue(`padding-${side}`)) || 0) +
        (parseFloat(styles.getPropertyValue(`border-${side}-width`)) || 0);
    }
  }
  return [margins, insets];
}

export function updateAvailableSize(
  container: HTMLElement | null,
  target: HTMLElement | null,
  targetDocument: Document | undefined,
  autoSize: PositioningProps['autoSize'],
  areas: readonly string[],
): Element | null {
  const mode = typeof autoSize === 'string' ? autoSize.split('-')[0] : autoSize;
  const heightEnabled = mode && mode !== 'width';
  const widthEnabled = mode && mode !== 'height';
  const bothEnabled = heightEnabled && widthEnabled;
  const win = targetDocument?.defaultView;
  if (!container || !win) {
    return null;
  }

  // Invalid custom-property values block inheritance and let consumer CSS remain authoritative when disabled.
  let limits = ['initial', 'initial'];
  let containingBlock: Element | null = null;
  const zoom = getZoom(container, win);
  if (autoSize && target) {
    const viewport = win.visualViewport;
    let top = viewport?.offsetTop ?? 0;
    let bottom = top + (viewport?.height ?? targetDocument.documentElement.clientHeight);
    let left = viewport?.offsetLeft ?? 0;
    let right = left + (viewport?.width ?? targetDocument.documentElement.clientWidth);
    const targetRect = target.getBoundingClientRect();
    const styles = win.getComputedStyle(container);
    containingBlock = styles.position === 'absolute' ? container.offsetParent : null;
    if (containingBlock instanceof win.HTMLElement) {
      const rect = containingBlock.getBoundingClientRect();
      const parentZoom = getZoom(containingBlock, win);
      top = Math.max(top, rect.top + containingBlock.clientTop * parentZoom);
      bottom = Math.min(bottom, rect.top + (containingBlock.clientTop + containingBlock.clientHeight) * parentZoom);
      left = Math.max(left, rect.left + containingBlock.clientLeft * parentZoom);
      right = Math.min(right, rect.left + (containingBlock.clientLeft + containingBlock.clientWidth) * parentZoom);
    }
    const [margins, insets] = getBoxSpacing(styles, ['top', 'bottom']);
    const rtl = styles.direction === 'rtl';
    const [inlineMargins, inlineInsets] = getBoxSpacing(styles, ['left', 'right']);
    const surfaceRect = container.getBoundingClientRect();
    let candidates = areas.map(area => [
      Math.max(
        0,
        Math.min(bottom - top, getAvailableSpace(area, 'block', top, bottom, targetRect.top, targetRect.bottom)) /
          zoom -
          margins -
          insets,
      ),
      Math.max(
        0,
        Math.min(right - left, getAvailableSpace(area, 'inline', left, right, targetRect.left, targetRect.right, rtl)) /
          zoom -
          inlineMargins -
          inlineInsets,
      ),
    ]);
    const sizes = [surfaceRect.height / zoom - insets, surfaceRect.width / zoom - inlineInsets];
    if (bothEnabled) {
      const demandHeight = Math.max(
        sizes[0],
        container.scrollHeight + container.offsetHeight - container.clientHeight - insets,
      );
      const demandWidth = Math.max(
        sizes[1],
        container.scrollWidth + container.offsetWidth - container.clientWidth - inlineInsets,
      );
      const fitting = candidates.findIndex(([height, width]) => height >= demandHeight && width >= demandWidth);
      const scores = candidates.map(([height, width]) => Math.min(demandHeight, height) * Math.min(demandWidth, width));
      const best = fitting < 0 ? scores.indexOf(Math.max(...scores)) : fitting;
      candidates = [candidates[best]];
    }
    // A cap based only on the requested area would shrink the menu before native fallbacks can run.
    limits = [heightEnabled, widthEnabled].map((enabledAxis, axis) => {
      const fitting = candidates.filter(size => bothEnabled || sizes[1 - axis] <= size[1 - axis]);
      const maximum = Math.max(...(fitting.length ? fitting : candidates).map(size => size[axis]));
      return enabledAxis ? `${maximum}px` : 'initial';
    });
  }

  const style = container.style;
  const heightChanged = style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY) !== limits[0];
  [AVAILABLE_HEIGHT_PROPERTY, AVAILABLE_WIDTH_PROPERTY].forEach((property, axis) => {
    if (style.getPropertyValue(property) !== limits[axis]) {
      style.setProperty(property, limits[axis]);
    }
  });

  if (heightChanged && heightEnabled) {
    const root = container.getRootNode();
    const active = root instanceof win.ShadowRoot ? root.activeElement : targetDocument.activeElement;
    if (active instanceof win.HTMLElement && active !== container && active.closest('[popover]') === container) {
      const surfaceTop = container.getBoundingClientRect().top + container.clientTop * zoom;
      const surfaceBottom = surfaceTop + container.clientHeight * zoom;
      const focusedRect = active.getBoundingClientRect();
      const delta =
        focusedRect.bottom > surfaceBottom
          ? focusedRect.bottom - surfaceBottom
          : Math.min(0, focusedRect.top - surfaceTop);
      if (delta) {
        container.scrollBy({ top: delta / zoom, behavior: 'instant' });
      }
    }
  }
  return containingBlock;
}
