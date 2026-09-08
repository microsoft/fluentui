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
  const noop = () => undefined;
  let logWarnSpy: jest.Spied<typeof console.warn>;

  beforeEach(() => {
    logWarnSpy = jest.spyOn(console, 'warn').mockImplementation(noop);
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
    expect(result).not.toContain('>');
    expect(result).toContain('\\3C /style\\3E \\3C script\\3E alert("xss")\\3C /script\\3E ');
  });

  it.each([
    { description: 'font family fallbacks', value: '"Segoe UI", system-ui, sans-serif' },
    { description: 'system and functional colors', value: 'color-mix(in srgb, CanvasText 40%, transparent)' },
    { description: 'nested functions and fallbacks', value: 'clamp(1rem, calc(var(--scale, 1) * 2vw), 3rem)' },
    { description: 'multiple shadows', value: '0 1px 2px rgb(0 0 0 / 20%), 0 4px 8px rgba(0, 0, 0, 0.1)' },
    { description: 'CSS-wide values', value: 'revert-layer' },
    {
      description: 'data URLs with nested delimiters',
      value: 'url(data:image/svg+xml;charset=utf-8,%3Csvg%3E;%3C/svg%3E)',
    },
    { description: 'quoted delimiters', value: '"value; with { delimiters }"' },
    { description: 'balanced blocks', value: 'custom({ value; [other] })' },
    { description: 'comments', value: 'calc(1px /* ; } */ + 2px)' },
    { description: 'escaped delimiters', value: String.raw`red\;blue` },
    { description: 'escaped quotes', value: String.raw`"escaped \"quote\""` },
    { description: 'escaped unquoted URL characters', value: String.raw`url(image\20 name.png)` },
    { description: 'backslash and line feed', value: 'first\\\nsecond' },
    { description: 'backslash and carriage return', value: 'first\\\rsecond' },
    { description: 'backslash and form feed', value: 'first\\\fsecond' },
    { description: 'multiline whitespace', value: 'calc(\n  1px + 2px\n)' },
  ])('preserves $description', ({ value }) => {
    const result = createCSSRuleFromTheme('.selector', { customToken: value } as unknown as PartialTheme);

    expect(result).toBe(`.selector { --customToken: ${value};  }`);
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it('preserves supported custom token names and finite numeric values', () => {
    const theme = {
      'custom-token_1': 0,
      customÜnicode: 'red',
    } as unknown as PartialTheme;

    expect(createCSSRuleFromTheme('.selector', theme)).toBe(
      '.selector { --custom-token_1: 0; --customÜnicode: red;  }',
    );
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it.each(['', 'token name', 'token:name', 'token;name', 'token\\name'])(
    'omits unsupported custom token name %j',
    tokenName => {
      const result = createCSSRuleFromTheme('.selector', { [tokenName]: 'red' } as PartialTheme);

      expect(result).toBe('.selector {  }');
      expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(tokenName)));
    },
  );

  it.each([
    { description: 'top-level delimiter', value: 'red;blue' },
    { description: 'unmatched closing delimiter', value: 'red}' },
    { description: 'mismatched delimiters', value: 'calc([1px)]' },
    { description: 'unterminated function', value: 'calc(1px' },
    { description: 'unterminated string', value: '"red' },
    { description: 'unescaped string newline', value: '"red\nblue"' },
    { description: 'unterminated comment', value: 'red /* comment' },
    { description: 'unterminated escape', value: 'red\\' },
    { description: 'invalid unquoted URL tokenization', value: 'url(resource/*);token/**/)' },
    {
      description: 'invalid escaped unquoted URL tokenization',
      value: '\\000075\r\n\\000072\r\n\\00006c\r\n(resource/*);token/**/)',
    },
    { description: 'escaped whitespace in a generic function name', value: String.raw`ur\ l(resource{)` },
    { description: 'non-finite number', value: Number.POSITIVE_INFINITY },
    { description: 'non-primitive value', value: { color: 'red' } },
  ])('omits a value with $description without affecting later tokens', ({ value }) => {
    const theme = {
      invalidToken: value,
      colorBrandBackground: 'blue',
    } as unknown as PartialTheme;

    expect(createCSSRuleFromTheme('.selector', theme)).toBe('.selector { --colorBrandBackground: blue;  }');
    expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"invalidToken"'));
    expect(logWarnSpy.mock.calls[0][0]).not.toContain(String(value));
  });

  it('serializes all values from exported themes', () => {
    for (const theme of [webLightTheme, webDarkTheme, teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme]) {
      const result = createCSSRuleFromTheme('.selector', theme);

      for (const [tokenName, tokenValue] of Object.entries(theme)) {
        expect(result).toContain(`--${tokenName}: ${tokenValue};`);
      }
    }

    expect(logWarnSpy).not.toHaveBeenCalled();
  });
});
