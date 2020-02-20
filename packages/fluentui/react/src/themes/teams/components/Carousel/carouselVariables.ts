export interface CarouselVariables {
  width: number;
  height: number;
  paddlePreviousSize: number;
  paddleNextSize: number;
  focusOuterBorderColor: string;
  focusOuterBorderRadius: string;
}

export default (siteVars): CarouselVariables => ({
  width: 300,
  height: 300,
  paddlePreviousSize: 32,
  paddleNextSize: 32,
  focusOuterBorderColor: siteVars.focusOuterBorderColor,
  focusOuterBorderRadius: siteVars.borderRadius,
});
