import * as ts from 'typescript';
import * as monaco from 'monaco-editor';
import IWorkerContext = monaco.worker.IWorkerContext;
export interface IExtraLib {
  content: string;
  version: number;
}
export interface IExtraLibs {
  [path: string]: IExtraLib;
}

// Since Monaco Editor does not have typings for the typescript worker, this file was added to provide the needed types

export declare class TypeScriptWorker implements ts.LanguageServiceHost {
  private static clearFiles;
  private _getModel;
  private _ctx;
  private _extraLibs;
  private _languageService;
  private _compilerOptions;
  constructor(ctx: IWorkerContext, createData: ICreateData);
  public getCompilationSettings(): ts.CompilerOptions;
  public getScriptFileNames(): string[];
  public getScriptVersion(fileName: string): string;
  public getScriptSnapshot(fileName: string): ts.IScriptSnapshot;
  public getScriptKind?(fileName: string): ts.ScriptKind;
  public getCurrentDirectory(): string;
  public getDefaultLibFileName(options: ts.CompilerOptions): string;
  public isDefaultLibFileName(fileName: string): boolean;
  public getSyntacticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
  public getSemanticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
  public getCompilerOptionsDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
  public getCompletionsAtPosition(fileName: string, position: number): Promise<ts.CompletionInfo>;
  public getCompletionEntryDetails(fileName: string, position: number, entry: string): Promise<ts.CompletionEntryDetails>;
  public getSignatureHelpItems(fileName: string, position: number): Promise<ts.SignatureHelpItems>;
  public getQuickInfoAtPosition(fileName: string, position: number): Promise<ts.QuickInfo>;
  public getOccurrencesAtPosition(fileName: string, position: number): Promise<ReadonlyArray<ts.ReferenceEntry>>;
  public getDefinitionAtPosition(fileName: string, position: number): Promise<ReadonlyArray<ts.DefinitionInfo>>;
  public getReferencesAtPosition(fileName: string, position: number): Promise<ts.ReferenceEntry[]>;
  public getNavigationBarItems(fileName: string): Promise<ts.NavigationBarItem[]>;
  public getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
  public getFormattingEditsForRange(fileName: string, start: number, end: number, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
  public getFormatEditsAfterKeystroke(
    fileName: string,
    postion: number,
    ch: string,
    options: ts.FormatCodeOptions
  ): Promise<ts.TextChange[]>;
  public getEmitOutput(fileName: string): Promise<ts.EmitOutput>;
  public updateExtraLibs(extraLibs: IExtraLibs): void;
}
export interface ICreateData {
  compilerOptions: ts.CompilerOptions;
  extraLibs: IExtraLibs;
}
export declare function create(ctx: IWorkerContext, createData: ICreateData): TypeScriptWorker;

// tslint:disable:interface-name
export interface EmitOutput {
  outputFiles: OutputFile[];
  emitSkipped: boolean;
}

interface OutputFile {
  name: string;
  writeByteOrderMark: boolean;
  text: string;
}
