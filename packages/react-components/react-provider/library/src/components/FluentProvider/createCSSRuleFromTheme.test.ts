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

  it('omits unquoted markup rather than repairing it', () => {
    const theme: PartialTheme = {
      colorBrandBackground: '</style><script>alert("xss")</script>',
      colorNeutralBackground1: 'blue',
    };

    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --colorNeutralBackground1: blue;  }');
    expect(logWarnSpy).toHaveBeenCalled();
  });

  it('escapes markup and declaration delimiters inside supported strings', () => {
    const theme: PartialTheme = {
      fontFamilyBase: '"</style><script>text</script>;{}"',
    };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe(
      '.selector { --fontFamilyBase: "\\3C /style\\3E \\3C script\\3E text\\3C /script\\3E \\3B \\7B \\7D ";  }',
    );
    expect(logWarnSpy).not.toHaveBeenCalled();
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
  });

  it.each([
    '',
    ' ',
    'red',
    '#abcdef80',
    '-1.5rem',
    '50%',
    '"Segoe UI", system-ui, sans-serif',
    "'Segoe UI Web (West European)', sans-serif",
    '"字体", sans-serif',
    '字体, sans-serif',
    'color-mix(in srgb, CanvasText 40%, transparent)',
    'clamp(1rem, 2vw, 3rem)',
    'min(10px, 20%)',
    'max(10px, 20%)',
    'calc(1px + 2px)',
    'calc(1rem * 2 / 3)',
    'var(--custom-color)',
    'var(--custom-color, #abcdef)',
    'env(safe-area-inset-top, 0px)',
    'rgb(0 0 0 / 20%)',
    'RGB(0, 0, 0)',
    'hsl(0 0% 0% / 20%)',
    'hsla(0, 0%, 0%, 0.2)',
    'hwb(0 0% 100%)',
    'lab(0% 0 0)',
    'lch(0% 0 0)',
    'oklab(0% 0 0)',
    'oklch(0% 0 0)',
    'color(display-p3 0 0 0)',
    'cubic-bezier(0.9, 0.1, 1, 0.2)',
    'steps(2, jump-start)',
    '0 1px 2px rgb(0 0 0 / 20%), 0 4px 8px rgba(0, 0, 0, 0.1)',
    'inherit',
    'initial',
    'unset',
    'revert-layer',
    'calc(\n  1px + 2px\n)',
  ])('preserves supported CSS in %j', value => {
    const theme: PartialTheme & { customToken: string } = { customToken: value };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe(`.selector { --customToken: ${value};  }`);
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it.each([
    'url(image.png)',
    'url("image.png")',
    'url(data:image/svg+xml;charset=utf-8,%3Csvg%3E;%3C/svg%3E)',
    'clamp(1rem, calc(var(--scale, 1) * 2vw), 3rem)',
    'var(--custom-color, rgb(0 0 0))',
    'custom({ value; [other] })',
    'calc(1px /* ; } */ + 2px)',
    'red /* complete comment */',
    'linear-gradient(red, blue)',
    'attr(data-color)',
    'red !important',
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
    String.raw`\7D `,
    'red; color: transparent',
    'red}',
    'calc([1px)]',
    'calc(1px',
    '"red',
    "'red",
    '"red\n; color: red',
    '"red\r"',
    '"red\f"',
    '"red\0"',
    '"red\u007F"',
    'red\0',
    'red /* comment',
    'red\\',
    'first\\\nsecond',
    'url(resource',
    'url(resource\\',
    'url(\\x")',
    'url(image.png fallback)',
    'url(image(.png)',
    'url(image\u000B.png)',
    'url(resource/*);token/**/)',
    'calc(1px /*)',
    'calc(1px/**/ + 2px)',
    'rgb(0, 0, 0);',
    'rgb(0, 0, 0))',
    'rgb(0, 0, 0)(',
    '<url(a{)',
    '>url(a{)',
    '<url(/*)',
    String.raw`\<url(a{)`,
    String.raw`\\<url(a{)`,
    String.raw`ur\ l(resource{)`,
    String.raw`\54rl(resource/*)`,
    String.raw`\100075rl(a{)`,
    String.raw`\000000url(a{)`,
    ';url(a{)',
    '}url(a[)',
    'red;url(a{)',
    String.raw`;\75rl(a{)`,
  ])('omits malformed or unsupported CSS in %j without changing later tokens', value => {
    const theme = { customToken: value, colorBrandBackground: 'blue' };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --colorBrandBackground: blue;  }');
    expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"customToken"'));
    expect(logWarnSpy.mock.calls[0][0]).not.toContain(value);
  });

  it.each([
    '',
    'token name',
    'token:name',
    'token;name',
    'token\n',
    'token\0name',
    'token\\',
    'token\\\nname',
    'token\\000031  name',
    String.raw`custom\ token`,
    String.raw`custom\3A token`,
    String.raw`custom\31\32`,
    String.raw`custom\000031a`,
    'custom\\000031\r\ntoken',
    String.raw`custom\\token`,
  ])('omits unsupported token name %j', tokenName => {
    expect(createCSSRuleFromTheme('.selector', { [tokenName]: 'private-value', colorBrandBackground: 'blue' })).toBe(
      '.selector { --colorBrandBackground: blue;  }',
    );
    expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(tokenName)));
    expect(logWarnSpy.mock.calls[0][0]).not.toContain('private-value');
  });

  it.each(['custom-token_1', 'custom\u00DCnicode', '1custom'])('preserves supported token name %j', tokenName => {
    expect(createCSSRuleFromTheme('.selector', { [tokenName]: 'red' })).toBe(`.selector { --${tokenName}: red;  }`);
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it.each([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NaN,
    null,
    undefined,
    true,
    {},
    ['red'],
    Symbol('red'),
    BigInt(1),
  ])('omits unsupported runtime values without coercion (case %#)', value => {
    const theme: PartialTheme & { customToken: unknown } = { customToken: value, colorBrandBackground: 'blue' };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --colorBrandBackground: blue;  }');
    expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"customToken"'));
  });

  it('does not call custom coercion methods', () => {
    const value = { toString: jest.fn(() => 'red') };
    const theme: PartialTheme & { customToken: unknown } = { customToken: value, colorBrandBackground: 'blue' };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --colorBrandBackground: blue;  }');
    expect(value.toString).not.toHaveBeenCalled();
  });

  it('omits unsupported values in production without warnings', () => {
    jest.replaceProperty(process.env, 'NODE_ENV', 'production');
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: 'calc(1px', colorBrandBackground: 'blue' })).toBe(
      '.selector { --colorBrandBackground: blue;  }',
    );
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it('preserves finite numeric custom values', () => {
    const theme: PartialTheme & { customToken: number } = { customToken: 0 };
    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --customToken: 0;  }');
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it('handles long selector backslash runs and rejects escaped values', () => {
    const backslashes = '\\'.repeat(100_000);
    expect(createCSSRuleFromTheme(`.selector${backslashes}<`, undefined)).toBe(`.selector${backslashes}\\3C  {}`);
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: `"${backslashes}x"` })).toBe('.selector {  }');
  });

  it('rejects deeply nested blocks without parsing them', () => {
    const opening = '('.repeat(100_000);
    const closing = ')'.repeat(100_000);
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: opening + closing })).toBe('.selector {  }');
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: opening + ']' })).toBe('.selector {  }');
  });

  it('handles long supported names and values and rejects incomplete functions', () => {
    const tokenName = 'a'.repeat(100_000);
    const value = `calc(${'1px + '.repeat(20_000)}1px)`;
    expect(createCSSRuleFromTheme('.selector', { [tokenName]: 'red' })).toBe(`.selector { --${tokenName}: red;  }`);
    expect(createCSSRuleFromTheme('.selector', { [tokenName + '!']: 'red' })).toBe('.selector {  }');
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: value })).toBe(
      `.selector { --fontFamilyBase: ${value};  }`,
    );
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: value.slice(0, -1) })).toBe('.selector {  }');
    expect(createCSSRuleFromTheme('.selector', { fontFamilyBase: '"'.repeat(100_000) + '\\' })).toBe('.selector {  }');
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

  it('omits a rule breakout without altering later theme tokens', () => {
    const theme: PartialTheme = {
      colorBrandBackground: 'red; } .other { color: red',
      colorNeutralBackground1: 'blue',
    };

    const result = createCSSRuleFromTheme('.selector', theme);
    expect(result).toBe('.selector { --colorNeutralBackground1: blue;  }');
  });

  it('escapes curly braces in the selector so the generated rule stays a single, well-formed rule', () => {
    const result = createCSSRuleFromTheme('.selector} .other {', undefined);

    expect(result).toContain('.selector\\7D  .other \\7B ');
    // Only the rule's own wrapping braces should remain unescaped.
    expect(result.match(/{/g)).toHaveLength(1);
    expect(result.match(/}/g)).toHaveLength(1);
  });
});
