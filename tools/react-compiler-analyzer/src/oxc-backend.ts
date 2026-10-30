import { decodedMappings, TraceMap } from '@jridgewell/trace-mapping';
import { parseSync, Visitor, type ConditionalExpression, type Node, type Program } from 'oxc-parser';
import { transform, transformSync, type OxcError, type TransformResult } from 'oxc-transform-react';

import { ScopeResolver } from './ast/scope';
import type { CompilerEvent, CompileResult } from './compiler';
import { populateSourceFunctions, SourceFunctionIndex } from './source-functions';
import type { CompilationMode, SourceFunction } from './types';

export const ANALYSIS_GATE = { source: '__rca_gate__', importSpecifierName: '__rcaGate' } as const;

let verifiedShape = false;

function verifyCompilerShape(): void {
  if (verifiedShape) {
    return;
  }
  const filename = 'rca-canary.tsx';
  const source = `export function RcaCanary(value: number): number;
export function RcaCanary(value: number) { "use memo"; return value + 1; }
export const RcaArrow = ({ value }: { value: number }) => <div>{value}</div>;`;
  const result = transformSync(filename, source, {
    jsx: 'preserve',
    sourcemap: true,
    reactCompiler: { target: '19', panicThreshold: 'none', reportDiagnostics: true, gating: ANALYSIS_GATE },
  });
  let valid = false;
  if (!result.fatal && result.errors.length === 0 && result.map) {
    const index = new SourceFunctionIndex(source, { filePath: filename, packageName: null }, process.cwd());
    populateSourceFunctions(source, filename, index);
    const events = mappedSuccesses(result, source, index);
    valid =
      events.length === 2 &&
      events.some(event => event.fnName === 'RcaCanary' && event.memoSlots === 0) &&
      events.some(event => event.fnName === 'RcaArrow' && (event.memoSlots ?? 0) > 0);
  }
  if (!valid) {
    throw new Error('Unsupported Oxc React Compiler output: pinned gating canary failed');
  }
  verifiedShape = true;
}

function lineStarts(source: string): number[] {
  const starts = [0];
  for (let offset = 0; offset < source.length; offset++) {
    const code = source.charCodeAt(offset);
    if (code === 13 && source.charCodeAt(offset + 1) === 10) {
      offset++;
    }
    if (code === 10 || code === 13 || code === 0x2028 || code === 0x2029) {
      starts.push(offset + 1);
    }
  }
  return starts;
}

export function utf8OffsetToUtf16(source: string, offset: number): number {
  if (!Number.isInteger(offset) || offset < 0 || offset > Buffer.byteLength(source)) {
    throw new Error(`Invalid compiler diagnostic byte offset: ${offset}`);
  }
  const bytes = Buffer.from(source);
  if (offset < bytes.length && bytes[offset] >= 0x80 && bytes[offset] < 0xc0) {
    throw new Error(`Compiler diagnostic byte offset splits a UTF-8 character: ${offset}`);
  }
  return bytes.subarray(0, offset).toString('utf8').length;
}

function position(source: string, offset: number): { line: number; column: number } {
  const starts = lineStarts(source);
  let low = 0;
  let high = starts.length;
  while (low + 1 < high) {
    const middle = Math.floor((low + high) / 2);
    if (starts[middle] <= offset) {
      low = middle;
    } else {
      high = middle;
    }
  }
  return { line: low + 1, column: offset - starts[low] };
}

export function parseCompilerSource(filename: string, source: string): Program {
  const parsed = parseSync(filename, source, { showSemanticErrors: true });
  if (parsed.errors.length) {
    throw Object.assign(new SyntaxError(parsed.errors.map(error => error.codeframe ?? error.message).join('\n')), {
      code: 'RCA_PARSE_ERROR',
    });
  }
  return parsed.program;
}

function functionLocation(fn: SourceFunction): NonNullable<CompilerEvent['fnLoc']> {
  return { start: fn.declarationSpan.start, end: fn.declarationSpan.end };
}

function within(fn: SourceFunction, offset: number): boolean {
  return fn.declarationSpan.start.offset <= offset && offset < fn.declarationSpan.end.offset;
}

function owningFunction(functions: SourceFunction[], offsets: number[]): SourceFunction | undefined {
  return functions
    .filter(fn => offsets.every(offset => within(fn, offset)))
    .sort(
      (a, b) =>
        a.declarationSpan.end.offset -
        a.declarationSpan.start.offset -
        (b.declarationSpan.end.offset - b.declarationSpan.start.offset),
    )[0];
}

function mappedSuccesses(output: TransformResult, source: string, index: SourceFunctionIndex): CompilerEvent[] {
  if (!output.map) {
    throw new Error('Oxc did not return the source map required for compiler attribution');
  }
  if (
    output.map.sources.length !== 1 ||
    output.map.sourcesContent?.length !== 1 ||
    output.map.sourcesContent[0] !== source
  ) {
    throw new Error('Oxc source map does not identify the original source input');
  }
  const program = parseCompilerSource('compiled.jsx', output.code);
  const scopes = new ScopeResolver(program);
  const functions = index.values();
  const generatedStarts = lineStarts(output.code);
  const originalStarts = lineStarts(source);
  const points: { generated: number; original: number }[] = [];
  decodedMappings(new TraceMap(JSON.stringify(output.map))).forEach((segments, line) => {
    for (const segment of segments) {
      if (segment.length === 4 || segment.length === 5) {
        points.push({
          generated: generatedStarts[line] + segment[0],
          original: originalStarts[segment[2]] + segment[3],
        });
      }
    }
  });
  const events: CompilerEvent[] = [];
  const attributed = new Set<string>();
  new Visitor({
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Oxc visitor keys are AST node kinds.
    ConditionalExpression: (node: ConditionalExpression) => {
      if (node.test.type !== 'CallExpression' || node.test.callee.type !== 'Identifier') {
        return;
      }
      const gateImport = scopes.bindingOf(node.test.callee)?.importBinding;
      if (
        gateImport?.source !== ANALYSIS_GATE.source ||
        gateImport.importedName !== ANALYSIS_GATE.importSpecifierName
      ) {
        return;
      }
      const original = node.alternate;
      const compiled = node.consequent;
      if (
        !['FunctionExpression', 'ArrowFunctionExpression'].includes(original.type) ||
        !['FunctionExpression', 'ArrowFunctionExpression'].includes(compiled.type)
      ) {
        throw new Error('Unsupported Oxc compiler gating shape');
      }
      // Only explicit mappings in the original branch establish source provenance. A lookup
      // at a generated token can inherit a mapping belonging to its preceding sibling.
      const offsets = points
        .filter(point => original.start <= point.generated && point.generated < original.end)
        .map(point => point.original)
        .filter(offset => functions.some(fn => within(fn, offset)));
      const fn = offsets.length ? owningFunction(functions, offsets) : undefined;
      if (!fn || attributed.has(fn.id)) {
        throw new Error('Oxc gated output has missing or ambiguous original-function provenance');
      }
      attributed.add(fn.id);
      let slots = 0;
      const inspect = (child: Node): void => {
        if (child !== compiled && /^(?:Function|ArrowFunction)/.test(child.type)) {
          return;
        }
        const runtimeImport =
          child.type === 'CallExpression' && child.callee.type === 'Identifier'
            ? scopes.bindingOf(child.callee)?.importBinding
            : undefined;
        if (
          child.type === 'CallExpression' &&
          runtimeImport?.importedName === 'c' &&
          ['react/compiler-runtime', 'react-compiler-runtime'].includes(runtimeImport.source)
        ) {
          const count = child.arguments[0];
          if (
            count?.type !== 'Literal' ||
            typeof count.value !== 'number' ||
            !Number.isInteger(count.value) ||
            count.value < 0
          ) {
            throw new Error('Oxc compiler emitted an unsupported memo-cache allocation');
          }
          slots += count.value;
        }
        for (const key of Object.keys(child)) {
          if (key === 'parent') {
            continue;
          }
          const value: unknown = Reflect.get(child, key);
          if (Array.isArray(value)) {
            for (const item of value) {
              if (isNode(item)) {
                inspect(item);
              }
            }
          } else if (isNode(value)) {
            inspect(value);
          }
        }
      };
      inspect(compiled);
      events.push({ kind: 'CompileSuccess', fnLoc: functionLocation(fn), fnName: fn.name, memoSlots: slots });
    },
  }).visit(program);
  return events;
}

function isNode(value: unknown): value is Node {
  return typeof value === 'object' && value !== null && 'type' in value && typeof value.type === 'string';
}

function diagnosticEvent(
  error: OxcError,
  source: string,
  index: SourceFunctionIndex,
  eligible: Set<string>,
): CompilerEvent {
  const label = error.labels[0];
  const offset = label ? utf8OffsetToUtf16(source, label.start) : undefined;
  // Diagnostics inside a callback reject its enclosing compiler candidate, not the callback.
  const candidates = index.values().filter(fn => eligible.has(fn.id));
  let fn =
    offset === undefined
      ? undefined
      : candidates
          .filter(candidate => within(candidate, offset))
          .sort((a, b) => a.declarationSpan.start.offset - b.declarationSpan.start.offset)[0];
  // Suppression diagnostics may point to a comment immediately preceding a declaration.
  if (!fn && offset !== undefined && error.message === 'React rule suppression prevents optimization') {
    const end = utf8OffsetToUtf16(source, label.end);
    const next = candidates.find(candidate => candidate.declarationSpan.start.offset >= end);
    if (next && /^\s*$/.test(source.slice(end, next.declarationSpan.start.offset))) {
      fn = next;
    }
  }
  const loc = offset === undefined ? undefined : { start: position(source, offset) };
  const category = /react-compiler\(([^)]+)\)/.exec(error.codeframe ?? '')?.[1];
  return {
    kind: 'CompileError',
    fnLoc: fn ? functionLocation(fn) : null,
    fnName: fn?.name,
    detail: {
      reason: error.message,
      ...(label?.message ? { description: label.message } : {}),
      ...(loc ? { loc } : {}),
      ...(category ? { category } : {}),
      codeframe: error.codeframe,
    },
  };
}

export async function compileOxc(
  source: string,
  filename: string,
  mode: CompilationMode,
  index: SourceFunctionIndex,
): Promise<CompileResult> {
  const memoDirectives = index.directives().filter(directive => directive.directiveType === 'use-memo');
  const eligible = new Set(
    index
      .values()
      .filter(
        fn =>
          mode === 'all' ||
          memoDirectives.some(directive => !directive.functionId || directive.functionId === fn.id) ||
          (mode === 'infer' && (fn.kind === 'hook' || fn.kind === 'component')),
      )
      .map(fn => fn.id),
  );
  const run = async (ignoreUseNoForget = false): Promise<CompilerEvent[]> => {
    const output = await transform(filename, source, {
      jsx: 'preserve',
      sourcemap: true,
      reactCompiler: {
        compilationMode: mode,
        panicThreshold: 'none',
        target: '19',
        reportDiagnostics: true,
        gating: ANALYSIS_GATE,
        ...(ignoreUseNoForget ? { ignoreUseNoForget: true } : {}),
      },
    });
    if (output.fatal) {
      throw new Error(
        `Oxc compiler failed: ${output.errors.map(error => error.codeframe ?? error.message).join('\n')}`,
      );
    }
    const events = mappedSuccesses(output, source, index);
    for (const error of output.errors) {
      if (error.severity === 'Warning' || error.severity === 'Advice') {
        console.warn(`${filename}: Oxc ${error.severity}: ${error.codeframe ?? error.message}`);
        continue;
      }
      if (error.severity !== 'Error') {
        throw new Error(`Oxc returned an unknown diagnostic severity: ${error.severity}`);
      }
      const event = diagnosticEvent(error, source, index, eligible);
      if (
        event.fnLoc &&
        events.some(success => success.kind === 'CompileSuccess' && success.fnLoc?.start === event.fnLoc?.start)
      ) {
        throw new Error('Oxc returned both acceptance and rejection for the same source function');
      }
      events.push(event);
    }
    return events;
  };
  try {
    verifyCompilerShape();
    const events = await run();
    const optOuts = index.directives().filter(directive => directive.directiveType === 'use-no-memo');
    if (optOuts.length) {
      const candidates = await run(true);
      for (const fn of index.values()) {
        const optOut = optOuts.find(
          directive =>
            !directive.functionId ||
            directive.functionId === fn.id ||
            (within(fn, directive.span.start.offset) && directive.span.start.offset < fn.bodySpan.start.offset),
        );
        if (!optOut || events.some(event => event.fnLoc?.start === fn.declarationSpan.start)) {
          continue;
        }
        if (candidates.some(event => event.fnLoc?.start === fn.declarationSpan.start)) {
          events.push({
            kind: 'CompileSkip',
            fnLoc: functionLocation(fn),
            fnName: fn.name,
            reason: "Skipped due to 'use no memo' directive.",
            loc: { start: optOut.span.start, end: optOut.span.end },
          });
        }
      }
    }
    return { events };
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    return { events: [{ kind: 'PipelineError', fnLoc: null, data: error.message }], error };
  }
}
