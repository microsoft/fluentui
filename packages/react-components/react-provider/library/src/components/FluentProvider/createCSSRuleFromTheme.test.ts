import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-theme';
import type { PartialTheme } from '@fluentui/react-theme';
import { createCSSRuleFromTheme } from './createCSSRuleFromTheme';

describe('createCSSRuleFromTheme', () => {
  let logWarnSpy: jest.Spied<typeof console.warn>;

  beforeEach(() => {
    logWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('handles undefined theme', () => {
    expect(createCSSRuleFromTheme('.selector', undefined)).toMatchInlineSnapshot(`".selector {}"`);
  });

  it('handles a theme', () => {
    const theme: PartialTheme = {
      borderRadiusLarge: '10px',
      colorBackgroundOverlay: 'rgba(0, 0, 0, 0.4)',
    };

    expect(createCSSRuleFromTheme('.selector', theme)).toMatchInlineSnapshot(
      `".selector { --borderRadiusLarge: 10px; --colorBackgroundOverlay: rgba(0, 0, 0, 0.4);  }"`,
    );
  });

  it('prevents XSS by replacing angle brackets that could inject HTML', () => {
    const theme = {
      colorBrandBackground: '</style><script>alert("xss")</script>',
    } as PartialTheme;

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).toMatchInlineSnapshot(
      `".selector { --colorBrandBackground: \\\\3C /style\\\\3E \\\\3C script\\\\3E alert(\\"xss\\")\\\\3C /script\\\\3E ;  }"`,
    );
  });

  it('prevents XSS by replacing angle brackets in the selector', () => {
    const result = createCSSRuleFromTheme('.selector</style><script>alert("xss")</script>', undefined);

    expect(result).not.toContain('<');
    expect(result).toContain('\\3C /style>\\3C script>alert("xss")\\3C /script>');
  });

  it('preserves selector combinators while escaping rule delimiters', () => {
    expect(createCSSRuleFromTheme('body > .child[data-value="{}"]', undefined)).toBe(
      'body > .child[data-value="\\7B \\7D "] {}',
    );
    expect(createCSSRuleFromTheme('.selector} .other {', undefined)).toBe('.selector\\7D  .other \\7B  {}');
  });

  it.each([
    { value: String.raw`<`, expected: String.raw`\3C ` },
    { value: String.raw`\<`, expected: String.raw`\3C ` },
    { value: String.raw`\\<`, expected: String.raw`\\\3C ` },
    { value: String.raw`\\\<`, expected: String.raw`\\\3C ` },
  ])('preserves backslash parity for $value', ({ value, expected }) => {
    expect(createCSSRuleFromTheme(value, undefined)).toBe(`${expected} {}`);
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: `"${value}"` })).toBe(
      `.selector { --fontFamilyBase: "${expected}";  }`,
    );
  });

  it.each([
    '"Segoe UI", system-ui, sans-serif',
    'color-mix(in srgb, CanvasText 40%, transparent)',
    'clamp(1rem, calc(var(--scale, 1) * 2vw), 3rem)',
    '0 1px 2px rgb(0 0 0 / 20%), 0 4px 8px rgba(0, 0, 0, 0.1)',
    'revert-layer',
    'url(data:image/svg+xml;charset=utf-8,%3Csvg%3E;%3C/svg%3E)',
    '"value; with { delimiters }"',
    'custom({ value; [other] })',
    'calc(1px /* ; } */ + 2px)',
    String.raw`red\;blue`,
    String.raw`"escaped \"quote\""`,
    '"font\\\nfamily"',
    '"font\\\r\nfamily"',
    '"font\\\rfamily"',
    '"font\\\ffamily"',
    String.raw`red /* \name \" \\ */`,
    String.raw`url(image\20 name.png)`,
    String.raw`url(\69mage.png)`,
    String.raw`url( \69mage.png)`,
    String.raw`url("\69mage.png")`,
    String.raw`\55rl(resource/*)`,
    String.raw`u\52l(resource/*)`,
    String.raw`ur\4c(resource/*)`,
    String.raw`\75rl(resource/*)`,
    String.raw`\U\72L(resource/*)`,
    String.raw`\55 rl(resource/*)`,
    String.raw`u\52${'\r\n'}l(resource/*)`,
    String.raw`\000055rl(resource/*)`,
    'URL(resource/*)',
    '\\u\\r\\l(resource/*)',
    '#url(/* ) */; x)',
    '@url(/* ) */; x)',
    String.raw`#\75rl(/* ) */; x)`,
    String.raw`f\6f o((x); y)`,
    String.raw`url("image" (x); fallback)`,
    'url( image.png )',
    'url( )',
    'url(a{)',
    'url(/*)',
    'calc(\n  1px + 2px\n)',
    String.raw`\7D `,
  ])('preserves valid CSS in %j', value => {
    const theme: PartialTheme & { customToken: string } = { customToken: value };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe(`.selector { --customToken: ${value};  }`);
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it.each([
    { value: 'red; color: transparent', expected: String.raw`red\3B  color: transparent` },
    { value: 'red}', expected: String.raw`red\7D ` },
    { value: 'calc([1px)]', expected: String.raw`calc([1px\29 ])` },
    { value: 'calc(1px', expected: 'calc(1px)' },
    { value: '"red', expected: '"red"' },
    { value: '"red\n; color: red', expected: String.raw`"red\A ; color: red"` },
    { value: 'red /* comment', expected: 'red /* comment*/' },
    { value: 'red\\', expected: String.raw`red\5C ` },
    { value: 'first\\\nsecond', expected: 'first\\5C \nsecond' },
    { value: 'url(resource', expected: 'url(resource)' },
    { value: 'url(resource\\', expected: String.raw`url(resource\5C )` },
    { value: 'url(\\x")', expected: 'url(\\x")' },
    { value: 'url(image.png fallback)', expected: 'url(image.png fallback)' },
    { value: 'url(image(.png)', expected: 'url(image(.png)' },
    { value: 'url(image\u000B.png)', expected: 'url(image\u000B.png)' },
    { value: 'url(resource/*);token/**/)', expected: String.raw`url(resource/*)\3B token/**/\29 ` },
  ])('contains malformed CSS in $value', ({ value, expected }) => {
    const theme = { customToken: value, colorBrandBackground: 'blue' };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe(
      `.selector { --customToken: ${expected}; --colorBrandBackground: blue;  }`,
    );
    expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"customToken"'));
    expect(logWarnSpy.mock.calls[0][0]).not.toContain(value);
  });

  it.each([
    { value: '<url(a{)', expected: String.raw`\3C url(a{\29 })` },
    { value: '>url(a{)', expected: String.raw`\3E url(a{\29 })` },
    { value: '<url(/*)', expected: String.raw`\3C url(/*)*/)` },
    { value: String.raw`\<url(a{)`, expected: String.raw`\3C url(a{\29 })` },
    { value: String.raw`\\<url(a{)`, expected: String.raw`\\\3C url(a{\29 })` },
    { value: String.raw`ur\ l(resource{)`, expected: String.raw`ur\ l(resource{\29 })` },
    { value: String.raw`\54rl(resource/*)`, expected: String.raw`\54rl(resource/*)*/)` },
    { value: String.raw`\100075rl(a{)`, expected: String.raw`\100075rl(a{\29 })` },
    { value: String.raw`\000000url(a{)`, expected: String.raw`\000000url(a{\29 })` },
    { value: ';url(a{)', expected: String.raw`\3B url(a{\29 })` },
    { value: '}url(a[)', expected: String.raw`\7D url(a[\29 ])` },
    { value: 'red;url(a{)', expected: String.raw`red\3B url(a{\29 })` },
    { value: String.raw`;\75rl(a{)`, expected: String.raw`\3B \75rl(a{\29 })` },
  ])('contains malformed blocks in the final escaped syntax for $value', ({ value, expected }) => {
    const theme = { customToken: value, colorBrandBackground: 'blue' };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe(
      `.selector { --customToken: ${expected}; --colorBrandBackground: blue;  }`,
    );
    expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"customToken"'));
  });

  it.each(['', 'token name', 'token:name', 'token;name', 'token\\', 'token\\\nname', 'token\\000031  name'])(
    'omits unsupported token name %j',
    tokenName => {
      expect(createCSSRuleFromTheme('.selector', { [tokenName]: 'private-value', colorBrandBackground: 'blue' })).toBe(
        '.selector { --colorBrandBackground: blue;  }',
      );
      expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(tokenName)));
      expect(logWarnSpy.mock.calls[0][0]).not.toContain('private-value');
    },
  );

  it.each([
    'custom-token_1',
    'custom\u00DCnicode',
    String.raw`custom\ token`,
    String.raw`custom\3A token`,
    String.raw`custom\31\32`,
    String.raw`custom\000031a`,
    'custom\\000031\r\ntoken',
    String.raw`custom\\token`,
  ])('preserves supported token name %j', tokenName => {
    expect(createCSSRuleFromTheme('.selector', { [tokenName]: 'red' })).toBe(`.selector { --${tokenName}: red;  }`);
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NaN, null, undefined, true, {}, ['red']])(
    'omits unsupported runtime value %j without coercion',
    value => {
      const theme: PartialTheme & { customToken: unknown } = { customToken: value, colorBrandBackground: 'blue' };
      expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --colorBrandBackground: blue;  }');
      expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"customToken"'));
    },
  );

  it('does not call custom coercion methods', () => {
    const value = { toString: jest.fn(() => 'red') };
    const theme: PartialTheme & { customToken: unknown } = { customToken: value, colorBrandBackground: 'blue' };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --colorBrandBackground: blue;  }');
    expect(value.toString).not.toHaveBeenCalled();
  });

  it('preserves finite numeric custom values', () => {
    const theme: PartialTheme & { customToken: number } = { customToken: 0 };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --customToken: 0;  }');
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it('normalizes NUL characters using CSS preprocessing', () => {
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: '"font\0family"' })).toBe(
      '.selector { --fontFamilyBase: "font\uFFFDfamily";  }',
    );
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it('handles long matching and nonmatching backslash runs', () => {
    const backslashes = '\\'.repeat(100_000);
    expect(createCSSRuleFromTheme(`.selector${backslashes}<`, { fontFamilyBase: `"${backslashes}x"` })).toBe(
      `.selector${backslashes}\\3C  { --fontFamilyBase: "${backslashes}x";  }`,
    );
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it('handles deeply nested and mismatched blocks without recursion', () => {
    const opening = '('.repeat(100_000);
    const closing = ')'.repeat(100_000);
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: opening + closing })).toBe(
      `.selector { --fontFamilyBase: ${opening}${closing};  }`,
    );
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: opening + ']' })).toBe(
      `.selector { --fontFamilyBase: ${opening}\\5D ${closing};  }`,
    );
  });

  it('handles long escaped names without backtracking', () => {
    const tokenName = String.raw`\aaaaaa`.repeat(20_000);
    expect(createCSSRuleFromTheme('.selector', { [tokenName]: 'red' })).toBe(`.selector { --${tokenName}: red;  }`);
    expect(createCSSRuleFromTheme('.selector', { [tokenName + '!']: 'red' })).toBe('.selector {  }');
  });

  it('preserves all exported theme values', () => {
    for (const theme of [webLightTheme, webDarkTheme, teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme]) {
      const result = createCSSRuleFromTheme('.selector', theme);
      for (const [tokenName, tokenValue] of Object.entries(theme)) {
        expect(result).toContain(`--${tokenName}: ${tokenValue};`);
      }
    }
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it('contains a rule breakout without altering later theme tokens', () => {
    const theme: PartialTheme = {
      colorBrandBackground: 'red; } .other { color: red',
      colorNeutralBackground1: 'blue',
    };

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).toBe(
      '.selector { --colorBrandBackground: red\\3B  \\7D  .other { color: red}; --colorNeutralBackground1: blue;  }',
    );
  });

  it('escapes semicolons in theme values so they cannot inject declarations', () => {
    const theme = {
      colorBrandBackground: 'red; color: transparent',
    } as PartialTheme;

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).toMatchInlineSnapshot(`".selector { --colorBrandBackground: red\\\\3B  color: transparent;  }"`);
    expect(result.match(/;/g)).toHaveLength(1);
  });

  it('escapes curly braces in the selector so the generated rule stays a single, well-formed rule', () => {
    const result = createCSSRuleFromTheme('.selector} .other {', undefined);

    expect(result).toContain('.selector\\7D  .other \\7B ');
    // Only the rule's own wrapping braces should remain unescaped.
    expect(result.match(/{/g)).toHaveLength(1);
    expect(result.match(/}/g)).toHaveLength(1);
  });

  it('preserves CSS escapes because decoded delimiters cannot terminate a declaration', () => {
    const theme: PartialTheme = {
      colorBrandBackground: '\\7D ',
    };

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).toBe('.selector { --colorBrandBackground: \\7D ;  }');
  });
});
