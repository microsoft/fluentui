import { runLight } from 'light-helper';

export type LightOptions = { mode: 'light' };

export function useLight(opts?: LightOptions): void {
  runLight(opts);
}
