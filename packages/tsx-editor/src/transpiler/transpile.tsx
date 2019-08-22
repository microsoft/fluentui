import * as monaco from 'monaco-editor';
import { TypeScriptWorker, EmitOutput } from './monacoTypescriptWorker.d';
import { transformExample } from './exampleTransform';
import { _getErrorMessages } from './helpers';

export interface ITranspiledOutput {
  outputString?: string;
  error?: string | string[];
}

// This is intentionally not an async function, because debugging within transpiled async functions
// is next to impossible.
export function transpile(model: monaco.editor.ITextModel): Promise<ITranspiledOutput> {
  const transpiledOutput: ITranspiledOutput = { error: undefined, outputString: undefined };
  const filename = model.uri.toString();
  return monaco.languages.typescript
    .getTypeScriptWorker()
    .then(makeWorker => makeWorker(model.uri))
    .then((worker: TypeScriptWorker) => {
      return worker.getEmitOutput(filename).then((output: EmitOutput) => {
        if (!output.emitSkipped) {
          transpiledOutput.outputString = output.outputFiles[0].text;
          return transpiledOutput;
        }
        // There was an error, so get diagnostics
        return Promise.all([worker.getSyntacticDiagnostics(filename), worker.getSemanticDiagnostics(filename)]).then(
          ([syntacticDiagnostics, semanticDiagnostics]) => {
            const diagnostics = syntacticDiagnostics.concat(semanticDiagnostics).filter(d => d.category === 1 /*error*/);
            diagnostics.sort((a, b) => a.start! - b.start!);
            if (diagnostics.length) {
              transpiledOutput.error = _getErrorMessages(diagnostics, model.getValue());
            } else {
              transpiledOutput.error = 'Error transpiling code';
            }

            return transpiledOutput;
          }
        );
      });
    })
    .catch(ex => {
      transpiledOutput.error = ex.message;
      return transpiledOutput;
    });
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
    // Log the error to the console so people can see the full stack/etc if they want
    console.error(ex);
    return ex.message;
  }
  return undefined;
}
