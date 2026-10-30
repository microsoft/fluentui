import { createHash } from 'node:crypto';
import { copyFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { basename, join } from 'node:path';

import { runLint } from '../commands/lint';
import { compileFile } from '../compiler';
import type { CompilationMode, DirectiveOccurrence, JsonDirective, LintDocument } from '../types';
import { captureJson } from './helpers/output';

const fixtures = join(__dirname, '__fixtures__/lint-baseline');
interface BaselineCase {
  mode: CompilationMode;
  fix: boolean;
  revalidate: boolean;
  exitCode: number;
  document: Pick<LintDocument, 'directives' | 'unparseable'>;
  sources: Record<string, string>;
  secondExitCode: number;
  secondDocument: Pick<LintDocument, 'directives' | 'unparseable'>;
  idempotent: boolean;
}
const baseline = JSON.parse(readFileSync(join(fixtures, 'expected-babel.json'), 'utf8')) as {
  sourceHashes: Record<string, string>;
  cases: BaselineCase[];
};
const identities = JSON.parse(readFileSync(join(fixtures, 'expected-source-identity.json'), 'utf8'));
const reviewed = JSON.parse(readFileSync(join(fixtures, 'reviewed-oxc-deltas.json'), 'utf8'));

function directiveIdentity({
  id,
  functionId,
  directiveType,
  span,
  line,
  column,
  lineText,
  justified,
  justification,
}: DirectiveOccurrence) {
  return {
    id,
    functionId,
    directiveType,
    span,
    line,
    column,
    lineText,
    justified,
    ...(justification ? { justification } : {}),
  };
}

function stableRows(directives: JsonDirective[]) {
  return directives.map(
    ({ file, line, column, directive, status, compilerEvent, function: name, justified, revalidated }) => ({
      file: basename(file),
      line,
      column,
      directive,
      status,
      compilerEvent,
      function: name,
      ...(justified ? { justified } : {}),
      ...(revalidated ? { revalidated } : {}),
    }),
  );
}

function expectedOxcRows(expected: BaselineCase, second = false) {
  const rows = stableRows(second ? expected.secondDocument.directives : expected.document.directives);
  const native = baseline.cases
    .find(item => item.mode === 'all' && !item.fix && !item.revalidate)!
    .document.directives.find(item => item.file === 'native.ts')!;
  const adjusted = rows
    .filter(row => !(expected.mode === 'all' && expected.fix && ['FileOptOut', 'Native'].includes(row.function ?? '')))
    .map(row => {
      const delta = reviewed.deltas.find(
        (item: { file: string; function: string; modes: string[]; revalidateOnly?: boolean }) =>
          item.file === row.file &&
          item.function === row.function &&
          item.modes.includes(expected.mode) &&
          (!item.revalidateOnly || expected.revalidate),
      );
      return delta ? { ...row, ...delta.oxc } : row;
    });
  if (expected.mode === 'all' && expected.fix) {
    const row = stableRows([native])[0];
    adjusted.push({
      ...row,
      status: expected.revalidate ? 'active' : 'skipped',
      compilerEvent: expected.revalidate ? 'CompileSuccess' : 'skipped',
      ...(expected.revalidate ? { justified: true, revalidated: true } : {}),
    });
  }
  return adjusted.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column);
}

describe('frozen pre-port lint baseline', () => {
  let root: string;
  beforeEach(() => {
    root = mkdtempSync(join(process.cwd(), '.rca-lint-regression-'));
    for (const name of Object.keys(baseline.sourceHashes)) {
      copyFileSync(join(fixtures, name), join(root, name));
    }
  });
  afterEach(() => rmSync(root, { recursive: true, force: true }));

  it('pins the exact original input bytes and authoritative Babel source spans', async () => {
    for (const [name, hash] of Object.entries(baseline.sourceHashes)) {
      const source = readFileSync(join(root, name));
      expect(createHash('sha256').update(source).digest('hex')).toBe(hash);
      const result = await compileFile(
        { filePath: join(root, name), packageName: null },
        'infer',
        false,
        {},
        undefined,
        root,
      );
      expect(result.error).toBeUndefined();
      expect({
        sourceHash: result.sourceHash,
        functions: result.sourceFunctions
          .values()
          .map(
            ({ id, name: functionName, kind, syntax, declarationSpan, bodySpan, bodyInsertionOffset, directives }) => ({
              id,
              name: functionName,
              kind,
              syntax,
              declarationSpan,
              bodySpan,
              bodyInsertionOffset,
              directives: directives.map(directiveIdentity),
            }),
          ),
        directives: result.sourceFunctions.directives().map(directiveIdentity),
      }).toEqual(identities[name]);
    }
  });

  it.each(baseline.cases)(
    'preserves $mode fix=$fix revalidate=$revalidate statuses, exits and exact edits',
    async expected => {
      const argv = {
        paths: [root, join(root, 'directives.tsx')],
        mode: expected.mode,
        fix: expected.fix,
        'revalidate-justified': expected.revalidate,
        'strict-paths': true,
        concurrency: 2,
        exclude: ['**/node_modules/**'],
        verbose: false,
        format: 'json' as const,
      };
      const first = await captureJson<LintDocument>(() => runLint(argv));
      expect(first.doc.schemaVersion).toBe(4);
      // The reviewed module opt-in divergence is a remaining broken directive in every case.
      expect(first.code).toBe(1);
      expect(first.doc.unparseable).toEqual(expected.document.unparseable);
      expect(stableRows(first.doc.directives)).toEqual(expectedOxcRows(expected));
      const readSources = () =>
        Object.fromEntries(
          Object.keys(baseline.sourceHashes).map(name => [name, readFileSync(join(root, name), 'utf8')]),
        );
      const firstSources = readSources();
      const expectedSources = { ...expected.sources };
      if (expected.mode === 'all' && expected.fix) {
        expectedSources['file-level.tsx'] = baseline.cases.find(
          item => item.mode === 'infer' && item.fix && item.revalidate === expected.revalidate,
        )!.sources['file-level.tsx'];
        expectedSources['native.ts'] = reviewed.deltas.find(
          (item: { function: string }) => item.function === 'Native',
        ).fixedSource;
      }
      expect(firstSources).toEqual(expectedSources);
      const second = await captureJson<LintDocument>(() => runLint(argv));
      expect(second.code).toBe(1);
      expect(stableRows(second.doc.directives)).toEqual(expectedOxcRows(expected, true));
      expect(readSources()).toEqual(firstSources);
      expect(expected.idempotent).toBe(true);
    },
  );
});
