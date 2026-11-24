export type ExampleState = {
  components: { root: 'div' };
  root: { className?: string };
  checked: boolean;
};

export type OtherState = Omit<ExampleState, 'checked'> & { value: string };

export const preserveState = (state: ExampleState): ExampleState => state;
export const discardState = (state: ExampleState): void => {};
