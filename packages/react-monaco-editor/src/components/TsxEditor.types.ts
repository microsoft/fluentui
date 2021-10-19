import type { IEditorProps } from './Editor.types';
import type { ICompilerOptions, IPackageGroup, ITransformedExample } from '../interfaces/index';

export interface ITsxEditorProps {
  /**
   * Props to pass through to the editor, such as the code and editor size.
   * WARNING: Changing some of these props will re-create the editor. See IEditorProps docs for details.
   * (Changing the wrapper object won't create problems.)
   */
  editorProps: IEditorProps;

  /**
   * Callback to notify when transforming finishes.
   * If successful, `result.component` will be the example component you should render.
   * (The editor doesn't render the component itself to avoid stomping on existing React-managed DOM.)
   */
  onTransformFinished: (result: ITransformedExample) => void;

  /**
   * TS compiler option overrides. Overrides to certain options essential to the TsxEditor's
   * functioning will be ignored. Also be warned that Monaco does not properly handle the full set
   * of options supported by TS, so some options (particularly `lib`) may not work as expected.
   */
  compilerOptions?: ICompilerOptions;

  /**
   * Supported packages for imports (React is implicitly supported).
   * Defaults to `@fluentui/react` (and everything it exports) plus `@fluentui/example-data`.
   *
   * WARNING: Changing this prop will cause editor initialization to re-run.
   * (Save the value in a constant to prevent it from mutating every render.)
   */
  supportedPackages?: IPackageGroup[];
}
