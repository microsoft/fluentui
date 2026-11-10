import { escapeForStyleTag, escapeStyleTagTerminator } from './escapeForStyleTag';

describe('style tag escaping', () => {
  const backslash = '\\';
  const longRunLength = 20000;

  it('preserves a long nonmatching backslash run', () => {
    const value = new Array(longRunLength + 1).join(backslash) + 'x';

    expect(escapeForStyleTag(value)).toBe(value);
    expect(escapeStyleTagTerminator(value)).toBe(value);
  });

  it('escapes a terminator after a long backslash run', () => {
    const backslashes = new Array(longRunLength + 1).join(backslash);

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
