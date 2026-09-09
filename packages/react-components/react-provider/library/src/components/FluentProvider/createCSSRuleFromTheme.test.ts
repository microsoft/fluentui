import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  themeToTokensObject,
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
    { value: String.raw`<`, expected: String.raw`\3C ` },
    { value: String.raw`\<`, expected: String.raw`\3C ` },
    { value: String.raw`\\<`, expected: String.raw`\\\3C ` },
    { value: String.raw`\\\<`, expected: String.raw`\\\3C ` },
  ])('preserves backslash parity when escaping angle brackets in %j', ({ value, expected }) => {
    expect(createCSSRuleFromTheme(value, undefined)).toBe(`${expected} {}`);
  });

  it.each([5_000, 10_000, 20_000, 100_000])(
    'serializes matching and nonmatching backslash runs of length %i',
    runLength => {
      const backslashes = '\\'.repeat(runLength);
      const theme = {
        fontFamilyBase: `"${backslashes}x"`,
        fontFamilyMonospace: `"${backslashes}<"`,
      } as PartialTheme;

      expect(createCSSRuleFromTheme(`.selector${backslashes}<`, theme)).toBe(
        `.selector${backslashes}\\3C  { --fontFamilyBase: "${backslashes}x"; --fontFamilyMonospace: "${backslashes}\\3C ";  }`,
      );
    },
  );

  it.each([5_000, 10_000, 20_000, 100_000])('serializes deep block patterns of length %i', depth => {
    const openingBlocks = '('.repeat(depth);
    const matchingBlocks = `${openingBlocks}${')'.repeat(depth)}`;
    const nonmatchingBlocks = `${openingBlocks}${']'.repeat(depth)}`;
    const mixedBlocks = `${'([{'.repeat(depth)}${')'.repeat(depth)}`;

    expect(createCSSRuleFromTheme('.selector', { customToken: matchingBlocks } as unknown as PartialTheme)).toContain(
      `--customToken: ${matchingBlocks};`,
    );
    expect(
      createCSSRuleFromTheme('.selector', { customToken: nonmatchingBlocks } as unknown as PartialTheme),
    ).toContain(`--customToken: ${nonmatchingBlocks}${')'.repeat(depth)};`);
    expect(createCSSRuleFromTheme('.selector', { customToken: mixedBlocks } as unknown as PartialTheme)).toContain(
      `--customToken: ${'([{'.repeat(depth)}${'}])'.repeat(depth)};`,
    );
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
    { description: 'uppercase hexadecimal escaped URL name', value: String.raw`\55rl(resource/*)` },
    { description: 'mixed hexadecimal escaped URL name', value: String.raw`u\52l(resource/*)` },
    { description: 'uppercase hexadecimal escaped URL suffix', value: String.raw`ur\4c(resource/*)` },
    { description: 'lowercase hexadecimal escaped URL name', value: String.raw`\75rl(resource/*)` },
    { description: 'mixed simple and hexadecimal escaped URL name', value: String.raw`\U\72L(resource/*)` },
    { description: 'hexadecimal escaped URL name with a space terminator', value: String.raw`\55 rl(resource/*)` },
    {
      description: 'hexadecimal escaped URL name with a CRLF terminator',
      value: String.raw`u\52${'\r\n'}l(resource/*)`,
    },
    { description: 'zero-padded hexadecimal escaped URL name', value: String.raw`\000055rl(resource/*)` },
    { description: 'hash token followed by a parenthesized block', value: '#url(/* ) */; x)' },
    { description: 'at-keyword followed by a parenthesized block', value: '@url(/* ) */; x)' },
    { description: 'escaped hash token followed by a parenthesized block', value: String.raw`#\75rl(/* ) */; x)` },
    { description: 'escaped generic function names', value: String.raw`f\6f o((x); y)` },
    { description: 'quoted URL functions with nested blocks', value: String.raw`url("image" (x); fallback)` },
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
      'custom\\ token': 'blue',
      'custom\\3A token': 'green',
      'custom\\<token': 'purple',
    } as unknown as PartialTheme;

    expect(createCSSRuleFromTheme('.selector', theme)).toBe(
      '.selector { --custom-token_1: 0; --customÜnicode: red; --custom\\ token: blue; --custom\\3A token: green; --custom\\3C token: purple;  }',
    );
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it('serializes escaped custom token names consistently with themeToTokensObject', () => {
    const escapedColonTheme = { ...webLightTheme, 'custom\\3A token': 'red' };
    const escapedAngleTheme = { ...webLightTheme, 'custom\\<token': 'red' };

    expect(createCSSRuleFromTheme('.selector', escapedColonTheme)).toContain('--custom\\3A token: red;');
    expect(createCSSRuleFromTheme('.selector', escapedAngleTheme)).toContain('--custom\\3C token: red;');
    expect(themeToTokensObject(escapedColonTheme)['custom\\3A token']).toBe('var(--custom\\3A token)');
    expect(themeToTokensObject(escapedAngleTheme)['custom\\<token']).toBe('var(--custom\\<token)');
  });

  it.each(['', 'token name', 'token:name', 'token;name', 'token\\', 'token\\\nname'])(
    'omits unsupported custom token name %j',
    tokenName => {
      const result = createCSSRuleFromTheme('.selector', { [tokenName]: 'red' } as PartialTheme);

      expect(result).toBe('.selector {  }');
      expect(logWarnSpy).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(tokenName)));
    },
  );

  it.each([
    { description: 'top-level semicolon', value: 'red;blue', containedValue: 'red\\3B blue' },
    { description: 'unmatched closing block delimiter', value: 'red}', containedValue: 'red\\7D ' },
    {
      description: 'unquoted URL tokenization',
      value: 'url(resource/*);token/**/)',
      containedValue: 'url(resource/*)\\3B token/**/)',
    },
    {
      description: 'escaped unquoted URL tokenization',
      value: '\\000075\r\n\\000072\r\n\\00006c\r\n(resource/*);token/**/)',
      containedValue: '\\000075\r\n\\000072\r\n\\00006c\r\n(resource/*)\\3B token/**/)',
    },
    {
      description: 'malformed unquoted URL content',
      value: 'url(\\x")',
      containedValue: 'url(\\x\\22 )',
    },
  ])('contains a value with $description without affecting later tokens', ({ value, containedValue }) => {
    const theme = {
      customToken: value,
      colorBrandBackground: 'blue',
    } as unknown as PartialTheme;

    expect(createCSSRuleFromTheme('.selector', theme)).toBe(
      `.selector { --customToken: ${containedValue}; --colorBrandBackground: blue;  }`,
    );
    expect(logWarnSpy).not.toHaveBeenCalled();
  });

  it.each([
    { description: 'mismatched delimiters', value: 'calc([1px)]' },
    { description: 'unterminated function', value: 'calc(1px' },
    { description: 'unterminated string', value: '"red' },
    { description: 'unescaped string newline', value: '"red\n; color: red' },
    { description: 'unterminated comment', value: 'red /* comment' },
    { description: 'unterminated escape', value: 'red\\' },
    { description: 'escaped whitespace in a generic function name', value: String.raw`ur\ l(resource{)` },
    { description: 'non-URL escaped function name', value: String.raw`\54rl(resource/*)` },
    { description: 'malformed unquoted URL content', value: 'url(\\x")' },
    { description: 'malformed unquoted URL content after whitespace', value: "url( \\x')" },
    { description: 'malformed unquoted URL content after an escaped delimiter', value: 'url(\\)")' },
    { description: 'unterminated unquoted URL', value: 'url(resource' },
    { description: 'unterminated escape in an unquoted URL', value: 'url(resource\\' },
  ])('repairs a value with $description without affecting later tokens', ({ value }) => {
    const ruleText = createCSSRuleFromTheme('.selector', {
      customToken: value,
      colorBrandBackground: 'blue',
    } as unknown as PartialTheme);
    const styleElement = document.createElement('style');
    styleElement.textContent = ruleText;
    document.head.appendChild(styleElement);

    const rule = styleElement.sheet?.cssRules[0] as CSSStyleRule;
    expect(rule.style.getPropertyValue('--colorBrandBackground')).toBe('blue');
    expect(logWarnSpy).not.toHaveBeenCalled();

    styleElement.remove();
  });

  it.each([
    String.raw`\55rl(resource.png)`,
    String.raw`u\52l(resource.png)`,
    String.raw`ur\4c(resource.png)`,
    String.raw`\55 rl(resource.png)`,
    '#url(/* ) */; x)',
    '@url(/* ) */; x)',
    String.raw`#\75rl(/* ) */; x)`,
  ])('preserves token semantics through CSSOM for %j', value => {
    const baselineStyleElement = document.createElement('style');
    baselineStyleElement.textContent = `.selector { --customToken: ${value}; }`;
    document.head.appendChild(baselineStyleElement);

    const styleElement = document.createElement('style');
    styleElement.textContent = createCSSRuleFromTheme('.selector', {
      customToken: value,
    } as unknown as PartialTheme);
    document.head.appendChild(styleElement);

    const rule = styleElement.sheet?.cssRules[0] as CSSStyleRule;
    const baselineRule = baselineStyleElement.sheet?.cssRules[0] as CSSStyleRule;
    expect(rule.style.getPropertyValue('--customToken')).toBe(baselineRule.style.getPropertyValue('--customToken'));

    baselineStyleElement.remove();
    styleElement.remove();
  });

  it.each([
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
