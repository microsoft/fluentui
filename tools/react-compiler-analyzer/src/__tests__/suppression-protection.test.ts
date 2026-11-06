import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { parseSource } from '../ast/parse';
import { SourceFunctionIndex, populateSourceFunctions } from '../source-functions';
import { applySuppressionProtection, planSuppressionProtection } from '../suppression-protection';

const body = `export function Component({ value }) { 'use memo'; return <span>{value}</span>; }\n`;
const suppression = '/* eslint-disable react-hooks/exhaustive-deps -- existing reason */\n';
const filePath = 'fixture.tsx';
const fixtureRoot = resolve(__dirname, '../../.test-output', `suppression-protection-${process.pid}`);

beforeAll(() => mkdirSync(fixtureRoot, { recursive: true }));
afterAll(() => rmSync(fixtureRoot, { recursive: true, force: true }));

describe('conservative module suppression guard planning', () => {
  it('does not mutate source and describes the deliberately wider effect and triggering locations', () => {
    const source = suppression + body;
    const plan = planSuppressionProtection(source, filePath);
    expect(plan.status).toBe('eligible');
    expect(plan.reason).toContain('conservative whole-module opt-out');
    expect(plan.reason).toContain('react-hooks/exhaustive-deps at 1:1');
    expect(plan.preview).toContain('// justified: cross-backend-suppression-protection;');
    expect(plan.preview).toContain(source);
    expect(plan.preview).toContain(`'use memo'`);
    expect(plan.preview!.slice(plan.edit!.text.length)).toBe(source);
    expect(planSuppressionProtection(plan.preview!, filePath).status).toBe('already-protected');
  });

  it.each(['use client', 'use server', 'use strict'])('preserves %s prologue, quotes, CRLF and imports', directive => {
    const source = `\ufeff"${directive}"; // existing prologue\r\n${suppression.replace(
      /\n/g,
      '\r\n',
    )}import { useState } from "react";\r\n${body.replace(/\n/g, '\r\n')}`;
    const plan = planSuppressionProtection(source, filePath);
    expect(plan.status).toBe('eligible');
    expect(plan.preview!.startsWith(`\ufeff"${directive}"; // existing prologue\r\n"use no memo";`)).toBe(true);
    expect(plan.preview!.replace(plan.edit!.text, '')).toBe(source);
    expect(plan.preview!.replace(/\r\n/g, '')).not.toContain('\n');
    const parsed = parseSource(plan.preview!, filePath);
    expect(parsed.program.body[0]).toMatchObject({ directive });
    expect(parsed.program.body[1]).toMatchObject({ directive: 'use no memo' });
  });

  it.each(['\ufeff', '#!/usr/bin/env node\r\n'])(
    'preserves a shebang or BOM, and keeps header comments attached to imports: %s',
    prefix => {
      const source = `${prefix}// eslint-disable-next-line react-hooks/rules-of-hooks\r\nimport { useState } from 'react';\r\n${body}`;
      const plan = planSuppressionProtection(source, filePath);
      expect(plan.status).toBe('eligible');
      expect(plan.preview!.startsWith(`${prefix}'use no memo';`)).toBe(true);
      expect(plan.preview!.replace(plan.edit!.text, '')).toBe(source);
      expect(plan.preview).toContain(
        "// eslint-disable-next-line react-hooks/rules-of-hooks\r\nimport { useState } from 'react';",
      );
    },
  );

  it.each([
    `// eslint-disable-next-line react-hooks/exhaustive-deps\n${body}`,
    `'use strict'; // eslint-disable-next-line react-hooks/exhaustive-deps\n${body}`,
    `'use strict';\n// eslint-disable-next-line react-hooks/exhaustive-deps\n${body}`,
    `'use strict'; ${body.trimEnd()} // eslint-disable-line react-hooks/exhaustive-deps`,
    `${body.trimEnd()} // eslint-disable-line react-hooks/exhaustive-deps`,
    `/* eslint-disable-next-line react-hooks/exhaustive-deps */\n${body}`,
  ])('preserves next-line/line target attachment: %s', source => {
    const plan = planSuppressionProtection(source, filePath);
    expect(plan.status).toBe('eligible');
    expect(plan.preview!.replace(plan.edit!.text, '')).toBe(source);
    expect(plan.preview).toContain(source.slice(source.indexOf('eslint-disable')));
    const originalTargets = plan.suppressions.flatMap(directive =>
      directive.scopes.map(scope => source.slice(scope.span.start.offset, scope.span.end.offset)),
    );
    const newTargets = planSuppressionProtection(plan.preview!, filePath).suppressions.flatMap(directive =>
      directive.scopes.map(scope => plan.preview!.slice(scope.span.start.offset, scope.span.end.offset)),
    );
    expect(newTargets).toEqual(originalTargets);
  });

  it('permits explicit quote preference', () => {
    expect(planSuppressionProtection(suppression + body, filePath, { quote: 'double' }).edit!.text).toMatch(
      /^"use no memo";/,
    );
  });

  it('generates a module-level directive recognized as justified by the existing source index', () => {
    const source = planSuppressionProtection(suppression + body, filePath).preview!;
    const index = new SourceFunctionIndex(source, { filePath, packageName: null }, process.cwd());
    populateSourceFunctions(source, filePath, index);
    expect(index.directives()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ functionId: null, directiveType: 'use-no-memo', justified: true }),
      ]),
    );
  });

  it.each([
    `"use no memo";\n${suppression}${body}`,
    `'use strict'; "use no memo"; // existing rationale\n${suppression}${body}`,
  ])('does not modify an existing module opt-out', source => {
    const plan = planSuppressionProtection(source, filePath);
    expect(plan.status).toBe('already-protected');
    expect(plan.edit).toBeUndefined();
  });

  it.each([`"use memo";\n${suppression}${body}`, `"use memo"; "use no memo";\n${suppression}${body}`])(
    'refuses module opt-in conflicts without replacing any authored directive',
    source => {
      const plan = planSuppressionProtection(source, filePath);
      expect(plan.status).toBe('conflict');
      expect(plan.edit).toBeUndefined();
    },
  );

  it('does not mistake late string expressions for module directives', () => {
    const source = `${suppression}const value = 1;\n"use memo";\n${body}`;
    expect(planSuppressionProtection(source, filePath).status).toBe('eligible');
  });

  it('rejects invalid input and unrelated or malformed suppressions', () => {
    expect(planSuppressionProtection(suppression + 'function {', filePath).status).toBe('invalid-source');
    expect(planSuppressionProtection('/* eslint-disable no-console */\n' + body, filePath).status).toBe('ineligible');
    expect(planSuppressionProtection('/* eslint-disable react-hooks/unknown */\n' + body, filePath).status).toBe(
      'ineligible',
    );
  });

  it('does not report opt-in conflicts in files without eligible suppressions', () => {
    expect(planSuppressionProtection('"use memo";\n' + body, filePath).status).toBe('ineligible');
    expect(planSuppressionProtection('"use memo";\n/* eslint-disable no-console */\n' + body, filePath).status).toBe(
      'ineligible',
    );
  });
});

describe('suppression guard write preflight', () => {
  const create = (name: string, source = suppression + body) => {
    const path = resolve(fixtureRoot, name);
    writeFileSync(path, source);
    return planSuppressionProtection(source, path);
  };

  it('previews exact edits without writing, writes once, and is idempotent', async () => {
    const plan = create('write.tsx');
    const original = readFileSync(plan.filePath, 'utf8');
    const dryRun = await applySuppressionProtection([plan], { dryRun: true });
    expect(dryRun).toMatchObject({
      filesModified: 0,
      filesPlanned: 1,
      results: [{ status: 'would-write', preview: plan.preview }],
    });
    expect(readFileSync(plan.filePath, 'utf8')).toBe(original);
    expect(await applySuppressionProtection([plan])).toMatchObject({ filesModified: 1, filesPlanned: 1 });
    expect(readFileSync(plan.filePath, 'utf8')).toBe(plan.preview);
    const next = planSuppressionProtection(plan.preview!, plan.filePath);
    expect(await applySuppressionProtection([next])).toMatchObject({
      filesModified: 0,
      filesPlanned: 0,
      results: [{ status: 'skipped' }],
    });
  });

  it.each([false, true])('rejects a stale complete edit set before any write (dryRun=%s)', async dryRun => {
    const first = create(`a-${dryRun}.tsx`);
    const last = create(`z-${dryRun}.tsx`);
    const original = readFileSync(first.filePath, 'utf8');
    writeFileSync(last.filePath, suppression + body + '// changed');
    await expect(applySuppressionProtection([first, last], { dryRun })).rejects.toThrow('stale source');
    expect(readFileSync(first.filePath, 'utf8')).toBe(original);
  });

  it('rejects tampered preview, edit offsets and duplicate files before writing', async () => {
    const plan = create('tampered.tsx');
    await expect(applySuppressionProtection([{ ...plan, preview: 'bad' }])).rejects.toThrow('Invalid');
    await expect(
      applySuppressionProtection([{ ...plan, edit: { ...plan.edit!, offset: plan.edit!.offset + 1 } }]),
    ).rejects.toThrow('Invalid');
    await expect(applySuppressionProtection([plan, plan])).rejects.toThrow('Duplicate');
    expect(readFileSync(plan.filePath, 'utf8')).toBe(suppression + body);
  });

  it('reports conflicts and invalid inputs explicitly while leaving them unchanged', async () => {
    const conflict = create('conflict.tsx', "'use memo';\n" + suppression + body);
    const invalid = create('invalid.tsx', suppression + 'function {');
    const result = await applySuppressionProtection([conflict, invalid]);
    expect(result).toMatchObject({
      filesModified: 0,
      filesPlanned: 0,
      results: [{ status: 'conflict' }, { status: 'skipped', reason: expect.stringContaining('cannot be parsed') }],
    });
  });
});
