import { parseSource } from '../ast/parse';
import { collectSuppressions, compilerSuppressions } from '../suppressions';

const collect = (source: string) => collectSuppressions(parseSource(source, 'fixture.tsx'));
const eligible = (source: string) => compilerSuppressions(parseSource(source, 'fixture.tsx'));

describe('source-aware React ESLint suppressions', () => {
  it('records rule lists, reasons and exact UTF-16 comment locations, not string contents', () => {
    const source = `const text = "😀 eslint-disable react-hooks/rules-of-hooks";
/* eslint-disable no-console, react-hooks/exhaustive-deps -- reviewed separately */
const template = \`eslint-disable react-hooks/exhaustive-deps\`;
/* eslint-enable react-hooks/exhaustive-deps */
`;
    const directives = collect(source);
    expect(directives).toHaveLength(2);
    expect(directives[0]).toMatchObject({
      kind: 'disable',
      rules: ['no-console', 'react-hooks/exhaustive-deps'],
      relevantRules: ['react-hooks/exhaustive-deps'],
      reason: 'reviewed separately',
      commentSpan: { start: { line: 2, column: 0, offset: source.indexOf('/*') } },
      scopes: [{ ruleId: 'react-hooks/exhaustive-deps', span: { end: { line: 4, column: 0 } } }],
    });
    expect(eligible(source)).toHaveLength(1);
  });

  it('tracks overlapping ranges, partial re-enables and all-rules enable independently', () => {
    const directives = collect(`/* eslint-disable */
const one = 1;
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-enable react-hooks/exhaustive-deps */
const two = 2;
/* eslint-enable */
const three = 3;`);
    expect(directives).toHaveLength(4);
    expect(directives[0].rules).toBeNull();
    expect(directives[0].scopes).toMatchObject([
      { ruleId: 'react-hooks/exhaustive-deps', span: { end: { line: 4 } } },
      { ruleId: 'react-hooks/rules-of-hooks', span: { end: { line: 6 } } },
    ]);
    expect(directives[1].scopes).toMatchObject([{ ruleId: 'react-hooks/exhaustive-deps', span: { end: { line: 4 } } }]);
  });

  it('bounds line and multiline next-line directives by ESLint target lines', () => {
    const directives = eligible(`// eslint-disable-next-line react-hooks/rules-of-hooks -- intentional
const a = 1;
const b = 2; // eslint-disable-line
/* eslint-disable-next-line
react-hooks/exhaustive-deps */
const c = 3;
const d = 4;
`);
    expect(directives).toHaveLength(3);
    expect(directives[0].scopes[0].span).toMatchObject({ start: { line: 2 }, end: { line: 3 } });
    expect(directives[1].rules).toBeNull();
    expect(directives[1].scopes[0].span).toMatchObject({ start: { line: 3 }, end: { line: 4 } });
    expect(directives[2].scopes[0].span).toMatchObject({ start: { line: 6 }, end: { line: 7 } });
  });

  it.each([
    '// eslint-disable react-hooks/exhaustive-deps\n',
    '// eslint-enable react-hooks/rules-of-hooks\n',
    '/* prefix eslint-disable react-hooks/exhaustive-deps */',
    '/* eslint-disable react-hooks/exhaustive-deps-not-a-rule */',
    '/* eslint-disable react-hooks/unknown */',
    '/* eslint-disable no-console */',
    '/* eslint-enable react-hooks/exhaustive-deps */',
    '/* eslint-disable , */',
    '/* eslint-disable "react-hooks/exhaustive-deps */',
    '/* eslint-disable --*/',
    '/* eslint-disable react-hooks/exhaustive-deps no-console */',
    '/* eslint-disable react-hooks/exhaustive-deps: off */',
    '/* eslint-disable-next-lin react-hooks/exhaustive-deps */',
    '/* eslint-disable-line\nreact-hooks/exhaustive-deps */',
    'const text = "/* eslint-disable react-hooks/exhaustive-deps */";',
    'const text = `// eslint-disable-next-line react-hooks/exhaustive-deps`;',
  ])('does not make malformed, unknown, unrelated or non-comment suppression eligible: %s', source => {
    expect(eligible(source)).toEqual([]);
  });

  it('accepts all-rules disables with reason-only payloads', () => {
    expect(eligible('/* eslint-disable -- reviewed */')[0]).toMatchObject({
      rules: null,
      reason: 'reviewed',
      relevantRules: ['react-hooks/exhaustive-deps', 'react-hooks/rules-of-hooks'],
    });
  });

  it('accepts ESLint quoted rule names, trailing commas and longer reason separators', () => {
    const [suppression] = eligible(
      '/* eslint-disable "react-hooks/exhaustive-deps", \'react-hooks/rules-of-hooks\', --- reviewed */',
    );
    expect(suppression).toMatchObject({
      rules: ['react-hooks/exhaustive-deps', 'react-hooks/rules-of-hooks'],
      reason: 'reviewed',
    });
    expect(eligible('/* eslint-disable --- reviewed all */')[0]).toMatchObject({
      rules: null,
      reason: 'reviewed all',
    });
  });

  it('does not confuse comment scope with function attribution', () => {
    const source = `/* eslint-disable react-hooks/exhaustive-deps */
import { memo } from 'react';
export const First = memo(() => { "use memo"; return () => 1; });
export const Second = () => { "use no memo"; return 2; };
`;
    const [suppression] = eligible(source);
    expect(suppression.scopes[0].span.end.offset).toBe(source.length);
    expect(suppression).not.toHaveProperty('functionId');
  });
});
