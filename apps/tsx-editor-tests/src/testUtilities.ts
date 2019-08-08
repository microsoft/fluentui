// const tsMode = require('monaco-editor/esm/vs/language/typescript/tsMode');

/**
 * Monaco-related test setup. Should be called in `beforeAll`.
 */
export function setUpMonaco() {
  jest.useFakeTimers();

  // Load this for the side effect of registering TypeScript
  require('monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution');

  // Use the real console.warn for warnings, rather than treating them as errors
  // (treating them as errors is configured in jest-setup.js)
  // console.warn = (global as any).consoleWarn; // tslint:disable-line:no-any

  // Set up required globals
  // tslint:disable-next-line:no-any
  (global as any).MonacoEnvironment = {
    getWorkerUrl: (workerId: string, label: string) => {
      return label === 'typescript' || label === 'javascript'
        ? 'monaco-editor/esm/vs/language/typescript/ts.worker'
        : 'monaco-editor/esm/vs/editor/editor.worker';
    }
  };
}
