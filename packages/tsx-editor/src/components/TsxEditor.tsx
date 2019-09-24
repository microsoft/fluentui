import * as React from 'react';
import * as monaco from '@uifabric/monaco-editor';
import { LanguageServiceDefaultsImpl as TypescriptDefaults } from '@uifabric/monaco-editor/monaco-typescript.d';
import { ITsxEditorProps } from './TsxEditor.types';
import { transpileAndEval } from '../transpiler/index';
import { IMonacoTextModel, ICompilerOptions, IPackageGroup } from '../interfaces/index';
import { Editor } from './Editor';
import { EditorLoading } from './EditorLoading';
import { SUPPORTED_PACKAGES } from '../utilities/index';

const typescript = monaco.languages.typescript;
const typescriptDefaults = typescript.typescriptDefaults as TypescriptDefaults;

const filePrefix = 'file:///';
const filename = filePrefix + 'main.tsx';

/**
 * Wrapper for rendering a Monaco instance and also transpiling/eval-ing the React example code inside.
 */
export const TsxEditor: React.FunctionComponent<ITsxEditorProps> = (props: ITsxEditorProps) => {
  const { editorProps, onTransformFinished, previewId, compilerOptions, supportedPackages = SUPPORTED_PACKAGES } = props;

  // Hooks must be called unconditionally, so we have to create a backup ref here even if we
  // immediately throw it away to use the one passed in.
  const backupModelRef = React.useRef<IMonacoTextModel>();
  const modelRef = editorProps.modelRef || backupModelRef;

  // Load the globals before loading the editor (otherwise there will be an error executing the
  // example code because the globals it depends on aren't defined)
  const hasLoadedGlobals = _useGlobals(supportedPackages);

  // Set up compiler options
  _useCompilerOptions(compilerOptions);

  // Set up type checking after globals are loaded
  _useTypes(supportedPackages, hasLoadedGlobals);

  const onChange = (text: string) => {
    if (editorProps.onChange) {
      // If the consumer provided an additional onChange, call that too
      editorProps.onChange(text);
    }
    transpileAndEval(modelRef.current!, previewId, supportedPackages).then(onTransformFinished);
  };

  // Render loading spinner while globals are loading
  return hasLoadedGlobals ? (
    <Editor {...editorProps} filename={filename} modelRef={modelRef} onChange={onChange} />
  ) : (
    <EditorLoading height={editorProps.height} />
  );
};

function _useGlobals(supportedPackages: IPackageGroup[]): boolean {
  const [hasLoadedGlobals, setHasLoadedGlobals] = React.useState<boolean>(false);
  React.useEffect(() => {
    setHasLoadedGlobals(false);
    Promise.all(
      supportedPackages.map(group => {
        // tslint:disable:no-any
        if (!(window as any)[group.globalName]) {
          return group.loadGlobal().then((globalModule: any) => ((window as any)[group.globalName] = globalModule));
        }
        // tslint:enable:no-any
      })
    ).then(() => setHasLoadedGlobals(true));
  }, [supportedPackages]);
  return hasLoadedGlobals;
}

function _useCompilerOptions(compilerOptions: ICompilerOptions | undefined): void {
  React.useEffect(() => {
    const oldCompilerOptions = typescriptDefaults.getCompilerOptions();
    typescriptDefaults.setCompilerOptions({
      experimentalDecorators: true,
      preserveConstEnums: true,
      noUnusedLocals: true,
      strictNullChecks: true,
      noImplicitAny: true,
      // Mix in provided options
      ...compilerOptions,
      // These options are essential to making the transform/eval and types code work (no overriding)
      allowNonTsExtensions: true,
      target: typescript.ScriptTarget.ES2015,
      jsx: typescript.JsxEmit.React,
      jsxFactory: 'React.createElement',
      module: typescript.ModuleKind.ESNext,
      baseUrl: filePrefix,
      // These are updated after types are loaded, so preserve the old settings
      noEmitOnError: oldCompilerOptions.noEmitOnError,
      paths: oldCompilerOptions.paths
    });
  }, [compilerOptions]);
}

function _useTypes(supportedPackages: IPackageGroup[], isReady: boolean) {
  React.useEffect(() => {
    if (!isReady) {
      return;
    }

    // Initially disable type checking, and load real types after 2 seconds
    typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true });
    const typesTimeout = setTimeout(() => {
      _loadTypes(supportedPackages);
    }, 2000);

    return () => {
      clearTimeout(typesTimeout);
    };
  }, [supportedPackages, isReady]);
}

/**
 * Load types for React and any other packages.
 */
function _loadTypes(supportedPackages: IPackageGroup[]): Promise<void> {
  const promises: Promise<void>[] = [];
  const typesPrefix = filePrefix + 'node_modules/@types';

  // React must be loaded first
  promises.push(
    // @ts-ignore: this import is handled by webpack
    import('!raw-loader!@types/react/index.d.ts') // prettier-ignore
      .then((result: { default: string }) => {
        typescriptDefaults.addExtraLib(result.default, `${typesPrefix}/react/index.d.ts`);
      })
  );

  // Load each package and add it to TS (and save path mappings to add to TS later)
  const pathMappings: { [path: string]: string[] } = {};
  for (const group of supportedPackages) {
    for (const pkg of group.packages) {
      const { packageName, loadTypes } = pkg;
      // Get the pretend @types package name
      // (for a scoped package like @uifabric/utilities, this will be uifabric__utilities)
      const scopedMatch = packageName.match(/^@([^/]+)\/(.*)/);
      const typesPackageName = scopedMatch ? `${scopedMatch[1]}__${scopedMatch[2]}` : packageName;

      // Call the provided loader function
      return Promise.resolve(loadTypes()).then(contents => {
        const indexPath = `${typesPrefix}/${typesPackageName}/index`;
        // This makes TS automatically find typings for package-level imports
        typescriptDefaults.addExtraLib(contents, `${indexPath}.d.ts`);
        // But for deeper path imports, we likely need to map them back to the root index file
        // (do still include '*' as a default in case the types include module paths--
        // api-extractor rollups don't do this, but other packages' typings might)
        // https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
        pathMappings[packageName + '/lib/*'] = ['*', indexPath];
      });
    }
  }

  return Promise.all(promises).then(() => {
    // Add the path mappings and turn on full error checking
    typescriptDefaults.setCompilerOptions({
      ...typescriptDefaults.getCompilerOptions(),
      paths: pathMappings,
      noEmitOnError: true
    });
    typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: false });
  });
}

export default TsxEditor;
