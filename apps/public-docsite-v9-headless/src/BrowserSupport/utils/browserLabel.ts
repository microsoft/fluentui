import { BROWSER_LABELS } from '../constants';

export function browserLabel(id: string): string {
  return BROWSER_LABELS[id] ?? id;
}
