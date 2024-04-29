export interface VideoVariables {
  width: string;
  height: string;
}

export const videoVariables = (): VideoVariables => ({
  width: undefined,
  height: undefined,
});
