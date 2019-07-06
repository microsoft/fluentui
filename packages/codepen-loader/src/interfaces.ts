// tslint:disable:no-any
export interface IRecastParseOptions {
  parser: {
    parse: (source: string) => any;
  };
}
export type Recast = {
  parse: (source: string, options: IRecastParseOptions) => any;
};

export interface IASTSpecifier {
  local: { loc: { identifierName: string } };
}
export interface IASTDeclaration {
  id: { name: string };
  type:
    | 'VariableDeclaration'
    | 'FunctionDeclaration'
    | 'ClassDeclaration'
    | 'TSInterfaceDeclaration';
  declarations: IASTDeclaration[];
}
export interface IASTNode {
  source: { value: string };
  specifiers: IASTSpecifier[];
  declaration: IASTDeclaration;
}
export interface IASTPath {
  node: IASTNode;
  prune(): void;
}
export interface IASTPathSet {
  forEach(func: (p: IASTPath) => void): void;
  replaceWith(replacer: (p: IASTPath) => any): void;
}
export interface IAST {
  find: (nodeType: any, filter?: (node: IASTNode) => boolean) => IASTPathSet;
  toSource(): string;
}

// tslint:disable-next-line
export interface JSCodeShift {
  (parsed: any): IAST;
  readonly ImportDeclaration: any;
  readonly ExportNamedDeclaration: any;
}
