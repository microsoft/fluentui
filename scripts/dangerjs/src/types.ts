import { DangerDSLType } from 'danger';
// intentional implicit dep (this is the actual type danger uses)
import { Chunk } from 'parse-diff';

export type DangerJS = {
  danger: DangerDSLType;
  markdown: (markdown: string) => void;
  warn: (message: string) => void;
  fail: (message: string) => void;
};

export type StructuredDiff = {
  chunks: Chunk[];
};
