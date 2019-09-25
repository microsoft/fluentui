import * as monaco from '@uifabric/monaco-editor';
import { TypeScriptWorker, EmitOutput } from '@uifabric/monaco-editor/monaco-typescript.d';
import { getWindow } from 'office-ui-fabric-react/lib/Utilities';
import { transformExample } from './exampleTransform';
import { _getErrorMessages } from './transpileHelpers';
import { IMonacoTextModel, IBasicPackageGroup, ITransformedCode } from '../interfaces/index';

const win = getWindow() as
  | Window & {
      transpileLogging?: boolean;
    }
  | undefined;

/**
 * Transpile the model's current code from TS to JS.
 */
// This is intentionally not an async function, because debugging within transpiled async functions
// is next to impossible.
export function transpile(model: IMonacoTextModel): Promise<ITransformedCode> {
  const transpiledOutput: ITransformedCode = { error: undefined, output: undefined };
  const filename = model.uri.toString();
  return monaco.languages.typescript
    .getTypeScriptWorker()
    .then((getWorker: (uri: monaco.Uri) => Promise<TypeScriptWorker>) => getWorker(model.uri))
    .then(worker => {
      return worker.getEmitOutput(filename).then((output: EmitOutput) => {
        if (!output.emitSkipped) {
          transpiledOutput.output = output.outputFiles[0].text;
          if (win && win.transpileLogging) {
            console.log('TRANSPILED:');
            console.log(transpiledOutput.output);
          }
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
      // Log the error to the console so people can see the full stack/etc if they want
      console.error(ex);
      transpiledOutput.error = ex.message;
      return transpiledOutput;
    });
}

/**
 * Transpiles the code, does an additional transform to prepare for rendering, and evals the code.
 *
 * @param model - Current editor text model
 * @param id - `id` of the `div` element the example will be rendered into after transforming
 * @param supportedPackages - Supported packages for imports, grouped by global name
 * (React is implicitly supported)
 * @returns Returns an object with the output string if successful, and errors if unsuccessful.
 */
// This is intentionally not an async function, because debugging within transpiled async functions
// is next to impossible.
export function transpileAndEval(model: IMonacoTextModel, id: string, supportedPackages: IBasicPackageGroup[]): Promise<ITransformedCode> {
  const exampleTs = model.getValue();
  return transpile(model)
    .then(
      (transpileOutput: ITransformedCode): ITransformedCode => {
        if (transpileOutput.error) {
          return transpileOutput;
        }

        // tslint:disable:no-eval
        const transformedExample = transformExample({
          tsCode: exampleTs,
          jsCode: transpileOutput.output,
          supportedPackages,
          id
        });
        if (transformedExample.output !== undefined) {
          // Run the example inside a closure to avoid conflicts with pre-existing globals
          eval(`{ ${transformedExample.output} }`);
          return transformedExample;
        } else {
          return { error: transformedExample.error || 'Unknown error transforming example' };
        }
      }
    )
    .catch(
      (err: string | Error): ITransformedCode => {
        // Log the error to the console so people can see the full stack/etc if they want
        console.error(err);
        return { error: typeof err === 'string' ? err : err.message };
      }
    );
}
