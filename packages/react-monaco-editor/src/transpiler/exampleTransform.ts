import * as React from 'react';
import { getWindow } from '@fluentui/react/lib/Utilities';
import { tryParseExample, IMPORT_REGEX } from './exampleParser';
import { _supportedPackageToGlobalMap } from './transpileHelpers';
import type { IBasicPackageGroup, ITransformedCode } from '../interfaces/index';

// Don't reference anything importing Monaco in this file to avoid pulling Monaco into the
// main bundle or breaking tests!

/** Function signature wrapping the transformed code if `ITransformExampleParams.returnFunction` is true. */
export type ExampleWrapperFunction = (react: typeof React) => React.ComponentType;

export interface ITransformExampleParams {
  /**
   * TS for the example. Will be used to find imports/exports. Will also be used in the final
   * returned code if `jsCode` is not provided.
   */
  tsCode: string;

  /**
   * The example transpiled into JS, output module format ES2015 or ESNext.
   * Will be used in the final returned code if provided.
   */
  jsCode?: string;

  /**
   * If false, the returned code will end with a `ReactDOM.render(...)` line and won't be wrapped
   * in a function.
   * If true, the returned code will be wrapped in a function of type `ExampleWrapperFunction`,
   * which should be called with the correct local version of React (to avoid hook errors due to
   * React mismatches in case there's a global React) and returns the component.
   */
  returnFunction?: boolean;

  /** ID for the component to be rendered into (required unless `returnFunction` is true) */
  id?: string;

  /** Supported package groups (React is implicitly supported) */
  supportedPackages: IBasicPackageGroup[];
}

const win = getWindow() as
  | (Window & {
      transformLogging?: boolean;
    })
  | undefined;

/**
 * Transform an example for rendering in a browser context (example page or codepen).
 */
export function transformExample(params: ITransformExampleParams): ITransformedCode {
  const { tsCode, jsCode, id = 'content', supportedPackages, returnFunction } = params;

  // Imports or exports will be removed since they are not supported.
  const code = (jsCode || tsCode)
    // Use .source because IE 11 doesn't support creating a regex from a regex
    .replace(new RegExp(IMPORT_REGEX.source, 'gm'), '')
    .replace(/^export /gm, '')
    .trim();

  const output: ITransformedCode = {};

  // Get info about the example's imports and exports
  const exampleInfo = tryParseExample(tsCode, supportedPackages);
  if (typeof exampleInfo === 'string') {
    // this means it's an error
    output.error = exampleInfo;
    return output;
  }

  const { component, imports } = exampleInfo;

  // Make a list of all the identifiers imported from each global, including converting renamed
  // identifiers ("foo as bar") to be renamed destructuring-style ("foo: bar")
  const supportedPackagesToGlobals = _supportedPackageToGlobalMap(supportedPackages);
  const identifiersByGlobal: { [globalName: string]: string[] } = {};
  for (const imprt of imports) {
    if (imprt.packageName === 'react') {
      continue; // React is globally available and other imports from it aren't supported
    }
    const globalName = supportedPackagesToGlobals[imprt.packageName];
    identifiersByGlobal[globalName] = identifiersByGlobal[globalName] || [];
    identifiersByGlobal[globalName].push(
      ...imprt.identifiers.map(item => (item.as ? `${item.name}: ${item.as}` : item.name)),
    );
  }

  let lines = [code];

  // Generate ThemeProvider wrapper stuff for the component if appropriate
  let finalComponent = component;
  if (identifiersByGlobal.FluentUIReact) {
    // If this is a Fluent UI React example, wrap in a <ThemeProvider> (adding an import for that if needed),
    // and initialize icons in case the example uses them.
    finalComponent = component + 'Wrapper';

    // If eval-ing the code, the component can't use JSX format
    const wrapperCode = returnFunction
      ? `React.createElement(ThemeProvider, null, React.createElement(${component}, null))`
      : `<ThemeProvider><${component} /></ThemeProvider>`;
    lines.push('', `const ${finalComponent} = () => ${wrapperCode};`);

    if (identifiersByGlobal.FluentUIReact.indexOf('ThemeProvider') === -1) {
      identifiersByGlobal.FluentUIReact.push('ThemeProvider');
    }

    if (identifiersByGlobal.FluentUIReact.indexOf('initializeIcons') === -1) {
      lines.unshift('// Initialize icons in case this example uses them', 'initializeIcons();', '');
      identifiersByGlobal.FluentUIReact.push('initializeIcons');
    }
  }

  // Add const destructuring for formerly-imported identifiers
  lines.unshift('');
  lines = Object.keys(identifiersByGlobal)
    .map(globalName => `const { ${identifiersByGlobal[globalName].join(', ')} } = window.${globalName};`)
    .concat(lines);

  if (returnFunction) {
    // Wrap in function, with the right React instance as a parameter.
    // Parentheses allow the function to remain unnamed.
    lines.unshift('(function(React) {');
    lines.push(`return ${finalComponent};`);
    lines.push('})');
  } else {
    // Add render line
    lines.push(`ReactDOM.render(<${finalComponent} />, document.getElementById('${id}'))`);
  }

  output.output = lines.join('\n');

  if (win && win.transformLogging) {
    /* eslint-disable no-console */
    console.log('TRANSFORMED:');
    console.log(output.output);
    /* eslint-enable no-console */
  }
  return output;
}
