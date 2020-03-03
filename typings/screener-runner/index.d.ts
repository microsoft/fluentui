//
// Typings for `screener-runner` plus some custom things
//

declare module 'screener-runner' {
  // TODO: move these out of global and import where appropriate
  global {
    export type ScreenerRunnerKeys = {
      alt: string
      control: string
      enter: string
      escape: string
      return: string
      shift: string
      tab: string
      leftArrow: string
      upArrow: string
      rightArrow: string
      downArrow: string
    }

    export interface ScreenerStepBuilder {
      /** This executes custom JS code against the client browser the test is running in. */
      executeScript(code: string): ScreenerStepBuilder

      /** This will click on the first element matching the provided css selector. */
      click(selector: string): ScreenerStepBuilder

      /** This will capture a visual snapshot. */
      snapshot(name: string, options?: any): ScreenerStepBuilder

      /** this will move the mouse over the first element matching the provided css selector. */
      hover(selector: string): ScreenerStepBuilder

      /** This will press and hold the mouse button over the first element matching the provided css selector. */
      mouseDown(selector: string): ScreenerStepBuilder

      /** This will release the mouse button. selector is optional. */
      mouseUp(selector: string): ScreenerStepBuilder

      /** This will set cursor focus on the first element matching the provided css selector. */
      focus(selector: string): ScreenerStepBuilder

      /** This will set the value of the input field matching the provided css selector. */
      setValue(selector: string, value: string, options?: any): ScreenerStepBuilder

      /** This will send the provided keys to the first element matching the provided css selector. */
      keys(selector: string, key: string): ScreenerStepBuilder

      /** This will pause execution for the specified number of ms. */
      wait(ms: number): ScreenerStepBuilder

      /** This will override the global cssAnimations option for the current UI state. Set to true to enable CSS Animations, and set to false to disable. */
      cssAnimations(isEnabled: boolean): ScreenerStepBuilder

      /** This will set the current UI state to right-to-left direction. */
      rtl(): ScreenerStepBuilder

      /** This will set the current UI state to left-to-right direction. */
      ltr(): ScreenerStepBuilder

      /** This will return the steps to be run. */
      end(): any[]

      /** This will reset the layout. */
      resetExternalLayout(): ScreenerStepBuilder

      url(url: string): ScreenerStepBuilder

      /** This will switch the theme. Not actually part of screener-runner. */
      switchTheme(themeName: ScreenerThemeName): ScreenerStepBuilder
    }

    // These ones are not actually part of screener-runner

    /** Keys of `themes` object exported from `@fluentui/react/src/index`. */
    export type ScreenerThemeName = 'teams' | 'teamsDark' | 'teamsHighContrast'

    export type ScreenerStep = (
      steps: ScreenerStepBuilder,
      keys: ScreenerRunnerKeys,
    ) => ScreenerStepBuilder
    export type ScreenerSteps = ScreenerStep[]

    export type ScreenerTestsConfig = {
      steps?: ScreenerStep[]
      themes?: ScreenerThemeName[]
    }
  }
}

declare module 'screener-runner/src/steps' {
  const Steps: {
    new (): ScreenerStepBuilder
  }

  export default Steps
}

declare module 'screener-runner/src/keys' {
  const keys: ScreenerRunnerKeys
  export default keys
}
