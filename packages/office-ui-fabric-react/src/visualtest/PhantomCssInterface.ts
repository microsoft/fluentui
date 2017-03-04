// This whole file is a terrible hack.
// I'm not sure the cause of these errors but they are as follows:
// PhantomCSS causes the compiler to throw an error because it cannot find resemble.
// PhantomJS causes an error because it contains a duplicate definition of require which conflicts
// with nodejs's definition.
// Casper does not include the mouse module.
// I think that all of these can be changed in the DefinitelyTyped repo but I'm not sure how long
// that would take. Additionally some of these problems could be caused by our build systems.
// Finally all of these definitions have been taken from DefinitelyTyped, I did not write them myself.
// The links are:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/phantomcss/index.d.ts
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/phantomjs/index.d.ts
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/casperjs/index.d.ts
// This file should be trimmed down or replaced once the DefinitelyTyped files have been fixed.
import { OutputSettings } from 'resemblejs';

export interface CasperMouse {
  down(selector: string): void;
  move(selector: string): void;
}

export type Casper = {
  mouse: CasperMouse;
  test: Tester;
  options: CasperOptions;

  // Properties
  __utils__: ClientUtils;

  // Methods
  back(): Casper;
  base64encode(url: string, method?: string, data?: any): string;
  bypass(nb: number): any;
  click(selector: string): boolean;
  clickLabel(label: string, tag?: string): boolean;
  capture(targetFilePath: string, clipRect: ClipRect): Casper;
  captureBase64(format: string): string;
  captureBase64(format: string, area: string): string;
  captureBase64(format: string, area: ClipRect): string;
  captureBase64(format: string, area: any): string;
  captureSelector(targetFile: string, selector: string): Casper;
  clear(): Casper;
  debugHTML(selector?: string, outer?: boolean): Casper;
  debugPage(): Casper;
  die(message: string, status?: number): Casper;
  download(url: string, target?: string, method?: string, data?: any): Casper;
  each<T>(array: T[], fn: (this: Casper, item: T, index: number) => void): Casper;
  echo(message: string, style?: string): Casper;
  evaluate<T>(fn: () => T, ...args: any[]): T
  evaluateOrDie(fn: () => any, message?: string, status?: number): Casper;
  exit(status?: number): Casper;
  exists(selector: string): boolean;
  fetchText(selector: string): string;
  forward(): Casper;
  log(message: string, level?: string, space?: string): Casper;
  fill(selector: string, values: any, submit?: boolean): void;
  fillSelectors(selector: string, values: any, submit?: boolean): void;
  fillXPath(selector: string, values: any, submit?: boolean): void;
  getCurrentUrl(): string;
  getElementAttribute(selector: string, attribute: string): string;
  getElementsAttribute(selector: string, attribute: string): string;
  getElementBounds(selector: string): ElementBounds;
  getElementsBounds(selector: string): ElementBounds[];
  getElementInfo(selector: string): ElementInfo;
  getElementsInfo(selector: string): ElementInfo;
  getFormValues(selector: string): any;
  getGlobal(name: string): any;
  getHTML(selector?: string, outer?: boolean): string;
  getPageContent(): string;
  getTitle(): string;
  mouseEvent(type: string, selector: string): boolean;
  open(location: string, settings: OpenSettings): Casper;
  reload(then?: (response: HttpResponse) => void): Casper;
  repeat(times: number, then: Function): Casper;
  resourceExists(test: Function): boolean;
  resourceExists(test: string): boolean;
  run(onComplete: Function, time?: number): Casper;
  scrollTo(x: number, y: number): Casper;
  scrollToBottom(): Casper;
  sendKeys(selector: string, keys: string, options?: any): Casper;
  setHttpAuth(username: string, password: string): Casper;
  start(url?: string, then?: (response: HttpResponse) => void): Casper;
  status(asString: boolean): any;
  then(fn: (this: Casper) => void): Casper;
  thenBypass(nb: number): Casper;
  thenBypassIf(condition: any, nb: number): Casper;
  thenBypassUnless(condition: any, nb: number): Casper;
  thenClick(selector: string): Casper;
  thenEvaluate(fn: () => any, ...args: any[]): Casper;
  thenOpen(location: string, then?: (response: HttpResponse) => void): Casper;
  thenOpen(location: string, options?: OpenSettings, then?: (response: HttpResponse) => void): Casper;
  thenOpenAndEvaluate(location: string, then?: Function, ...args: any[]): Casper;
  toString(): string;
  unwait(): Casper;
  userAgent(agent: string): string;
  viewport(width: number, height: number): Casper;
  visible(selector: string): boolean;
  wait(timeout: number, then?: Function): Casper;
  waitFor(testFx: Function, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForAlert(then: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForPopup(urlPattern: string, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForPopup(urlPattern: RegExp, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForUrl(url: string, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForUrl(url: RegExp, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForSelector(selector: string, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitWhileSelector(selector: string, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForResource(testFx: Function, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForText(pattern: string, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitForText(pattern: RegExp, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitUntilVisible(selector: string, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  waitWhileVisible(selector: string, then?: Function, onTimeout?: Function, timeout?: number): Casper;
  warn(message: string): Casper;
  withFrame(frameInfo: string, then: Function): Casper;
  withFrame(frameInfo: number, then: Function): Casper;
  withPopup(popupInfo: string, step: Function): Casper;
  withPopup(popupInfo: RegExp, step: Function): Casper;
  zoom(factor: number): Casper;
  removeAllFilters(filter: string): Casper;
  setFilter(filter: string, cb: Function): boolean;
}

export interface HttpResponse {
  contentType: string;
  headers: any[];
  id: number;
  redirectURL: string;
  stage: string;
  status: number;
  statusText: string;
  time: string;
  url: string;
}

export interface OpenSettings {
  method: string;
  data: any;
  headers: any;
}

export interface ElementBounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ElementInfo {
  nodeName: string;
  attributes: any;
  tag: string;
  html: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

export interface CasperOptions {
  clientScripts?: any[];
  exitOnError?: boolean;
  httpStatusHandlers?: any;
  logLevel?: string;
  onAlert?: Function;
  onDie?: Function;
  onError?: Function;
  onLoadError?: Function;
  onPageInitialized?: Function;
  onResourceReceived?: Function;
  onResourceRequested?: Function;
  onStepComplete?: Function;
  onStepTimeout?: Function;
  onTimeout?: Function;
  onWaitTimeout?: Function;
  page?: WebPage;
  pageSettings?: any;
  remoteScripts?: any[];
  safeLogs?: boolean;
  silentErrors?: boolean;
  stepTimeout?: number;
  timeout?: number;
  verbose?: boolean;
  viewportSize?: any;
  retryTimeout?: number;
  waitTimeout?: number;
}

export interface ClientUtils {
  echo(message: string): void;
  encode(contents: string): void;
  exists(selector: string): void;
  findAll(selector: string): void;
  findOne(selector: string): void;
  getBase64(url: string, method?: string, data?: any): void;
  getBinary(url: string, method?: string, data?: any): void;
  getDocumentHeight(): void;
  getElementBounds(selector: string): void;
  getElementsBounds(selector: string): void;
  getElementByXPath(expression: string, scope?: HTMLElement): void;
  getElementsByXPath(expression: string, scope?: HTMLElement): void;
  getFieldValue(inputName: string): void;
  getFormValues(selector: string): void;
  mouseEvent(type: string, selector: string): void;
  removeElementsByXPath(expression: string): void;
  sendAJAX(url: string, method?: string, data?: any, async?: boolean): void;
  visible(selector: string): void;
}

export interface Colorizer {
  colorize(text: string, styleName: string): void;
  format(text: string, style: any): void;
}

export interface Tester {
  assert(condition: boolean, message?: string): any;
  assertDoesntExist(selector: string, message?: string): any;
  assertElementCount(selctor: string, expected: number, message?: string): any;
  assertEquals(testValue: any, expected: any, message?: string): any;
  assertEval(fn: Function, message: string, args: any): any;
  assertEvalEquals(fn: Function, expected: any, message?: string, args?: any): any;
  assertExists(selector: string, message?: string): any;
  assertFalsy(subject: any, message?: string): any;
  assertField(inputName: string, expected: string, message?: string): any;
  assertFieldName(inputName: string, expected: string, message?: string, options?: any): any;
  assertFieldCSS(cssSelector: string, expected: string, message?: string): any;
  assertFieldXPath(xpathSelector: string, expected: string, message?: string): any;
  assertHttpStatus(status: number, message?: string): any;
  assertMatch(subject: any, pattern: RegExp, message?: string): any;
  assertNot(subject: any, message?: string): any;
  assertNotEquals(testValue: any, expected: any, message?: string): any;
  assertNotVisible(selector: string, message?: string): any;
  assertRaises(fn: Function, args: any[], message?: string): any;
  assertSelectorDoesntHaveText(selector: string, text: string, message?: string): any;
  assertSelectorExists(selector: string, message?: string): any;
  assertSelectorHasText(selector: string, text: string, message?: string): any;
  assertResourceExists(testFx: Function, message?: string): any;
  assertTextExists(expected: string, message?: string): any;
  assertTextDoesntExist(unexpected: string, message: string): any;
  assertTitle(expected: string, message?: string): any;
  assertTitleMatch(pattern: RegExp, message?: string): any;
  assertTruthy(subject: any, message?: string): any;
  assertType(input: any, type: string, message?: string): any;
  assertInstanceOf(input: any, ctor: Function, message?: string): any;
  assertUrlMatch(pattern: string, message?: string): any;
  assertUrlMatch(pattern: RegExp, message?: string): any;
  assertVisible(selector: string, message?: string): any;

  /* since 1.1 */
  begin(description: string, planned: number, suite: Function): any;
  begin(description: string, suite: Function): any;
  begin(description: string, planned: number, config: Object): any;
  begin(description: string, config: Object): any;

  colorize(message: string, style: string): any;
  comment(message: string): any;
  done(expected?: number): any;
  error(message: string): any;
  fail(message: string): any;
  formatMessage(message: string, style: string): any;
  getFailures(): Cases;
  getPasses(): Cases;
  info(message: string): any;
  pass(message: string): any;
  renderResults(exit: boolean, status: number, save: string): any;

  setup(fn: Function): any;
  skip(nb: number, message: string): any;
  tearDown(fn: Function): any;
}

export interface Cases {
  length: number;
  cases: Case[];
}

export interface Case {
  success: boolean;
  type: string;
  standard: string;
  file: string;
  values: CaseValues;
}

export interface CaseValues {
  subject: boolean;
  expected: boolean;
}

export interface Utils {
  betterTypeOf(input: any): any;
  dump(value: any): any;
  fileExt(file: string): any;
  fillBlanks(text: string, pad: number): any;
  format(f: string, ...args: any[]): any;
  getPropertyPath(obj: any, path: string): any;
  inherits(ctor: any, superCtor: any): any;
  isArray(value: any): any;
  isCasperObject(value: any): any;
  isClipRect(value: any): any;
  isFalsy(subject: any): any;
  isFunction(value: any): any;
  isJsFile(file: string): any;
  isNull(value: any): any;
  isNumber(value: any): any;
  isObject(value: any): any;
  isRegExp(value: any): any;
  isString(value: any): any;
  isTruthy(subject: any): any;
  isType(what: any, type: string): any;
  isUndefined(value: any): any;
  isWebPage(what: any): any;
  mergeObjects(origin: any, add: any): any;
  node(name: string, attributes: any): any;
  serialize(value: any): any;
  unique(array: any[]): any;
}

export interface PhantomCSS {
  init(options: PhantomCSSOptions): void;
  update(options: PhantomCSSOptions): void;

  /**
   * Take a screenshot of the targeted HTML element
   * FileName is required if addIteratorToImage option is set to false
   */
  screenshot(target: string, fileName?: string): void;

  /**
   * Take a screenshot of the targeted HTML element
   * FileName is required if addIteratorToImage option is set to false
   */
  screenshot(target: ClipRect, fileName?: string): void;
  /**
   * Take a screenshot of the targeted HTML element
   * FileName is required if addIteratorToImage option is set to false
   */
  screenshot(target: string, timeToWait: number, hideSelector: string, fileName?: string): void;

  compareAll(exclude: string): void;
  compareAll(exclude: string, diffList: string[], include: string): void;
  compareMatched(match: string, exclude: string): void;
  compareMatched(match: RegExp, exclude: RegExp): void;
  /**
   * Explicitly define what files you want to compare
   */
  compareExplicit(list: string[]): void;
  /**
   * Compare image diffs generated in this test run only
   */
  compareSession(list?: any[]): void;
  compareFiles(baseFile: string, diffFiles: string): PhantomCSSTest;
  waitForTests(tests: PhantomCSSTest[]): void;
  done(): void;
  /**
   * Turn off CSS transitions and jQuery animations
   */
  turnOffAnimations(): void;
  getExitStatus(): number;
  /**
   * Get a list of image diffs generated in this test run
   */
  getCreatedDiffFiles(): Array<string>;
  outputSettings?: OutputSettings;
}

export interface PhantomCSSTest {
  filename?: string;
  error?: boolean;
  fail?: boolean;
  success?: boolean;
  failFile?: string;
  mismatch?: any;
}

export interface PhantomCSSOptions {
  /**
      Rebase is useful when you want to create new baseline
      images without manually deleting the files
      casperjs demo/test.js --rebase
  */
  rebase?: any;
  /**
    A reference to a particular Casper instance. Required for SlimerJS.
   */
  casper?: Casper;
  /**
  libraryRoot is relative to this file and must point to your phantomcss folder (not lib or node_modules). If you are using NPM, this will be './node_modules/phantomcss'.
  */
  libraryRoot?: string;

  screenshotRoot?: string;
  /**
  By default, failure images are put in the './failures' folder.
  If failedComparisonsRoot is set to false a separate folder will
  not be created but failure images can still be found alongside
  the original and new images.
  */
  failedComparisonsRoot?: string;

  /**
  You might want to keep master/baseline images in a completely
  different folder to the diffs/failures.  Useful when working
  with version control systems. By default this resolves to the
  screenshotRoot folder.
  */
  comparisonResultRoot?: string;

  /**
  Don't add count number to images. If set to false (default), a filename is
  required when capturing screenshots.
  */
  addIteratorToImage: boolean;

  /**
  Remove results directory tree after run.  Use in conjunction
  with failedComparisonsRoot to see failed comparisons.
  */
  cleanupComparisonImages?: boolean;

  /**
   * Don't add label to generated failure image
   */
  addLabelToFailedImage?: boolean;
  /**
  * Change the output screenshot filenames for your specific
  * integration
  */
  fileNameGetter?: (rootPath: string, fileName?: string) => string;

  /**
  Mismatch tolerance defaults to  0.05%. Increasing this value
  will decrease test coverage
  */
  mismatchTolerance?: number;

  onPass?: (test: PhantomCSSTest) => void;
  onFail?: (test: PhantomCSSTest) => void;
  onTimeout?: (test: PhantomCSSTest) => void;
  onComplete?: (tests: PhantomCSSTest[], noOfFails: number, noOfErrors: number) => void;
  /**
  Called when creating new baseline images
  */
  onNewImage?: (test: PhantomCSSTest) => void;

  /**
 Prefix the screenshot number to the filename, instead of suffixing it
 */
  prefixCount?: boolean;

  hideElements?: string;
}

// Type definitions for PhantomJS API 1.9
// Project: https://github.com/ariya/phantomjs/wiki/API-Reference
// Definitions by: Jed Hunsaker <https://github.com/jedhunsaker>, Mike Keesey <https://github.com/keesey>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// declare function require(module: string): any;

export interface Phantom {

  // Properties
  args: string[];  // DEPRECATED
  cookies: Cookie[];
  cookiesEnabled: boolean;
  libraryPath: string;
  scriptName: string;  // DEPRECATED
  version: {
    major: number;
    minor: number;
    patch: number;
  };

  // Functions
  addCookie(cookie: Cookie): boolean;
  clearCookies(): void;
  deleteCookie(cookieName: string): boolean;
  exit(returnValue?: any): boolean;
  injectJs(filename: string): boolean;

  // Callbacks
  onError: (msg: string, trace: string[]) => any;
}

export interface System {
  pid: number;
  platform: string;
  os: {
    architecture: string;
    name: string;
    version: string;
  };
  env: { [name: string]: string; };
  args: string[];
}

export interface WebPage {

  // Properties
  canGoBack: boolean;
  canGoForward: boolean;
  clipRect: ClipRect;
  content: string;
  cookies: Cookie[];
  customHeaders: { [name: string]: string; };
  event: any; // :TODO: elaborate this when documentation improves
  focusedFrameName: string;
  frameContent: string;
  frameName: string;
  framePlainText: string;
  frameTitle: string;
  frameUrl: string;
  framesCount: number;
  framesName: any; // :TODO: elaborate this when documentation improves
  libraryPath: string;
  navigationLocked: boolean;
  offlineStoragePath: string;
  offlineStorageQuota: number;
  ownsPages: boolean;
  pages: WebPage[];
  pagesWindowName: string;
  paperSize: PaperSize;
  plainText: string;
  scrollPosition: TopLeft;
  settings: WebPageSettings;
  title: string;
  url: string;
  viewportSize: Size;
  windowName: string;
  zoomFactor: number;

  // Functions
  addCookie(cookie: Cookie): boolean;
  childFramesCount(): number;  // DEPRECATED
  childFramesName(): string;  // DEPRECATED
  clearCookies(): void;
  close(): void;
  currentFrameName(): string;  // DEPRECATED
  deleteCookie(cookieName: string): boolean;
  evaluate(fn: Function, ...args: any[]): any;
  evaluateAsync(fn: Function): void;
  evaluateJavaScript(str: string): any; // :TODO: elaborate this when documentation improves
  getPage(windowName: string): WebPage;
  go(index: number): void;
  goBack(): void;
  goForward(): void;
  includeJs(url: string, callback: Function): void;
  injectJs(filename: string): boolean;
  open(url: string, callback: (status: string) => any): void;
  open(url: string, method: string, callback: (status: string) => any): void;
  open(url: string, method: string, data: any, callback: (status: string) => any): void;
  openUrl(url: string, httpConf: any, settings: any): void; // :TODO: elaborate this when documentation improves
  release(): void;  // DEPRECATED
  reload(): void;
  render(filename: string): void;
  renderBase64(format: string): string;
  sendEvent(mouseEventType: string, mouseX?: number, mouseY?: number, button?: string): void;
  sendEvent(keyboardEventType: string, keyOrKeys: any, aNull?: any, bNull?: any, modifier?: number): void;
  setContent(content: string, url: string): void;
  stop(): void;
  switchToFocusedFrame(): void;
  switchToFrame(frameName: string): void;
  switchToFrame(framePosition: number): void;
  switchToChildFrame(frameName: string): void;
  switchToChildFrame(framePosition: number): void;
  switchToMainFrame(): void;  // DEPRECATED
  switchToParentFrame(): void;  // DEPRECATED
  uploadFile(selector: string, filename: string): void;

  // Callbacks
  onAlert: (msg: string) => any;
  onCallback: Function;  // EXPERIMENTAL
  onClosing: (closingPage: WebPage) => any;
  onConfirm: (msg: string) => boolean;
  onConsoleMessage: (msg: string, lineNum?: number, sourceId?: string) => any;
  onError: (msg: string, trace: string[]) => any;
  onFilePicker: (oldFile: string) => string;
  onInitialized: () => any;
  onLoadFinished: (status: string) => any;
  onLoadStarted: () => any;
  onNavigationRequested: (url: string, type: string, willNavigate: boolean, main: boolean) => any;
  onPageCreated: (newPage: WebPage) => any;
  onPrompt: (msg: string, defaultVal: string) => string;
  onResourceError: (resourceError: ResourceError) => any;
  onResourceReceived: (response: ResourceResponse) => any;
  onResourceRequested: (requestData: ResourceRequest, networkRequest: NetworkRequest) => any;
  onUrlChanged: (targetUrl: string) => any;

  // Callback triggers
  closing(closingPage: WebPage): void;
  initialized(): void;
  javaScriptAlertSent(msg: string): void;
  javaScriptConsoleMessageSent(msg: string, lineNum?: number, sourceId?: string): void;
  loadFinished(status: string): void;
  loadStarted(): void;
  navigationRequested(url: string, type: string, willNavigate: boolean, main: boolean): void;
  rawPageCreated(newPage: WebPage): void;
  resourceReceived(response: ResourceResponse): void;
  resourceRequested(requestData: ResourceRequest, networkRequest: NetworkRequest): void;
  urlChanged(targetUrl: string): void;
}

export interface ResourceError {
  id: number;
  url: string;
  errorCode: string;
  errorString: string;
}

export interface ResourceResponse {
  id: number;
  url: string;
  time: Date;
  headers: { [name: string]: string; };
  bodySize: number;
  contentType?: string;
  redirectURL?: string;
  stage: string;
  status: number;
  statusText: string;
}

export interface ResourceRequest {
  id: number;
  method: string;
  url: string;
  time: Date;
  headers: { [name: string]: string; };
}

export interface NetworkRequest {
  abort(): void;
  changeUrl(url: string): void;
  setHeader(name: string, value: string): void;
}

export interface PaperSize {
  width?: string;
  height?: string;
  border: string;
  format?: string;
  orientation?: string;
}

export interface WebPageSettings {
  javascriptEnabled: boolean;
  loadImages: boolean;
  localToRemoteUrlAccessEnabled: boolean;
  userAgent: string;
  userName: string;
  password: string;
  XSSAuditingEnabled: boolean;
  webSecurityEnabled: boolean;
  resourceTimeout: number;
}

export interface FileSystem {

  // Properties
  separator: string;
  workingDirectory: string;

  // Functions

  // Query Functions
  list(path: string): string[];
  absolute(path: string): string;
  exists(path: string): boolean;
  isDirectory(path: string): boolean;
  isFile(path: string): boolean;
  isAbsolute(path: string): boolean;
  isExecutable(path: string): boolean;
  isReadable(path: string): boolean;
  isWritable(path: string): boolean;
  isLink(path: string): boolean;
  readLink(path: string): string;

  // Directory Functions
  changeWorkingDirectory(path: string): void;
  makeDirectory(path: string): void;
  makeTree(path: string): void;
  removeDirectory(path: string): void;
  removeTree(path: string): void;
  copyTree(source: string, destination: string): void;

  // File Functions
  open(path: string, mode: string): Stream;
  open(path: string, options: { mode: string; charset?: string; }): Stream;
  read(path: string): string;
  write(path: string, content: string, mode: string): void;
  size(path: string): number;
  remove(path: string): void;
  copy(source: string, destination: string): void;
  move(source: string, destination: string): void;
  touch(path: string): void;
}

export interface Stream {
  atEnd(): boolean;
  close(): void;
  flush(): void;
  read(): string;
  readLine(): string;
  seek(position: number): void;
  write(data: string): void;
  writeLine(data: string): void;
}

export interface WebServer {
  port: number;
  listen(port: number, cb?: (request: WebServerRequest, response: WebServerResponse) => void): boolean;
  listen(ipAddressPort: string, cb?: (request: WebServerRequest, response: WebServerResponse) => void): boolean;
  close(): void;
}

export interface WebServerRequest {
  method: string;
  url: string;
  httpVersion: number;
  headers: { [name: string]: string; };
  post: string;
  postRaw: string;
}

export interface WebServerResponse {
  headers: { [name: string]: string; };
  setHeader(name: string, value: string): void;
  header(name: string): string;
  statusCode: number;
  setEncoding(encoding: string): void;
  write(data: string): void;
  writeHead(statusCode: number, headers?: { [name: string]: string; }): void;
  close(): void;
  closeGracefully(): void;
}

export interface TopLeft {
  top: number;
  left: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ClipRect extends TopLeft, Size {
}

export interface Cookie {
  name: string;
  value: string;
  domain?: string;
}
