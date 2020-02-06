export interface VideoVariables {
  width: string
  height: string
}

export default (): VideoVariables => ({
  width: undefined,
  height: undefined,
})
