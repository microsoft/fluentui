// This file has a deliberate TypeScript semantic error:
// assigning a number literal to a string variable.
const _bad: string = 42 as unknown as number;

export type ButtonState = {
  root: { 'data-disabled': boolean };
};
