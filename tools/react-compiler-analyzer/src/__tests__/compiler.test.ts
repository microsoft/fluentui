import {
  extractDetailLoc,
  extractDetailReason,
  extractFullDiagnostic,
  resolveSkipReason,
  type CompilerEvent,
} from '../compiler';

describe('extractDetailLoc', () => {
  it('returns the line/column from a detail loc', () => {
    expect(extractDetailLoc({ loc: { start: { line: 50, column: 25 } } })).toEqual({ line: 50, column: 25 });
  });

  it('falls back to primaryLocation() when there is no .loc (CompilerDiagnostic)', () => {
    const detail = {
      primaryLocation: () => ({ start: { line: 6, column: 2 } }),
    };
    expect(extractDetailLoc(detail)).toEqual({ line: 6, column: 2 });
  });

  it('defaults column to 0 when only a line is present', () => {
    expect(extractDetailLoc({ loc: { start: { line: 7 } } })).toEqual({ line: 7, column: 0 });
  });

  it('returns null when there is no usable location', () => {
    expect(extractDetailLoc({})).toBeNull();
    expect(extractDetailLoc(null)).toBeNull();
    expect(extractDetailLoc('nope')).toBeNull();
  });
});

describe('extractDetailReason', () => {
  it('returns an empty string for null/undefined', () => {
    expect(extractDetailReason(null)).toBe('');
    expect(extractDetailReason(undefined)).toBe('');
  });

  it('joins reason, description and loc into a concise summary', () => {
    const detail = {
      reason: 'Cannot compile',
      description: 'mutates a ref during render',
      loc: { start: { line: 12, column: 4 } },
    };
    expect(extractDetailReason(detail)).toBe('Cannot compile mutates a ref during render (12:4)');
  });

  it('stays single-line and never includes the code frame', () => {
    const detail = {
      reason: 'This value cannot be modified',
      description: 'Modifying component props or hook arguments is not allowed.',
      printErrorMessage: () => 'line1\n> 50 | code\n      | ^^^',
    };
    const reason = extractDetailReason(detail);
    expect(reason).not.toContain('\n');
    expect(reason).toBe('This value cannot be modified Modifying component props or hook arguments is not allowed.');
  });
});

describe('extractFullDiagnostic', () => {
  it('returns the compiler code-framed diagnostic when available', () => {
    const source = 'const x = 1;\n';
    const detail = {
      reason: 'Cannot compile',
      printErrorMessage: (src: string, opts: { eslint: boolean }) =>
        `FULL DIAGNOSTIC for ${src.trim()} (eslint=${opts.eslint})`,
    };
    expect(extractFullDiagnostic(detail, source)).toBe('FULL DIAGNOSTIC for const x = 1; (eslint=false)');
  });

  it('returns an empty string when the detail cannot be printed', () => {
    expect(extractFullDiagnostic({ reason: 'no printer' }, 'x')).toBe('');
    expect(extractFullDiagnostic(null, 'x')).toBe('');
  });

  it('returns an empty string when printing throws', () => {
    const detail = {
      printErrorMessage: () => {
        throw new Error('boom');
      },
    };
    expect(extractFullDiagnostic(detail, 'x')).toBe('');
  });
});

describe('resolveSkipReason', () => {
  const source = ['export function useThing() {', "  'use no memo';", '  return 1;', '}', ''].join('\n');

  function skipEvent(reason: string, line: number): CompilerEvent {
    return {
      kind: 'CompileSkip',
      fnLoc: null,
      reason,
      loc: { start: { line, column: 2 } },
    };
  }

  it("recovers the directive text from source when the compiler emits '[object Object]'", () => {
    const event = skipEvent("Skipped due to '[object Object]' directive.", 2);
    expect(resolveSkipReason(event, source)).toBe("Skipped due to 'use no memo' directive.");
  });

  it('passes through a well-formed reason unchanged', () => {
    const event = skipEvent("Skipped due to 'use no memo' directive.", 2);
    expect(resolveSkipReason(event, source)).toBe("Skipped due to 'use no memo' directive.");
  });

  it('keeps the mangled token when the directive cannot be located in source', () => {
    const event = skipEvent("Skipped due to '[object Object]' directive.", 999);
    expect(resolveSkipReason(event, source)).toBe("Skipped due to '[object Object]' directive.");
  });

  it('falls back to a generic message when reason is absent', () => {
    const event: CompilerEvent = { kind: 'CompileSkip', fnLoc: null, loc: null };
    expect(resolveSkipReason(event, source)).toBe('compiler skipped this function');
  });
});
