import * as React from 'react';

export function getChartEventTarget<T extends Element>(event: React.SyntheticEvent<T>): T {
  return event.currentTarget;
}

export function isFocusLeavingChart(event: React.FocusEvent<HTMLElement>): boolean {
  return !event.relatedTarget || !event.currentTarget.contains(event.relatedTarget as Node);
}
