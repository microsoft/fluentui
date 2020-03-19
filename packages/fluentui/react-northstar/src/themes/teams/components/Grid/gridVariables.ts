export interface GridVariables {
  height?: string;
  width?: string;
  defaultColumnCount: number;
  gridGap?: string;
  padding?: string;
}

export default (): GridVariables => ({
  defaultColumnCount: 5,
  gridGap: undefined,
  padding: undefined,
});
