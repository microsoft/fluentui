export interface GridVariables {
  height?: string;
  width?: string;
  defaultColumnCount: number;
  gridGap?: string;
  padding?: string;
}

export const gridVariables = (): GridVariables => ({
  defaultColumnCount: 5,
  gridGap: undefined,
  padding: undefined,
});
