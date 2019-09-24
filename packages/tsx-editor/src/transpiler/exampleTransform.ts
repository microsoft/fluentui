import { getWindow } from 'office-ui-fabric-react/lib/Utilities';
import { tryParseExample, IMPORT_REGEX } from './exampleParser';
import { _supportedPackageToGlobalMap } from './transpileHelpers';
import { IBasicPackageGroup, ITransformedCode } from '../interfaces/index';
// Don't reference anything importing Monaco in this file to avoid pulling Monaco into the
// main bundle or breaking tests!

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
  /** ID for the component to be rendered into */
  id: string;
  /** Supported package groups (React is implicitly supported) */
  supportedPackages: IBasicPackageGroup[];
}

const win = getWindow() as
  | Window & {
      transformLogging?: boolean;
    }
  | undefined;

/**
 * Transform an example for rendering in a browser context (example page or codepen).
 */
export function transformExample(params: ITransformExampleParams): ITransformedCode {
  const { tsCode, jsCode, id, supportedPackages } = params;

  // Imports or exports will be removed since they are not supported.
  const mainCode = (jsCode || tsCode)
    .replace(new RegExp(IMPORT_REGEX, 'gm'), '')
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
    identifiersByGlobal[globalName].push(...imprt.identifiers.map(item => (item.as ? `${item.name}: ${item.as}` : item.name)));
  }

  // Generate the line to render the component
  let createComponentElement = `React.createElement(${component}, null)`;
  if (identifiersByGlobal.Fabric) {
    // If this is a Fabric example, wrap in a <Fabric> (and add an import for that if needed)
    createComponentElement = `React.createElement(Fabric, null, ${createComponentElement})`;
    if (identifiersByGlobal.Fabric.indexOf('Fabric') === -1) {
      identifiersByGlobal.Fabric.push('Fabric');
    }
  }

  // Add const destructuring for formerly-imported identifiers
  const importLines = Object.keys(identifiersByGlobal).map(
    globalName => `const { ${identifiersByGlobal[globalName].join(', ')} } = window.${globalName};`
  );

  // All together!
  output.output = `${importLines.join('\n')}

${mainCode}

ReactDOM.render(${createComponentElement}, document.getElementById('${id}'));
`;

  if (win && win.transformLogging) {
    console.log('TRANSFORMED:');
    console.log(output.output);
  }
  return output;
}
