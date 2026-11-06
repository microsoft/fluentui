import type { Node, Program } from 'oxc-parser';

import { compareRiskFindings, compareSpans, compareText } from './ordering';
import { toWorkspacePath } from './path-utils';
import { AstParents, walkAst } from './ast/traverse';
import { SourceLocations } from './ast/loc';
import { parseSource } from './ast/parse';
import type { ParsedSource } from './ast/parse';
import { isReactWrapper, ScopeResolver } from './ast/scope';
import type {
  DirectiveOccurrence,
  DirectiveType,
  FileEntry,
  ManualMemoization,
  RiskFinding,
  SourceFunction,
  SourceFunctionKind,
  SourceFunctionSyntax,
  SourcePosition,
  SourceSpan,
} from './types';

type RawLocation = {
  start: { line: number; column: number };
  end?: { line: number; column: number };
};

const JUSTIFIED_RE = /(?:^|;)\s*justified\s*:/;

function isFunction(node: Node): boolean {
  return (
    node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression'
  );
}

function syntaxOf(node: Node): SourceFunctionSyntax | null {
  if (node.type === 'FunctionDeclaration') {
    return 'declaration';
  }
  if (node.type === 'FunctionExpression') {
    return 'expression';
  }
  if (node.type === 'ArrowFunctionExpression') {
    return 'arrow';
  }
  return null;
}

function identifierName(node: Node, parents: AstParents, scopes: ScopeResolver): string | null {
  if (
    (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') &&
    (node as Node & { id: Node | null }).id
  ) {
    const id = (node as Node & { id: Node }).id;
    return (id as Node & { name: string }).name;
  }

  const parent = parents.get(node);
  if (parent?.type === 'VariableDeclarator' && (parent as Node & { init: Node | null }).init === node) {
    const id = (parent as Node & { id: Node }).id;
    if (id.type === 'Identifier') {
      return (id as Node & { name: string }).name;
    }
  }

  let value = node;
  let current = parent;
  while (current?.type === 'CallExpression' && (current as Node & { arguments: Node[] }).arguments[0] === value) {
    const declarator = parents.get(current);
    if (declarator?.type === 'VariableDeclarator') {
      const id = (declarator as Node & { id: Node }).id;
      if (id.type === 'Identifier') {
        return (id as Node & { name: string }).name;
      }
    }
    if (!isReactWrapper(current, scopes)) {
      break;
    }
    value = current;
    current = parents.get(current);
  }

  return null;
}

function isInlineReactWrapper(node: Node, parents: AstParents, scopes: ScopeResolver): boolean {
  const parent = parents.get(node);
  return (
    parent?.type === 'CallExpression' &&
    (parent as Node & { arguments: Node[] }).arguments[0] === node &&
    isReactWrapper(parent, scopes)
  );
}

function classify(name: string | null, inlineWrapper: boolean): SourceFunctionKind {
  if (name && /^use[A-Z0-9]/.test(name)) {
    return 'hook';
  }
  if (inlineWrapper || (name && /^[A-Z][A-Za-z0-9]*$/.test(name))) {
    return 'component';
  }
  return name ? 'other' : 'unknown';
}

/**
 * Canonical inventory of functions parsed in one source file. Function IDs and spans always
 * refer to the untransformed UTF-16 source, so compiler diagnostics can be mapped without
 * relying on generated names or traversal order.
 */
export class SourceFunctionIndex {
  private readonly functionsById = new Map<string, SourceFunction>();
  private readonly functionsByOffsets = new Map<string, SourceFunction>();
  private readonly functionsByBodyOffsets = new Map<string, SourceFunction>();
  private readonly functionsByDeclarationStart = new Map<number, SourceFunction>();
  private readonly functionsByBodyStart = new Map<number, SourceFunction>();
  private readonly locations: SourceLocations;
  private readonly relativeFile: string;
  private readonly allDirectives: DirectiveOccurrence[] = [];
  private parsed: ParsedSource | null = null;
  private scopes: ScopeResolver | null = null;
  private orderedFunctions: SourceFunction[] | null = null;

  public constructor(public readonly source: string, public readonly entry: FileEntry, workspaceRoot: string) {
    this.relativeFile = toWorkspacePath(workspaceRoot, entry.filePath);
    this.locations = new SourceLocations(source);
  }

  public addProgram(parsed: ParsedSource, scopes = new ScopeResolver(parsed.program)): void {
    this.parsed = parsed;
    this.scopes = scopes;
    this.addFileDirectives(parsed.program);
    walkAst(
      parsed.program,
      {
        enter: node => {
          if (isFunction(node)) {
            this.addFunction(node);
          }
        },
      },
      parsed.parents,
    );
  }

  public addFunction(node: Node): SourceFunction | null {
    if (!isFunction(node) || !this.parsed || !this.scopes) {
      return null;
    }
    const syntax = syntaxOf(node);
    const declarationSpan = this.spanFromNode(node);
    const body = (node as Node & { body: Node }).body;
    const bodySpan = this.spanFromNode(body);
    if (!syntax || !declarationSpan || !bodySpan) {
      return null;
    }

    const offsetsKey = this._offsetsKey(declarationSpan.start.offset, declarationSpan.end.offset);
    const existing = this.functionsByOffsets.get(offsetsKey);
    if (existing) {
      return existing;
    }

    const name = identifierName(node, this.parsed.parents, this.scopes);
    const id = `${this.relativeFile}#${declarationSpan.start.offset}-${declarationSpan.end.offset}`;
    const bodyInsertionOffset =
      body.type === 'BlockStatement' ? Math.min(bodySpan.start.offset + 1, bodySpan.end.offset) : null;
    const fn: SourceFunction = {
      id,
      filePath: this.entry.filePath,
      packageName: this.entry.packageName,
      packageRoot: this.entry.packageRoot ?? null,
      name,
      kind: classify(name, isInlineReactWrapper(node, this.parsed.parents, this.scopes)),
      syntax,
      declarationSpan,
      bodySpan,
      bodyInsertionOffset,
      bodyInsertionLine: bodyInsertionOffset === null ? null : bodySpan.start.line + 1,
      directives: [],
    };

    if (body.type === 'BlockStatement') {
      fn.directives.push(...this._directiveOccurrences((body as Node & { body: Node[] }).body, id));
    }
    this.functionsById.set(id, fn);
    this.functionsByOffsets.set(offsetsKey, fn);
    this.functionsByBodyOffsets.set(this._offsetsKey(bodySpan.start.offset, bodySpan.end.offset), fn);
    this.functionsByDeclarationStart.set(declarationSpan.start.offset, fn);
    this.functionsByBodyStart.set(bodySpan.start.offset, fn);
    this.orderedFunctions = null;
    return fn;
  }

  public addFileDirectives(program: Program): void {
    this._directiveOccurrences(program.body, null);
  }

  public values(): SourceFunction[] {
    this.orderedFunctions ??= [...this.functionsById.values()].sort(
      (a, b) => compareSpans(a.declarationSpan, b.declarationSpan) || compareText(a.id, b.id),
    );
    return [...this.orderedFunctions];
  }

  public directives(): DirectiveOccurrence[] {
    return [...this.allDirectives].sort(
      (a, b) =>
        a.span.start.offset - b.span.start.offset || a.span.end.offset - b.span.end.offset || compareText(a.id, b.id),
    );
  }

  public get(id: string): SourceFunction | undefined {
    return this.functionsById.get(id);
  }

  public findByNode(node: Node): SourceFunction | null {
    return this.functionsByOffsets.get(this._offsetsKey(node.start, node.end)) ?? null;
  }

  public resolveRawLocation(location: RawLocation | null | undefined): SourceFunction | null {
    const span = this.spanFromLocation(location);
    return span ? this.resolveSpan(span) : null;
  }

  public resolveStart(line: number, column: number): SourceFunction | null {
    const offset = this.locations.offsetAt(line, column);
    return this.functionsByDeclarationStart.get(offset) ?? this.functionsByBodyStart.get(offset) ?? null;
  }

  public resolveSpan(span: SourceSpan): SourceFunction | null {
    const exactDeclaration = this.functionsByOffsets.get(this._offsetsKey(span.start.offset, span.end.offset));
    if (exactDeclaration) {
      return exactDeclaration;
    }
    const exactBody = this.functionsByBodyOffsets.get(this._offsetsKey(span.start.offset, span.end.offset));
    if (exactBody) {
      return exactBody;
    }
    const declarationStart = this.functionsByDeclarationStart.get(span.start.offset);
    if (declarationStart) {
      return declarationStart;
    }
    const bodyStart = this.functionsByBodyStart.get(span.start.offset);
    if (bodyStart) {
      return bodyStart;
    }
    let enclosing: SourceFunction | null = null;
    for (const fn of this.values()) {
      if (
        fn.declarationSpan.start.offset <= span.start.offset &&
        fn.declarationSpan.end.offset >= span.end.offset &&
        (!enclosing ||
          fn.declarationSpan.end.offset - fn.declarationSpan.start.offset <
            enclosing.declarationSpan.end.offset - enclosing.declarationSpan.start.offset)
      ) {
        enclosing = fn;
      }
    }
    return enclosing;
  }

  public enclosingFunctions(span: SourceSpan): SourceFunction[] {
    return this.values()
      .filter(
        fn => fn.declarationSpan.start.offset <= span.start.offset && fn.declarationSpan.end.offset >= span.end.offset,
      )
      .sort(
        (a, b) =>
          a.declarationSpan.end.offset -
          a.declarationSpan.start.offset -
          (b.declarationSpan.end.offset - b.declarationSpan.start.offset),
      );
  }

  public resolveEnclosingFunction(span: SourceSpan, eligibleFunctionIds: ReadonlySet<string>): SourceFunction | null {
    return this.enclosingFunctions(span).find(fn => eligibleFunctionIds.has(fn.id)) ?? null;
  }

  public spanFromLocation(location: RawLocation | null | undefined): SourceSpan | null {
    if (!location?.start) {
      return null;
    }
    const start = this._positionAt(location.start.line, location.start.column);
    const rawEnd = location.end ?? location.start;
    const end = this._positionAt(rawEnd.line, rawEnd.column);
    return { start, end: end.offset < start.offset ? start : end };
  }

  public pointSpan(line: number, column: number): SourceSpan {
    const point = this._positionAt(line, column);
    return { start: point, end: point };
  }

  public spanFromNode(node: Node): SourceSpan | null {
    if (typeof node.start !== 'number' || typeof node.end !== 'number') {
      return null;
    }
    return {
      start: this.locations.positionAt(node.start),
      end: this.locations.positionAt(node.end),
    };
  }

  public recordManualMemo(
    functionId: string,
    kind: 'use-memo' | 'use-callback' | 'react-memo',
    hasComparator = false,
  ): ManualMemoization | null {
    const fn = this.functionsById.get(functionId);
    if (!fn) {
      return null;
    }
    const memo = (fn.manualMemo ??= {
      useMemo: 0,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    if (kind === 'use-memo') {
      memo.useMemo++;
    } else if (kind === 'use-callback') {
      memo.useCallback++;
    } else {
      memo.reactMemo = true;
      memo.reactMemoHasComparator ||= hasComparator;
    }
    return memo;
  }

  public recordFinding(functionId: string, finding: RiskFinding): void {
    const fn = this.functionsById.get(functionId);
    if (!fn) {
      return;
    }
    const findings = (fn.findings ??= []);
    const key = this._findingKey(finding);
    if (!findings.some(existing => this._findingKey(existing) === key)) {
      findings.push(finding);
      findings.sort(compareRiskFindings);
    }
  }

  private _directiveOccurrences(statements: Node[], functionId: string | null): DirectiveOccurrence[] {
    const occurrences: DirectiveOccurrence[] = [];
    for (const statement of statements) {
      const directiveStatement = statement as Node & { directive?: string };
      const directive = directiveStatement.directive;
      const directiveType: DirectiveType | null =
        directive === 'use memo' ? 'use-memo' : directive === 'use no memo' ? 'use-no-memo' : null;
      if (!directiveType) {
        continue;
      }
      const span = this.spanFromNode(statement);
      if (!span) {
        continue;
      }
      const lineText = this.source.split(/\r\n|[\r\n\u2028\u2029]/)[span.start.line - 1] ?? '';
      const comment = this.parsed?.comments.find(
        candidate =>
          candidate.start >= span.end.offset &&
          this.locations.positionAt(candidate.start).line === span.end.line &&
          this.source.slice(span.end.offset, candidate.start).trim() === '',
      );
      const justified = Boolean(comment && JUSTIFIED_RE.test(comment.value));
      const occurrence: DirectiveOccurrence = {
        id: `${this.relativeFile}#directive-${span.start.offset}-${span.end.offset}`,
        directiveType,
        functionId,
        span,
        line: span.start.line,
        column: span.start.column,
        lineText,
        justified,
        ...(justified ? { justification: comment!.value.trim() } : {}),
      };
      occurrences.push(occurrence);
      this.allDirectives.push(occurrence);
    }
    return occurrences;
  }

  private _positionAt(line: number, column: number): SourcePosition {
    return this.locations.positionAt(this.locations.offsetAt(line, column));
  }

  private _offsetsKey(start: number, end: number): string {
    return `${start}:${end}`;
  }

  private _findingKey(finding: RiskFinding): string {
    return `${finding.ruleId}\0${finding.line}\0${finding.column}\0${finding.symbol}\0${finding.message}`;
  }
}

export function populateSourceFunctions(source: string, filePath: string, index: SourceFunctionIndex): void;
export function populateSourceFunctions(parsed: ParsedSource, index: SourceFunctionIndex): void;
export function populateSourceFunctions(
  sourceOrParsed: string | ParsedSource,
  filePathOrIndex: string | SourceFunctionIndex,
  maybeIndex?: SourceFunctionIndex,
): void {
  const parsed =
    typeof sourceOrParsed === 'string' ? parseSource(sourceOrParsed, filePathOrIndex as string) : sourceOrParsed;
  const index = typeof sourceOrParsed === 'string' ? maybeIndex! : (filePathOrIndex as SourceFunctionIndex);
  index.addProgram(parsed);
}
