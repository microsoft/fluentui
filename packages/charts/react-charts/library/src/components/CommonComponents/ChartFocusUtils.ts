import type * as React from 'react';

export function areChartDataEqual(previous: unknown, current: unknown): boolean {
  if (Object.is(previous, current)) {
    return true;
  }
  if (previous instanceof Date && current instanceof Date) {
    return previous.getTime() === current.getTime();
  }
  if (Array.isArray(previous) && Array.isArray(current)) {
    return (
      previous.length === current.length && previous.every((value, index) => areChartDataEqual(value, current[index]))
    );
  }
  if (
    !previous ||
    !current ||
    typeof previous !== 'object' ||
    typeof current !== 'object' ||
    Object.getPrototypeOf(previous) !== Object.prototype ||
    Object.getPrototypeOf(current) !== Object.prototype
  ) {
    return false;
  }

  const previousRecord = previous as Record<string, unknown>;
  const currentRecord = current as Record<string, unknown>;
  const isDataKey = (key: string): boolean => {
    const previousValue = previousRecord[key];
    const currentValue = currentRecord[key];
    return !(
      (typeof previousValue === 'function' && (typeof currentValue === 'function' || currentValue === undefined)) ||
      (typeof currentValue === 'function' && previousValue === undefined)
    );
  };
  const keys = Object.keys(previousRecord).filter(isDataKey);
  const currentKeys = Object.keys(currentRecord).filter(isDataKey);
  return (
    keys.length === currentKeys.length &&
    keys.every(
      key =>
        Object.prototype.hasOwnProperty.call(currentRecord, key) &&
        areChartDataEqual(previousRecord[key], currentRecord[key]),
    )
  );
}

export function getChartEventTarget<T extends Element>(event: React.SyntheticEvent<T>): T {
  return event.currentTarget;
}

export function isChartElementTabbable(element: SVGElement | null | undefined): element is SVGElement {
  return !!element && element.tabIndex >= 0;
}

export function isFocusLeavingChart(event: React.FocusEvent<HTMLElement>): boolean {
  return !event.relatedTarget || !event.currentTarget.contains(event.relatedTarget as Node);
}
