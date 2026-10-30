export { analyzeSource, enclosingSourceFunction } from './analyze';
export type { SourceAnalysis } from './analyze';
export { SourceParseError, parseSource } from './parse';
export type { ParsedSource } from './parse';
export { ScopeResolver } from './scope';
export type { ImportBinding, Scope, ScopeBinding } from './scope';
export { AstParents, walkAst } from './traverse';
export type { AstVisitor } from './traverse';
