import type { ComponentStyleSpec } from '@fluentui/style-spec';
import { compileGriffel } from './emitters/griffel';
import { compileWebComponents } from './emitters/webComponents';
import { compileCssModules } from './emitters/cssModules';
import { formatGenerated } from './format';
import type { GriffelAdapterConfig, WebComponentsAdapterConfig, CssModulesAdapterConfig } from './adapters/types';

export type CompileTarget = 'griffel' | 'web-components' | 'css-modules';

export interface CompileOptions {
  target: CompileTarget;
  griffel?: Partial<GriffelAdapterConfig>;
  webComponents?: Partial<WebComponentsAdapterConfig>;
  cssModules?: Partial<CssModulesAdapterConfig>;
  format?: boolean;
}

export interface CompiledFile {
  fileName: string;
  contents: string;
}

/**
 * Compiles a component style spec to the requested target. Output is deterministically formatted by default.
 */
export function compileStyleSpec(spec: ComponentStyleSpec, options: CompileOptions): CompiledFile[] {
  const shouldFormat = options.format !== false;
  const files: CompiledFile[] = [];

  if (options.target === 'griffel') {
    const result = compileGriffel(spec, { config: options.griffel });
    files.push({
      fileName: result.fileName,
      contents: shouldFormat ? formatGenerated(result.contents, result.fileName) : result.contents,
    });
  } else if (options.target === 'web-components') {
    const result = compileWebComponents(spec, { config: options.webComponents });
    files.push(
      {
        fileName: result.cssFileName,
        contents: shouldFormat ? formatGenerated(result.cssContents, result.cssFileName) : result.cssContents,
      },
      {
        fileName: result.tsFileName,
        contents: shouldFormat ? formatGenerated(result.tsContents, result.tsFileName) : result.tsContents,
      },
    );
  } else if (options.target === 'css-modules') {
    const result = compileCssModules(spec, { config: options.cssModules });
    files.push(
      {
        fileName: result.cssFileName,
        contents: shouldFormat ? formatGenerated(result.cssContents, result.cssFileName) : result.cssContents,
      },
      {
        fileName: result.helperFileName,
        contents: shouldFormat ? formatGenerated(result.helperContents, result.helperFileName) : result.helperContents,
      },
    );
  } else {
    throw new Error(`Unknown compile target: ${String((options as CompileOptions).target)}`);
  }

  return files;
}

export { compileGriffel } from './emitters/griffel';
export { compileWebComponents } from './emitters/webComponents';
export { compileCssModules } from './emitters/cssModules';
export {
  defaultGriffelConfig,
  defaultWebComponentsConfig,
  defaultCssModulesConfig,
  assertAdapterMatchesSpec,
} from './adapters/types';
export type { GriffelAdapterConfig, WebComponentsAdapterConfig, CssModulesAdapterConfig } from './adapters/types';
export { formatGenerated } from './format';
export { prepareIr, resolveCssValue, resolveGriffelValue } from './ir/utils';
