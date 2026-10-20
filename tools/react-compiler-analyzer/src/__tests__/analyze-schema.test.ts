import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import Ajv from 'ajv';

import { toAnalysisDocument } from '../serializer';
import type { FunctionAnalysis } from '../types';

const schema = JSON.parse(readFileSync(join(__dirname, '..', '..', 'rca.analyze.schema.json'), 'utf-8')) as object;

describe('analyze JSON schema', () => {
  const validate = new Ajv({ allErrors: true }).compile(schema);

  it('accepts the compact analyze document', () => {
    const results: FunctionAnalysis[] = [
      {
        filePath: '/workspace/src/Component.tsx',
        packageName: 'app',
        line: 4,
        column: 7,
        functionName: 'Component',
        status: 'compiled',
        compilerEvent: 'CompileSuccess',
        memoStats: {
          memoSlots: 0,
          memoBlocks: null,
          memoValues: 1,
          prunedMemoBlocks: null,
          prunedMemoValues: 0,
        },
        manualMemo: {
          useMemo: 1,
          useCallback: 0,
          reactMemo: false,
          reactMemoHasComparator: false,
        },
        existingDirectives: { useMemo: false, useNoMemo: false },
        risks: [
          {
            ruleId: 'nonreactive-store-read',
            severity: 'medium',
            line: 5,
            column: 12,
            symbol: 'getAppStore',
            message: 'unsafe snapshot read',
          },
        ],
      },
    ];
    const document = toAnalysisDocument(results, {
      mode: 'infer',
      workspaceRoot: '/workspace',
      unparseable: [{ file: '/workspace/src/Broken.tsx', error: 'parse failed' }],
      annotate: {
        mode: 'manual-memo',
        filesModified: 1,
        functionsAnnotated: 1,
        functionsBailedOut: 0,
      },
    });

    expect(validate(document)).toBe(true);
    expect(validate.errors).toBeNull();
    expect(document.summary.memoCacheEmitted).toBe(0);
  });

  it('rejects fields outside the compact contract', () => {
    const document = {
      ...toAnalysisDocument([], { mode: 'infer', workspaceRoot: '/workspace' }),
      provenance: {},
    };

    expect(validate(document)).toBe(false);
    expect(validate.errors).toEqual(
      expect.arrayContaining([expect.objectContaining({ keyword: 'additionalProperties' })]),
    );
  });

  it('requires the emitted memo-cache summary counter', () => {
    const document = JSON.parse(
      JSON.stringify(toAnalysisDocument([], { mode: 'infer', workspaceRoot: '/workspace' })),
    ) as { summary: Record<string, unknown> };
    delete document.summary['memoCacheEmitted'];

    expect(validate(document)).toBe(false);
    expect(validate.errors).toEqual(expect.arrayContaining([expect.objectContaining({ keyword: 'required' })]));
  });
});
