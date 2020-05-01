import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';

export interface IManifestServicePluginOptions {
  /** Name of manifest to write output to */
  manifestName?: string;
}

/**
 * Generates manifest for webpack output and exposes all bundled modules to AMD loaders.
 */
class ManifestServicePlugin {
  private moduleRequestMap: { [request: string]: string };
  private options: IManifestServicePluginOptions;

  constructor(options?: IManifestServicePluginOptions) {
    this.moduleRequestMap = {};

    const baseOptions: IManifestServicePluginOptions = {
      manifestName: 'manifest',
    };
    this.options = { ...baseOptions, ...options };
  }

  public apply(compiler: webpack.Compiler): void {
    compiler.plugin('compilation', (compilation: webpack.compilation.Compilation, data: any) => {
      // new compilation has started

      compilation.plugin('succeed-module', (module: { request: string }) => {
        // a module was built successfully by webpack

        const moduleId: string = this._getAmdModuleId(module);

        // webpack may introduce built-in modules, don't expose those to AMD
        if (moduleId && !moduleId.startsWith('webpack/') && !moduleId.endsWith('.resx')) {
          if (this.moduleRequestMap[module.request]) {
            throw new Error(`Duplicate module '${module.request}' encountered during compilation`);
          } else {
            this.moduleRequestMap[module.request] = moduleId;

            this._appendModuleDefine(module);
          }
        }
      });

      compiler.plugin('done', (stats: any) => {
        // compilation is complete, build manifest JSON for emitted chunks

        const chunks: any = stats.compilation.chunks;
        const manifest: any = {
          version: '1.0',
          ramps: [],
          resources: {
            strings: {},
            css: [],
            imageStrips: [],
            inlineScripts: [],
            config: {},
            scripts: [],
            shim: {},
            bundles: {},
            scenarios: {},
            cultures: [],
            libraries: [],
          },
          loggingData: {},
          rampInfo: {},
          buildNumber: 'dev',
          hashes: {},
        };

        for (const chunk of chunks) {
          const file: string = chunk.files[0];
          const bundleName: string = file.substring(0, file.length - path.extname(file).length);
          const bundleModules: string[] = chunk
            .mapModules((module: any) => this.moduleRequestMap[module.request])
            .filter((module: any) => module)
            .sort();

          manifest.resources.scripts.push({
            name: bundleName,
            localized: false,
            hash: '',
            hashNoCompress: '',
            sourceMap: '',
            zipSize: 0,
            path: file,
          });
          manifest.resources.bundles[bundleName] = bundleModules;
        }

        const outputPath: string = stats.compilation.options.output.path;
        const manifestFile: string = path.join(outputPath, this.options.manifestName + '.json');
        fs.writeFileSync(manifestFile, JSON.stringify(manifest, undefined, 4));
      });
    });
  }

  private _appendModuleDefine(module: any): void {
    const isModuleAmd: boolean = module.dependencies.some(
      (dependency: any) => dependency.constructor.name === 'AMDDefineDependency',
    );
    const moduleName: string = this.moduleRequestMap[module.request];

    const exportValue: string = isModuleAmd ? '__WEBPACK_AMD_DEFINE_RESULT__' : 'module.exports';
    const defineBlock: string = `\n\ndefine('${moduleName}', function() { return ${exportValue}; });`;

    module._source._value += defineBlock;
  }

  private _getAmdModuleId(module: any): string {
    // generates the AMD module ID for a webpack module
    let result: string = module.rawRequest;

    // relative module paths need special care
    if (result && result.startsWith('.')) {
      let baseModulePath: string | undefined = undefined;

      // first try to get the base module path from the issuing module, when available
      if (module.issuer && module.issuer.request && this.moduleRequestMap[module.issuer.request]) {
        // should have encountered issuing module before, get its cached ID if we have it
        baseModulePath = path.dirname(this.moduleRequestMap[module.issuer.request]);

        if (path.join(baseModulePath, result).startsWith('.')) {
          // special case: issuer is nested inside request path, give up
          baseModulePath = undefined;
        }
      }

      if (!baseModulePath) {
        // try to extract base path from NPM package metadata
        const packageJsonPath: string | undefined = getPackageJsonPath(module.resource);

        if (packageJsonPath) {
          const packageJson: any = require(packageJsonPath);
          baseModulePath = packageJson.name;
          result = path.relative(path.dirname(packageJsonPath), module.resource);
        } else {
          console.warn(`WARNING: Failed to get package name for '${module.request}'. Is there a valid package.json?`);
          baseModulePath = '__MODULE__'; // don't know what to call this module?
        }
      }

      if (baseModulePath) {
        result = path.join(baseModulePath, result);
        result = result.replace(/\\/g, '/');
      }
    }

    return result;
  }
}

// walks up directory tree from a module path to find package.json
function getPackageJsonPath(modulePath: string): string | undefined {
  let result: string | undefined = undefined;
  let searchPath: string = path.dirname(modulePath);

  while (fs.existsSync(searchPath)) {
    const packageJsonFile: string = path.join(searchPath, 'package.json');

    if (fs.existsSync(packageJsonFile)) {
      result = packageJsonFile;
      break;
    }

    const nextPath: string = path.resolve(searchPath, '..');
    if (nextPath === searchPath) {
      // at root of file system
      break;
    } else {
      searchPath = nextPath;
    }
  }

  return result;
}

// for CommonJS compatibility
module.exports = ManifestServicePlugin;
