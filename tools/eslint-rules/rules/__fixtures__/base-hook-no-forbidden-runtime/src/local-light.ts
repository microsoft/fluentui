import { runLight } from 'light-helper';

export type LocalLightOptions = { mode: 'light' };

export function useLocalLight(opts?: LocalLightOptions): void {
  runLight(opts);
}
