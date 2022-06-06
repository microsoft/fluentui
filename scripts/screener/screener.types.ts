export type ScreenerRunnerConfig = {
  apiKey: string;
  projectRepo: string;

  diffOptions: {
    structure: boolean;
    layout: boolean;
    style: boolean;
    content: boolean;
    minLayoutPosition: number; // Optional threshold for Layout changes. Defaults to 4 pixels.
    minLayoutDimension: number; // Optional threshold for Layout changes. Defaults to 10 pixels.
    minShiftGraphic: number; // Optional threshold for pixel shifts in graphics.
    compareSVGDOM: number; // Pass if SVG DOM is the same. Defaults to false.
  };

  states: ScreenerState[];

  alwaysAcceptBaseBranch: boolean;
  baseBranch: string;
  commit: string;
  failureExitCode: number;

  /** Base url of deployed storybook screener should test */
  baseUrl: string;
};

export type ScreenerState = {
  url: string;
  name: string;
  steps?: ScreenerRunnerStep[];
};

export type ScreenerRunnerStep = {
  type: string;

  code?: string;
  isEnabled?: boolean;
  keys?: string;
  locator?: { type: string; value: string };
  name?: string;
  url?: string;
  text?: string;
  waitTime?: number;
};

export type ScreenerRunnerKeys = {
  alt: string;
  control: string;
  enter: string;
  escape: string;
  return: string;
  shift: string;
  tab: string;
  leftArrow: string;
  upArrow: string;
  rightArrow: string;
  downArrow: string;
  backSpace: string;
  space: string;
  pageUp: string;
  pageDown: string;
  end: string;
  home: string;
  insert: string;
  delete: string;
  command: string;
};

export interface ScreenerStepBuilder {
  executeScript(code: string): ScreenerStepBuilder;
  click(selector: string): ScreenerStepBuilder;
  snapshot(name: string, options?: any): ScreenerStepBuilder;
  hover(selector: string): ScreenerStepBuilder;
  mouseDown(selector: string): ScreenerStepBuilder;
  mouseUp(selector: string): ScreenerStepBuilder;
  focus(selector: string): ScreenerStepBuilder;
  setValue(selector: string, value: string, options?: any): ScreenerStepBuilder;
  keys(selector: string, key: string): ScreenerStepBuilder;
  wait(ms: number): ScreenerStepBuilder;
  waitForSelector(selector: string): ScreenerStepBuilder;
  cssAnimations(isEnabled: boolean): ScreenerStepBuilder;
  rtl(): ScreenerStepBuilder;
  ltr(): ScreenerStepBuilder;
  end(): any[];
  resetExternalLayout(): ScreenerStepBuilder;
  url(url: string): ScreenerStepBuilder;
  switchTheme(themeName: ScreenerThemeName): ScreenerStepBuilder;
}

/** Keys of `themes` object exported from `@fluentui/react-northstar/src/index`. */
export type ScreenerThemeName = 'teams' | 'teamsDark' | 'teamsHighContrast' | 'teamsV2' | 'teamsDarkV2';

export type ScreenerTheme = {
  name: ScreenerThemeName;
  /*
   * Decouples the test name from the theme name.
   * Useful to remap tests to different themes to avoid generating new screenshots
   */
  testResultName?: ScreenerThemeName;
};

export type ScreenerStep = (steps: ScreenerStepBuilder, keys: ScreenerRunnerKeys) => ScreenerStepBuilder;
export type ScreenerSteps = ScreenerStep[];

export type ScreenerTestsConfig = {
  steps?: ScreenerStep[];
  themes?: ScreenerTheme[];
};

export interface ScreenerProxyPayload {
  /** Commit hash */
  commit: string;
  /** Url to the screener test run */
  url: string;
  /** The status of the github check */
  status?: 'in_progress' | 'completed';
  /** How the github check was completed. Only 'skipped' will actually pass the check */
  conclusion?: 'failure' | 'skipped' | 'cancelled';
  /** Name of the screener project for the screener run */
  project?: string;
}
