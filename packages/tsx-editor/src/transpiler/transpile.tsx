import * as monaco from 'monaco-editor';
import { ITranspiledOutput, IEvalCode } from './transpile.types';
import { TypeScriptWorker, EmitOutput } from './monacoTypescriptWorker';
import { ITextModel } from '../components/Editor.types';

export function transpile(model: ITextModel): Promise<ITranspiledOutput> {
  const ret = new Promise<ITranspiledOutput>(resolve => {
    monaco.languages.typescript.getTypeScriptWorker().then(_worker => {
      _worker(model.uri).then((worker: TypeScriptWorker) => {
        worker.getEmitOutput(model.uri.toString()).then((output: EmitOutput) => {
          const transpiledOutput: ITranspiledOutput = { error: undefined, outputString: undefined };
          if (output.outputFiles[0]) {
            transpiledOutput.outputString = output.outputFiles[0].text;
          } else {
            transpiledOutput.error = 'Could not transpile code';
          }
          resolve(transpiledOutput);
        });
      });
    });
  });
  return ret;
}

export function _evalCode(code: string): IEvalCode {
  const output: IEvalCode = {
    eval: undefined,
    error: undefined
  };
  try {
    // tslint:disable:no-eval
    output.eval = eval(code);
  } catch (ex) {
    output.error = ex.message;
  }
  return output;
}
