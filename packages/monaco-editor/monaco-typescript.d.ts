// This file may need to be re-generated when updating the monaco-editor version. Steps:
// 1. Open <root>/node_modules/monaco-typescript/release/esm
// 2. Merge .d.ts files into this file (unfortunately a manual process right now)
// 3. Resolve any type mismatch issues (likely caused by mismatches between our TS version and Monaco's)

// merged imports from all files
import * as ts from 'typescript';
import * as monaco from '@uifabric/monaco-editor';
import CancellationToken = monaco.CancellationToken;
import IDisposable = monaco.IDisposable;
import IEvent = monaco.IEvent;
import IWorkerContext = monaco.worker.IWorkerContext;
import Position = monaco.Position;
import Range = monaco.Range;
import Thenable = monaco.Thenable;
import Uri = monaco.Uri;
// temporarily using this Omit to prevent TS compatibility breaks
import { Omit } from '@uifabric/utilities';

// convenience re-export
export type EmitOutput = ts.EmitOutput;

// languageFeatures.d.ts
export declare function flattenDiagnosticMessageText(diag: string | ts.DiagnosticMessageChain | undefined, newLine: string, indent?: number): string;
export declare abstract class Adapter {
  protected _worker: (first: Uri, ...more: Uri[]) => Promise<TypeScriptWorker>;
  constructor(_worker: (first: Uri, ...more: Uri[]) => Promise<TypeScriptWorker>);
  protected _textSpanToRange(model: monaco.editor.ITextModel, span: ts.TextSpan): monaco.IRange;
}
export declare class DiagnosticsAdapter extends Adapter {
  private _defaults;
  private _selector;
  private _disposables;
  private _listener;
  constructor(_defaults: LanguageServiceDefaultsImpl, _selector: string, worker: (first: Uri, ...more: Uri[]) => Promise<TypeScriptWorker>);
  dispose(): void;
  private _doValidate;
  private _convertDiagnostics;
  private _convertRelatedInformation;
  private _tsDiagnosticCategoryToMarkerSeverity;
}
export declare class SuggestAdapter extends Adapter implements monaco.languages.CompletionItemProvider {
  // changed from getter syntax
  readonly triggerCharacters: string[];
  provideCompletionItems(model: monaco.editor.ITextModel, position: Position, _context: monaco.languages.CompletionContext, token: CancellationToken): Promise<monaco.languages.CompletionList | undefined>;
  resolveCompletionItem(model: monaco.editor.ITextModel, _position: Position, item: monaco.languages.CompletionItem, token: CancellationToken): Promise<monaco.languages.CompletionItem>;
  private static convertKind;
}
export declare class SignatureHelpAdapter extends Adapter implements monaco.languages.SignatureHelpProvider {
  signatureHelpTriggerCharacters: string[];
  provideSignatureHelp(model: monaco.editor.ITextModel, position: Position, token: CancellationToken): Promise<monaco.languages.SignatureHelpResult | undefined>;
}
export declare class QuickInfoAdapter extends Adapter implements monaco.languages.HoverProvider {
  provideHover(model: monaco.editor.ITextModel, position: Position, token: CancellationToken): Promise<monaco.languages.Hover | undefined>;
}
export declare class OccurrencesAdapter extends Adapter implements monaco.languages.DocumentHighlightProvider {
  provideDocumentHighlights(model: monaco.editor.ITextModel, position: Position, token: CancellationToken): Promise<monaco.languages.DocumentHighlight[] | undefined>;
}
export declare class DefinitionAdapter extends Adapter {
  provideDefinition(model: monaco.editor.ITextModel, position: Position, token: CancellationToken): Promise<monaco.languages.Definition | undefined>;
}
export declare class ReferenceAdapter extends Adapter implements monaco.languages.ReferenceProvider {
  provideReferences(model: monaco.editor.ITextModel, position: Position, context: monaco.languages.ReferenceContext, token: CancellationToken): Promise<monaco.languages.Location[] | undefined>;
}
export declare class OutlineAdapter extends Adapter implements monaco.languages.DocumentSymbolProvider {
  provideDocumentSymbols(model: monaco.editor.ITextModel, token: CancellationToken): Promise<monaco.languages.DocumentSymbol[] | undefined>;
}
export declare class Kind {
  static unknown: string;
  static keyword: string;
  static script: string;
  static module: string;
  static class: string;
  static interface: string;
  static type: string;
  static enum: string;
  static variable: string;
  static localVariable: string;
  static function: string;
  static localFunction: string;
  static memberFunction: string;
  static memberGetAccessor: string;
  static memberSetAccessor: string;
  static memberVariable: string;
  static constructorImplementation: string;
  static callSignature: string;
  static indexSignature: string;
  static constructSignature: string;
  static parameter: string;
  static typeParameter: string;
  static primitiveType: string;
  static label: string;
  static alias: string;
  static const: string;
  static let: string;
  static warning: string;
}
export declare abstract class FormatHelper extends Adapter {
  protected static _convertOptions(options: monaco.languages.FormattingOptions): ts.FormatCodeOptions;
  protected _convertTextChanges(model: monaco.editor.ITextModel, change: ts.TextChange): monaco.languages.TextEdit;
}
export declare class FormatAdapter extends FormatHelper implements monaco.languages.DocumentRangeFormattingEditProvider {
  provideDocumentRangeFormattingEdits(model: monaco.editor.ITextModel, range: Range, options: monaco.languages.FormattingOptions, token: CancellationToken): Promise<monaco.languages.TextEdit[] | undefined>;
}
export declare class FormatOnTypeAdapter extends FormatHelper implements monaco.languages.OnTypeFormattingEditProvider {
// changed from getter syntax
  readonly autoFormatTriggerCharacters: string[];
  provideOnTypeFormattingEdits(model: monaco.editor.ITextModel, position: Position, ch: string, options: monaco.languages.FormattingOptions, token: CancellationToken): Promise<monaco.languages.TextEdit[] | undefined>;
}
export declare class CodeActionAdaptor extends FormatHelper implements monaco.languages.CodeActionProvider {
  provideCodeActions(model: monaco.editor.ITextModel, range: Range, context: monaco.languages.CodeActionContext, token: CancellationToken): Promise<monaco.languages.CodeActionList>;
  // Original:
  // provideCodeActions(model: monaco.editor.ITextModel, range: Range, context: monaco.languages.CodeActionContext, token: CancellationToken): Promise<monaco.languages.CodeActionList | undefined>;
  private _tsCodeFixActionToMonacoCodeAction;
}
export declare class RenameAdapter extends Adapter implements monaco.languages.RenameProvider {
  provideRenameEdits(model: monaco.editor.ITextModel, position: Position, newName: string, token: CancellationToken): Promise<monaco.languages.WorkspaceEdit & monaco.languages.Rejection | undefined>;
}

// monaco.contribution.d.ts
export interface IExtraLib {
  content: string;
  version: number;
}
export interface IExtraLibs {
  [path: string]: IExtraLib;
}
export declare class LanguageServiceDefaultsImpl implements monaco.languages.typescript.LanguageServiceDefaults {
  private _onDidChange;
  private _onDidExtraLibsChange;
  private _extraLibs;
  private _eagerModelSync;
  private _compilerOptions;
  private _diagnosticsOptions;
  private _onDidExtraLibsChangeTimeout;
  constructor(compilerOptions: monaco.languages.typescript.CompilerOptions, diagnosticsOptions: monaco.languages.typescript.DiagnosticsOptions);
  // changed from getter syntax
  readonly onDidChange: IEvent<void>;
  // changed from getter syntax
  readonly onDidExtraLibsChange: IEvent<void>;
  getExtraLibs(): IExtraLibs;
  addExtraLib(content: string, _filePath?: string): IDisposable;
  setExtraLibs(libs: { content: string; filePath?: string; }[]): void;
  private _fireOnDidExtraLibsChangeSoon;
  getCompilerOptions(): monaco.languages.typescript.CompilerOptions;
  setCompilerOptions(options: monaco.languages.typescript.CompilerOptions): void;
  getDiagnosticsOptions(): monaco.languages.typescript.DiagnosticsOptions;
  setDiagnosticsOptions(options: monaco.languages.typescript.DiagnosticsOptions): void;
  setMaximumWorkerIdleTime(value: number): void;
  setEagerModelSync(value: boolean): void;
  getEagerModelSync(): boolean;
}

// tsMode.d.ts
export declare function setupTypeScript(defaults: LanguageServiceDefaultsImpl): void;
export declare function setupJavaScript(defaults: LanguageServiceDefaultsImpl): void;
export declare function getJavaScriptWorker(): Promise<(first: Uri, ...more: Uri[]) => Promise<TypeScriptWorker>>;
export declare function getTypeScriptWorker(): Promise<(first: Uri, ...more: Uri[]) => Promise<TypeScriptWorker>>;

// tsWorker.d.ts
export declare class TypeScriptWorker implements ts.LanguageServiceHost {
  private _ctx;
  private _extraLibs;
  private _languageService;
  private _compilerOptions;
  constructor(ctx: IWorkerContext, createData: ICreateData);
  getCompilationSettings(): ts.CompilerOptions;
  getScriptFileNames(): string[];
  private _getModel;
  getScriptVersion(fileName: string): string;
  getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined;
  getScriptKind?(fileName: string): ts.ScriptKind;
  getCurrentDirectory(): string;
  getDefaultLibFileName(options: ts.CompilerOptions): string;
  isDefaultLibFileName(fileName: string): boolean;
  private static clearFiles;
  getSyntacticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
  getSemanticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
  getSuggestionDiagnostics(fileName: string): Promise<ts.DiagnosticWithLocation[]>;
  getCompilerOptionsDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
  getCompletionsAtPosition(fileName: string, position: number): Promise<ts.CompletionInfo | undefined>;
  getCompletionEntryDetails(fileName: string, position: number, entry: string): Promise<ts.CompletionEntryDetails | undefined>;
  getSignatureHelpItems(fileName: string, position: number): Promise<ts.SignatureHelpItems | undefined>;
  getQuickInfoAtPosition(fileName: string, position: number): Promise<ts.QuickInfo | undefined>;
  getOccurrencesAtPosition(fileName: string, position: number): Promise<ReadonlyArray<ts.ReferenceEntry> | undefined>;
  getDefinitionAtPosition(fileName: string, position: number): Promise<ReadonlyArray<ts.DefinitionInfo> | undefined>;
  getReferencesAtPosition(fileName: string, position: number): Promise<ts.ReferenceEntry[] | undefined>;
  getNavigationBarItems(fileName: string): Promise<ts.NavigationBarItem[]>;
  getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
  getFormattingEditsForRange(fileName: string, start: number, end: number, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
  getFormattingEditsAfterKeystroke(fileName: string, postion: number, ch: string, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
  findRenameLocations(fileName: string, positon: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename: boolean): Promise<readonly ts.RenameLocation[] | undefined>;
  getRenameInfo(fileName: string, positon: number, options: ts.RenameInfoOptions): Promise<ts.RenameInfo>;
  getEmitOutput(fileName: string): Promise<ts.EmitOutput>;
  getCodeFixesAtPosition(fileName: string, start: number, end: number, errorCodes: number[], formatOptions: ts.FormatCodeOptions): Promise<ReadonlyArray<ts.CodeFixAction>>;
  updateExtraLibs(extraLibs: IExtraLibs): void;
}
export interface ICreateData {
  compilerOptions: ts.CompilerOptions;
  extraLibs: IExtraLibs;
}
export declare function create(ctx: IWorkerContext, createData: ICreateData): TypeScriptWorker;

// workerManager.d.ts
export declare class WorkerManager {
  private _modeId;
  private _defaults;
  private _configChangeListener;
  private _updateExtraLibsToken;
  private _extraLibsChangeListener;
  private _worker;
  private _client;
  constructor(modeId: string, defaults: LanguageServiceDefaultsImpl);
  private _stopWorker;
  dispose(): void;
  private _updateExtraLibs;
  private _getClient;
  getLanguageServiceWorker(...resources: Uri[]): Promise<TypeScriptWorker>;
}
