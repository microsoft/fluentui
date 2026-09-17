import type { NodePath, PluginObj } from '@babel/core';
import type { Directive, Function as BabelFunction, Node, Program } from '@babel/types';

import { compareRiskFindings, compareSpans, compareText } from './ordering';
import { toWorkspacePath } from './path-utils';
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

interface SourceFunctionPluginOptions {
  index: SourceFunctionIndex;
}

type RawLocation = {
  start: { line: number; column: number };
  end?: { line: number; column: number };
};

const JUSTIFIED_RE = /(?:^|;)\s*justified\s*:/;

function syntaxOf(node: BabelFunction): SourceFunctionSyntax | null {
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

function identifierName(path: NodePath<BabelFunction>): string | null {
  const node = path.node;
  if ((node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') && node.id) {
    return node.id.name;
  }

  const parent = path.parentPath;
  if (parent?.isVariableDeclarator() && parent.node.init === node && parent.node.id.type === 'Identifier') {
    return parent.node.id.name;
  }
  if (parent?.isCallExpression() && parent.node.arguments[0] === node) {
    const declarator = parent.parentPath;
    if (declarator?.isVariableDeclarator() && declarator.node.id.type === 'Identifier') {
      return declarator.node.id.name;
    }
  }

  return null;
}

function wrapperName(path: NodePath<BabelFunction>): 'memo' | 'forwardRef' | null {
  const call = path.findParent(parent => parent.isCallExpression());
  if (!call?.isCallExpression() || call.node.arguments[0] !== path.node) {
    return null;
  }
  const callee = call.node.callee;
  if (callee.type === 'Identifier' && (callee.name === 'memo' || callee.name === 'forwardRef')) {
    return callee.name;
  }
  if (
    callee.type === 'MemberExpression' &&
    !callee.computed &&
    callee.property.type === 'Identifier' &&
    (callee.property.name === 'memo' || callee.property.name === 'forwardRef')
  ) {
    return callee.property.name;
  }
  return null;
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
 * Snapshot-local inventory of every function parsed in one source file.
 *
 * All producers resolve through this index instead of maintaining their own line/column aliases.
 */
export class SourceFunctionIndex {
  private readonly functionsById = new Map<string, SourceFunction>();
  private readonly functionsByOffsets = new Map<string, SourceFunction>();
  private readonly functionsByBodyOffsets = new Map<string, SourceFunction>();
  private readonly functionsByDeclarationStart = new Map<number, SourceFunction>();
  private readonly functionsByBodyStart = new Map<number, SourceFunction>();
  private readonly lineStarts: number[];
  private readonly relativeFile: string;
  private readonly allDirectives: DirectiveOccurrence[] = [];
  private orderedFunctions: SourceFunction[] | null = null;

  public constructor(public readonly source: string, public readonly entry: FileEntry, workspaceRoot: string) {
    this.relativeFile = toWorkspacePath(workspaceRoot, entry.filePath);
    this.lineStarts = [0];
    for (let offset = 0; offset < source.length; offset++) {
      if (source.charCodeAt(offset) === 10) {
        this.lineStarts.push(offset + 1);
      }
    }
  }

  public addFunction(path: NodePath<BabelFunction>): SourceFunction | null {
    const syntax = syntaxOf(path.node);
    const declarationSpan = this.spanFromNode(path.node);
    const bodySpan = this.spanFromNode(path.node.body);
    if (!syntax || !declarationSpan || !bodySpan) {
      return null;
    }

    const offsetsKey = this._offsetsKey(declarationSpan.start.offset, declarationSpan.end.offset);
    const existing = this.functionsByOffsets.get(offsetsKey);
    if (existing) {
      return existing;
    }

    const name = identifierName(path);
    const id = `${this.relativeFile}#${declarationSpan.start.offset}-${declarationSpan.end.offset}`;
    const bodyInsertionOffset =
      path.node.body.type === 'BlockStatement' ? Math.min(bodySpan.start.offset + 1, bodySpan.end.offset) : null;
    const fn: SourceFunction = {
      id,
      filePath: this.entry.filePath,
      packageName: this.entry.packageName,
      packageRoot: this.entry.packageRoot ?? null,
      name,
      kind: classify(name, wrapperName(path) !== null),
      syntax,
      declarationSpan,
      bodySpan,
      bodyInsertionOffset,
      bodyInsertionLine: bodyInsertionOffset === null ? null : bodySpan.start.line + 1,
      directives: [],
    };

    if (path.node.body.type === 'BlockStatement') {
      fn.directives.push(...this._directiveOccurrences(path.node.body.directives ?? [], id));
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
    this._directiveOccurrences(program.directives ?? [], null);
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
    if (typeof node.start !== 'number' || typeof node.end !== 'number') {
      return null;
    }
    return this.functionsByOffsets.get(this._offsetsKey(node.start, node.end)) ?? null;
  }

  public resolveRawLocation(location: RawLocation | null | undefined): SourceFunction | null {
    const span = this.spanFromLocation(location);
    return span ? this.resolveSpan(span) : null;
  }

  public resolveStart(line: number, column: number): SourceFunction | null {
    const offset = this._offsetAt(line, column);
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
    if (!node.loc || typeof node.start !== 'number' || typeof node.end !== 'number') {
      return null;
    }
    return {
      start: { line: node.loc.start.line, column: node.loc.start.column, offset: node.start },
      end: { line: node.loc.end.line, column: node.loc.end.column, offset: node.end },
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

  private _directiveOccurrences(directives: Directive[], functionId: string | null): DirectiveOccurrence[] {
    const occurrences: DirectiveOccurrence[] = [];
    for (const directive of directives) {
      const directiveType: DirectiveType | null =
        directive.value.value === 'use memo'
          ? 'use-memo'
          : directive.value.value === 'use no memo'
          ? 'use-no-memo'
          : null;
      const span = this.spanFromNode(directive);
      if (!directiveType || !span) {
        continue;
      }
      const lineText = this.source.split(/\r?\n/)[span.start.line - 1] ?? '';
      const trailingText = lineText.slice(span.end.column);
      const commentMatch = trailingText.match(/\/\/(.*)$/) ?? trailingText.match(/\/\*([\s\S]*?)\*\//);
      const commentText = commentMatch?.[1];
      const justified = commentText ? JUSTIFIED_RE.test(commentText) : false;
      const occurrence: DirectiveOccurrence = {
        id: `${this.relativeFile}#directive-${span.start.offset}-${span.end.offset}`,
        directiveType,
        functionId,
        span,
        line: span.start.line,
        column: span.start.column,
        lineText,
        justified,
        ...(justified ? { justification: commentText!.trim() } : {}),
      };
      occurrences.push(occurrence);
      this.allDirectives.push(occurrence);
    }
    return occurrences;
  }

  private _positionAt(line: number, column: number): SourcePosition {
    return { line, column, offset: this._offsetAt(line, column) };
  }

  private _offsetAt(line: number, column: number): number {
    const lineOffset = this.lineStarts[Math.max(0, line - 1)] ?? this.source.length;
    return Math.min(this.source.length, Math.max(0, lineOffset + column));
  }

  private _offsetsKey(start: number, end: number): string {
    return `${start}:${end}`;
  }

  private _findingKey(finding: RiskFinding): string {
    return `${finding.ruleId}\0${finding.line}\0${finding.column}\0${finding.symbol}\0${finding.message}`;
  }
}

/** Populate a {@link SourceFunctionIndex} during the same Babel pass as the compiler. */
export function sourceFunctionPlugin(): PluginObj {
  return {
    name: 'react-compiler-source-function-index',
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Program(path, state) {
        (state.opts as unknown as SourceFunctionPluginOptions).index.addFileDirectives(path.node);
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Function(path, state) {
        (state.opts as unknown as SourceFunctionPluginOptions).index.addFunction(path as NodePath<BabelFunction>);
      },
    },
  };
}
