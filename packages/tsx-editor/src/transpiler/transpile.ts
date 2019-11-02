import * as React from 'react';
import * as monaco from '@uifabric/monaco-editor';
import { TypeScriptWorker, EmitOutput } from '@uifabric/monaco-editor/monaco-typescript.d';
import { getWindow } from 'office-ui-fabric-react/lib/Utilities';
import { transformExample } from './exampleTransform';
import { _getErrorMessages } from './transpileHelpers';
import { IMonacoTextModel, IBasicPackageGroup, ITransformedCode, ITransformedExample } from '../interfaces/index';

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
        // Get diagnostics to find out if there were any syntax errors (there's also getSemanticDiagnostics
        // for type errors etc, but it may be better to allow the user to just find and fix those
        // via intellisense rather than blocking compilation, since they may be non-fatal)
        return worker.getSyntacticDiagnostics(filename).then(syntacticDiagnostics => {
          syntacticDiagnostics = syntacticDiagnostics.filter(d => d.category === 1 /*error*/);

          if (syntacticDiagnostics.length) {
            // Don't try to run the example if there's a syntax error
            transpiledOutput.error = _getErrorMessages(syntacticDiagnostics, model.getValue());
          } else {
            transpiledOutput.output = output.outputFiles[0].text;
            if (win && win.transpileLogging) {
              console.log('TRANSPILED:');
              console.log(transpiledOutput.output);
            }
          }
          return transpiledOutput;
        });
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
 * @param supportedPackages - Supported packages for imports, grouped by global name
 * (React is implicitly supported)
 * @returns Returns an object with the output string and component to render if successful,
 * or error(s) if unsuccessful.
 */
// This is intentionally not an async function, because debugging within transpiled async functions
// is next to impossible.
export function transpileAndEval(model: IMonacoTextModel, supportedPackages: IBasicPackageGroup[]): Promise<ITransformedExample> {
  const exampleTs = model.getValue();
  return transpile(model)
    .then(
      (transpileOutput: ITransformedCode): ITransformedExample => {
        if (transpileOutput.error) {
          return transpileOutput;
        }

        // tslint:disable:no-eval
        const transformedExample = transformExample({
          tsCode: exampleTs,
          jsCode: transpileOutput.output,
          returnFunction: true,
          supportedPackages
        });
        if (transformedExample.output) {
          return {
            ...transformedExample,
            // Pass in the right React in case there's a different global one on the page...
            component: eval(transformedExample.output)(React)
          };
        } else {
          return { error: transformedExample.error || 'Unknown error transforming example' };
        }
      }
    )
    .catch(
      (err: string | Error): ITransformedExample => {
        // Log the error to the console so people can see the full stack/etc if they want
        console.error(err);
        return { error: typeof err === 'string' ? err : err.message };
      }
    );
}
