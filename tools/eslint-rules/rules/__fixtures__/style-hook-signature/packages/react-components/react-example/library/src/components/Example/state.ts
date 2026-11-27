import type { ElementType } from 'react';

export type ExampleState = {
  components: { root: Extract<ElementType, 'div'> };
  root: { className?: string };
  checked: boolean;
};

export type OtherState = Omit<ExampleState, 'checked'> & { value: string };

export const preserveState = (state: ExampleState): ExampleState => state;
export const discardState = (state: ExampleState): void => {};

export { preserveState as useExampleStyles };
