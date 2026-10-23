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
  const keys = Object.keys(previousRecord);
  return (
    keys.length === Object.keys(currentRecord).length &&
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

export function isFocusLeavingChart(event: React.FocusEvent<HTMLElement>): boolean {
  return !event.relatedTarget || !event.currentTarget.contains(event.relatedTarget as Node);
}
