import type { ReactSelectorTreeComponentRenderer } from './ReactSelectorTree';

export type TestProps = {
  componentRenderer: ReactSelectorTreeComponentRenderer;
  minBreadth?: number;
  maxBreadth?: number;
  minDepth?: number;
  maxDepth?: number;
  seed?: number;
};
