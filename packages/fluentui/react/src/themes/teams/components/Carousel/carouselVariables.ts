export interface CarouselVariables {
  width: number
  height: number
  paddlePreviousSize: number
  paddleNextSize: number
}

export default (siteVars): CarouselVariables => ({
  width: 300,
  height: 300,
  paddlePreviousSize: 32,
  paddleNextSize: 32,
})
