import { escapeForStyleTag, escapeStyleTagTerminator } from './escapeForStyleTag';

describe('style tag escaping', () => {
  const backslash = '\\';
  const increasingRunLengths = [5000, 10000, 20000];

  it.each(increasingRunLengths)('handles a long nonmatching backslash run of length %s', runLength => {
    const value = new Array(runLength + 1).join(backslash) + 'x';

    expect(escapeForStyleTag(value)).toBe(value);
    expect(escapeStyleTagTerminator(value)).toBe(value);
  });

  it.each(increasingRunLengths)('handles a long matching backslash run of length %s', runLength => {
    const backslashes = new Array(runLength + 1).join(backslash);

    expect(escapeForStyleTag(`${backslashes}</style>`)).toBe(`${backslashes}${backslash}3C /style${backslash}3E `);
    expect(escapeStyleTagTerminator(`${backslashes}</StYlE>`)).toBe(`${backslashes}${backslash}3C /StYlE>`);
  });

  it('preserves odd and even runs around mixed characters', () => {
    expect(escapeForStyleTag(`a${backslash}<b${backslash}${backslash}>c`)).toBe(
      `a${backslash}3C b${backslash}${backslash}${backslash}3E c`,
    );
    expect(escapeStyleTagTerminator(`a${backslash}</STYLE>b${backslash}${backslash}</style>c`)).toBe(
      `a${backslash}3C /STYLE>b${backslash}${backslash}${backslash}3C /style>c`,
    );
  });
});
