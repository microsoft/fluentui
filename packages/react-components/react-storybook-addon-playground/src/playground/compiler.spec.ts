import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';

import { compile } from './compiler';

describe('compile worker lifecycle', () => {
  function setup() {
    const getDiagnosticsOptions = jest.fn().mockReturnValue({ noSemanticValidation: true });
    const worker = {
      getSyntacticDiagnostics: jest.fn().mockResolvedValue([]),
      getEmitOutput: jest.fn().mockResolvedValue({ outputFiles: [{ name: 'example.js', text: 'compiled' }] }),
    };
    const getTypeScriptWorker = jest.fn().mockResolvedValue(jest.fn().mockResolvedValue(worker));
    const monaco = {
      languages: {
        typescript: { getTypeScriptWorker, typescriptDefaults: { getDiagnosticsOptions } },
      },
    };
    const model = { uri: { toString: () => 'file:///playground/example.tsx' } } as monacoApi.editor.ITextModel;
    return { monaco, model, worker, getDiagnosticsOptions, getTypeScriptWorker };
  }

  it('retries an interrupted compile when typings enable semantic diagnostics', async () => {
    const { monaco, model, worker, getDiagnosticsOptions, getTypeScriptWorker } = setup();
    worker.getEmitOutput.mockImplementationOnce(() => {
      getDiagnosticsOptions.mockReturnValue({ noSemanticValidation: false });
      return Promise.reject(new Error('Worker was disposed'));
    });

    await expect(compile(monaco, model)).resolves.toEqual({ code: 'compiled', diagnostics: [] });
    expect(getTypeScriptWorker).toHaveBeenCalledTimes(2);
  });

  it('surfaces unrelated worker failures without retrying', async () => {
    const { monaco, model, worker, getTypeScriptWorker } = setup();
    worker.getEmitOutput.mockRejectedValue(new Error('Worker failed'));

    await expect(compile(monaco, model)).rejects.toThrow('Worker failed');
    expect(getTypeScriptWorker).toHaveBeenCalledTimes(1);
  });

  it('surfaces a failed retry instead of repeatedly restarting compilation', async () => {
    const { monaco, model, worker, getDiagnosticsOptions, getTypeScriptWorker } = setup();
    worker.getEmitOutput.mockImplementation(() => {
      getDiagnosticsOptions.mockReturnValue({ noSemanticValidation: false });
      return Promise.reject(new Error('Still failed'));
    });

    await expect(compile(monaco, model)).rejects.toThrow('Still failed');
    expect(getTypeScriptWorker).toHaveBeenCalledTimes(2);
  });
});
