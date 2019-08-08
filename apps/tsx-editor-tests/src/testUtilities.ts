// Lots of hacks here...
// tslint:disable:no-any

/**
 * Monaco-related test setup. Should be called in `beforeAll`.
 */
export function setUpMonaco() {
  jest.useFakeTimers();

  // Mock a method which tries to create a canvas element (not supported in jsdom)
  jest.spyOn(require('monaco-editor/esm/vs/base/browser/browser'), 'getPixelRatio').mockImplementation(() => 1);

  // Ignore certain warnings, rather than treating all warnings as errors
  // (treating them as errors is configured in jest-setup.js)
  console.warn = (...args: any[]) => {
    const msg: string = args[0] || '';
    if (msg !== 'Worker is not defined' && msg.indexOf('Could not create web worker') === -1) {
      console.error(...args);
    }
  };

  // Set up required globals
  (global as any).MonacoEnvironment = {
    getWorkerUrl: (workerId: string, label: string) => {
      return label === 'typescript' || label === 'javascript'
        ? 'monaco-editor/esm/vs/language/typescript/ts.worker'
        : 'monaco-editor/esm/vs/editor/editor.worker';
    }
  };

  // Mock part of a BaseSimpleWorker method which for some reason is only implemented in Monaco's
  // AMD build variant (and commented out in ESM), causing loading fake workers to fail.
  // This implementation is based on the AMD version.
  const { BaseEditorSimpleWorker } = require('monaco-editor/esm/vs/editor/common/services/editorSimpleWorker');
  const { getAllPropertyNames } = require('monaco-editor/esm/vs/base/common/types');
  BaseEditorSimpleWorker.prototype.loadForeignModule = function(moduleId: string, createData: any) {
    const ctx = {
      getMirrorModels: () => this._getModels()
    };

    if (this._foreignModuleFactory) {
      this._foreignModule = this._foreignModuleFactory(ctx, createData);
    } else {
      const foreignModule: { create: any } = require('monaco-editor/esm/' + moduleId);
      this._foreignModule = foreignModule.create(ctx, createData);
    }

    const methods: string[] = [];
    for (const prop of getAllPropertyNames(this._foreignModule)) {
      if (typeof this._foreignModule[prop] === 'function') {
        methods.push(prop);
      }
    }

    return Promise.resolve(methods);
  };
}
