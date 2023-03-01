import { ValuesOf } from '@microsoft/fast-foundation';

export const PopoverPosition = {
  above: 'above',
  below: 'below',
  before: 'before',
  after: 'after',
} as const;

export type PopoverPosition = ValuesOf<typeof PopoverPosition>;

export const PopoverAlignment = {
  top: 'top',
  bottom: 'bottom',
  start: 'start',
  end: 'end',
  center: 'center',
} as const;

export type PopoverAlignment = ValuesOf<typeof PopoverAlignment>;
