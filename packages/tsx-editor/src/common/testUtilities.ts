/**
 * Monaco-related mock setup. Should be called in `beforeAll`.
 */
export function setUpMonacoMocks() {
  // Mock a method which tries to create a canvas element (not supported in jsdom)
  jest.spyOn(require('monaco-editor/esm/vs/base/browser/browser'), 'getPixelRatio').mockImplementation(() => 1);
}
