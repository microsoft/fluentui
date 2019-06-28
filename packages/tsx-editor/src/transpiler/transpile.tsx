import * as monaco from 'monaco-editor';
import { TypeScriptWorker, EmitOutput } from './monacoTypescriptWorker';
import { ITextModel } from '../components/Editor.types';

interface ITranspiledOutput {
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
    throw new Error('Could not transpile code');
  }
  return transpiledOutput;
}

export function evalCode(code: string): string | undefined {
  try {
    // tslint:disable:no-eval
    eval(code);
  } catch (ex) {
    return ex.message;
  }
  return undefined;
}
