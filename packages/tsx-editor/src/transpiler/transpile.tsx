import * as monaco from 'monaco-editor';
import { TypeScriptWorker, EmitOutput } from './monacoTypescriptWorker.d';
import { ITextModel } from '../components/Editor.types';
import { transformExample } from './exampleTransform';

export interface ITranspiledOutput {
  outputString?: string;
  error?: string;
}

export async function transpile(model: ITextModel): Promise<ITranspiledOutput> {
  const makeWorker = await monaco.languages.typescript.getTypeScriptWorker();
  const worker: TypeScriptWorker = await makeWorker(model.uri);
  const output: EmitOutput = await worker.getEmitOutput(model.uri.toString());
  const transpiledOutput: ITranspiledOutput = { error: undefined, outputString: undefined };
  if (output.outputFiles[0]) {
    transpiledOutput.outputString = output.outputFiles[0].text;
  } else {
    transpiledOutput.error = 'Could not transpile code';
  }
  return transpiledOutput;
}

/**
 * Tranforms the code since the given code might have unsupported imports and then evals the code.
 *
 * @param code - Code to transform and eval
 * @param divId - `id` of the `div` element where the example will be rendered into after transforming
 * @returns Returns undefined if the transform was successful, or the error message if it was unsuccessful.
 */
export function evalCode(code: string, divId: string): string | undefined {
  try {
    // tslint:disable:no-eval
    const transfromedExample = transformExample(code, divId);
    if (transfromedExample.output !== undefined) {
      eval(transfromedExample.output);
    } else {
      return transfromedExample.error;
    }
  } catch (ex) {
    return ex.message;
  }
  return undefined;
}
