import { ValuesOf } from '@microsoft/fast-foundation';

export const PopoverPosition = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
} as const;

export type PopoverPosition = ValuesOf<typeof PopoverPosition>;
