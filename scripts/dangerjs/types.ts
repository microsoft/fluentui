import { DangerDSLType } from 'danger';

export type DangerJS = {
  danger: DangerDSLType;
  markdown: (markdown: string) => void;
  warn: (message: string) => void;
  fail: (message: string) => void;
};
